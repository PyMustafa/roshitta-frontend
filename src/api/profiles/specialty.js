import api from '../axios';
import { PROFILES } from '../endpoints';

/**
 * Get all medical specialties
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term to filter specialties
 * @param {number} params.page - Page number for pagination
 * @param {number} params.page_size - Number of items per page
 * @returns {Promise} - Response with paginated specialties
 */
export const getSpecialties = async (params = {}) => {
  try {
    const response = await api.get(PROFILES.SPECIALTIES, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get specialty by ID
 * @param {number} id - Specialty ID
 * @returns {Promise} - Response with specialty details
 */
export const getSpecialty = async (id) => {
  try {
    const response = await api.get(`${PROFILES.SPECIALTIES}${id}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};