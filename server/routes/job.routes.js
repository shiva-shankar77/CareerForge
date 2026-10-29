/**
 * @file job.routes.js
 * @module JobModule
 * @owner Member 2 (Jobs + Applications + Recruiter)
 * @description Routes for browsing, creating, filtering, and deleting job postings.
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

// Public: Browse jobs
router.get('/', notImplemented);
router.get('/:id', notImplemented);

// Recruiter: Post & manage jobs
router.post('/', verifyToken, authorizeRoles('recruiter'), notImplemented);
router.put('/:id', verifyToken, authorizeRoles('recruiter'), notImplemented);
router.delete('/:id', verifyToken, authorizeRoles('recruiter', 'admin'), notImplemented);
router.get('/recruiter/my-jobs', verifyToken, authorizeRoles('recruiter'), notImplemented);

export default router;
