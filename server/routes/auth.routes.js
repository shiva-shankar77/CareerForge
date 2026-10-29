/**
 * @file auth.routes.js
 * @description Authentication route definitions and input validation rules.
 */

import { Router } from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Validation rules for registration
const registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .optional()
    .isIn(['student', 'recruiter'])
    .withMessage("Role must be either 'student' or 'recruiter'")
];

// Validation rules for login
const loginValidation = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

/**
 * @route   POST /api/auth/register
 * @desc    Register a new student or recruiter account
 */
router.post('/register', authLimiter, registerValidation, validateRequest, authController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate credentials and issue JWT
 */
router.post('/login', authLimiter, loginValidation, validateRequest, authController.login);

/**
 * @route   GET /api/auth/me
 * @desc    Fetch authenticated user session profile
 */
router.get('/me', verifyToken, authController.getMe);

export default router;
