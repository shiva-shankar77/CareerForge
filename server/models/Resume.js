/**
 * @file Resume.js
 * @description Candidate Resume model.
 * Stores resume document locations, extracted skills, parsed ATS data, and Gemini-based scoring.
 */

import mongoose from 'mongoose';

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
      trim: true
    },
    fileUrl: {
      type: String,
      required: [true, 'Resume file URL or path is required']
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
resumeSchema.index({ atsScore: -1 });

export const Resume = mongoose.model('Resume', resumeSchema);
