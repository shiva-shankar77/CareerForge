/**
 * @file resumeService.js
 * @description Frontend API client service for Candidate Resume operations.
 */

import api from './api';

export const resumeService = {
  /**
   * Fetch all resumes for current student
   */
  getAll: async () => {
    const response = await api.get('/resumes');
    return response.data;
  },

  /**
   * Fetch a single resume by ID
   */
  getById: async (id) => {
    const response = await api.get(`/resumes/${id}`);
    return response.data;
  },

  /**
   * Create a new structured resume
   */
  create: async (data) => {
    const response = await api.post('/resumes', data);
    return response.data;
  },

  /**
   * Update an existing resume
   */
  update: async (id, data) => {
    const response = await api.put(`/resumes/${id}`, data);
    return response.data;
  },

  /**
   * Delete a resume by ID
   */
  delete: async (id) => {
    const response = await api.delete(`/resumes/${id}`);
    return response.data;
  }
};

export default resumeService;
