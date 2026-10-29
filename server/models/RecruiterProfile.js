/**
 * @file RecruiterProfile.js
 * @description Company profile schema for hiring partners and recruiters.
 * Tracks organization details, hiring designation, and admin verification status.
 */

import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true
    },
    website: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    logoUrl: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      maxlength: [2000, 'Company description cannot exceed 2000 characters']
    },
    industry: {
      type: String,
      default: 'Information Technology'
    }
  },
  { _id: false }
);

const recruiterProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true
    },
    company: {
      type: companySchema,
      required: true
    },
    designation: {
      type: String,
      default: 'Talent Acquisition Specialist'
    },
    isVerified: {
      type: Boolean,
      default: false // Admin approval required before posting public jobs
    }
  },
  {
    timestamps: true
  }
);

recruiterProfileSchema.index({ 'company.name': 1 });

export const RecruiterProfile = mongoose.model('RecruiterProfile', recruiterProfileSchema);
