import api from '../axios';
import { CLINICS } from '../endpoints';

/**
 * Get all working hours with optional filters
 * @param {Object} params - Query parameters
 * @param {number} params.clinic - Filter by clinic ID
 * @param {number} params.day_of_week - Filter by day of week (0-6, where 0 is Monday)
 * @returns {Promise} - Response with paginated working hours
 */
export const getWorkingHours = async (params = {}) => {
  try {
    const response = await api.get(CLINICS.WORKING_HOURS.LIST, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get working hours by ID
 * @param {number} id - Working hours ID
 * @returns {Promise} - Response with working hours details
 */
export const getWorkingHoursById = async (id) => {
  try {
    const response = await api.get(CLINICS.WORKING_HOURS.DETAIL(id));
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get working hours for a specific clinic
 * @param {number} clinicId - Clinic ID
 * @param {Object} params - Query parameters
 * @returns {Promise} - Response with paginated working hours
 */
export const getClinicWorkingHours = async (clinicId, params = {}) => {
  try {
    const response = await api.get(CLINICS.WORKING_HOURS.BY_CLINIC(clinicId), { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Create working hours for a clinic
 * @param {Object} data - Working hours data
 * @param {number} data.clinic - Clinic ID
 * @param {number} data.day_of_week - Day of week (0-6, where 0 is Monday)
 * @param {string} data.start_time - Start time (HH:MM:SS)
 * @param {string} data.end_time - End time (HH:MM:SS)
 * @param {boolean} data.is_active - Status of working hours
 * @returns {Promise} - Response with created working hours
 */
export const createWorkingHours = async (data) => {
  try {
    const response = await api.post(CLINICS.WORKING_HOURS.LIST, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Update working hours by ID
 * @param {number} id - Working hours ID
 * @param {Object} data - Updated working hours data
 * @returns {Promise} - Response with updated working hours
 */
export const updateWorkingHours = async (id, data) => {
  try {
    const response = await api.patch(CLINICS.WORKING_HOURS.DETAIL(id), data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Delete working hours by ID
 * @param {number} id - Working hours ID
 * @returns {Promise} - Empty response on success
 */
export const deleteWorkingHours = async (id) => {
  try {
    const response = await api.delete(CLINICS.WORKING_HOURS.DETAIL(id));
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};