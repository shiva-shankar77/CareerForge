/**
 * @file job.routes.js
 * @module JobModule
 * @owner Member 2 (Jobs + Applications + Recruiter)
 * @description Routes for browsing, creating, filtering, updating, and deleting job postings.
 */

import { Router } from 'express';
import { body } from 'express-validator';
import { verifyToken, authorizeRoles } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';
import * as jobController from '../controllers/jobController.js';

const router = Router();

// Validation Rules for Creating a Job
const createJobValidation = [
  body('title').trim().notEmpty().withMessage('Job title is required'),
  body('description').trim().notEmpty().withMessage('Job description is required'),
  body('location').trim().notEmpty().withMessage('Job location is required'),
  body('jobType')
    .optional()
    .isIn(['Full-time', 'Part-time', 'Internship', 'Remote'])
    .withMessage('Job type must be Full-time, Part-time, Internship, or Remote'),
  body('vacancies')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Vacancies must be at least 1'),
  validateRequest
];

// Validation Rules for Updating a Job
const updateJobValidation = [
  body('title').optional().trim().notEmpty().withMessage('Job title cannot be empty'),
  body('jobType')
    .optional()
    .isIn(['Full-time', 'Part-time', 'Internship', 'Remote'])
    .withMessage('Invalid job type'),
  body('status')
    .optional()
    .isIn(['Draft', 'Active', 'Closed'])
    .withMessage('Status must be Draft, Active, or Closed'),
  validateRequest
];

// ==========================================
// PUBLIC & ALL AUTHENTICATED ROUTES
// ==========================================
// GET /api/jobs - Browse jobs with search and filter
router.get('/', jobController.getAllJobs);

// GET /api/jobs/recruiter/my-jobs - Recruiter's own jobs (must be declared BEFORE /:id to avoid collision)
router.get(
  '/recruiter/my-jobs',
  verifyToken,
  authorizeRoles('recruiter'),
  jobController.getMyJobs
);

// GET /api/jobs/:id - Single job details
router.get('/:id', jobController.getJobById);

// ==========================================
// RECRUITER & ADMIN PROTECTED ROUTES
// ==========================================
// POST /api/jobs - Post a new job
router.post(
  '/',
  verifyToken,
  authorizeRoles('recruiter'),
  createJobValidation,
  jobController.createJob
);

// PUT /api/jobs/:id - Update existing job
router.put(
  '/:id',
  verifyToken,
  authorizeRoles('recruiter'),
  updateJobValidation,
  jobController.updateJob
);

// DELETE /api/jobs/:id - Delete job (recruiter owner or admin)
router.delete(
  '/:id',
  verifyToken,
  authorizeRoles('recruiter', 'admin'),
  jobController.deleteJob
);

export default router;
