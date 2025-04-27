// Export all clinic-related API functions
import * as workingHours from './workingHours';
import api from '../axios';
import { CLINICS } from '../endpoints';

/**
 * Get all clinics with optional filters
 * @param {Object} params - Query parameters
 * @param {number} params.doctor - Filter by doctor ID
 * @param {string} params.search - Search term for clinic name or address
 * @returns {Promise} - Response with paginated clinics
 */
export const getClinics = async (params = {}) => {
  try {
    const response = await api.get(CLINICS.ALL, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get clinic by ID
 * @param {number} id - Clinic ID
 * @returns {Promise} - Response with clinic details
 */
export const getClinic = async (id) => {
  try {
    const response = await api.get(CLINICS.DETAIL(id));
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Create a new clinic
 * @param {Object} data - Clinic data
 * @param {string} data.name - Clinic name
 * @param {string} data.address - Clinic address
 * @param {string} data.phone_number - Clinic phone number
 * @param {number} data.fee - Clinic consultation fee
 * @param {string} data.latitude - Optional latitude
 * @param {string} data.longitude - Optional longitude
 * @returns {Promise} - Response with created clinic
 */
export const createClinic = async (data) => {
  try {
    const response = await api.post(CLINICS.ALL, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Update clinic by ID
 * @param {number} id - Clinic ID
 * @param {Object} data - Updated clinic data
 * @returns {Promise} - Response with updated clinic
 */
export const updateClinic = async (id, data) => {
  try {
    const response = await api.patch(CLINICS.DETAIL(id), data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Delete clinic by ID
 * @param {number} id - Clinic ID
 * @returns {Promise} - Empty response on success
 */
export const deleteClinic = async (id) => {
  try {
    const response = await api.delete(CLINICS.DETAIL(id));
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export { workingHours };