/**
 * @file apiResponse.js
 * @description Standard response formatter to maintain a uniform API shape.
 * Always returns { success: boolean, message: string, data: any }.
 * 
 * Example:
 *   res.status(200).json(apiResponse(true, "Job created successfully", newJob));
 */

export const apiResponse = (success = true, message = 'Success', data = null) => {
  return {
    success,
    message,
    data
  };
};
