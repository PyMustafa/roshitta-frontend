import React, { useState } from 'react';
import { FaEye, FaCalendarAlt, FaTag, FaDiagnoses, FaNotesMedical } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';  
import 'react-tooltip/dist/react-tooltip.css'; 

const typeColors = {
  diagnosis: 'bg-blue-100 text-blue-800',
  disease: 'bg-red-100 text-red-800',
  surgery: 'bg-purple-100 text-purple-800',
  allergy: 'bg-yellow-100 text-yellow-800',
  test_result: 'bg-green-100 text-green-800'
};

const MedicalHistoryCard = ({ entry }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-100 w-full transition-all duration-500 hover:shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 px-4">
        <div className="flex items-start gap-2 lg:col-span-2">
          <FaTag className="text-gray-500 text-base mt-0.5 flex-shrink-0" />
          <div className="flex flex-col">
            <p className="text-gray-500 text-sm">Type</p>
            <span className={`text-black text-sm px-2 py-1 rounded-full ${typeColors[entry.type]}`}>
              {entry.type}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2 lg:col-span-2">
          <FaCalendarAlt className="text-gray-500 text-base mt-0.5 flex-shrink-0" />
          <div className="flex flex-col">
            <p className="text-gray-500 text-sm">Date</p>
            <p className="text-black text-sm">{entry.date}</p>
          </div>
        </div>

        <div className="flex items-start gap-2 lg:col-span-2">
          <FaDiagnoses className="text-gray-500 text-base mt-0.5 flex-shrink-0" />
          <div className="flex flex-col">
            <p className="text-gray-500 text-sm">Diagnosis</p>
            <p className="text-black text-sm line-clamp-1">{entry.diagnosis}</p>
          </div>
        </div>

        <div className="flex items-center justify-end lg:col-span-1">
          <button
            className={`flex items-center justify-center rounded-full w-8 h-8 cursor-pointer transition-all duration-500 ${isExpanded ? 'bg-blue-100 text-blue-600 scale-110' : 'bg-gray-100 text-gray-500 hover:bg-blue-50'}`}
            onClick={toggleExpand}
            aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
            data-tooltip-id="toggle-expand-tooltip" 
            data-tooltip-content={isExpanded ? 'Collapse details' : 'Expand details'} 
          >
            <FaEye className={`text-sm transition-all duration-500 ${isExpanded ? 'rotate-180 scale-110' : ''}`} />
          </button>
          <Tooltip id="toggle-expand-tooltip" />
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] ${isExpanded ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
        <div className={`pt-4 border-t border-gray-200 transition-opacity duration-500 ${isExpanded ? 'opacity-100 delay-200' : 'opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-start gap-3 transform transition-all duration-500 delay-100" style={{ transform: isExpanded ? 'translateY(0)' : 'translateY(-10px)' }}>
              <FaNotesMedical className="text-gray-400 text-base mt-0.5 flex-shrink-0" data-tooltip-id="symptoms-tooltip" data-tooltip-content="Symptoms" />
              <Tooltip id="symptoms-tooltip" />
              <div>
                <p className="text-gray-500 text-sm">Symptoms</p>
                <p className="font-medium text-sm">{entry.symptoms}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 transform transition-all duration-500 delay-150" style={{ transform: isExpanded ? 'translateY(0)' : 'translateY(-10px)' }}>
              <FaNotesMedical className="text-gray-400 text-base mt-0.5 flex-shrink-0" data-tooltip-id="prescription-tooltip" data-tooltip-content="Prescription" />
              <Tooltip id="prescription-tooltip" />
              <div>
                <p className="text-gray-500 text-sm">Prescription</p>
                <a
                  href={entry.prescription}
                  download
                  className="font-medium text-sm text-blue-600 hover:underline"
                >
                  View Prescription
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 transform transition-all duration-500 delay-200" style={{ transform: isExpanded ? 'translateY(0)' : 'translateY(-10px)' }}>
            <FaNotesMedical className="text-gray-400 text-base mt-0.5 flex-shrink-0" data-tooltip-id="notes-tooltip" data-tooltip-content="Notes" />
            <Tooltip id="notes-tooltip" />
            <div>
              <p className="text-gray-500 text-sm">Notes</p>
              <p className="font-medium text-sm">{entry.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistoryCard;
