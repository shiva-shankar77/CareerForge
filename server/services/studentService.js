/**
 * @file studentService.js
 * @description Business logic layer for Student Profile module.
 * Handles fetching, updating, and normalizing student profiles with completeness calculation.
 */

import mongoose from 'mongoose';
import { StudentProfile, calculateProfileCompleteness } from '../models/StudentProfile.js';
import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Normalize education array to guarantee consistent fields across versions
 */
const normalizeEducation = (education = []) => {
  if (!Array.isArray(education)) return [];
  return education.map((edu) => {
    const institution = (edu.institution || edu.college || '').trim();
    const degree = (edu.degree || '').trim();
    const startYear = edu.startYear ? Number(edu.startYear) : undefined;
    const endYear = edu.endYear ? Number(edu.endYear) : (edu.passingYear ? Number(edu.passingYear) : undefined);
    const gpa = edu.gpa !== undefined && edu.gpa !== '' ? Number(edu.gpa) : (edu.cgpa !== undefined && edu.cgpa !== '' ? Number(edu.cgpa) : undefined);

    return {
      ...(edu._id ? { _id: edu._id } : {}),
      institution,
      college: institution,
      degree,
      startYear,
      endYear,
      passingYear: endYear,
      gpa,
      cgpa: gpa
    };
  });
};

/**
 * Normalize projects array
 */
const normalizeProjects = (projects = []) => {
  if (!Array.isArray(projects)) return [];
  return projects.map((proj) => {
    let techStack = proj.techStack || [];
    if (typeof techStack === 'string') {
      techStack = techStack
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    }

    return {
      ...(proj._id ? { _id: proj._id } : {}),
      title: (proj.title || '').trim(),
      description: (proj.description || '').trim(),
      techStack: Array.isArray(techStack) ? techStack : [],
      repoUrl: (proj.repoUrl || '').trim(),
      liveUrl: (proj.liveUrl || '').trim()
    };
  });
};

/**
 * Normalize certifications array
 */
const normalizeCertifications = (certifications = []) => {
  if (!Array.isArray(certifications)) return [];
  return certifications.map((cert) => ({
    ...(cert._id ? { _id: cert._id } : {}),
    name: (cert.name || '').trim(),
    issuingOrg: (cert.issuingOrg || '').trim(),
    date: (cert.date || '').trim(),
    credentialUrl: (cert.credentialUrl || '').trim()
  }));
};

/**
 * Normalize skills array
 */
const normalizeSkills = (skills = []) => {
  if (!Array.isArray(skills)) {
    if (typeof skills === 'string') {
      return skills.split(',').map((s) => s.trim()).filter(Boolean);
    }
    return [];
  }
  return skills.map((s) => (typeof s === 'string' ? s.trim() : '')).filter(Boolean);
};

/**
 * Fetch profile for the authenticated student
 */
export const getStudentProfile = async (userId) => {
  let profile = await StudentProfile.findOne({ user: userId }).populate(
    'user',
    'name email role isVerified'
  );

  // Auto-initialize if profile is missing
  if (!profile) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'User account not found.');
    }

    profile = await StudentProfile.create({
      user: userId,
      headline: 'Student Developer',
      bio: '',
      skills: [],
      education: [],
      projects: [],
      certifications: [],
      links: { github: '', linkedin: '', portfolio: '' }
    });

    profile = await profile.populate('user', 'name email role isVerified');
  }

  const completeness = calculateProfileCompleteness(profile);

  const profileObj = profile.toObject();
  profileObj.completeness = completeness.percentage;
  profileObj.completenessBreakdown = completeness.breakdown;
  profileObj.missingSections = completeness.missingSections;

  return profileObj;
};

/**
 * Update profile for the authenticated student
 */
export const updateStudentProfile = async (userId, data) => {
  let profile = await StudentProfile.findOne({ user: userId });

  if (!profile) {
    profile = new StudentProfile({ user: userId });
  }

  if (data.headline !== undefined) profile.headline = data.headline.trim();
  if (data.bio !== undefined) profile.bio = data.bio.trim();
  if (data.phone !== undefined) profile.phone = data.phone.trim();

  if (data.education !== undefined) {
    profile.education = normalizeEducation(data.education);
  }

  if (data.skills !== undefined) {
    profile.skills = normalizeSkills(data.skills);
  }

  if (data.projects !== undefined) {
    profile.projects = normalizeProjects(data.projects);
  }

  if (data.certifications !== undefined) {
    profile.certifications = normalizeCertifications(data.certifications);
  }

  // Handle links object and flat legacy fields
  const links = data.links || {};
  const github = links.github !== undefined ? links.github.trim() : (data.githubUrl !== undefined ? data.githubUrl.trim() : profile.links?.github || '');
  const linkedin = links.linkedin !== undefined ? links.linkedin.trim() : (data.linkedinUrl !== undefined ? data.linkedinUrl.trim() : profile.links?.linkedin || '');
  const portfolio = links.portfolio !== undefined ? links.portfolio.trim() : (data.portfolioUrl !== undefined ? data.portfolioUrl.trim() : profile.links?.portfolio || '');

  profile.links = { github, linkedin, portfolio };
  profile.githubUrl = github;
  profile.linkedinUrl = linkedin;
  profile.portfolioUrl = portfolio;

  await profile.save();

  profile = await StudentProfile.findById(profile._id).populate(
    'user',
    'name email role isVerified'
  );

  const completeness = calculateProfileCompleteness(profile);

  const profileObj = profile.toObject();
  profileObj.completeness = completeness.percentage;
  profileObj.completenessBreakdown = completeness.breakdown;
  profileObj.missingSections = completeness.missingSections;

  return profileObj;
};

/**
 * Public profile viewer (for recruiters and admins)
 */
export const getStudentProfileById = async (id) => {
  let profile;
  if (mongoose.Types.ObjectId.isValid(id)) {
    profile = await StudentProfile.findOne({
      $or: [{ _id: id }, { user: id }]
    }).populate('user', 'name email role isVerified');
  }

  if (!profile) {
    throw new ApiError(404, 'Student profile not found.');
  }

  const completeness = calculateProfileCompleteness(profile);
  const profileObj = profile.toObject();
  profileObj.completeness = completeness.percentage;
  profileObj.completenessBreakdown = completeness.breakdown;

  return profileObj;
};
