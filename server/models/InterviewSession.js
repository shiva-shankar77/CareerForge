/**
 * @file InterviewSession.js
 * @description AI-Powered Technical Mock Interview Session model.
 * Records live question-answer transcripts, sub-scores, Gemini AI feedback, and final metrics.
 */

import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    questionId: { type: Number, required: true },
    questionText: { type: String, required: true },
    category: { type: String, default: 'General Technical' },
    difficulty: { type: String, default: 'Medium' },
    idealAnswerKeywords: { type: [String], default: [] }
  },
  { _id: false }
);

const answerSchema = new mongoose.Schema(
  {
    questionId: { type: Number, required: true },
    answerText: { type: String, default: '' },
    audioUrl: { type: String, default: '' },
    score: { type: Number, min: 0, max: 10, default: 0 },
    feedback: { type: String, default: '' },
    timeTakenSeconds: { type: Number, default: 0 },
    submittedAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const interviewSessionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Student reference is required'],
      index: true
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    },
    roleTarget: {
      type: String,
      default: 'Full Stack Developer',
      trim: true
    },
    skills: {
      type: [String],
      default: []
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium'
    },
    questions: {
      type: [questionSchema],
      default: []
    },
    answers: {
      type: [answerSchema],
      default: []
    },
    scores: {
      technical: { type: Number, default: 0, min: 0, max: 100 },
      communication: { type: Number, default: 0, min: 0, max: 100 },
      problemSolving: { type: Number, default: 0, min: 0, max: 100 }
    },
    feedback: {
      strengths: { type: [String], default: [] },
      areasToImprove: { type: [String], default: [] },
      detailedSummary: { type: String, default: '' }
    },
    overallScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    status: {
      type: String,
      enum: ['Scheduled', 'In-Progress', 'Completed', 'Cancelled'],
      default: 'Scheduled',
      index: true
    }
  },
  {
    timestamps: true
  }
);

interviewSessionSchema.index({ student: 1, createdAt: -1 });

export const InterviewSession = mongoose.model('InterviewSession', interviewSessionSchema);
