/**
 * @file studentService.js
 * @description Frontend API service for student profile management.
 */

import api from './api';

export const studentService = {
  /**
   * Fetch authenticated student's profile & completeness stats
   */
  getProfile: async () => {
    const response = await api.get('/students/profile');
    return response.data;
  },

  /**
   * Update student profile (education, skills, projects, certifications, links)
   */
  updateProfile: async (data) => {
    const response = await api.put('/students/profile', data);
    return response.data;
  },

  /**
   * Fetch public student profile by ID
   */
  getProfileById: async (id) => {
    const response = await api.get(`/students/${id}`);
    return response.data;
  }
};

export default studentService;
