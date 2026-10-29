/**
 * @file auth.js
 * @description JWT verification and Role-Based Access Control (RBAC) middleware.
 * Verifies bearer tokens and protects routes against unauthorized roles or blocked accounts.
 */

import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/User.js';

/**
 * Verify JWT Token from Authorization header (Bearer token).
 * Attaches authenticated user object to req.user.
 */
export const verifyToken = asyncHandler(async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    throw new ApiError(401, 'Authentication failed: No token provided in Authorization header.');
  }

  // Verify token signature
  const decoded = jwt.verify(token, env.JWT_SECRET);

  // Look up user to ensure they still exist in DB and are not blocked
  const user = await User.findById(decoded.id).select('-password');
  if (!user) {
    throw new ApiError(401, 'User associated with this token no longer exists.');
  }

  if (user.isBlocked) {
    throw new ApiError(403, 'Your account has been suspended by an administrator.');
  }

  // Attach sanitized user to request
  req.user = user;
  next();
});

/**
 * Authorize specific roles for route access (e.g. 'admin', 'recruiter', 'student').
 * @param  {...string} roles - Allowed roles
 */
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required before checking roles.'));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          403,
          `Access Forbidden: Role '${req.user.role}' is not authorized to access this resource.`
        )
      );
    }

    next();
  };
};
