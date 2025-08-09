import winston from 'winston';

// Custom log format for educational compliance
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    return JSON.stringify({
      timestamp,
      level,
      message,
      service: 'auth-service',
      ...meta
    });
  })
);

// Create logger with multiple transports
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: {
    service: 'neurolearn-auth',
    environment: process.env.NODE_ENV || 'development'
  },
  transports: [
    // Console transport for development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),

    // File transport for all logs
    new winston.transports.File({
      filename: 'logs/auth-service.log',
      maxsize: 10485760, // 10MB
      maxFiles: 5,
      tailable: true
    }),

    // Separate file for errors
    new winston.transports.File({
      filename: 'logs/auth-errors.log',
      level: 'error',
      maxsize: 10485760, // 10MB
      maxFiles: 5,
      tailable: true
    })
  ],

  // Handle uncaught exceptions
  exceptionHandlers: [
    new winston.transports.File({ 
      filename: 'logs/auth-exceptions.log',
      maxsize: 10485760,
      maxFiles: 5 
    })
  ],

  // Handle unhandled promise rejections
  rejectionHandlers: [
    new winston.transports.File({ 
      filename: 'logs/auth-rejections.log',
      maxsize: 10485760,
      maxFiles: 5 
    })
  ]
});

// Security-focused logging functions
export const securityLogger = {
  authAttempt: (email: string, success: boolean, ip: string, userAgent?: string) => {
    logger.info('Authentication attempt', {
      event: 'auth_attempt',
      email,
      success,
      ip,
      userAgent,
      timestamp: new Date().toISOString()
    });
  },

  dataAccess: (userId: string, resource: string, action: string, ip: string) => {
    logger.info('Data access', {
      event: 'data_access',
      userId,
      resource,
      action,
      ip,
      timestamp: new Date().toISOString()
    });
  },

  suspiciousActivity: (description: string, metadata: any) => {
    logger.warn('Suspicious activity detected', {
      event: 'suspicious_activity',
      description,
      metadata,
      timestamp: new Date().toISOString()
    });
  },

  complianceEvent: (event: string, userId: string, details: any) => {
    logger.info('Compliance event', {
      event: 'compliance',
      complianceEvent: event,
      userId,
      details,
      timestamp: new Date().toISOString()
    });
  }
};

// Audit logging for FERPA/COPPA compliance
export const auditLogger = {
  log: (event: {
    action: string;
    userId?: string;
    studentId?: string;
    resourceType: string;
    resourceId?: string;
    ip: string;
    userAgent?: string;
    details?: any;
  }) => {
    logger.info('Audit event', {
      event: 'audit',
      ...event,
      timestamp: new Date().toISOString(),
      service: 'auth-service'
    });
  }
};

// Development vs production logging configuration
if (process.env.NODE_ENV === 'production') {
  // In production, add external logging service
  // Example: Winston + CloudWatch, Datadog, etc.
  
  // Remove console transport in production
  logger.remove(logger.transports.find(t => t instanceof winston.transports.Console)!);
  
  // Add production-specific transports here
  // logger.add(new winston.transports.CloudWatch({...}));
}

// Create logs directory if it doesn't exist
import fs from 'fs';
if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}
