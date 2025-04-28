// All API endpoints in one centralized file
export const API_BASE = '/api/v1';

// Auth endpoints
export const AUTH = {
  LOGIN: `${API_BASE}/users/auth/login/`,
  REGISTER: `${API_BASE}/users/auth/register/`,
  CHANGE_PASSWORD: `${API_BASE}/users/auth/change-password/`,
  FORGOT_PASSWORD: `${API_BASE}/users/auth/forgot-password/`,
  RESET_PASSWORD: `${API_BASE}/users/auth/reset-password/`,
  LOGOUT: `${API_BASE}/users/auth/logout/`,
  EMAIL_VERIFICATION: {
    REQUEST: `${API_BASE}/users/email-verification/request/`,
    VERIFY: `${API_BASE}/users/email-verification/verify/`,
    STATUS: `${API_BASE}/users/email-verification/status/`,
  },
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

// Profile endpoints
export const PROFILES = {
  DOCTORS: {
    LIST: `${API_BASE}/profiles/doctors/`,
    DETAIL: (uid) => `${API_BASE}/profiles/doctors/${uid}/`,
    ME: `${API_BASE}/profiles/doctors/me/`,
    CLINICS: (id) => `${API_BASE}/profiles/doctors/${id}/clinics/`,
    MY_CLINICS: `${API_BASE}/profiles/doctors/me/clinics/`,
  },
  PATIENTS: {
    LIST: `${API_BASE}/profiles/patients/`,
    DETAIL: (uid) => `${API_BASE}/profiles/patients/${uid}/`,
    ME: `${API_BASE}/profiles/patients/me/`,
  },
  SPECIALTIES: `${API_BASE}/profiles/specialties/`,
};

// Clinic endpoints
export const CLINICS = {
  ALL: `${API_BASE}/clinics/all/`,
  DETAIL: (id) => `${API_BASE}/clinics/${id}/`,
  WORKING_HOURS: {
    LIST: `${API_BASE}/clinics/working-hours/`,
    DETAIL: (id) => `${API_BASE}/clinics/working-hours/${id}/`,
    BY_CLINIC: (clinicId) => `${API_BASE}/clinics/${clinicId}/working-hours/`,
  },
};

// Medical endpoints
export const MEDICAL = {
  HISTORIES: {
    LIST: `${API_BASE}/medical/medical-histories/`,
    DETAIL: (id) => `${API_BASE}/medical/medical-histories/${id}/`,
  },
  MEDICINES: {
    LIST: `${API_BASE}/medical/medicines/`,
    DETAIL: (id) => `${API_BASE}/medical/medicines/${id}/`,
  },
  PRESCRIPTIONS: {
    LIST: `${API_BASE}/medical/prescriptions/`,
    DETAIL: (id) => `${API_BASE}/medical/prescriptions/${id}/`,
    MEDICINES: (prescriptionId) => `${API_BASE}/medical/prescriptions/${prescriptionId}/medicines/`,
    MEDICINE_DETAIL: (prescriptionId, medicineId) => 
      `${API_BASE}/medical/prescriptions/${prescriptionId}/medicines/${medicineId}/`,
  },
};

// Notification endpoints
export const NOTIFICATIONS = {
  LIST: `${API_BASE}/notifications/`,
  DETAIL: (id) => `${API_BASE}/notifications/${id}/`,
  MARK_READ: (id) => `${API_BASE}/notifications/${id}/mark_as_read/`,
  MARK_UNREAD: (id) => `${API_BASE}/notifications/${id}/mark_as_unread/`,
  MARK_ALL_READ: `${API_BASE}/notifications/mark_all_as_read/`,
  UNREAD_COUNT: `${API_BASE}/notifications/unread_count/`,
};

// User endpoints
export const USERS = {
  LIST: `${API_BASE}/users/`,
  DETAIL: (id) => `${API_BASE}/users/${id}/`,
  ME: `${API_BASE}/users/me/`,
  PHONE_VERIFICATION: {
    REQUEST: `${API_BASE}/users/phone-verification/request/`,
    VERIFY: `${API_BASE}/users/phone-verification/verify/`,
  },
};

// Token endpoints
export const TOKENS = {
  OBTAIN: `${API_BASE}/token/`,
  REFRESH: `${API_BASE}/token/refresh/`,
  VERIFY: `${API_BASE}/token/verify/`,
};