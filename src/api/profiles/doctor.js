import api from '../axios';
import { PROFILES } from '../endpoints';

/**
 * Get all doctors with optional filters
 * @param {Object} params - Query parameters
 * @param {boolean} params.is_available - Filter by availability
 * @param {string} params.specialty__name - Filter by specialty name
 * @param {string} params.search - Search term
 * @returns {Promise} - Response with paginated doctors
 */
export const getDoctors = async (params = {}) => {
  try {
    const response = await api.get(PROFILES.DOCTORS.LIST, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get doctor profile by UID
 * @param {string} uid - Doctor UID
 * @returns {Promise} - Response with doctor profile
 */
export const getDoctorProfile = async (uid) => {
  try {
    const response = await api.get(PROFILES.DOCTORS.DETAIL(uid));
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get authenticated doctor's profile
 * @returns {Promise} - Response with doctor's profile
 */
export const getMyProfile = async () => {
  try {
    const response = await api.get(PROFILES.DOCTORS.ME);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Update authenticated doctor's profile
 * @param {Object} data - Doctor profile data
 * @returns {Promise} - Response with updated profile
 */
export const updateMyProfile = async (data) => {
  try {
    const response = await api.put(PROFILES.DOCTORS.ME, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get clinics for a specific doctor
 * @param {string} uid - Doctor UID
 * @param {Object} params - Pagination parameters
 * @returns {Promise} - Response with paginated clinics
 */
export const getDoctorClinics = async (id, params = {}) => {
  try {
    const response = await api.get(PROFILES.DOCTORS.CLINICS(id), { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get authenticated doctor's clinics
 * @param {Object} params - Pagination parameters
 * @returns {Promise} - Response with paginated clinics
 */
export const getMyClinics = async (params = {}) => {
  try {
    const response = await api.get(PROFILES.DOCTORS.MY_CLINICS, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

