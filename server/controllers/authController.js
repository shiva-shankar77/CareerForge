/**
 * @file authController.js
 * @description HTTP Controller handling authentication actions:
 * register, login, and fetching current session profile (/me).
 */

import { asyncHandler } from '../utils/asyncHandler.js';
import { apiResponse } from '../utils/apiResponse.js';
import * as authService from '../services/authService.js';

/**
 * @route   POST /api/auth/register
 * @desc    Register a new Student or Recruiter account
 * @access  Public
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role, companyName } = req.body;
  const result = await authService.registerUser({
    name,
    email,
    password,
    role,
    companyName
  });

  res.status(201).json(apiResponse(true, 'Registration successful. Welcome to CareerForge!', result));
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user credentials and receive JWT
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.loginUser({ email, password });

  res.status(200).json(apiResponse(true, 'Login successful.', result));
});

/**
 * @route   GET /api/auth/me
 * @desc    Get currently logged in user profile
 * @access  Private (Authenticated)
 */
export const getMe = asyncHandler(async (req, res) => {
  const userData = await authService.getMe(req.user._id, req.user.role);

  res.status(200).json(apiResponse(true, 'User profile fetched successfully.', { user: userData }));
});
