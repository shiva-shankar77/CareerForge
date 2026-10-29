/**
 * @file recruiter.routes.js
 * @module RecruiterModule
 * @owner Member 2 (Jobs + Applications + Recruiter)
 * @description Routes for company profile management and recruiter dashboard statistics.
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

// GET /api/recruiters/profile
router.get('/profile', verifyToken, authorizeRoles('recruiter'), notImplemented);

// PUT /api/recruiters/profile
router.put('/profile', verifyToken, authorizeRoles('recruiter'), notImplemented);

// GET /api/recruiters/stats
router.get('/stats', verifyToken, authorizeRoles('recruiter'), notImplemented);

export default router;
