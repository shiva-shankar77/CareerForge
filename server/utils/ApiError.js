/**
 * @file ApiError.js
 * @description Custom operational error class for consistent API error responses.
 * Simplifies throwing HTTP errors from anywhere in controllers/services.
 * 
 * Example:
 *   throw new ApiError(404, "Student profile not found");
 *   throw new ApiError(403, "You do not have permission to view applicants");
 */

export class ApiError extends Error {
  /**
   * @param {number} statusCode - HTTP status code (e.g. 400, 401, 403, 404, 500)
   * @param {string} message - Human readable error message
   * @param {Array} errors - Optional array of granular field validation errors
   * @param {string} stack - Optional stack trace override
   */
  constructor(statusCode, message = 'Something went wrong', errors = [], stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
