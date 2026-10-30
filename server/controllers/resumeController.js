/**
 * @file resumeController.js
 * @module ResumeModule
 * @owner Member 1 (Student profile + Resume)
 * @description HTTP Controller for Resume CRUD operations, template management, and default flagging.
 */

import { asyncHandler } from '../utils/asyncHandler.js';
import { apiResponse } from '../utils/apiResponse.js';
import * as resumeService from '../services/resumeService.js';

/**
 * @route   POST /api/resumes
 * @desc    Create a new structured resume for current student
 * @access  Private (Student)
 */
export const createResume = asyncHandler(async (req, res) => {
  const resume = await resumeService.createResume(req.user._id, req.body);

  res.status(201).json(
    apiResponse(true, 'Resume created successfully', resume)
  );
});

/**
 * @route   GET /api/resumes
 * @desc    Get all resumes for authenticated student
 * @access  Private (Student)
 */
export const getResumes = asyncHandler(async (req, res) => {
  const resumes = await resumeService.getStudentResumes(req.user._id);

  res.status(200).json(
    apiResponse(true, 'Resumes retrieved successfully', resumes)
  );
});

/**
 * @route   GET /api/resumes/:id
 * @desc    Get specific resume details by ID
 * @access  Private (Student)
 */
export const getResumeById = asyncHandler(async (req, res) => {
  const resume = await resumeService.getResumeById(req.params.id, req.user._id);

  res.status(200).json(
    apiResponse(true, 'Resume retrieved successfully', resume)
  );
});

/**
 * @route   PUT /api/resumes/:id
 * @desc    Update structured resume by ID
 * @access  Private (Student)
 */
export const updateResume = asyncHandler(async (req, res) => {
  const updatedResume = await resumeService.updateResume(
    req.params.id,
    req.user._id,
    req.body
  );

  res.status(200).json(
    apiResponse(true, 'Resume updated successfully', updatedResume)
  );
});

/**
 * @route   DELETE /api/resumes/:id
 * @desc    Delete a resume by ID
 * @access  Private (Student)
 */
export const deleteResume = asyncHandler(async (req, res) => {
  const result = await resumeService.deleteResume(req.params.id, req.user._id);

  res.status(200).json(
    apiResponse(true, result.message, null)
  );
});
