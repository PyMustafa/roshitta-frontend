import api from '../axios';
import { PROFILES } from '../endpoints';

/**
 * Get all patients with optional filters
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @returns {Promise} - Response with paginated patients
 */
export const getPatients = async (params = {}) => {
  try {
    const response = await api.get(PROFILES.PATIENTS.LIST, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get patients for the authenticated doctor
 * This is used to get total count of patients associated with a doctor
 * @param {Object} params - Query parameters
 * @returns {Promise} - Response with paginated patients
 */
export const getMyDoctorPatients = async (params = {}) => {
  try {
    const response = await api.get(PROFILES.PATIENTS.LIST, { 
      params: { ...params, doctor: 'me' } 
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get patient profile by ID
 * @param {string|number} id - Patient ID
 * @returns {Promise} - Response with patient profile
 */
export const getPatientProfile = async (id) => {
  try {
    const response = await api.get(PROFILES.PATIENTS.DETAIL(id));
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get authenticated patient's profile
 * @returns {Promise} - Response with patient's profile
 */
export const getMyProfile = async () => {
  try {
    const response = await api.get(PROFILES.PATIENTS.ME);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Update authenticated patient's profile
 * @param {Object} data - Patient profile data
 * @returns {Promise} - Response with updated profile
 */
export const updateMyProfile = async (data) => {
  try {
    const response = await api.put(PROFILES.PATIENTS.ME, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};