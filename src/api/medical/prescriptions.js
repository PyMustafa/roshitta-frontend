import api from '../axios';
import { MEDICAL } from '../endpoints';

/**
 * Get all prescriptions with optional filters
 * @param {Object} params - Query parameters
 * @param {number} params.patient - Filter by patient ID
 * @param {number} params.doctor - Filter by doctor ID
 * @returns {Promise} - Response with paginated prescriptions
 */
export const getPrescriptions = async (params = {}) => {
  try {
    const response = await api.get(MEDICAL.PRESCRIPTIONS.LIST, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get prescription by ID
 * @param {number} id - Prescription ID
 * @returns {Promise} - Response with prescription details
 */
export const getPrescription = async (id) => {
  try {
    const response = await api.get(MEDICAL.PRESCRIPTIONS.DETAIL(id));
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get prescription by patient ID
 * @param {number} patientId - Patient ID
 * @returns {Promise} - Response with prescription details
 */
export const getPrescriptionByPatient = async (patientId) => {
  try {
    // First get all prescriptions for this patient
    const response = await getPrescriptions({ patient: patientId });
    
    // Return the latest prescription (assuming sorted by date)
    if (response.results && response.results.length > 0) {
      const latestPrescription = response.results[0];
      
      // Get the full prescription details including medicines
      const fullPrescription = await getPrescription(latestPrescription.id);
      
      // Get medicines for this prescription
      const medicines = await getPrescriptionMedicines(latestPrescription.id);
      
      return {
        ...fullPrescription,
        medicines: medicines.results || []
      };
    }
    
    return null;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Create a new prescription
 * @param {Object} data - Prescription data
 * @param {number} data.patient - Patient ID
 * @param {number} data.doctor - Doctor ID
 * @param {string} data.notes - Additional notes
 * @returns {Promise} - Response with created prescription
 */
export const createPrescription = async (data) => {
  try {
    const response = await api.post(MEDICAL.PRESCRIPTIONS.LIST, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Add medicine to prescription
 * @param {number} prescriptionId - Prescription ID
 * @param {Object} data - Medicine data
 * @param {number} data.medicine - Medicine ID
 * @param {string} data.dosage - Dosage instructions
 * @param {string} data.frequency - Frequency instructions
 * @param {string} data.duration - Duration instructions
 * @returns {Promise} - Response with added prescription medicine
 */
export const addMedicineToPrescription = async (prescriptionId, data) => {
  try {
    const response = await api.post(MEDICAL.PRESCRIPTIONS.MEDICINES(prescriptionId), data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get medicines in a prescription
 * @param {number} prescriptionId - Prescription ID
 * @param {Object} params - Query parameters
 * @returns {Promise} - Response with paginated prescription medicines
 */
export const getPrescriptionMedicines = async (prescriptionId, params = {}) => {
  try {
    const response = await api.get(MEDICAL.PRESCRIPTIONS.MEDICINES(prescriptionId), { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Remove medicine from prescription
 * @param {number} prescriptionId - Prescription ID
 * @param {number} medicineId - Prescription medicine ID
 * @returns {Promise} - Empty response on success
 */
export const removeMedicineFromPrescription = async (prescriptionId, medicineId) => {
  try {
    const response = await api.delete(MEDICAL.PRESCRIPTIONS.MEDICINE_DETAIL(prescriptionId, medicineId));
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};