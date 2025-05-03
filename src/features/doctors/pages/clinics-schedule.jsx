import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth/AuthContext";
import { Navigate } from "react-router-dom";
import { Calendar, Building2, Plus } from "lucide-react";
import { WorkingHoursTable } from "../components/working-hours-table";
import { WorkingHoursForm } from "../components/working-hours-form";

export default function ClinicsSchedule() {
  const { currentUser } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  
  if (!currentUser || currentUser.user_type !== 'doctor') {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="w-full">
      {/* Main content area */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Clinic Schedules</h1>
            <p className="text-gray-600 mt-1">Manage your working hours and locations</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Schedule
            </button>
          </div>
        </div>
        
        {/* Working Hours Management */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Clinics Working Hours</h2>
            <div className="text-sm text-gray-500">
              <Calendar className="w-4 h-4 inline mr-1" />
              <span>Week of {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
          
          {showAddForm ? (
            <div className="p-6">
              <WorkingHoursForm 
                onSuccess={() => setShowAddForm(false)}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          ) : (
            <WorkingHoursTable />
          )}
        </div>
      </div>
    </div>
  );
} 