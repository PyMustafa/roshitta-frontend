import api from '../axios';
import { APPOINTMENTS } from '../endpoints';

/**
 * Get available appointment slots
 * @param {Object} params - Query parameters for filtering slots
 * @param {number} params.clinic - Clinic ID
 * @param {number} params.doctor - Doctor ID
 * @param {boolean} params.is_available - Filter by availability
 * @param {number} params.working_hours - Working hours ID
 * @returns {Promise} - Response with paginated appointment slots
 */
export const getSlots = async (params = {}) => {
  try {
    const response = await api.get(APPOINTMENTS.SLOTS, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};