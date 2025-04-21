import React, { useState } from 'react';
import { clinicData, doctorData } from '../utils/mockData';
import { ClinicCard } from '../components/ClinicCard';
import { WeeklySchedule } from '../components/WeeklySchedule';

export const AppointmentPage = () => {
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');

  const handleDaySelect = (dayId) => {
    setSelectedDays(prev => 
      prev.includes(dayId)
        ? prev.filter(d => d !== dayId)
        : [...prev, dayId]
    );
  };

  const handleTimeChange = (type, value) => {
    if (type === 'start') {
      setStartTime(value);
    } else {
      setEndTime(value);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Set Your Schedule</h1>
          <p className="text-gray-600 mt-1">Choose your clinic and set your availability</p>
        </div>
        
        <div className="flex items-center gap-4">
          <img
            src={doctorData.photoUrl}
            alt={doctorData.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="font-medium text-gray-900">{doctorData.name}</h2>
            <p className="text-sm text-gray-600">{doctorData.specialization}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Clinic</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {clinicData.map((clinic) => (
              <ClinicCard
                key={clinic.id}
                clinic={clinic}
                isSelected={selectedClinic?.id === clinic.id}
                onSelect={setSelectedClinic}
              />
            ))}
          </div>
        </div>

        <div>
          <WeeklySchedule
            selectedDays={selectedDays}
            onDaySelect={handleDaySelect}
            startTime={startTime}
            endTime={endTime}
            onTimeChange={handleTimeChange}
          />
        </div>
      </div>
    </div>
  );
};