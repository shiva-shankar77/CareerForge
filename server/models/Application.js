/**
 * @file Application.js
 * @description Job application tracking schema.
 * Enforces strict single-application per candidate-job pair using a compound unique index.
 */

import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Student applicant reference is required'],
      index: true
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Job vacancy reference is required'],
      index: true
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume'
    },
    status: {
      type: String,
      enum: {
        values: ['Applied', 'Shortlisted', 'Rejected', 'Selected'],
        message: '{VALUE} is not a valid application status'
      },
      default: 'Applied',
      index: true
    },
    coverLetter: {
      type: String,
      maxlength: [2000, 'Cover letter cannot exceed 2000 characters']
    },
    recruiterNotes: {
      type: String,
      default: ''
    },
    appliedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

/**
 * Compound unique index: guarantees a student cannot apply more than once to the same job.
 * Crucial viva talking point on MongoDB data integrity!
 */
applicationSchema.index({ student: 1, job: 1 }, { unique: true });
applicationSchema.index({ job: 1, status: 1 });

export const Application = mongoose.model('Application', applicationSchema);
