import React from 'react';
import { weekDays } from '../utils/mockData';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button2';

export const WeeklySchedule = ({ 
  selectedDays, 
  onDaySelect,
  startTime,
  endTime,
  onTimeChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Schedule</h3>
      
      <div className="grid grid-cols-7 gap-2 mb-6">
        {weekDays.map((day) => (
          <button
            key={day.id}
            onClick={() => onDaySelect(day.id)}
            className={`p-3 rounded-lg text-center transition-colors ${
              selectedDays.includes(day.id)
                ? 'bg-primary-500 text-white'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="block text-sm font-medium">{day.short}</span>
          </button>
        ))}
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Clock className="w-4 h-4 mr-2" />
            Consultation Hours
          </label>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Start Time</label>
              <select
                value={startTime}
                onChange={(e) => onTimeChange('start', e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                    {`${i.toString().padStart(2, '0')}:00`}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">End Time</label>
              <select
                value={endTime}
                onChange={(e) => onTimeChange('end', e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                    {`${i.toString().padStart(2, '0')}:00`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Button variant="primary" fullWidth>
          Save Schedule
        </Button>
      </div>
    </div>
  );
};