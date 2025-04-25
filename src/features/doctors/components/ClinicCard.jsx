import React from 'react';
import { MapPin, Building2, CheckSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge2';

export const ClinicCard = ({ clinic, isSelected, onSelect }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-primary-500' : 'hover:shadow-lg'
      }`}
      onClick={() => onSelect(clinic)}
    >
      <div className="h-48">
        <img 
          src={clinic.image} 
          alt={clinic.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{clinic.name}</h3>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <p className="text-sm">{clinic.address}</p>
            </div>
          </div>
          {isSelected && (
            <CheckSquare className="w-6 h-6 text-primary-500" />
          )}
        </div>
        {/* Additional information can be added here if needed */}
      </div>
    </div>
  );
};