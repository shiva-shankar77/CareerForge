/**
 * @file resume.routes.js
 * @module ResumeModule
 * @owner Member 1 (Student profile + Resume)
 * @description Routes for candidate resume CRUD, template routing, and default selection.
 */

import { Router } from 'express';
import { body, param } from 'express-validator';
import { verifyToken, authorizeRoles } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';
import {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume
} from '../controllers/resumeController.js';

const router = Router();

// Validation chains
const resumeValidation = [
  body('title')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Resume title must be between 1 and 100 characters'),
  body('templateId')
    .optional()
    .isIn(['modern', 'classic'])
    .withMessage('Template choice must be either modern or classic'),
  body('isDefault')
    .optional()
    .isBoolean()
    .withMessage('isDefault must be a boolean'),
  body('personalInfo')
    .optional()
    .isObject()
    .withMessage('personalInfo must be an object'),
  body('education')
    .optional()
    .isArray()
    .withMessage('education must be an array'),
  body('experience')
    .optional()
    .isArray()
    .withMessage('experience must be an array'),
  body('skills')
    .optional()
    .isArray()
    .withMessage('skills must be an array of strings'),
  body('projects')
    .optional()
    .isArray()
    .withMessage('projects must be an array'),
  body('certifications')
    .optional()
    .isArray()
    .withMessage('certifications must be an array')
];

const idValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid resume ID format')
];

// All routes require student authentication
router.use(verifyToken, authorizeRoles('student'));

/**
 * @route   POST /api/resumes
 * @desc    Create a new resume
 * @access  Private (Student only)
 */
router.post('/', resumeValidation, validateRequest, createResume);

/**
 * @route   GET /api/resumes
 * @desc    Get all resumes for authenticated student
 * @access  Private (Student only)
 */
router.get('/', getResumes);

/**
 * @route   GET /api/resumes/my-resumes
 * @desc    Alias to get all resumes for backward compatibility
 * @access  Private (Student only)
 */
router.get('/my-resumes', getResumes);

/**
 * @route   GET /api/resumes/:id
 * @desc    Get a single resume by ID
 * @access  Private (Student only)
 */
router.get('/:id', idValidation, validateRequest, getResumeById);

/**
 * @route   PUT /api/resumes/:id
 * @desc    Update a resume by ID
 * @access  Private (Student only)
 */
router.put('/:id', idValidation, resumeValidation, validateRequest, updateResume);

/**
 * @route   DELETE /api/resumes/:id
 * @desc    Delete a resume by ID
 * @access  Private (Student only)
 */
router.delete('/:id', idValidation, validateRequest, deleteResume);

export default router;
