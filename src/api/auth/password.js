import api from '../axios';
import { AUTH } from '../endpoints';

/**
 * Change user password
 * @param {Object} passwordData - Password data
 * @param {string} passwordData.current_password - Current password
 * @param {string} passwordData.new_password - New password
 * @param {string} passwordData.confirm_password - Confirm new password
 * @returns {Promise} - Response from the API
 */
export const changePassword = async (passwordData) => {
  try {
    const response = await api.post(AUTH.CHANGE_PASSWORD, passwordData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Request password reset email
 * @param {Object} data - Request data
 * @param {string} data.email - User email
 * @returns {Promise} - Response from the API
 */
export const forgotPassword = async (data) => {
  try {
    const response = await api.post(AUTH.FORGOT_PASSWORD, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Reset password using token
 * @param {Object} resetData - Reset data
 * @param {string} resetData.token - Reset token
 * @param {string} resetData.new_password - New password
 * @param {string} resetData.confirm_password - Confirm new password
 * @returns {Promise} - Response from the API
 */
export const resetPassword = async (resetData) => {
  try {
    const response = await api.post(AUTH.RESET_PASSWORD, resetData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};