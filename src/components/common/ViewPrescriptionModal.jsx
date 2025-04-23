import React, { useState, useEffect } from 'react';
import { FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const ViewPrescriptionModal = ({ isOpen, onClose, prescription }) => {
  const [expandedMedicineId, setExpandedMedicineId] = useState(null);

  // Reset accordion when modal is opened
  useEffect(() => {
    if (isOpen) {
      setExpandedMedicineId(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleMedicine = (id) => {
    setExpandedMedicineId(prevId => (prevId === id ? null : id));
  };

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg border border-gray-100">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-bold text-gray-800">Prescription Details</h3>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Prescription Date</p>
                <p className="text-gray-800">{prescription.prescription_date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Doctor</p>
                <p className="text-gray-800">Dr. {prescription.doctor.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Patient</p>
                <p className="text-gray-800">{prescription.patient.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Appointment Date</p>
                <p className="text-gray-800">{prescription.appointment.date}</p>
              </div>
            </div>
          </div>

          {prescription.notes && (
            <div className="mb-4">
              <p className="text-sm text-gray-500">Notes</p>
              <p className="text-gray-800">{prescription.notes}</p>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Medicines Section */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Medicines</h4>
            <div className="w-full space-y-1">
              {prescription.medicines.map((medicine, index, array) => (
                <div key={medicine.id}>
                  <button
                    onClick={() => toggleMedicine(medicine.id)}
                    className="flex w-full items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-800">
                        {medicine.medicine_name}
                      </span>
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
                        <div className="pb-4 pt-0 px-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                            <div>
                              <p className="text-sm text-gray-500">Frequency</p>
                              <p className="text-gray-800">{medicine.frequency}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Duration</p>
                              <p className="text-gray-800">{medicine.duration}</p>
                            </div>
                          </div>
                          {medicine.instructions && (
                            <div>
                              <p className="text-sm text-gray-500">Instructions</p>
                              <p className="text-gray-800">{medicine.instructions}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Conditionally render the border-b */}
                  {index < array.length - 1 && <div className="border-b border-gray-200" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPrescriptionModal;
