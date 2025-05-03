import api from '../axios';
import { AUTH } from '../endpoints';

/**
 * Login a user with email and password
 * @param {Object} credentials - User credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @returns {Promise} - Response with user data and JWT tokens
 */
export const login = async (credentials) => {
  try {
    const response = await api.post(AUTH.LOGIN, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};