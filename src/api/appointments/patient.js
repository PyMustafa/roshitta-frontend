import api from '../axios';
import { APPOINTMENTS } from '../endpoints';

/**
 * Get all appointments for the logged-in patient
 * @param {Object} params - Query parameters
 * @returns {Promise} - Response with paginated appointments
 */
export const getMyAppointments = async (params = {}) => {
  try {
    const response = await api.get(APPOINTMENTS.PATIENT.ME, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get today's appointments for the logged-in patient
 * @param {Object} params - Query parameters
 * @returns {Promise} - Response with paginated appointments
 */
export const getMyTodayAppointments = async (params = {}) => {
  try {
    const response = await api.get(APPOINTMENTS.PATIENT.TODAY, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get upcoming appointments for the logged-in patient
 * @param {Object} params - Query parameters
 * @returns {Promise} - Response with paginated appointments
 */
export const getMyUpcomingAppointments = async (params = {}) => {
  try {
    const response = await api.get(APPOINTMENTS.PATIENT.UPCOMING, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};