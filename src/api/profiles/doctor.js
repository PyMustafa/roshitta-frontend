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
 * Get doctor profile by ID
 * @param {string|number} id - Doctor ID
 * @returns {Promise} - Response with doctor profile
 */
export const getDoctorProfile = async (id) => {
  try {
    const response = await api.get(PROFILES.DOCTORS.DETAIL(id));
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
 * @param {Object|FormData} data - Doctor profile data or FormData with image
 * @param {boolean} isFormData - Whether the data is FormData (for file uploads)
 * @returns {Promise} - Response with updated profile
 */
export const updateMyProfile = async (data, isFormData = false) => {
  try {
    let config = {};
    
    if (isFormData) {
      // Set proper headers for multipart/form-data
      config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
    }
    
    const response = await api.patch(PROFILES.DOCTORS.ME, data, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get clinics for a specific doctor
 * @param {string|number} id - Doctor ID
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

/**
 * Get patients for the authenticated doctor
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {number} params.page_size - Number of results per page
 * @param {string} params.search - Search term
 * @returns {Promise} - Response with paginated patients
 */
export const getPatients = async (params = {}) => {
  try {
    // Include a doctor parameter to filter patients for the current doctor
    const queryParams = { ...params, doctor: 'me' };
    const response = await api.get(PROFILES.PATIENTS.LIST, { params: queryParams });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

