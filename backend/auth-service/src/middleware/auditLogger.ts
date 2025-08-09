import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

/**
 * Audit logging middleware for COPPA/FERPA compliance
 * Automatically logs all requests for educational data access tracking
 */
export const auditLogger = (req: Request, res: Response, next: NextFunction): void => {
  // Skip audit logging for health checks and static assets
  const skipPaths = ['/health', '/favicon.ico', '/api/docs'];
  const shouldSkip = skipPaths.some(path => req.path.startsWith(path));
  
  if (shouldSkip) {
    return next();
  }

  // Capture request start time
  const startTime = Date.now();

  // Store original end function
  const originalEnd = res.end;

  // Override res.end to capture response details
  res.end = function(chunk?: any, encoding?: any) {
    // Calculate response time
    const responseTime = Date.now() - startTime;

    // Log the request/response for audit trail
    logger.info('API Request Audit', {
      audit: true,
      request: {
        method: req.method,
        url: req.url,
        path: req.path,
        query: req.query,
        headers: {
          userAgent: req.get('User-Agent'),
          contentType: req.get('Content-Type'),
          authorization: req.get('Authorization') ? '[REDACTED]' : undefined
        },
        ip: req.ip || req.connection.remoteAddress,
        sessionId: req.sessionID
      },
      response: {
        statusCode: res.statusCode,
        responseTime: `${responseTime}ms`
      },
      user: {
        userId: req.session?.userId,
        role: req.session?.role
      },
      timestamp: new Date().toISOString(),
      service: 'auth-service'
    });

    // Call original end function
    originalEnd.call(this, chunk, encoding);
  };

  next();
};
