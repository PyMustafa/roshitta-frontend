import api from '../axios';
import { MEDICAL } from '../endpoints';

/**
 * Get all medical histories with optional filters
 * @param {Object} params - Query parameters
 * @param {number} params.patient - Filter by patient ID
 * @param {number} params.doctor - Filter by doctor ID
 * @returns {Promise} - Response with paginated medical histories
 */
export const getMedicalHistories = async (params = {}) => {
  try {
    const response = await api.get(MEDICAL.HISTORIES.LIST, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get medical history by ID
 * @param {number} id - Medical history ID
 * @returns {Promise} - Response with medical history details
 */
export const getMedicalHistory = async (id) => {
  try {
    const response = await api.get(MEDICAL.HISTORIES.DETAIL(id));
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Create a new medical history record
 * @param {Object} data - Medical history data
 * @param {number} data.patient - Patient ID
 * @param {number} data.doctor - Doctor ID
 * @param {string} data.diagnosis - Diagnosis details
 * @param {string} data.notes - Additional notes
 * @returns {Promise} - Response with created medical history
 */
export const createMedicalHistory = async (data) => {
  try {
    const response = await api.post(MEDICAL.HISTORIES.LIST, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Update medical history by ID
 * @param {number} id - Medical history ID
 * @param {Object} data - Updated medical history data
 * @returns {Promise} - Response with updated medical history
 */
export const updateMedicalHistory = async (id, data) => {
  try {
    const response = await api.patch(MEDICAL.HISTORIES.DETAIL(id), data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};