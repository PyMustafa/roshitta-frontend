import { StatsCards } from "../components/stats-cards.jsx"
import { useAuth } from "../../../context/auth/AuthContext.jsx";
import { Navigate } from 'react-router-dom';
import { Calendar } from "lucide-react";
import { TodayAppointmentsTable } from "../components/today-appointments-table.jsx";
import Navbar from "../../../components/common/Navbar.jsx";

export default function DoctorDashboard() {
  const { currentUser } = useAuth();
  
  if (!currentUser || currentUser.user_type !== 'doctor') {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="w-full">
      <Navbar />
      
      {/* Main content area with top padding for navbar */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-16">
        {/* Welcome Banner */}
        <div className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                Welcome back, Dr. {currentUser?.first_name || 'Doctor'}!
              </h1>
              <p className="mt-1 text-blue-100">
                Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="hidden md:block bg-white/10 p-3 rounded-lg backdrop-blur-sm">
              <Calendar className="h-8 w-8" />
            </div>
          </div>
        </div>
        
        {/* Stats Cards */}
        <StatsCards />
        
        {/* Today's Appointments Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Today's Appointments</h2>
          </div>
          <TodayAppointmentsTable />
        </div>
      </div>
    </div>
  );
}
