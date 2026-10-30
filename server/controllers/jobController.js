/**
 * @file jobController.js
 * @module JobModule
 * @owner Member 2 (Jobs + Applications + Recruiter)
 * @description HTTP Controller handling job vacancy listings, creation, updates, and recruiter postings.
 */

import { asyncHandler } from '../utils/asyncHandler.js';
import { apiResponse } from '../utils/apiResponse.js';
import * as jobService from '../services/jobService.js';

/**
 * @route   GET /api/jobs
 * @desc    Browse & filter job vacancies (Public / Authenticated)
 * @access  Public
 */
export const getAllJobs = asyncHandler(async (req, res) => {
  const result = await jobService.getAllJobs(req.query);
  res.status(200).json(apiResponse(true, 'Job listings retrieved successfully.', result));
});

/**
 * @route   GET /api/jobs/:id
 * @desc    Get detailed specifications for a single job
 * @access  Public
 */
export const getJobById = asyncHandler(async (req, res) => {
  const job = await jobService.getJobById(req.params.id);
  res.status(200).json(apiResponse(true, 'Job details retrieved successfully.', { job }));
});

/**
 * @route   POST /api/jobs
 * @desc    Publish a new job vacancy
 * @access  Private (Recruiter only)
 */
export const createJob = asyncHandler(async (req, res) => {
  const newJob = await jobService.createJob(req.user._id, req.body);
  res.status(201).json(apiResponse(true, 'Job vacancy published successfully.', { job: newJob }));
});

/**
 * @route   PUT /api/jobs/:id
 * @desc    Update existing job vacancy attributes
 * @access  Private (Recruiter owner or Admin)
 */
export const updateJob = asyncHandler(async (req, res) => {
  const updatedJob = await jobService.updateJob(
    req.params.id,
    req.user._id,
    req.body,
    req.user.role
  );
  res.status(200).json(apiResponse(true, 'Job listing updated successfully.', { job: updatedJob }));
});

/**
 * @route   DELETE /api/jobs/:id
 * @desc    Remove / archive job vacancy and associated records
 * @access  Private (Recruiter owner or Admin)
 */
export const deleteJob = asyncHandler(async (req, res) => {
  const result = await jobService.deleteJob(req.params.id, req.user._id, req.user.role);
  res.status(200).json(apiResponse(true, 'Job listing deleted successfully.', result));
});

/**
 * @route   GET /api/jobs/recruiter/my-jobs
 * @desc    Get all jobs posted by the logged-in recruiter with live applicant metrics
 * @access  Private (Recruiter only)
 */
export const getMyJobs = asyncHandler(async (req, res) => {
  const jobs = await jobService.getRecruiterJobs(req.user._id);
  res.status(200).json(apiResponse(true, 'Recruiter jobs retrieved successfully.', { jobs }));
});
