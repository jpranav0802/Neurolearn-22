import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';
import { encryptPII, decryptPII } from '../utils/encryption';
import { sendVerificationEmail, sendPasswordResetEmail, sendParentalConsentEmail } from '../utils/email';
import { generateMFASecret, verifyMFAToken } from '../utils/mfa';
import { auditLog } from '../utils/auditLogger';
import rateLimit from 'express-rate-limit';

const router = express.Router();
const prisma = new PrismaClient();

// Rate limiting for sensitive endpoints
const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: { error: 'Too many authentication attempts, please try again later.' }
});

// Validation middleware
const registerValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character'),
  body('firstName').trim().isLength({ min: 1 }).withMessage('First name required'),
  body('lastName').trim().isLength({ min: 1 }).withMessage('Last name required'),
  body('role').isIn(['student', 'parent', 'teacher', 'therapist']).withMessage('Valid role required'),
  body('dateOfBirth').optional().isISO8601().withMessage('Valid date of birth required'),
  body('parentalConsent').optional().isBoolean().withMessage('Parental consent must be boolean'),
  body('parentEmail').optional().isEmail().withMessage('Valid parent email required')
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required'),
  body('mfaToken').optional().isLength({ min: 6, max: 6 }).withMessage('MFA token must be 6 digits')
];

// Register new user with COPPA compliance
router.post('/register', authRateLimit, registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { email, password, firstName, lastName, role, dateOfBirth, parentalConsent, parentEmail } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      await auditLog({
        action: 'register_attempt_duplicate',
        resourceType: 'user',
        resourceId: existingUser.id,
        userId: null,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        details: { email, role }
      });

      return res.status(409).json({
        error: 'User already exists',
        message: 'An account with this email address already exists.'
      });
    }

    // COPPA compliance check for students
    let requiresParentalConsent = false;
    if (role === 'student' && dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const age = Math.floor((Date.now() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
      
      if (age < 13) {
        requiresParentalConsent = true;
        if (!parentalConsent || !parentEmail) {
          return res.status(400).json({
            error: 'Parental consent required',
            message: 'Students under 13 require verifiable parental consent.',
            requiresParentalConsent: true
          });
        }
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Encrypt PII
    const encryptedFirstName = encryptPII(firstName);
    const encryptedLastName = encryptPII(lastName);
    const encryptedDateOfBirth = dateOfBirth ? encryptPII(dateOfBirth) : null;

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        encryptedPasswordHash: hashedPassword,
        role,
        firstNameEncrypted: encryptedFirstName,
        lastNameEncrypted: encryptedLastName,
        dateOfBirthEncrypted: encryptedDateOfBirth,
        requiresParentalConsent,
        parentEmail: parentEmail || null,
        isActive: !requiresParentalConsent, // Inactive until parental consent if required
        termsAcceptedAt: new Date(),
        privacyPolicyAcceptedAt: new Date()
      }
    });

    // Generate email verification token
    const verificationToken = jwt.sign(
      { userId: user.id, type: 'email_verification' },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    // Send verification email
    await sendVerificationEmail(email, verificationToken, firstName);

    // If parental consent required, send consent email to parent
    if (requiresParentalConsent && parentEmail) {
      const parentConsentToken = jwt.sign(
        { userId: user.id, type: 'parental_consent' },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );
      
      // Send parental consent email
      await sendParentalConsentEmail(parentEmail, parentConsentToken, firstName);
    }

    await auditLog({
      action: 'user_registered',
      resourceType: 'user',
      resourceId: user.id,
      userId: user.id,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      details: { 
        email, 
        role, 
        requiresParentalConsent,
        hasParentEmail: !!parentEmail
      }
    });

    logger.info('User registered successfully', {
      userId: user.id,
      email,
      role,
      requiresParentalConsent
    });

    res.status(201).json({
      message: 'User registered successfully',
      userId: user.id,
      emailVerificationRequired: true,
      parentalConsentRequired: requiresParentalConsent,
      nextSteps: requiresParentalConsent 
        ? ['Email verification', 'Parental consent approval']
        : ['Email verification']
    });

  } catch (error) {
    logger.error('Registration error', { error, email: req.body.email });
    res.status(500).json({
      error: 'Registration failed',
      message: 'An internal error occurred during registration.'
    });
  }
});

// Login user with MFA support
router.post('/login', authRateLimit, loginValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { email, password, mfaToken } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        studentProfile: true
      }
    });

    if (!user) {
      await auditLog({
        action: 'login_attempt_invalid_email',
        resourceType: 'user',
        resourceId: null,
        userId: null,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        details: { email }
      });

      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Email or password is incorrect.'
      });
    }

    // Check if account is active
    if (!user.isActive) {
      await auditLog({
        action: 'login_attempt_inactive_account',
        resourceType: 'user',
        resourceId: user.id,
        userId: user.id,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        details: { email }
      });

      return res.status(403).json({
        error: 'Account inactive',
        message: 'Your account is not active. Please complete email verification and any required approvals.'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.encryptedPasswordHash);
    if (!isValidPassword) {
      await auditLog({
        action: 'login_attempt_invalid_password',
        resourceType: 'user',
        resourceId: user.id,
        userId: user.id,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        details: { email }
      });

      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Email or password is incorrect.'
      });
    }

    // Check if MFA is required for this role
    const mfaRequiredRoles = ['teacher', 'therapist', 'admin'];
    const requiresMFA = mfaRequiredRoles.includes(user.role);

    if (requiresMFA && user.mfaSecret) {
      if (!mfaToken) {
        return res.status(200).json({
          requiresMFA: true,
          message: 'MFA token required for login.'
        });
      }

      const isMFAValid = verifyMFAToken(user.mfaSecret, mfaToken);
      if (!isMFAValid) {
        await auditLog({
          action: 'login_attempt_invalid_mfa',
          resourceType: 'user',
          resourceId: user.id,
          userId: user.id,
          ipAddress: req.ip,
          userAgent: req.get('User-Agent'),
          details: { email }
        });

        return res.status(401).json({
          error: 'Invalid MFA token',
          message: 'The provided MFA token is incorrect.'
        });
      }
    }

    // Generate JWT token
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
      permissions: [] // TODO: Implement role-based permissions
    };

    const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRY || '7d'
    });

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    });

    // Set session
    req.session.userId = user.id;
    req.session.role = user.role;

    await auditLog({
      action: 'user_login_success',
      resourceType: 'user',
      resourceId: user.id,
      userId: user.id,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      details: { email, role: user.role }
    });

    logger.info('User logged in successfully', {
      userId: user.id,
      email,
      role: user.role
    });

    // Decrypt user data for response
    const firstName = decryptPII(user.firstNameEncrypted!);
    const lastName = decryptPII(user.lastNameEncrypted!);

    res.json({
      message: 'Login successful',
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName,
        lastName,
        role: user.role,
        organizationId: user.organizationId,
        lastLoginAt: user.lastLoginAt
      },
      expiresIn: process.env.JWT_EXPIRY || '7d'
    });

  } catch (error) {
    logger.error('Login error', { error, email: req.body.email });
    res.status(500).json({
      error: 'Login failed',
      message: 'An internal error occurred during login.'
    });
  }
});

// Logout user
router.post('/logout', async (req, res) => {
  try {
    const userId = req.session.userId;

    if (userId) {
      await auditLog({
        action: 'user_logout',
        resourceType: 'user',
        resourceId: userId,
        userId: userId,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        details: {}
      });
    }

    // Destroy session
    req.session.destroy((err) => {
      if (err) {
        logger.error('Session destruction error', { error: err, userId });
        return res.status(500).json({
          error: 'Logout failed',
          message: 'Could not end session properly.'
        });
      }

      res.clearCookie('neurolearn.sid');
      res.json({ message: 'Logout successful' });
    });

  } catch (error) {
    logger.error('Logout error', { error });
    res.status(500).json({
      error: 'Logout failed',
      message: 'An internal error occurred during logout.'
    });
  }
});

// Verify email address
router.post('/verify-email', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        error: 'Token required',
        message: 'Email verification token is required.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    
    if (decoded.type !== 'email_verification') {
      return res.status(400).json({
        error: 'Invalid token',
        message: 'Token is not valid for email verification.'
      });
    }

    // Update user
    const user = await prisma.user.update({
      where: { id: decoded.userId },
      data: { 
        emailVerified: true,
        emailVerifiedAt: new Date()
      }
    });

    await auditLog({
      action: 'email_verified',
      resourceType: 'user',
      resourceId: user.id,
      userId: user.id,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      details: { email: user.email }
    });

    logger.info('Email verified successfully', { userId: user.id });

    res.json({
      message: 'Email verified successfully',
      emailVerified: true
    });

  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({
        error: 'Invalid token',
        message: 'The verification token is invalid or expired.'
      });
    }

    logger.error('Email verification error', { error });
    res.status(500).json({
      error: 'Verification failed',
      message: 'An internal error occurred during email verification.'
    });
  }
});

export default router;
