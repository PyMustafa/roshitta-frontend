import React from 'react';
import { FaCalendarAlt, FaNotesMedical, FaUser } from 'react-icons/fa';

const typeColors = {
  diagnosis: 'bg-blue-100 text-blue-800',
  disease: 'bg-red-100 text-red-800',
  surgery: 'bg-purple-100 text-purple-800',
  allergy: 'bg-yellow-100 text-yellow-800',
  test_result: 'bg-green-100 text-green-800'
};

const MedicalHistoryDetails = ({ entry, onClose }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 w-full mb-6">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-start">
          <div className="mr-4 flex items-center justify-center bg-gray-100 rounded-full w-16 h-16 cursor-default">
            <FaUser className="text-gray-500 text-2xl" />
          </div>
          
          <div>
            <p className="text-gray-500 text-sm">{entry.id}</p>
            <h1 className="text-xl font-bold mt-1">
              <span className={`text-xs px-2 py-1 rounded-full ${typeColors[entry.type]} mr-2`}>
                {entry.type}
              </span>
              {entry.diagnosis}
            </h1>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>

      <hr className="my-4 border-gray-200" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-gray-500 text-sm">Date</h3>
          <div className="flex items-center mt-1 cursor-default">
            <FaCalendarAlt className="mr-2 text-gray-400" />
            <span>{entry.date}</span>
          </div>
        </div>
        
        <div>
          <h3 className="text-gray-500 text-sm">Symptoms</h3>
          <div className="flex items-start mt-1 cursor-default">
            <FaNotesMedical className="mr-2 text-gray-400 mt-1" />
            <span>{entry.symptoms}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-gray-500 text-sm">Prescription</h3>
        <div className="flex items-start mt-1 cursor-default">
          <FaNotesMedical className="mr-2 text-gray-400 mt-1" />
          <span>{entry.prescription}</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-gray-500 text-sm">Notes</h3>
        <div className="flex items-start mt-1 cursor-default">
          <FaNotesMedical className="mr-2 text-gray-400 mt-1" />
          <span>{entry.notes}</span>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistoryDetails;