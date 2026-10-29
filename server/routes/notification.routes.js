/**
 * @file notification.routes.js
 * @module NotificationModule
 * @owner Member 4 (Socket.io live interview + Notifications + Interview UI)
 * @description Routes for fetching in-app alerts and marking notifications as read.
 */

import { Router } from 'express';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

const notImplemented = (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Endpoint not implemented yet. Assigned to Member 4 (feature/realtime-notifications).'
  });
};

// GET /api/notifications
router.get('/', verifyToken, notImplemented);

// PATCH /api/notifications/:id/read
router.patch('/:id/read', verifyToken, notImplemented);

// PATCH /api/notifications/read-all
router.patch('/read-all', verifyToken, notImplemented);

export default router;
