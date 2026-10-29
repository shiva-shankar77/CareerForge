/**
 * @file validate.js
 * @description Request validation handler for express-validator rule chains.
 * Catches schema/field validation errors and formats them into a unified 400 Bad Request error.
 */

import { validationResult } from 'express-validator';
import { ApiError } from '../utils/ApiError.js';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg,
      value: err.value
    }));

    return next(new ApiError(400, 'Invalid request input parameters', formattedErrors));
  }
  next();
};
