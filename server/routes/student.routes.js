/**
 * @file student.routes.js
 * @module StudentProfileModule
 * @owner Member 1 (Student profile + Resume)
 * @description Routes for managing student details, education, skills, projects, certifications, and portfolio links.
 */

import { Router } from 'express';
import { body } from 'express-validator';
import { verifyToken, authorizeRoles } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';
import {
  getProfile,
  updateProfile,
  getProfileById
} from '../controllers/studentController.js';

const router = Router();

// Validation chain for updating student profile
const updateProfileValidation = [
  body('headline')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 150 })
    .withMessage('Headline cannot exceed 150 characters'),
  body('bio')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Bio cannot exceed 1000 characters'),
  body('phone')
    .optional()
    .isString()
    .trim(),
  body('skills')
    .optional()
    .isArray()
    .withMessage('Skills must be an array of strings'),
  body('education')
    .optional()
    .isArray()
    .withMessage('Education must be an array of education objects'),
  body('education.*.degree')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Degree name is required when specifying education'),
  body('projects')
    .optional()
    .isArray()
    .withMessage('Projects must be an array of project objects'),
  body('projects.*.title')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Project title is required when specifying a project'),
  body('certifications')
    .optional()
    .isArray()
    .withMessage('Certifications must be an array of certification objects'),
  body('links')
    .optional()
    .isObject()
    .withMessage('Links must be an object with github, linkedin, or portfolio fields')
];

/**
 * @route   GET /api/students/profile
 * @desc    Get current student's full profile & server-calculated completeness percentage
 * @access  Private (Student only)
 */
router.get('/profile', verifyToken, authorizeRoles('student'), getProfile);

/**
 * @route   PUT /api/students/profile
 * @desc    Update student profile sections
 * @access  Private (Student only)
 */
router.put(
  '/profile',
  verifyToken,
  authorizeRoles('student'),
  updateProfileValidation,
  validateRequest,
  updateProfile
);

/**
 * @route   GET /api/students/:id
 * @desc    View public student profile by ID
 * @access  Private (Authenticated users: Recruiter, Admin, etc.)
 */
router.get('/:id', verifyToken, getProfileById);

export default router;
