import React, { useState, useEffect } from 'react';
import { X, Check, Clock, Building2, Plus } from 'lucide-react';
import { getMyClinics } from '../../../api/profiles/doctor';
import { createWorkingHours, updateWorkingHours } from '../../../api/clinics/workingHours';

const daysOfWeek = [
  { value: 0, label: "Saturday" },
  { value: 1, label: "Sunday" },
  { value: 2, label: "Monday" },
  { value: 3, label: "Tuesday" },
  { value: 4, label: "Wednesday" },
  { value: 5, label: "Thursday" },
  { value: 6, label: "Friday" }
];

export function WorkingHoursForm({ onSuccess, onCancel, initialData = null }) {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  
  const [formData, setFormData] = useState({
    clinic: initialData?.clinic || '',
    day_of_week: initialData?.day_of_week !== undefined ? Number(initialData.day_of_week) : '',
    start_time: initialData?.start_time || '',
    end_time: initialData?.end_time || '',
    is_active: initialData?.is_active ?? true,
  });

  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      setLoading(true);
      const data = await getMyClinics();
      setClinics(Array.isArray(data.results) ? data.results : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching clinics:', error);
      setError('Failed to load clinics');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'day_of_week' ? Number(value) : value)
    }));
  };

  const validateForm = () => {
    if (!formData.clinic) return 'Please select a clinic';
    if (formData.day_of_week === '') return 'Please select a day';
    if (!formData.start_time) return 'Please enter a start time';
    if (!formData.end_time) return 'Please enter an end time';
    
    // Validate that end time is after start time
    if (formData.start_time >= formData.end_time) {
      return 'End time must be after start time';
    }
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    try {
      setSubmitting(true);
      setError(null);
      
      // Prepare payload
      const payload = {
        ...formData,
        clinic: formData.clinic,
        day_of_week: Number(formData.day_of_week),
        start_time: formData.start_time,
        end_time: formData.end_time,
        is_active: formData.is_active
      };
      
      if (initialData?.id) {
        // Update existing working hours
        await updateWorkingHours(initialData.id, payload);
        setSuccessMessage('Working hours updated successfully');
      } else {
        // Create new working hours
        await createWorkingHours(payload);
        setSuccessMessage('Working hours added successfully');
      }
      
      // Reset form if not editing
      if (!initialData) {
        setFormData({
          clinic: '',
          day_of_week: '',
          start_time: '',
          end_time: '',
          is_active: true,
        });
      }
      
      setSubmitting(false);
      
      // Notify parent component
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }
    } catch (error) {
      console.error('Error saving working hours:', error);
      setError(error.message || 'Failed to save working hours');
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {initialData ? 'Edit Working Hours' : 'Add Working Hours'}
        </h2>
        {onCancel && (
          <button 
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md flex items-center">
          <Check className="w-5 h-5 mr-2" />
          {successMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Clinic Selection */}
          <div>
            <label htmlFor="clinic" className="block text-sm font-medium text-gray-700 mb-1">
              Clinic
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="clinic"
                name="clinic"
                value={formData.clinic}
                onChange={handleChange}
                disabled={loading}
                className="block w-full pl-10 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                required
              >
                <option value="">Select Clinic</option>
                {clinics.map(clinic => (
                  <option key={clinic.id} value={clinic.id}>
                    {clinic.name}
                  </option>
                ))}
              </select>
              {loading && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <div className="animate-spin h-5 w-5 border-2 border-gray-500 rounded-full border-t-transparent"></div>
                </div>
              )}
            </div>
          </div>
          
          {/* Day Selection - Single Day */}
          <div>
            <label htmlFor="day_of_week" className="block text-sm font-medium text-gray-700 mb-1">
              Day of Week
            </label>
            <select
              id="day_of_week"
              name="day_of_week"
              value={formData.day_of_week}
              onChange={handleChange}
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="">Select Day</option>
              {daysOfWeek.map(day => (
                <option key={day.value} value={day.value}>
                  {day.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Time Range */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="start_time" className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="time"
                  id="start_time"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="end_time" className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="time"
                  id="end_time"
                  name="end_time"
                  value={formData.end_time}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Active Status */}
          <div className="flex items-center">
            <input
              id="is_active"
              name="is_active"
              type="checkbox"
              checked={formData.is_active}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
              Active
            </label>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={submitting}
            >
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                Saving...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-1" />
                {initialData ? 'Update' : 'Add'} Schedule
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 