/**
 * @file student.routes.js
 * @module StudentProfileModule
 * @owner Member 1 (Student profile + Resume)
 * @description Routes for managing student details, education, skills, and portfolio.
 */

import { Router } from 'express';
import { verifyToken, authorizeRoles } from '../middleware/auth.js';

const router = Router();

// Placeholder handler for unimplemented routes
const notImplemented = (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Endpoint not implemented yet. Assigned to Member 1 (feature/student-resume).'
  });
};

// GET /api/students/profile
router.get('/profile', verifyToken, authorizeRoles('student'), notImplemented);

// PUT /api/students/profile
router.put('/profile', verifyToken, authorizeRoles('student'), notImplemented);

// GET /api/students/:id
router.get('/:id', verifyToken, notImplemented);

export default router;
