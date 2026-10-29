/**
 * @file AuthContext.jsx
 * @description Centralized React Authentication State Provider.
 * Provides user, role, token, login, signup, logout methods, and handles
 * token persistence and automatic session restoration.
 */

import React, { createContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('careerforge_user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('careerforge_token') || null);
  const [loading, setLoading] = useState(true);

  // Validate and restore user session from API on app mount
  useEffect(() => {
    const verifySession = async () => {
      const storedToken = localStorage.getItem('careerforge_token');
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await authAPI.getMe();
        if (response.data && response.data.data) {
          const freshUser = response.data.data.user;
          setUser(freshUser);
          localStorage.setItem('careerforge_user', JSON.stringify(freshUser));
        }
      } catch (err) {
        console.warn('Session verification failed, logging out:', err.message);
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  /**
   * Log in user with credentials
   */
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await authAPI.login({ email, password });
      const { user: loggedInUser, token: authToken } = response.data.data;

      localStorage.setItem('careerforge_token', authToken);
      localStorage.setItem('careerforge_user', JSON.stringify(loggedInUser));

      setToken(authToken);
      setUser(loggedInUser);
      return { success: true, user: loggedInUser };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Login failed. Please check your credentials.';
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register new student or recruiter
   */
  const signup = async ({ name, email, password, role, companyName }) => {
    setLoading(true);
    try {
      const response = await authAPI.register({
        name,
        email,
        password,
        role,
        companyName
      });
      const { user: registeredUser, token: authToken } = response.data.data;

      localStorage.setItem('careerforge_token', authToken);
      localStorage.setItem('careerforge_user', JSON.stringify(registeredUser));

      setToken(authToken);
      setUser(registeredUser);
      return { success: true, user: registeredUser };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Registration failed. Please try again.';
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Log out user and clear state
   */
  const logout = () => {
    localStorage.removeItem('careerforge_token');
    localStorage.removeItem('careerforge_user');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    role: user?.role || null,
    isAuthenticated: !!token && !!user,
    loading,
    login,
    signup,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
