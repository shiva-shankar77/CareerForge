/**
 * @file studentController.js
 * @module StudentProfileModule
 * @owner Member 1 (Student profile + Resume)
 * @description Controller handling student profile retrieval, updates, and completeness score.
 */

import { asyncHandler } from '../utils/asyncHandler.js';
import { apiResponse } from '../utils/apiResponse.js';
import * as studentService from '../services/studentService.js';

/**
 * @route   GET /api/students/profile
 * @desc    Get currently authenticated student profile with completeness score
 * @access  Private (Student)
 */
export const getProfile = asyncHandler(async (req, res) => {
  const profile = await studentService.getStudentProfile(req.user._id);

  res.status(200).json(
    apiResponse(true, 'Student profile fetched successfully', profile)
  );
});

/**
 * @route   PUT /api/students/profile
 * @desc    Update authenticated student profile (education, skills, projects, certifications, links)
 * @access  Private (Student)
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const updatedProfile = await studentService.updateStudentProfile(req.user._id, req.body);

  res.status(200).json(
    apiResponse(true, 'Student profile updated successfully', updatedProfile)
  );
});

/**
 * @route   GET /api/students/:id
 * @desc    Get public student profile by student ID or user ID
 * @access  Private (Recruiter, Admin, Authenticated)
 */
export const getProfileById = asyncHandler(async (req, res) => {
  const profile = await studentService.getStudentProfileById(req.params.id);

  res.status(200).json(
    apiResponse(true, 'Student profile retrieved successfully', profile)
  );
});
