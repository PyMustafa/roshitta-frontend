// Export all appointment-related functions
import * as doctor from './doctor';
import * as patient from './patient';
import { getSlots } from './slots';
import api from '../axios';
import { APPOINTMENTS } from '../endpoints';

/**
 * Get all appointments with optional filters
 * @param {Object} params - Query parameters
 * @returns {Promise} - Response with paginated appointments
 */
export const getAppointments = async (params = {}) => {
  try {
    const response = await api.get(APPOINTMENTS.BASE, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get appointment details by ID
 * @param {number} id - Appointment ID
 * @returns {Promise} - Response with appointment details
 */
export const getAppointment = async (id) => {
  try {
    const response = await api.get(`${APPOINTMENTS.BASE}${id}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Create a new appointment
 * @param {Object} data - Appointment data
 * @param {number} data.slot_id - Slot ID
 * @param {string} data.notes - Optional notes
 * @returns {Promise} - Response with created appointment
 */
export const createAppointment = async (data) => {
  try {
    const response = await api.post(APPOINTMENTS.BASE, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Cancel an appointment
 * @param {number} id - Appointment ID
 * @param {Object} data - Cancellation data (reason, etc.)
 * @returns {Promise} - Response with updated appointment
 */
export const cancelAppointment = async (id, data = {}) => {
  try {
    const response = await api.post(`${APPOINTMENTS.CANCEL(id)}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Update appointment status
 * @param {number} id - Appointment ID
 * @param {Object} data - Status data
 * @param {string} data.status - New status
 * @returns {Promise} - Response with updated appointment
 */
export const updateAppointmentStatus = async (id, data) => {
  try {
    const response = await api.patch(`${APPOINTMENTS.STATUS(id)}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export {
  doctor,
  patient,
  getSlots
};