/**
 * @file asyncHandler.js
 * @description Higher-order function to wrap asynchronous Express route handlers.
 * Eliminates repetitive try/catch blocks across controllers by catching rejections
 * and passing them to next(error) for centralized processing in errorHandler.js.
 * 
 * Example:
 *   export const getJobs = asyncHandler(async (req, res) => {
 *     const jobs = await Job.find();
 *     res.json(apiResponse(true, "Fetched jobs", jobs));
 *   });
 */

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
