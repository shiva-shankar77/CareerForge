/**
 * @file app.js
 * @description Express Application Factory.
 * Configures middleware stack (Helmet, CORS, Morgan, Rate Limiter),
 * mounts all module routers, and attaches centralized error handlers.
 */

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env.js';
import { globalLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import { ApiError } from './utils/ApiError.js';
import { apiResponse } from './utils/apiResponse.js';

// Route Imports
import authRoutes from './routes/auth.routes.js';
import studentRoutes from './routes/student.routes.js';
import resumeRoutes from './routes/resume.routes.js';
import recruiterRoutes from './routes/recruiter.routes.js';
import jobRoutes from './routes/job.routes.js';
import applicationRoutes from './routes/application.routes.js';
import aiRoutes from './routes/ai.routes.js';
import interviewRoutes from './routes/interview.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();

// Security HTTP Headers
app.use(helmet());

// Cross-Origin Resource Sharing
app.use(
  cors({
    origin: [env.CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// HTTP Request Logger
if (env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Global Rate Limiter
app.use('/api', globalLimiter);

// Health Check & Root Ping
app.get('/health', (req, res) => {
  res.status(200).json(
    apiResponse(true, 'CareerForge API Server is Healthy & Operational', {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: env.NODE_ENV
    })
  );
});

app.get('/api', (req, res) => {
  res.status(200).json(
    apiResponse(true, 'Welcome to CareerForge Placement Platform API', {
      version: '1.0.0',
      documentation: '/docs/API_CONTRACT.md'
    })
  );
});

// ==========================================
// MOUNT MODULE ROUTERS
// ==========================================
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/recruiters', recruiterRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);

// Catch-all 404 for undefined endpoints
app.use((req, res, next) => {
  next(new ApiError(404, `Cannot ${req.method} ${req.originalUrl} - Endpoint not found`));
});

// Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
