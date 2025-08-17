import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import dotenv from 'dotenv';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { auditLogger } from './middleware/auditLogger';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import { authenticateToken } from './middleware/auth';

// Load environment variables
dotenv.config();

const app = express();
// Use 4001 by default to avoid clashing with CRA dev server on 3000
const PORT = process.env.PORT || 4001;

// Session storage: Redis (preferred) with fallback to in-memory for dev
let sessionStore: any;
let redisClient: any;
const useMemory = process.env.USE_IN_MEMORY_SESSION === 'true';
if (!useMemory) {
  try {
    redisClient = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
    redisClient.connect().catch((err: any) => {
      logger.warn('Redis connect error, falling back to in-memory session store', { error: err?.message });
    });
    sessionStore = new RedisStore({ client: redisClient });
  } catch (err) {
    logger.warn('Redis not available, using in-memory session store for development');
  }
}

// Session configuration with COPPA compliance
const sessionConfig = {
  store: sessionStore || new (session as any).MemoryStore(),
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  name: 'neurolearn.sid', // Custom session name
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true, // Prevent XSS
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    sameSite: 'strict' as const // CSRF protection
  }
};

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    }
  },
  crossOriginEmbedderPolicy: false // Allow embedding for educational content
}));

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:3100', 'http://localhost:3200'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Rate limiting with role-based limits
const createRateLimiter = (windowMs: number, max: number) => rateLimit({
  windowMs,
  max,
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: Math.ceil(windowMs / 1000)
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn('Rate limit exceeded', {
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
    res.status(429).json({
      error: 'Too many requests from this IP, please try again later.',
      retryAfter: Math.ceil(windowMs / 1000)
    });
  }
});

// Apply rate limiting
app.use('/api/auth', createRateLimiter(15 * 60 * 1000, 5)); // 5 requests per 15 minutes for auth
app.use('/api', createRateLimiter(15 * 60 * 1000, 100)); // 100 requests per 15 minutes for other APIs

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Session middleware
app.use(session(sessionConfig));

// Audit logging middleware
app.use(auditLogger);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'auth-service',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticateToken, userRoutes);

// API documentation endpoint
app.get('/api/docs', (req, res) => {
  res.json({
    service: 'NeuroLearn Authentication Service',
    version: '1.0.0',
    description: 'Multi-role authentication service with COPPA/FERPA compliance',
    endpoints: {
      'POST /api/auth/register': 'Register new user with parental consent handling',
      'POST /api/auth/login': 'Authenticate user with MFA support',
      'POST /api/auth/logout': 'End user session',
      'POST /api/auth/refresh': 'Refresh JWT token',
      'POST /api/auth/verify-email': 'Verify email address',
      'POST /api/auth/forgot-password': 'Request password reset',
      'POST /api/auth/reset-password': 'Reset password with token',
      'GET /api/users/profile': 'Get current user profile',
      'PUT /api/users/profile': 'Update user profile',
      'DELETE /api/users/account': 'Delete user account with COPPA compliance'
    },
    compliance: {
      coppa: 'Children under 13 require verifiable parental consent',
      ferpa: 'Educational records protected with role-based access',
      encryption: 'All PII encrypted at rest and in transit'
    }
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `The requested endpoint ${req.originalUrl} was not found.`
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  await redisClient.disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully');
  await redisClient.disconnect();
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 NeuroLearn Auth Service running on port ${PORT}`, {
    environment: process.env.NODE_ENV,
    service: 'auth-service',
    version: '1.0.0'
  });
});

export default app;
