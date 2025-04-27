import api from '../axios';
import { MEDICAL } from '../endpoints';

/**
 * Get all medicines with optional filters
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term for medicine name
 * @returns {Promise} - Response with paginated medicines
 */
export const getMedicines = async (params = {}) => {
  try {
    const response = await api.get(MEDICAL.MEDICINES.LIST, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get medicine by ID
 * @param {number} id - Medicine ID
 * @returns {Promise} - Response with medicine details
 */
export const getMedicine = async (id) => {
  try {
    const response = await api.get(MEDICAL.MEDICINES.DETAIL(id));
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Create a new medicine
 * @param {Object} data - Medicine data
 * @param {string} data.name - Medicine name
 * @param {string} data.description - Medicine description
 * @param {string} data.dosage - Medicine dosage information
 * @returns {Promise} - Response with created medicine
 */
export const createMedicine = async (data) => {
  try {
    const response = await api.post(MEDICAL.MEDICINES.LIST, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};