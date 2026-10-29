/**
 * @file application.routes.js
 * @module ApplicationModule
 * @owner Member 2 (Jobs + Applications + Recruiter)
 * @description Routes for student job applications and recruiter candidate management.
 */

import { Router } from 'express';
import { verifyToken, authorizeRoles } from '../middleware/auth.js';

const router = Router();

const notImplemented = (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Endpoint not implemented yet. Assigned to Member 2 (feature/jobs-applications).'
  });
};

// Student: Apply to a job
router.post('/', verifyToken, authorizeRoles('student'), notImplemented);

// Student: View own applications
router.get('/my-applications', verifyToken, authorizeRoles('student'), notImplemented);

// Recruiter: View applicants for a job
router.get('/job/:jobId', verifyToken, authorizeRoles('recruiter'), notImplemented);

// Recruiter: Update applicant status
router.patch('/:id/status', verifyToken, authorizeRoles('recruiter'), notImplemented);

export default router;
