import React, { useState } from 'react';
import { 
  FaEye, 
  FaEnvelope, 
  FaPhone, 
  FaClock, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaFilePrescription,
  FaDollarSign,
  FaCheckCircle,
  FaUserMd
} from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const AppointmentCard = ({ appointment }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-4 border border-gray-100 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6">
        <div className='flex items-center gap-4 lg:col-span-2'>
          <div 
            className="flex items-center justify-center bg-gray-100 rounded-full w-12 h-12 cursor-default"
            data-tooltip-id="user-tooltip"
            data-tooltip-content="Patient Profile"
          >
            <FiUser className="text-gray-500 text-xl" />
          </div>
          <Tooltip id="user-tooltip" />
          <div>
            <p className="text-gray-500 font-medium text-sm">{appointment.id}</p>
            <h2 className="text-lg font-bold text-gray-800 mt-1">Dr {appointment.doctor}</h2>
          </div>
        </div>
        
        <div className="lg:col-span-2 space-y-2">
          <div className="flex items-center text-gray-600 text-sm">
            <FaEnvelope 
              className="mr-3 text-gray-500 text-base" 
              data-tooltip-id="email-tooltip"
              data-tooltip-content="Patient Email"
            />
            <Tooltip id="email-tooltip" />
            <span>{appointment.email}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <FaPhone 
              className="mr-3 text-gray-500 text-base" 
              data-tooltip-id="phone-tooltip"
              data-tooltip-content="Phone Number"
            />
            <Tooltip id="phone-tooltip" />
            <span>{appointment.phone}</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm lg:col-span-2">
          <FaClock 
            className="mr-3 text-gray-500 text-base" 
            data-tooltip-id="time-tooltip"
            data-tooltip-content="Appointment Time"
          />
          <Tooltip id="time-tooltip" />
          <span>{appointment.date}</span>
        </div>
        
        <div className="flex items-center justify-end lg:col-span-1 space-x-2">
          <div
            className="flex items-center justify-center bg-gray-100 rounded-full w-8 h-8 hover:bg-blue-100 cursor-pointer"
            data-tooltip-id="prescription-tooltip"
            data-tooltip-content="View Prescription"
            onClick={() => console.log('Prescription clicked')}
          >
            <FaFilePrescription className="text-gray-500 text-sm" />
          </div>
          <Tooltip id="prescription-tooltip" />
          
          <div
            className="flex items-center justify-center bg-gray-100 rounded-full w-8 h-8 hover:bg-blue-100 cursor-pointer"
            onClick={toggleExpand}
            data-tooltip-id="expand-tooltip"
            data-tooltip-content={isExpanded ? "Hide Details" : "View Details"}
          >
            <FaEye className={`text-sm ${isExpanded ? 'text-blue-600' : 'text-gray-500'}`} />
          </div>
          <Tooltip id="expand-tooltip" />
        </div>
      </div>

      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start">
              <FaCalendarAlt 
                className="text-gray-500 text-lg mr-3 mt-0.5"
                data-tooltip-id="calendar-tooltip"
                data-tooltip-content="Appointment Date & Time"
              />
              <Tooltip id="calendar-tooltip" />
              <div>
                <p className="text-[15px] font-semibold text-gray-700 mb-1">Appointment Date & Time</p>
                <p className="text-base text-gray-600">{appointment.date}</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaMapMarkerAlt 
                className="text-gray-500 text-lg mr-3 mt-0.5"
                data-tooltip-id="city-tooltip"
                data-tooltip-content="City"
              />
              <Tooltip id="city-tooltip" />
              <div>
                <p className="text-[15px] font-semibold text-gray-700 mb-1">City</p>
                <p className="text-base text-gray-600">New York</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaMapMarkerAlt 
                className="text-gray-500 text-lg mr-3 mt-0.5"
                data-tooltip-id="address-tooltip"
                data-tooltip-content="Clinic Address"
              />
              <Tooltip id="address-tooltip" />
              <div>
                <p className="text-[15px] font-semibold text-gray-700 mb-1">Address</p>
                <p className="text-base text-gray-600">The Family Dentistry Clinic</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaDollarSign 
                className="text-gray-500 text-lg mr-3 mt-0.5"
                data-tooltip-id="fees-tooltip"
                data-tooltip-content="Consultation Fees"
              />
              <Tooltip id="fees-tooltip" />
              <div>
                <p className="text-[15px] font-semibold text-gray-700 mb-1">Consultation Fees</p>
                <p className="text-base text-gray-600">$101.00</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaCheckCircle 
                className="text-gray-500 text-lg mr-3 mt-0.5"
                data-tooltip-id="status-tooltip"
                data-tooltip-content="Reservation Status"
              />
              <Tooltip id="status-tooltip" />
              <div>
                <p className="text-[15px] font-semibold text-gray-700 mb-1">Reservation Status</p>
                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-sm font-medium">
                  Confirmed
                </span>
              </div>
            </div>

            <div className="flex items-start">
              <FaUserMd 
                className="text-gray-500 text-lg mr-3 mt-0.5"
                data-tooltip-id="specialty-tooltip"
                data-tooltip-content="Doctor Specialty"
              />
              <Tooltip id="specialty-tooltip" />
              <div>
                <p className="text-[15px] font-semibold text-gray-700 mb-1">Specialty</p>
                <p className="text-base text-gray-600">Dentist</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
