/**
 * @file admin.routes.js
 * @module AdminModule
 * @owner Member 5 (Admin + Analytics + Deployment)
 * @description Routes for platform administrator operations: user moderation, recruiter verification, and KPIs.
 */

import { Router } from 'express';
import { verifyToken, authorizeRoles } from '../middleware/auth.js';

const router = Router();

const notImplemented = (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Endpoint not implemented yet. Assigned to Member 5 (feature/admin-deploy).'
  });
};

// All admin routes require verifyToken + authorizeRoles('admin')
router.use(verifyToken, authorizeRoles('admin'));

// GET /api/admin/dashboard-stats
router.get('/dashboard-stats', notImplemented);

// GET /api/admin/users
router.get('/users', notImplemented);

// PATCH /api/admin/users/:id/block
router.patch('/users/:id/block', notImplemented);

// GET /api/admin/recruiters/pending
router.get('/recruiters/pending', notImplemented);

// PATCH /api/admin/recruiters/:id/verify
router.patch('/recruiters/:id/verify', notImplemented);

export default router;
