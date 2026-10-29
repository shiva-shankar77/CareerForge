/**
 * @file Job.js
 * @description Job vacancy posting schema managed by recruiters.
 * Contains role qualifications, salary bands, location flags, and skills indexing.
 */

import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Job description is required']
    },
    company: {
      name: { type: String, required: true, trim: true },
      website: { type: String, trim: true },
      logoUrl: { type: String, default: '' }
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Recruiter reference is required'],
      index: true
    },
    location: {
      type: String,
      required: [true, 'Job location is required'],
      trim: true
    },
    jobType: {
      type: String,
      enum: {
        values: ['Full-time', 'Part-time', 'Internship', 'Remote'],
        message: '{VALUE} is not a valid job type'
      },
      default: 'Full-time'
    },
    salaryRange: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
      currency: { type: String, default: 'INR' }
    },
    requirements: {
      type: [String],
      default: []
    },
    skillsRequired: {
      type: [String],
      default: []
    },
    experienceLevel: {
      type: String,
      default: 'Fresher / 0-1 years'
    },
    vacancies: {
      type: Number,
      default: 1,
      min: 1
    },
    deadline: {
      type: Date
    },
    status: {
      type: String,
      enum: ['Draft', 'Active', 'Closed'],
      default: 'Active',
      index: true
    }
  },
  {
    timestamps: true
  }
);

jobSchema.index({ skillsRequired: 1 });
jobSchema.index({ status: 1, createdAt: -1 });

export const Job = mongoose.model('Job', jobSchema);
