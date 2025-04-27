// All API endpoints in one centralized file
export const API_BASE = 'api/v1';

// Auth endpoints
export const AUTH = {
  LOGIN: `${API_BASE}/users/auth/login/`,
  REGISTER: `${API_BASE}/users/auth/register/`,
  CHANGE_PASSWORD: `${API_BASE}/users/auth/change-password/`,
  FORGOT_PASSWORD: `${API_BASE}/users/auth/forgot-password/`,
  RESET_PASSWORD: `${API_BASE}/users/auth/reset-password/`,
  LOGOUT: `${API_BASE}/users/auth/logout/`,
};
