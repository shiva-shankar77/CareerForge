/**
 * @file ai.routes.js
 * @module AIModule
 * @owner Member 3 (AI service + Interview REST APIs)
 * @description Routes interfacing with the Google Gemini API for resume analysis and question generation.
 */

import { Router } from 'express';
import { verifyToken, authorizeRoles } from '../middleware/auth.js';

const router = Router();

const notImplemented = (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Endpoint not implemented yet. Assigned to Member 3 (feature/ai-interview).'
  });
};

// POST /api/ai/resume-feedback
router.post('/resume-feedback', verifyToken, authorizeRoles('student'), notImplemented);

// POST /api/ai/generate-questions
router.post('/generate-questions', verifyToken, authorizeRoles('student'), notImplemented);

// POST /api/ai/evaluate-answer
router.post('/evaluate-answer', verifyToken, authorizeRoles('student'), notImplemented);

export default router;
