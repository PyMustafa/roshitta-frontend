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

// Appointment endpoints
export const APPOINTMENTS = {
  BASE: `${API_BASE}/appointments/`,
  CANCEL: (id) => `${API_BASE}/appointments/${id}/cancel/`,
  STATUS: (id) => `${API_BASE}/appointments/${id}/status/`,
  DOCTOR: {
    ME: `${API_BASE}/appointments/doctors/me/`,
    TODAY: `${API_BASE}/appointments/doctors/me/today/`,
    UPCOMING: `${API_BASE}/appointments/doctors/me/upcoming/`,
  },
  PATIENT: {
    ME: `${API_BASE}/appointments/patients/me/`,
    TODAY: `${API_BASE}/appointments/patients/me/today/`,
    UPCOMING: `${API_BASE}/appointments/patients/me/upcoming/`,
  },
  SLOTS: `${API_BASE}/appointments/slots/`,
};

