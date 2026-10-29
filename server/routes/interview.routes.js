/**
 * @file interview.routes.js
 * @module InterviewModule
 * @owner Member 3 (AI service + Interview REST APIs) & Member 4 (Realtime)
 * @description Routes for creating, retrieving, and concluding mock interview sessions.
 */

import { Router } from 'express';
import { verifyToken, authorizeRoles } from '../middleware/auth.js';

const router = Router();

const notImplemented = (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Endpoint not implemented yet. Assigned to Member 3 & 4 (feature/ai-interview).'
  });
};

// POST /api/interviews/create
router.post('/create', verifyToken, authorizeRoles('student'), notImplemented);

// GET /api/interviews/history
router.get('/history', verifyToken, authorizeRoles('student'), notImplemented);

// GET /api/interviews/:sessionId
router.get('/:sessionId', verifyToken, notImplemented);

// POST /api/interviews/:sessionId/submit
router.post('/:sessionId/submit', verifyToken, authorizeRoles('student'), notImplemented);

export default router;
