/**
 * @file authService.js
 * @description Authentication business logic layer.
 * Manages user registration, credential verification, JWT generation, and profile initialization.
 */

import jwt from 'jsonwebtoken';
import { User, StudentProfile, RecruiterProfile } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import { env } from '../config/env.js';

/**
 * Generate signed JWT token
 * @param {string} userId - User Mongo ID
 * @param {string} role - User role
 * @returns {string} Signed JWT
 */
export const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN
  });
};

/**
 * Register a new user (Student or Recruiter)
 * Admin registration is blocked by policy.
 */
export const registerUser = async ({ name, email, password, role = 'student', companyName = '' }) => {
  // Guard against self-registering as admin
  if (role === 'admin') {
    throw new ApiError(403, 'Self-registration as Administrator is forbidden.');
  }

  // Ensure role is valid
  if (!['student', 'recruiter'].includes(role)) {
    throw new ApiError(400, 'Invalid registration role. Must be student or recruiter.');
  }

  // Check if email already registered
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new ApiError(409, 'An account with this email address already exists.');
  }

  // Set default verification status:
  // Students are verified immediately; Recruiters require admin approval before posting jobs
  const isVerified = role === 'student';

  // Create User document (password will be automatically hashed by pre-save hook)
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    role,
    isVerified,
    isBlocked: false
  });

  // Automatically initialize role-specific profile document
  if (role === 'student') {
    await StudentProfile.create({
      user: user._id,
      headline: 'Passionate Student Developer',
      bio: '',
      skills: [],
      education: []
    });
  } else if (role === 'recruiter') {
    await RecruiterProfile.create({
      user: user._id,
      company: {
        name: companyName || `${name}'s Organization`,
        industry: 'Information Technology'
      },
      isVerified: false
    });
  }

  // Generate JWT token
  const token = generateToken(user._id, user.role);

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified
    },
    token
  };
};

/**
 * Authenticate existing user with email and password
 */
export const loginUser = async ({ email, password }) => {
  // Query user including password field (since password has select: false by default)
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user) {
    throw new ApiError(401, 'Invalid email or password.');
  }

  // Check if account has been blocked by administrator
  if (user.isBlocked) {
    throw new ApiError(403, 'Your account has been suspended by an administrator.');
  }

  // Compare provided plain password with stored bcrypt hash
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password.');
  }

  // Generate JWT token
  const token = generateToken(user._id, user.role);

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified
    },
    token
  };
};

/**
 * Get current user profile details along with linked profile document
 */
export const getMe = async (userId, role) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new ApiError(404, 'User profile not found.');
  }

  let profile = null;
  if (role === 'student') {
    profile = await StudentProfile.findOne({ user: userId });
  } else if (role === 'recruiter') {
    profile = await RecruiterProfile.findOne({ user: userId });
  }

  return {
    ...user.toObject(),
    profile
  };
};
