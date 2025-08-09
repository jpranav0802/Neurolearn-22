import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export interface CustomError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

/**
 * Global error handler middleware for the auth service
 * Handles both operational and programming errors with appropriate logging
 */
export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Default error status
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  // Log the error with context
  logger.error('Error in auth service', {
    error: {
      message: error.message,
      stack: error.stack,
      statusCode,
      isOperational: error.isOperational
    },
    request: {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      userId: req.session?.userId
    }
  });

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Prepare error response based on environment
  const errorResponse: any = {
    error: true,
    message: isDevelopment ? message : 'An error occurred',
    statusCode
  };

  // Add stack trace in development
  if (isDevelopment && error.stack) {
    errorResponse.stack = error.stack;
  }

  // Add request ID for tracking
  if (req.headers['x-request-id']) {
    errorResponse.requestId = req.headers['x-request-id'];
  }

  // Send error response
  res.status(statusCode).json(errorResponse);
};

/**
 * Async error wrapper to catch async function errors
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  const error: CustomError = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  error.isOperational = true;
  next(error);
};

/**
 * Create operational error
 */
export const createError = (message: string, statusCode: number = 500): CustomError => {
  const error: CustomError = new Error(message);
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
};
