/**
 * @file jobService.js
 * @description Job vacancy business logic layer.
 * Handles job postings CRUD, multi-criteria filtering, search indexing,
 * salary range queries, and recruiter ownership enforcement.
 */

import { Job, Application, RecruiterProfile, User } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Browse and filter active job listings with pagination and full-text/regex search.
 * @param {Object} query - Express req.query parameters
 * @returns {Promise<Object>} Paged job list and pagination metadata
 */
export const getAllJobs = async (query = {}) => {
  const {
    search,
    skills,
    jobType,
    location,
    minSalary,
    maxSalary,
    status = 'Active',
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = query;

  const filter = {};

  // Default to Active jobs unless specifically requested otherwise
  if (status && status !== 'all') {
    filter.status = status;
  }

  // Keyword search across title, description, and company name
  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), 'i');
    filter.$or = [
      { title: searchRegex },
      { description: searchRegex },
      { 'company.name': searchRegex }
    ];
  }

  // Filter by Job Type (e.g., Full-time, Internship, Remote)
  if (jobType && jobType !== 'all') {
    filter.jobType = jobType;
  }

  // Location filter (case-insensitive substring match)
  if (location && location.trim()) {
    filter.location = new RegExp(location.trim(), 'i');
  }

  // Required skills filter (comma-separated or array)
  if (skills) {
    const skillList = Array.isArray(skills)
      ? skills
      : skills.split(',').map((s) => s.trim()).filter(Boolean);
    if (skillList.length > 0) {
      filter.skillsRequired = {
        $in: skillList.map((skill) => new RegExp(`^${skill}$`, 'i'))
      };
    }
  }

  // Salary range filters
  if (minSalary || maxSalary) {
    if (minSalary) {
      filter['salaryRange.max'] = { $gte: Number(minSalary) };
    }
    if (maxSalary) {
      filter['salaryRange.min'] = { $lte: Number(maxSalary) };
    }
  }

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 10));
  const skip = (pageNum - 1) * limitNum;

  const sortOptions = {};
  sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

  const [jobs, total] = await Promise.all([
    Job.find(filter)
      .populate('recruiter', 'name email')
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Job.countDocuments(filter)
  ]);

  return {
    jobs,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum) || 1
    }
  };
};

/**
 * Retrieve a single job posting by ID.
 * @param {string} jobId
 * @returns {Promise<Object>} Job document
 */
export const getJobById = async (jobId) => {
  const job = await Job.findById(jobId).populate('recruiter', 'name email');
  if (!job) {
    throw new ApiError(404, 'Job vacancy not found with the provided ID.');
  }
  return job;
};

/**
 * Create a new job vacancy posting as a recruiter.
 * Automatically resolves recruiter's company profile if not explicitly supplied.
 * @param {string} recruiterId - Mongo User ID
 * @param {Object} jobData - Job creation attributes
 * @returns {Promise<Object>} Created job document
 */
export const createJob = async (recruiterId, jobData) => {
  // Verify recruiter user exists
  const recruiter = await User.findById(recruiterId);
  if (!recruiter || recruiter.role !== 'recruiter') {
    throw new ApiError(403, 'Only verified recruiters are authorized to post jobs.');
  }

  // Attempt to fill company info from RecruiterProfile if missing in jobData
  let company = jobData.company;
  if (!company || !company.name) {
    const profile = await RecruiterProfile.findOne({ user: recruiterId });
    if (profile && profile.company && profile.company.name) {
      company = {
        name: profile.company.name,
        website: profile.company.website || '',
        logoUrl: profile.company.logoUrl || ''
      };
    } else {
      company = {
        name: `${recruiter.name}'s Organization`,
        website: '',
        logoUrl: ''
      };
    }
  }

  const newJob = await Job.create({
    ...jobData,
    company,
    recruiter: recruiterId
  });

  return newJob;
};

/**
 * Update an existing job vacancy.
 * Enforces ownership: only the posting recruiter (or an admin) can update.
 * @param {string} jobId - Mongo Job ID
 * @param {string} recruiterId - User ID attempting update
 * @param {Object} updateData - Updated fields
 * @param {string} userRole - 'recruiter' | 'admin'
 * @returns {Promise<Object>} Updated job document
 */
export const updateJob = async (jobId, recruiterId, updateData, userRole = 'recruiter') => {
  const job = await Job.findById(jobId);
  if (!job) {
    throw new ApiError(404, 'Job posting not found.');
  }

  // Recruiter ownership check (admins have global override)
  if (userRole !== 'admin' && job.recruiter.toString() !== recruiterId.toString()) {
    throw new ApiError(403, 'Permission denied: You can only modify your own job postings.');
  }

  // Protect recruiter reference from being maliciously transferred
  delete updateData.recruiter;
  delete updateData._id;

  Object.assign(job, updateData);
  await job.save();

  return job;
};

/**
 * Delete a job posting and clean up associated applications.
 * Enforces ownership check.
 * @param {string} jobId - Mongo Job ID
 * @param {string} recruiterId - User ID attempting deletion
 * @param {string} userRole - 'recruiter' | 'admin'
 * @returns {Promise<Object>} Deletion summary
 */
export const deleteJob = async (jobId, recruiterId, userRole = 'recruiter') => {
  const job = await Job.findById(jobId);
  if (!job) {
    throw new ApiError(404, 'Job posting not found.');
  }

  if (userRole !== 'admin' && job.recruiter.toString() !== recruiterId.toString()) {
    throw new ApiError(403, 'Permission denied: You can only delete your own job postings.');
  }

  // Delete associated applications to maintain referential integrity
  await Application.deleteMany({ job: jobId });
  await Job.findByIdAndDelete(jobId);

  return { deletedJobId: jobId, message: 'Job posting and associated applications removed.' };
};

/**
 * Get all job postings owned by a specific recruiter, including real-time applicant counts.
 * @param {string} recruiterId
 * @returns {Promise<Array>} List of recruiter's jobs with applicant count
 */
export const getRecruiterJobs = async (recruiterId) => {
  const jobs = await Job.find({ recruiter: recruiterId })
    .sort({ createdAt: -1 })
    .lean();

  if (!jobs.length) {
    return [];
  }

  // Efficiently aggregate application counts per job in a single DB query
  const jobIds = jobs.map((j) => j._id);
  const applicantCounts = await Application.aggregate([
    { $match: { job: { $in: jobIds } } },
    { $group: { _id: '$job', count: { $sum: 1 } } }
  ]);

  const countMap = {};
  applicantCounts.forEach((item) => {
    countMap[item._id.toString()] = item.count;
  });

  return jobs.map((job) => ({
    ...job,
    applicantCount: countMap[job._id.toString()] || 0
  }));
};
