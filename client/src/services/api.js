/**
 * @file api.js
 * @description Centralized Axios HTTP client instance.
 * Automatically injects JWT Bearer tokens into request headers and intercepts 401 Unauthorized
 * responses to purge expired credentials and redirect to login.
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
});

// Request Interceptor: Attach JWT Token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('careerforge_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global 401 Token Expiry Handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Don't loop redirect if the user is attempting login with bad credentials
      const isAuthRoute =
        error.config.url.includes('/auth/login') ||
        error.config.url.includes('/auth/register');

      if (!isAuthRoute) {
        localStorage.removeItem('careerforge_token');
        localStorage.removeItem('careerforge_user');
        if (window.location.pathname !== '/login') {
          window.location.href = '/login?session_expired=true';
        }
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (payload) => api.post('/auth/register', payload),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me')
};

export default api;
