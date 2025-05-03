import React from 'react';
import { ClinicsTable } from '../components/clinics-table';
import { useAuth } from '../../../context/auth/AuthContext';
import { Navigate } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import Navbar from '../../../components/common/Navbar';

const ClinicPage = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser || currentUser.user_type !== 'doctor') {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="w-full">
      <Navbar />
      
      {/* Main content area with top padding for navbar */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-16">
        {/* Clinics Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Your Clinics</h2>
          </div>
          <ClinicsTable />
        </div>
      </div>
    </div>
  );
};

export default ClinicPage; 