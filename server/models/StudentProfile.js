/**
 * @file StudentProfile.js
 * @description Profile schema for candidate students.
 * Contains educational background, verified skills, projects, certifications, external links, and resume references.
 */

import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    institution: { type: String, trim: true },
    college: { type: String, trim: true },
    degree: { type: String, required: true, trim: true },
    startYear: { type: Number },
    endYear: { type: Number },
    passingYear: { type: Number },
    gpa: { type: Number },
    cgpa: { type: Number }
  },
  { _id: true }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    techStack: { type: [String], default: [] },
    repoUrl: { type: String, trim: true },
    liveUrl: { type: String, trim: true }
  },
  { _id: true }
);

const certificationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    issuingOrg: { type: String, trim: true },
    date: { type: String, trim: true },
    credentialUrl: { type: String, trim: true }
  },
  { _id: true }
);

const experienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    startDate: { type: Date },
    endDate: { type: Date },
    isCurrent: { type: Boolean, default: false },
    description: { type: String }
  },
  { _id: true }
);

const linksSchema = new mongoose.Schema(
  {
    github: { type: String, trim: true, default: '' },
    linkedin: { type: String, trim: true, default: '' },
    portfolio: { type: String, trim: true, default: '' }
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
      default: 'Student Developer',
      trim: true
    },
    bio: {
      type: String,
      maxlength: [1000, 'Bio cannot exceed 1000 characters'],
      default: ''
    },
    phone: {
      type: String,
      trim: true,
      default: ''
    },
    skills: {
      type: [String],
      default: []
    },
    education: {
      type: [educationSchema],
      default: []
    },
    projects: {
      type: [projectSchema],
      default: []
    },
    certifications: {
      type: [certificationSchema],
      default: []
    },
    experience: {
      type: [experienceSchema],
      default: []
    },
    links: {
      type: linksSchema,
      default: () => ({ github: '', linkedin: '', portfolio: '' })
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
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

studentProfileSchema.index({ skills: 1 });

/**
 * Server-side profile completeness calculation helper
 * Evaluates filled sections and calculates a percentage (0-100)
 */
export const calculateProfileCompleteness = (profile) => {
  if (!profile) return { percentage: 0, breakdown: {}, missingSections: [] };

  const breakdown = {
    personal: 0,
    education: 0,
    skills: 0,
    projects: 0,
    certifications: 0,
    links: 0
  };
  const missingSections = [];

  // 1. Personal Info (15%) - headline (5%), bio (5%), phone (5%)
  if (profile.headline && profile.headline.trim().length > 0) breakdown.personal += 5;
  if (profile.bio && profile.bio.trim().length > 0) breakdown.personal += 5;
  if (profile.phone && profile.phone.trim().length > 0) breakdown.personal += 5;
  if (breakdown.personal < 15) missingSections.push('Personal Details');

  // 2. Education (20%) - at least 1 valid entry with degree & institution/college
  const validEducation = (profile.education || []).filter(
    (e) => (e.institution || e.college) && e.degree
  );
  if (validEducation.length > 0) {
    breakdown.education = 20;
  } else {
    missingSections.push('Education');
  }

  // 3. Skills (20%) - 20% for 3+ skills, 10% for 1-2 skills
  const skillsCount = (profile.skills || []).filter((s) => s && s.trim().length > 0).length;
  if (skillsCount >= 3) {
    breakdown.skills = 20;
  } else if (skillsCount > 0) {
    breakdown.skills = 10;
  } else {
    missingSections.push('Skills');
  }

  // 4. Projects (20%) - 20% for at least 1 project with title and details
  const validProjects = (profile.projects || []).filter((p) => p.title && p.title.trim().length > 0);
  if (validProjects.length >= 1) {
    breakdown.projects = 20;
  } else {
    missingSections.push('Projects');
  }

  // 5. Certifications (10%) - at least 1 certification
  const validCerts = (profile.certifications || []).filter(
    (c) => c.name && c.name.trim().length > 0
  );
  if (validCerts.length > 0) {
    breakdown.certifications = 10;
  } else {
    missingSections.push('Certifications');
  }

  // 6. Links (15%) - at least 1 external portfolio / GitHub / LinkedIn link
  const github = profile.links?.github || profile.githubUrl;
  const linkedin = profile.links?.linkedin || profile.linkedinUrl;
  const portfolio = profile.links?.portfolio || profile.portfolioUrl;

  let linkPoints = 0;
  if (github && github.trim().length > 0) linkPoints += 5;
  if (linkedin && linkedin.trim().length > 0) linkPoints += 5;
  if (portfolio && portfolio.trim().length > 0) linkPoints += 5;
  breakdown.links = Math.min(15, linkPoints);

  if (breakdown.links === 0) {
    missingSections.push('Social & Portfolio Links');
  }

  const percentage = Math.min(
    100,
    breakdown.personal +
      breakdown.education +
      breakdown.skills +
      breakdown.projects +
      breakdown.certifications +
      breakdown.links
  );

  return {
    percentage,
    breakdown,
    missingSections
  };
};

// Add completeness virtual property
studentProfileSchema.virtual('completeness').get(function () {
  return calculateProfileCompleteness(this).percentage;
});

export const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);
