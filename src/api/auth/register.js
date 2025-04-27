import api from '../axios';
import { AUTH } from '../endpoints';

/**
 * Register a new user
 * @param {Object} userData - New user data
 * @param {string} userData.email - User email
 * @param {string} userData.password - User password
 * @param {string} userData.password_confirm - Password confirmation
 * @param {string} userData.first_name - First name
 * @param {string} userData.last_name - Last name
 * @param {string} userData.user_type - User type (patient, doctor)
 * @returns {Promise} - Response with user data and JWT tokens
 */
export const register = async (userData) => {
  try {
    const response = await api.post(AUTH.REGISTER, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};