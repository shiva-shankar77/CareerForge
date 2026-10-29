/**
 * @file env.js
 * @description Centralized environment configuration and validation module.
 * Ensures all required environment variables are verified before the application boots.
 */

import dotenv from 'dotenv';
dotenv.config();

// Ensure critical variables have fallbacks or throw helpful warnings in dev
export const env = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/careerforge',
  JWT_SECRET: process.env.JWT_SECRET || 'careerforge_super_secure_jwt_secret_key_2026_dev_only',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  RATE_LIMIT_WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 mins
  RATE_LIMIT_MAX: Number(process.env.RATE_LIMIT_MAX) || 500,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || ''
};

// Validate critical secrets in production environment
if (env.NODE_ENV === 'production') {
  const critical = ['MONGO_URI', 'JWT_SECRET'];
  for (const key of critical) {
    if (!process.env[key]) {
      throw new Error(`CRITICAL CONFIG ERROR: Missing ${key} in production environment!`);
    }
  }
}
