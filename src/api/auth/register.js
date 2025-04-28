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

/**
 * Request email verification code
 * @param {string} email - User email
 * @returns {Promise} - Response indicating success or failure
 */
export const requestEmailVerification = async (email) => {
  try {
    const response = await api.post(AUTH.EMAIL_VERIFICATION.REQUEST, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Verify email with verification code
 * @param {string} code - Verification code
 * @returns {Promise} - Response indicating verification status
 */
export const verifyEmail = async (code) => {
  try {
    const response = await api.post(AUTH.EMAIL_VERIFICATION.VERIFY, { verification_code: code });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Check email verification status
 * @returns {Promise} - Response with verification status
 */
export const checkEmailVerificationStatus = async () => {
  try {
    const response = await api.get(AUTH.EMAIL_VERIFICATION.STATUS);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};