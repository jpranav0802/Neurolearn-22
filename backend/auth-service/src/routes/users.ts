import express from 'express';
import { body, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';
import { encryptPII, decryptPII } from '../utils/encryption';
import { auditLog } from '../utils/auditLogger';
import { authorize, validateStudentDataAccess } from '../middleware/auth';
import bcrypt from 'bcryptjs';

const router = express.Router();
const prisma = new PrismaClient();

// Validation middleware
const updateProfileValidation = [
  body('firstName').optional().trim().isLength({ min: 1 }).withMessage('First name must not be empty'),
  body('lastName').optional().trim().isLength({ min: 1 }).withMessage('Last name must not be empty'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Valid email required'),
  body('currentPassword').optional().notEmpty().withMessage('Current password required for email change'),
  body('sensoryPreferences').optional().isObject().withMessage('Sensory preferences must be an object'),
  body('learningStyle').optional().isIn(['visual', 'auditory', 'kinesthetic', 'multimodal']).withMessage('Invalid learning style')
];

const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password required'),
  body('newPassword').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error('Password confirmation does not match');
    }
    return true;
  })
];

/**
 * Get current user profile
 */
router.get('/profile', async (req, res) => {
  try {
    const userId = req.user!.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: {
          include: {
            sensoryPreferences: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User profile could not be found'
      });
    }

    await auditLog({
      action: 'user_profile_accessed',
      resourceType: 'user_account',
      resourceId: user.id,
      userId: userId,
      ipAddress: req.ip || 'unknown',
      userAgent: req.get('User-Agent') || 'unknown',
      details: { profileType: 'own_profile' }
    });

    // Decrypt PII for response
    const profile = {
      id: user.id,
      email: user.email,
      firstName: user.firstNameEncrypted ? decryptPII(user.firstNameEncrypted) : null,
      lastName: user.lastNameEncrypted ? decryptPII(user.lastNameEncrypted) : null,
      role: user.role,
      organizationId: user.organizationId,
      isActive: user.isActive,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
      studentProfile: user.studentProfile ? {
        id: user.studentProfile.id,
        primaryLearningStyle: user.studentProfile.primaryLearningStyle,
        secondaryLearningStyle: user.studentProfile.secondaryLearningStyle,
        currentDifficultyLevel: user.studentProfile.currentDifficultyLevel,
        attentionSpanMinutes: user.studentProfile.attentionSpanMinutes,
        emotionalRegulationLevel: user.studentProfile.emotionalRegulationLevel,
        processingSpeed: user.studentProfile.processingSpeed,
        communicationLevel: user.studentProfile.communicationLevel,
        supportNeeds: user.studentProfile.supportNeeds,
        sensoryPreferences: user.studentProfile.sensoryPreferences
      } : null
    };

    res.json({
      message: 'Profile retrieved successfully',
      profile
    });

  } catch (error) {
    logger.error('Profile retrieval error', { error, userId: req.user?.id });
    res.status(500).json({
      error: 'Profile retrieval failed',
      message: 'An internal error occurred while retrieving profile'
    });
  }
});

/**
 * Update user profile
 */
router.put('/profile', updateProfileValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const userId = req.user!.id;
    const { firstName, lastName, email, currentPassword, sensoryPreferences, learningStyle } = req.body;

    // Get current user
    const currentUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!currentUser) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User could not be found'
      });
    }

    // If email is being changed, verify current password
    if (email && email !== currentUser.email) {
      if (!currentPassword) {
        return res.status(400).json({
          error: 'Password required',
          message: 'Current password is required to change email address'
        });
      }

      const isValidPassword = await bcrypt.compare(currentPassword, currentUser.encryptedPasswordHash);
      if (!isValidPassword) {
        return res.status(401).json({
          error: 'Invalid password',
          message: 'Current password is incorrect'
        });
      }

      // Check if new email is already taken
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser && existingUser.id !== userId) {
        return res.status(409).json({
          error: 'Email already exists',
          message: 'Another account with this email address already exists'
        });
      }
    }

    // Prepare update data
    const updateData: any = {};

    if (firstName) {
      updateData.firstNameEncrypted = encryptPII(firstName);
    }
    if (lastName) {
      updateData.lastNameEncrypted = encryptPII(lastName);
    }
    if (email) {
      updateData.email = email;
      updateData.emailVerified = false; // Require re-verification for new email
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData
    });

    // Update student profile if provided and user is a student
    if (req.user!.role === 'student' && (sensoryPreferences || learningStyle)) {
      const studentProfile = await prisma.studentProfile.findUnique({
        where: { userId }
      });

      if (studentProfile) {
        const studentUpdateData: any = {};
        
        if (learningStyle) {
          studentUpdateData.primaryLearningStyle = learningStyle;
        }

        await prisma.studentProfile.update({
          where: { userId },
          data: studentUpdateData
        });

        // Update sensory preferences if provided
        if (sensoryPreferences) {
          await prisma.sensoryPreferences.upsert({
            where: { studentProfileId: studentProfile.id },
            update: sensoryPreferences,
            create: {
              studentProfileId: studentProfile.id,
              ...sensoryPreferences
            }
          });
        }
      }
    }

    await auditLog({
      action: 'user_profile_updated',
      resourceType: 'user_account',
      resourceId: userId,
      userId: userId,
      ipAddress: req.ip || 'unknown',
      userAgent: req.get('User-Agent') || 'unknown',
      details: {
        fieldsUpdated: Object.keys(updateData),
        emailChanged: !!email,
        sensoryPreferencesUpdated: !!sensoryPreferences
      }
    });

    logger.info('User profile updated', {
      userId,
      fieldsUpdated: Object.keys(updateData)
    });

    res.json({
      message: 'Profile updated successfully',
      emailVerificationRequired: !!email && email !== currentUser.email
    });

  } catch (error) {
    logger.error('Profile update error', { error, userId: req.user?.id });
    res.status(500).json({
      error: 'Profile update failed',
      message: 'An internal error occurred while updating profile'
    });
  }
});

/**
 * Change password
 */
router.put('/password', changePasswordValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const userId = req.user!.id;
    const { currentPassword, newPassword } = req.body;

    // Get current user
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User could not be found'
      });
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.encryptedPasswordHash);
    if (!isValidPassword) {
      await auditLog({
        action: 'password_change_attempt_invalid',
        resourceType: 'user_account',
        resourceId: userId,
        userId: userId,
        ipAddress: req.ip || 'unknown',
        userAgent: req.get('User-Agent') || 'unknown',
        details: { reason: 'incorrect_current_password' }
      });

      return res.status(401).json({
        error: 'Invalid password',
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: {
        encryptedPasswordHash: hashedNewPassword,
        updatedAt: new Date()
      }
    });

    await auditLog({
      action: 'password_changed',
      resourceType: 'user_account',
      resourceId: userId,
      userId: userId,
      ipAddress: req.ip || 'unknown',
      userAgent: req.get('User-Agent') || 'unknown',
      details: { changeMethod: 'user_initiated' }
    });

    logger.info('Password changed successfully', { userId });

    res.json({
      message: 'Password changed successfully'
    });

  } catch (error) {
    logger.error('Password change error', { error, userId: req.user?.id });
    res.status(500).json({
      error: 'Password change failed',
      message: 'An internal error occurred while changing password'
    });
  }
});

/**
 * Get student data (for parents, teachers, therapists)
 */
router.get('/students/:studentId', validateStudentDataAccess, async (req, res) => {
  try {
    const { studentId } = req.params;
    const requestorRole = req.user!.role;

    const studentUser = await prisma.user.findUnique({
      where: { id: studentId },
      include: {
        studentProfile: {
          include: {
            sensoryPreferences: true
          }
        }
      }
    });

    if (!studentUser || studentUser.role !== 'student') {
      return res.status(404).json({
        error: 'Student not found',
        message: 'The specified student could not be found'
      });
    }

    await auditLog({
      action: 'student_data_accessed',
      resourceType: 'student_data',
      resourceId: studentId,
      userId: req.user!.id,
      ipAddress: req.ip || 'unknown',
      userAgent: req.get('User-Agent') || 'unknown',
      details: {
        requestorRole,
        dataType: 'profile_and_preferences'
      }
    });

    // Filter data based on requestor role
    let responseData: any = {
      id: studentUser.id,
      firstName: studentUser.firstNameEncrypted ? decryptPII(studentUser.firstNameEncrypted) : null,
      lastName: studentUser.lastNameEncrypted ? decryptPII(studentUser.lastNameEncrypted) : null,
      role: studentUser.role,
      isActive: studentUser.isActive,
      emailVerified: studentUser.emailVerified
    };

    // Add student profile data if available
    if (studentUser.studentProfile) {
      responseData.studentProfile = {
        id: studentUser.studentProfile.id,
        primaryLearningStyle: studentUser.studentProfile.primaryLearningStyle,
        secondaryLearningStyle: studentUser.studentProfile.secondaryLearningStyle,
        currentDifficultyLevel: studentUser.studentProfile.currentDifficultyLevel,
        attentionSpanMinutes: studentUser.studentProfile.attentionSpanMinutes,
        emotionalRegulationLevel: studentUser.studentProfile.emotionalRegulationLevel,
        processingSpeed: studentUser.studentProfile.processingSpeed,
        communicationLevel: studentUser.studentProfile.communicationLevel,
        supportNeeds: studentUser.studentProfile.supportNeeds,
        sensoryPreferences: studentUser.studentProfile.sensoryPreferences
      };
    }

    // Teachers and therapists get additional information
    if (['teacher', 'therapist'].includes(requestorRole)) {
      responseData.createdAt = studentUser.createdAt;
      responseData.lastLoginAt = studentUser.lastLoginAt;
    }

    // Parents get basic information only
    if (requestorRole === 'parent') {
      // Limited data for parents - only what's necessary for support
      responseData = {
        ...responseData,
        studentProfile: responseData.studentProfile ? {
          primaryLearningStyle: responseData.studentProfile.primaryLearningStyle,
          sensoryPreferences: responseData.studentProfile.sensoryPreferences
        } : null
      };
    }

    res.json({
      message: 'Student data retrieved successfully',
      student: responseData
    });

  } catch (error) {
    logger.error('Student data retrieval error', { 
      error, 
      studentId: req.params.studentId,
      requestorId: req.user?.id 
    });
    res.status(500).json({
      error: 'Data retrieval failed',
      message: 'An internal error occurred while retrieving student data'
    });
  }
});

/**
 * Delete user account (COPPA compliance)
 */
router.delete('/account', authorize('student', 'parent', 'admin'), async (req, res) => {
  try {
    const userId = req.user!.id;
    const userRole = req.user!.role;

    // For students under 13, require parental consent for deletion
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User account could not be found'
      });
    }

    // TODO: Implement COPPA-compliant deletion process
    // - Check if user is under 13
    // - Require parental consent if needed
    // - Retain certain data for legal compliance
    // - Schedule delayed deletion for educational records

    await auditLog({
      action: 'account_deletion_requested',
      resourceType: 'user_account',
      resourceId: userId,
      userId: userId,
      ipAddress: req.ip || 'unknown',
      userAgent: req.get('User-Agent') || 'unknown',
      details: { 
        userRole,
        deletionType: 'user_initiated'
      }
    });

    logger.info('Account deletion requested', { userId, userRole });

    res.json({
      message: 'Account deletion process initiated',
      notice: 'Your account deletion request has been received and will be processed according to educational privacy regulations.',
      timeline: 'Complete deletion may take up to 30 days to ensure compliance with educational record retention requirements.'
    });

  } catch (error) {
    logger.error('Account deletion error', { error, userId: req.user?.id });
    res.status(500).json({
      error: 'Account deletion failed',
      message: 'An internal error occurred while processing account deletion'
    });
  }
});

export default router;
