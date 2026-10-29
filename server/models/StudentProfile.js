/**
 * @file StudentProfile.js
 * @description Profile schema for candidate students.
 * Contains educational background, verified skills, portfolio links, and resume references.
 */

import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    college: { type: String, required: true },
    cgpa: { type: Number, min: 0, max: 10 },
    passingYear: { type: Number }
  },
  { _id: false }
);

const experienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    isCurrent: { type: Boolean, default: false },
    description: { type: String }
  },
  { _id: false }
);

const studentProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true
    },
    headline: {
      type: String,
      default: 'Student Developer'
    },
    bio: {
      type: String,
      maxlength: [1000, 'Bio cannot exceed 1000 characters']
    },
    phone: {
      type: String,
      trim: true
    },
    skills: {
      type: [String],
      default: []
    },
    education: {
      type: [educationSchema],
      default: []
    },
    experience: {
      type: [experienceSchema],
      default: []
    },
    githubUrl: {
      type: String,
      trim: true
    },
    linkedinUrl: {
      type: String,
      trim: true
    },
    portfolioUrl: {
      type: String,
      trim: true
    },
    resumeRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume'
    }
  },
  {
    timestamps: true
  }
);

studentProfileSchema.index({ skills: 1 });

export const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);
