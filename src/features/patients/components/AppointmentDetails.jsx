import React from 'react';
import { FaEnvelope, FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaUser, FaFilePrescription } from 'react-icons/fa';

const AppointmentDetails = ({ appointment, onPrescriptionClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 w-full">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-start">
          <div className="mr-4 flex items-center justify-center bg-gray-100 rounded-full w-16 h-16 cursor-default">
            <FaUser className="text-gray-500 text-2xl" />
          </div>
          
          <div>
            <p className="text-gray-500 text-sm">{appointment.id}</p>
            <h1 className="text-xl font-bold mt-1">Dr {appointment.doctor}</h1>
            <p className="text-gray-500 text-sm mt-1">Dentist</p>
            
            <div className="flex items-center text-gray-500 mt-2">
              <FaEnvelope className="mr-2 text-gray-400" />
              <span>{appointment.email}</span>
            </div>
            
            <div className="flex items-center text-gray-500 mt-1">
              <FaPhone className="mr-2 text-gray-400" />
              <span>{appointment.phone}</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
            Confirmed
          </span>
          <p className="text-gray-500 text-sm mt-2">Consultation Fees: $101.00</p>
        </div>
      </div>

      <hr className="my-4 border-gray-200" />

      <div className="flex flex-wrap gap-6 mb-6">
        <div className="min-w-[200px]">
          <h3 className="text-gray-500 text-sm">Appointment Date & Time</h3>
          <div className="flex items-center mt-1 cursor-default">
            <FaCalendarAlt className="mr-2 text-gray-400" />
            <span>{appointment.date}</span>
          </div>
        </div>
        
      </div>

      <button 
        onClick={onPrescriptionClick}
        className="mt-6 flex items-center justify-center bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 w-full"
      >
        <FaFilePrescription className="mr-2" />
        Prescription
      </button>
    </div>
  );
};

export default AppointmentDetails;