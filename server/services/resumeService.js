/**
 * @file resumeService.js
 * @description Business logic layer for Candidate Resume management.
 * Handles CRUD operations, single default resume enforcement, template routing, and profile linkage.
 */

import { Resume } from '../models/Resume.js';
import { StudentProfile } from '../models/StudentProfile.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Create a new resume document for a student
 */
export const createResume = async (studentId, data) => {
  const existingCount = await Resume.countDocuments({ student: studentId });

  // If this is student's first resume or explicitly marked default, make it default
  const shouldBeDefault = existingCount === 0 || Boolean(data.isDefault);

  if (shouldBeDefault) {
    // Unset default on any other existing resumes
    await Resume.updateMany({ student: studentId }, { $set: { isDefault: false } });
  }

  const resume = await Resume.create({
    student: studentId,
    title: data.title || 'My Resume',
    templateId: data.templateId || 'modern',
    isDefault: shouldBeDefault,
    personalInfo: data.personalInfo || {},
    education: data.education || [],
    experience: data.experience || [],
    skills: data.skills || [],
    projects: data.projects || [],
    certifications: data.certifications || [],
    fileUrl: data.fileUrl || ''
  });

  // Keep StudentProfile resumeRef in sync if this is the default resume
  if (shouldBeDefault) {
    await StudentProfile.findOneAndUpdate(
      { user: studentId },
      { $set: { resumeRef: resume._id } }
    );
  }

  return resume;
};

/**
 * Retrieve all resumes for a student
 */
export const getStudentResumes = async (studentId) => {
  return Resume.find({ student: studentId }).sort({ isDefault: -1, updatedAt: -1 });
};

/**
 * Retrieve single resume by ID belonging to student
 */
export const getResumeById = async (resumeId, studentId) => {
  const resume = await Resume.findOne({ _id: resumeId, student: studentId });
  if (!resume) {
    throw new ApiError(404, 'Resume not found or does not belong to you.');
  }
  return resume;
};

/**
 * Update an existing resume
 */
export const updateResume = async (resumeId, studentId, data) => {
  const resume = await Resume.findOne({ _id: resumeId, student: studentId });
  if (!resume) {
    throw new ApiError(404, 'Resume not found or does not belong to you.');
  }

  if (data.isDefault === true) {
    // Unset default on all other resumes for this student
    await Resume.updateMany(
      { student: studentId, _id: { $ne: resumeId } },
      { $set: { isDefault: false } }
    );
    resume.isDefault = true;

    // Update StudentProfile resumeRef
    await StudentProfile.findOneAndUpdate(
      { user: studentId },
      { $set: { resumeRef: resume._id } }
    );
  } else if (data.isDefault === false) {
    // If unsetting default, only allow if there is at least one other resume to take default
    const otherResumes = await Resume.find({ student: studentId, _id: { $ne: resumeId } });
    if (otherResumes.length > 0) {
      resume.isDefault = false;
      // Mark the latest other resume as default
      const latestOther = otherResumes.sort((a, b) => b.updatedAt - a.updatedAt)[0];
      latestOther.isDefault = true;
      await latestOther.save();
      await StudentProfile.findOneAndUpdate(
        { user: studentId },
        { $set: { resumeRef: latestOther._id } }
      );
    } else {
      // Must have at least one default resume if only one exists
      resume.isDefault = true;
    }
  }

  if (data.title !== undefined) resume.title = data.title.trim();
  if (data.templateId !== undefined) resume.templateId = data.templateId;
  if (data.personalInfo !== undefined) resume.personalInfo = data.personalInfo;
  if (data.education !== undefined) resume.education = data.education;
  if (data.experience !== undefined) resume.experience = data.experience;
  if (data.skills !== undefined) resume.skills = data.skills;
  if (data.projects !== undefined) resume.projects = data.projects;
  if (data.certifications !== undefined) resume.certifications = data.certifications;
  if (data.fileUrl !== undefined) resume.fileUrl = data.fileUrl;

  await resume.save();
  return resume;
};

/**
 * Delete a resume by ID
 */
export const deleteResume = async (resumeId, studentId) => {
  const resume = await Resume.findOne({ _id: resumeId, student: studentId });
  if (!resume) {
    throw new ApiError(404, 'Resume not found or does not belong to you.');
  }

  const wasDefault = resume.isDefault;
  await Resume.findByIdAndDelete(resumeId);

  // If deleted resume was default, assign default to the latest remaining resume
  if (wasDefault) {
    const remaining = await Resume.find({ student: studentId }).sort({ updatedAt: -1 });
    if (remaining.length > 0) {
      remaining[0].isDefault = true;
      await remaining[0].save();
      await StudentProfile.findOneAndUpdate(
        { user: studentId },
        { $set: { resumeRef: remaining[0]._id } }
      );
    } else {
      await StudentProfile.findOneAndUpdate(
        { user: studentId },
        { $unset: { resumeRef: 1 } }
      );
    }
  }

  return { message: 'Resume deleted successfully' };
};
