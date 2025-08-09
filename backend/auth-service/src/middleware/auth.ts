import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger';
import { auditLog } from '../utils/auditLogger';

// Extend Request interface to include user data
declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: 'student' | 'parent' | 'teacher' | 'therapist' | 'admin';
  permissions: Permission[];
  organizationId?: string;
  studentIds?: string[]; // For parents - children they can access
  classroomIds?: string[]; // For teachers - classes they manage
}

interface Permission {
  resource: string;
  actions: ('read' | 'write' | 'delete')[];
  conditions?: Record<string, any>;
}

/**
 * JWT Token authentication middleware
 */
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      await auditLog({
        action: 'auth_missing_token',
        resourceType: 'authentication',
        resourceId: null,
        userId: null,
        ipAddress: req.ip || 'unknown',
        userAgent: req.get('User-Agent') || 'unknown',
        details: { path: req.path }
      });

      res.status(401).json({
        error: 'Access denied',
        message: 'Authentication token is required'
      });
      return;
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    
    // Special handling for student sessions (COPPA compliance)
    if (decoded.role === 'student') {
      await validateStudentSession(decoded);
    }

    // Attach user to request
    req.user = decoded as AuthenticatedUser;

    await auditLog({
      action: 'auth_success',
      resourceType: 'authentication',
      resourceId: decoded.userId,
      userId: decoded.userId,
      ipAddress: req.ip || 'unknown',
      userAgent: req.get('User-Agent') || 'unknown',
      details: { 
        role: decoded.role,
        path: req.path
      }
    });

    next();

  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      await auditLog({
        action: 'auth_invalid_token',
        resourceType: 'authentication',
        resourceId: null,
        userId: null,
        ipAddress: req.ip || 'unknown',
        userAgent: req.get('User-Agent') || 'unknown',
        details: { 
          error: error.message,
          path: req.path
        }
      });

      res.status(401).json({
        error: 'Access denied',
        message: 'Invalid or expired token'
      });
      return;
    }

    logger.error('Authentication error', { error, path: req.path });
    res.status(500).json({
      error: 'Authentication failed',
      message: 'An error occurred during authentication'
    });
  }
};

/**
 * Authorization middleware for role-based access control
 */
export const authorize = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user as AuthenticatedUser;

    if (!user) {
      res.status(401).json({
        error: 'Access denied',
        message: 'Authentication required'
      });
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      auditLog({
        action: 'authorization_denied',
        resourceType: 'access_control',
        resourceId: null,
        userId: user.id,
        ipAddress: req.ip || 'unknown',
        userAgent: req.get('User-Agent') || 'unknown',
        details: {
          userRole: user.role,
          requiredRoles: allowedRoles,
          path: req.path
        }
      });

      res.status(403).json({
        error: 'Access forbidden',
        message: 'Insufficient permissions for this resource'
      });
      return;
    }

    next();
  };
};

/**
 * Student data access validation (COPPA compliance)
 */
export const validateStudentDataAccess = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const user = req.user as AuthenticatedUser;
  const studentId = req.params.studentId;

  if (!user || !studentId) {
    res.status(400).json({
      error: 'Invalid request',
      message: 'User authentication and student ID are required'
    });
    return;
  }

  let hasAccess = false;
  let accessReason = '';

  switch (user.role) {
    case 'student':
      hasAccess = user.id === studentId;
      accessReason = 'own_data';
      break;
    case 'parent':
      hasAccess = user.studentIds?.includes(studentId) || false;
      accessReason = 'parental_access';
      break;
    case 'teacher':
      // TODO: Implement teacher-student relationship check
      hasAccess = true; // Placeholder
      accessReason = 'teacher_assignment';
      break;
    case 'therapist':
      // TODO: Implement therapist-student relationship check
      hasAccess = true; // Placeholder
      accessReason = 'therapeutic_relationship';
      break;
    case 'admin':
      hasAccess = true;
      accessReason = 'administrative_access';
      break;
  }

  if (!hasAccess) {
    auditLog({
      action: 'student_data_access_denied',
      resourceType: 'student_data',
      resourceId: studentId,
      userId: user.id,
      ipAddress: req.ip || 'unknown',
      userAgent: req.get('User-Agent') || 'unknown',
      details: {
        userRole: user.role,
        attemptedStudentId: studentId,
        reason: 'insufficient_relationship'
      }
    });

    res.status(403).json({
      error: 'Access denied',
      message: 'You do not have permission to access this student\'s data'
    });
    return;
  }

  // Log successful access for compliance
  auditLog({
    action: 'student_data_access_granted',
    resourceType: 'student_data',
    resourceId: studentId,
    userId: user.id,
    ipAddress: req.ip || 'unknown',
    userAgent: req.get('User-Agent') || 'unknown',
    details: {
      userRole: user.role,
      accessReason,
      path: req.path
    }
  });

  next();
};

/**
 * Validate student session for COPPA compliance
 */
async function validateStudentSession(user: any): Promise<void> {
  // TODO: Implement additional COPPA compliance checks
  // - Check if student requires parental consent
  // - Validate session duration limits
  // - Check for any parental restrictions
  
  logger.info('Student session validation', {
    userId: user.userId,
    sessionValidation: 'coppa_compliance'
  });
}
