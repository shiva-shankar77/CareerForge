/**
 * @file Resume.js
 * @description Candidate Resume model.
 * Stores structured multi-section resume data, template selection, isDefault flag,
 * and optional ATS parsed data and scoring.
 */

import mongoose from 'mongoose';

const resumeEducationSchema = new mongoose.Schema(
  {
    institution: { type: String, trim: true },
    college: { type: String, trim: true },
    degree: { type: String, required: true, trim: true },
    startYear: { type: Number },
    endYear: { type: Number },
    gpa: { type: Number }
  },
  { _id: true }
);

const resumeExperienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    startDate: { type: String, trim: true },
    endDate: { type: String, trim: true },
    isCurrent: { type: Boolean, default: false },
    description: { type: String, trim: true }
  },
  { _id: true }
);

const resumeProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    techStack: { type: [String], default: [] },
    repoUrl: { type: String, trim: true },
    liveUrl: { type: String, trim: true }
  },
  { _id: true }
);

const resumeCertificationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    issuingOrg: { type: String, trim: true },
    date: { type: String, trim: true }
  },
  { _id: true }
);

const personalInfoSchema = new mongoose.Schema(
  {
    fullName: { type: String, trim: true, default: '' },
    email: { type: String, trim: true, default: '' },
    phone: { type: String, trim: true, default: '' },
    headline: { type: String, trim: true, default: '' },
    summary: { type: String, trim: true, default: '' },
    location: { type: String, trim: true, default: '' },
    links: {
      github: { type: String, trim: true, default: '' },
      linkedin: { type: String, trim: true, default: '' },
      portfolio: { type: String, trim: true, default: '' }
    }
  },
  { _id: false }
);

const resumeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Student owner reference is required'],
      index: true
    },
    title: {
      type: String,
      default: 'My Resume',
      trim: true,
      required: [true, 'Resume title is required']
    },
    templateId: {
      type: String,
      default: 'modern',
      enum: ['modern', 'classic'],
      required: true
    },
    isDefault: {
      type: Boolean,
      default: false,
      index: true
    },
    personalInfo: {
      type: personalInfoSchema,
      default: () => ({})
    },
    education: {
      type: [resumeEducationSchema],
      default: []
    },
    experience: {
      type: [resumeExperienceSchema],
      default: []
    },
    skills: {
      type: [String],
      default: []
    },
    projects: {
      type: [resumeProjectSchema],
      default: []
    },
    certifications: {
      type: [resumeCertificationSchema],
      default: []
    },
    // Retained for document upload & ATS compatibility
    fileUrl: {
      type: String,
      default: ''
    },
    parsedData: {
      skills: { type: [String], default: [] },
      experienceYears: { type: Number, default: 0 },
      education: { type: [String], default: [] },
      summary: { type: String, default: '' },
      rawText: { type: String, default: '' }
    },
    atsScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    feedback: {
      strengths: { type: [String], default: [] },
      weaknesses: { type: [String], default: [] },
      suggestions: { type: [String], default: [] }
    }
  },
  {
    timestamps: true
  }
);

resumeSchema.index({ student: 1, createdAt: -1 });
resumeSchema.index({ student: 1, isDefault: 1 });

export const Resume = mongoose.model('Resume', resumeSchema);
