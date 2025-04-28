import React, { useState, useEffect } from 'react';
import { FiX, FiChevronDown, FiChevronUp, FiPlus } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const DoctorPrescriptionModal = ({ isOpen, onClose, initialData, onSave }) => {
  const [expandedMedicineId, setExpandedMedicineId] = useState(null);
  const [showAddMedicineModal, setShowAddMedicineModal] = useState(false);
  const [prescription, setPrescription] = useState({
    prescription_date: new Date().toLocaleDateString(),
    notes: '',
    medicines: []
  });
  const [newMedicine, setNewMedicine] = useState({
    medicine_name: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: ''
  });

  // Initialize with initialData if provided
  useEffect(() => {
    if (initialData) {
      setPrescription(initialData);
    }
  }, [initialData]);

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setExpandedMedicineId(null);
      if (!initialData) {
        setPrescription({
          prescription_date: new Date().toLocaleDateString(),
          notes: '',
          medicines: []
        });
      }
    }
  }, [isOpen, initialData]);

  const toggleMedicine = (id) => {
    setExpandedMedicineId(prevId => (prevId === id ? null : id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPrescription(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMedicineInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddMedicine = () => {
    if (!newMedicine.medicine_name) return;

    const medicineToAdd = {
      ...newMedicine,
      id: Date.now() // temporary ID
    };

    setPrescription(prev => ({
      ...prev,
      medicines: [...prev.medicines, medicineToAdd]
    }));

    setNewMedicine({
      medicine_name: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: ''
    });

    setShowAddMedicineModal(false);
  };

  const handleSavePrescription = () => {
    onSave(prescription);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Main Prescription Modal */}
      <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg border border-gray-100">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-xl font-bold text-gray-800">Create Prescription</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none h-9 w-9 rounded-full hover:bg-[#5F6FFF] hover:text-white flex items-center justify-center"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Prescription Section */}
          <div className="p-4">
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Prescription Information</h4>
              <div className="grid grid-cols-4 gap-x-8 gap-y-2 small:grid-cols-2"> {/* Added small:grid-cols-2 */}
                <div className="col-span-1">
                  <p className="text-sm text-gray-500">Prescription Date</p>
                  <p className="text-gray-800">{prescription.prescription_date}</p>
                </div>
                <div className="col-span-1">
                  <p className="text-sm text-gray-500">Doctor</p>
                  <p className="text-gray-800">Dr. {prescription.doctor?.name || 'Your Name'}</p>
                </div>
                <div className="col-span-1">
                  <p className="text-sm text-gray-500">Patient</p>
                  <p className="text-gray-800">{prescription.patient?.name || 'Patient Name'}</p>
                </div>
                <div className="col-span-1">
                  <p className="text-sm text-gray-500">Appointment Date</p>
                  <p className="text-gray-800">{prescription.appointment?.date || 'Today'}</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="notes" className="block text-sm text-gray-500 mb-1">Notes</label>
              <textarea
                id="notes"
                name="notes"
                rows="3"
                value={prescription.notes}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent"
                placeholder="Add any additional notes..."
              />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-4"></div>

            {/* Medicines Section */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-semibold text-gray-700">Medicines</h4>
                <button
                  onClick={() => setShowAddMedicineModal(true)}
                  className="flex items-center space-x-1 text-[#5F6FFF] hover:text-[#4a5ae8]"
                >
                  <FiPlus size={18} />
                  <span>Add Medicine</span>
                </button>
              </div>

              {prescription.medicines.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  No medicines added yet
                </div>
              ) : (
                <div className="w-full space-y-1">
                  {prescription.medicines.map((medicine, index) => (
                    <div key={medicine.id}>
                      {/* Card for each medicine */}
                      <button
                        onClick={() => toggleMedicine(medicine.id)}
                        className="flex w-full items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-800">{medicine.medicine_name}</span>
                          <span className="text-sm text-gray-500">({medicine.dosage})</span>
                        </div>
                        <motion.div
                          animate={{ rotate: expandedMedicineId === medicine.id ? 180 : 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="text-gray-500"
                        >
                          {expandedMedicineId === medicine.id ? (
                            <FiChevronUp className="h-4 w-4" />
                          ) : (
                            <FiChevronDown className="h-4 w-4" />
                          )}
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {expandedMedicineId === medicine.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                              opacity: 1,
                              height: "auto",
                              transition: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                            }}
                            exit={{
                              opacity: 0,
                              height: 0,
                              transition: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                            }}
                            className="overflow-hidden bg-gray-50 rounded-b-lg"
                          >
                            <div className="pb-4 pt-0 px-4 text-left">
                              <div className="flex flex-col mb-2 ">
                                <div>
                                  <p className="text-sm text-gray-500">Frequency : </p>
                                  <p className="text-gray-800">{medicine.frequency}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Duration : </p>
                                  <p className="text-gray-800">{medicine.duration}</p>
                                </div>
                              </div>
                              {medicine.instructions && (
                                <div>
                                  <p className="text-sm text-gray-500">Instructions : </p>
                                  <p className="text-gray-800">{medicine.instructions}</p>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Separator between medicines */}
                      {index < prescription.medicines.length - 1 && <div className="border-b border-gray-200" />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer with Save Button */}
          <div className="p-4 flex justify-end">
            <button
              onClick={handleSavePrescription}
              className="px-4 py-2 bg-[#5F6FFF] text-white rounded-md hover:bg-[#4a5ae8] focus:outline-none focus:ring-2 focus:ring-[#5F6FFF] focus:ring-offset-2"
            >
              Save Prescription
            </button>
          </div>
        </div>
      </div>

      {/* Add Medicine Modal */}
      {showAddMedicineModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md shadow-lg border border-gray-100">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold text-gray-800">Add Medicine</h3>
              <button
                onClick={() => setShowAddMedicineModal(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none h-9 w-9 rounded-full hover:bg-[#5F6FFF] hover:text-white flex items-center justify-center"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <input
                  type="text"
                  id="medicine_name"
                  name="medicine_name"
                  value={newMedicine.medicine_name}
                  onChange={handleMedicineInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent"
                  placeholder="Medicine Name*"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    id="dosage"
                    name="dosage"
                    value={newMedicine.dosage}
                    onChange={handleMedicineInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent"
                    placeholder="Dosage*"
                    required
                  />
                </div>

                <div>
                  <input
                    type="text"
                    id="frequency"
                    name="frequency"
                    value={newMedicine.frequency}
                    onChange={handleMedicineInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent"
                    placeholder="Frequency*"
                    required
                  />
                </div>

                <div>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={newMedicine.duration}
                    onChange={handleMedicineInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent"
                    placeholder="Duration*"
                    required
                  />
                </div>
              </div>

              <div>
                <textarea
                  id="instructions"
                  name="instructions"
                  rows="3"
                  value={newMedicine.instructions}
                  onChange={handleMedicineInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent"
                  placeholder="Special Instructions"
                />
              </div>
            </div>

            <div className="p-4 border-t flex justify-end">
              <button
                onClick={() => setShowAddMedicineModal(false)}
                className="px-4 py-2 mr-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMedicine}
                disabled={!newMedicine.medicine_name || !newMedicine.dosage || !newMedicine.frequency || !newMedicine.duration}
                className="px-4 py-2 bg-[#5F6FFF] text-white rounded-md hover:bg-[#4a5ae8] focus:outline-none focus:ring-2 focus:ring-[#5F6FFF] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Medicine
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorPrescriptionModal;