// Export all auth-related API functions
import { login } from './login';
import { register } from './register';
import { changePassword, forgotPassword, resetPassword } from './password';

// Logout function
import api from '../axios';
import { AUTH } from '../endpoints';

/**
 * Logout the current user
 * @param {Object} data - Logout data
 * @param {string} data.refresh - Refresh token
 * @returns {Promise} - Response from the API
 */
export const logout = async (data) => {
  try {
    const response = await api.post(AUTH.LOGOUT, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export {
  login,
  register,
  changePassword,
  forgotPassword,
  resetPassword,
};