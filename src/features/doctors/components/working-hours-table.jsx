import React, { useState, useEffect } from 'react';
import { Clock, Trash2, Edit, Calendar, AlertCircle, Plus } from 'lucide-react';
import { getWorkingHours, deleteWorkingHours } from '../../../api/clinics/workingHours';
import { WorkingHoursForm } from './working-hours-form';

const daysOfWeek = [
  "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
];

export function WorkingHoursTable() {
  const [workingHours, setWorkingHours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingHours, setEditingHours] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchWorkingHours();
  }, []);

  const fetchWorkingHours = async () => {
    try {
      setLoading(true);
      const data = await getWorkingHours();
      setWorkingHours(Array.isArray(data.results) ? data.results : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching working hours:', error);
      setError('Failed to load schedules');
      setLoading(false);
    }
  };

  const handleAddSuccess = () => {
    setShowAddForm(false);
    fetchWorkingHours();
  };

  const handleEditSuccess = () => {
    setEditingHours(null);
    fetchWorkingHours();
  };

  const handleDelete = async (id) => {
    try {
      await deleteWorkingHours(id);
      setShowDeleteConfirm(null);
      fetchWorkingHours();
    } catch (error) {
      console.error('Error deleting working hours:', error);
      setError('Failed to delete schedule');
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    
    try {
      // Convert 24-hour time (HH:MM:SS) to 12-hour format
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    } catch (e) {
      console.error('Error formatting time:', e);
      return timeString;
    }
  };

  const formatDays = (dayOfWeek) => {
    if (dayOfWeek === null || dayOfWeek === undefined) return 'N/A';
    
    // Convert to number to ensure proper handling
    const dayIndex = Number(dayOfWeek);
    if (isNaN(dayIndex) || dayIndex < 0 || dayIndex > 6) {
      return 'Invalid Day';
    }
    return daysOfWeek[dayIndex];
  };

  if (editingHours) {
    return (
      <WorkingHoursForm 
        initialData={editingHours}
        onSuccess={handleEditSuccess}
        onCancel={() => setEditingHours(null)}
      />
    );
  }

  if (showAddForm) {
    return (
      <WorkingHoursForm 
        onSuccess={handleAddSuccess}
        onCancel={() => setShowAddForm(false)}
      />
    );
  }

  return (
    <div>
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>{error}</span>
        </div>
      )}
      
      <div className="flex justify-between items-center mb-4 px-6 py-3">
        <h2 className="text-lg font-semibold text-gray-800">Working Hours</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Schedule
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : workingHours.length === 0 ? (
        <div className="text-center py-12 px-4">
          <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900">No schedules found</h3>
          <p className="mt-1 text-gray-500">Get started by adding a new working hours schedule.</p>
          <div className="mt-6">
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Schedule
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clinic
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Day
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hours
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workingHours.map((hours) => (
                <tr key={hours.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {hours.clinic_name || 'Unknown Clinic'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDays(hours.day_of_week)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Clock className="h-4 w-4 text-gray-500 mr-1" />
                      <span>{formatTime(hours.start_time)} - {formatTime(hours.end_time)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      hours.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {hours.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setEditingHours(hours)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      
                      {showDeleteConfirm === hours.id ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleDelete(hours.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Confirm Delete"
                          >
                            <span className="text-xs font-semibold">Yes</span>
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(null)}
                            className="text-gray-600 hover:text-gray-900"
                            title="Cancel"
                          >
                            <span className="text-xs font-semibold">No</span>
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowDeleteConfirm(hours.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 