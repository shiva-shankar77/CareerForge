/**
 * @file rateLimiter.js
 * @description API Rate Limiting middleware using express-rate-limit.
 * Guards against brute-force password cracking, credential stuffing, and DoS attacks.
 */

import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

/**
 * Global rate limiter across all /api routes
 */
export const globalLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  message: {
    success: false,
    message: 'Too many requests originating from this IP address. Please try again after 15 minutes.'
  }
});

/**
 * Strict rate limiter for Authentication routes (/api/auth) to prevent brute-force
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // 30 requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts from this IP. Please wait 15 minutes before trying again.'
  }
});
