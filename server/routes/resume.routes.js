/**
 * @file resume.routes.js
 * @module ResumeModule
 * @owner Member 1 (Student profile + Resume)
 * @description Routes for resume uploads, PDF parsing, and ATS score checks.
 */

import { Router } from 'express';
import { verifyToken, authorizeRoles } from '../middleware/auth.js';

const router = Router();

const notImplemented = (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Endpoint not implemented yet. Assigned to Member 1 (feature/student-resume).'
  });
};

// POST /api/resumes/upload
router.post('/upload', verifyToken, authorizeRoles('student'), notImplemented);

// GET /api/resumes/my-resumes
router.get('/my-resumes', verifyToken, authorizeRoles('student'), notImplemented);

// POST /api/resumes/parse-ats
router.post('/parse-ats', verifyToken, authorizeRoles('student'), notImplemented);

// DELETE /api/resumes/:id
router.delete('/:id', verifyToken, authorizeRoles('student'), notImplemented);

export default router;
