import React, { useState, useEffect } from 'react';
import { DoctorAppointmentsTable } from '../components/doctor-appointments-table';
import { Calendar, Clock, User, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getMyTodayAppointments, getMyUpcomingAppointments } from '../../../api/appointments/doctor';
import { getMyAppointments } from '../../../api/appointments/doctor';

const AppointmentPage = () => {
  const [stats, setStats] = useState({
    today: 0,
    upcoming: 0,
    completed: 0,
    cancelled: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [todayData, upcomingData, allData] = await Promise.all([
        getMyTodayAppointments(),
        getMyUpcomingAppointments(),
        getMyAppointments({ limit: 30 }) // Reduced from 100 to 30 to prevent server error
      ]);

      const completed = allData.results?.filter(
        appointment => appointment.status?.toLowerCase() === 'completed'
      ).length || 0;

      const cancelled = allData.results?.filter(
        appointment => appointment.status?.toLowerCase() === 'cancelled'
      ).length || 0;

      setStats({
        today: todayData.count || 0,
        upcoming: upcomingData.count || 0,
        completed,
        cancelled,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Error fetching appointment stats:', error);
      setStats(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load statistics'
      }));
    }
  };

  return (
    <div className="w-full">
      {/* Page header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Appointments</h1>
            <p className="text-gray-600">Manage your appointments and schedule</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Link
              to="/doctor/clinics/schedule"
              className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
            >
              <Calendar className="h-4 w-4 mr-1" />
              Clinic Schedules
            </Link>
            <Link
              to="/doctor/timings"
              className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
            >
              <Clock className="h-4 w-4 mr-1" />
              Availability
            </Link>
            <button
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
            >
              <LinkIcon className="h-4 w-4 mr-1" />
              Create Link
            </button>
          </div>
        </div>
      </div>
      
      {/* Quick stats */}
      {stats.error ? (
        <div className="mb-6 p-4 bg-red-50 rounded-md text-red-600 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          <span>Failed to load appointment statistics</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Today</p>
                <p className="text-2xl font-bold mt-1">
                  {stats.loading ? (
                    <span className="inline-block w-8 h-7 bg-gray-200 animate-pulse rounded"></span>
                  ) : (
                    stats.today
                  )}
                </p>
              </div>
              <div className="p-2 rounded-full bg-blue-100">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Upcoming</p>
                <p className="text-2xl font-bold mt-1">
                  {stats.loading ? (
                    <span className="inline-block w-8 h-7 bg-gray-200 animate-pulse rounded"></span>
                  ) : (
                    stats.upcoming
                  )}
                </p>
              </div>
              <div className="p-2 rounded-full bg-green-100">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Completed</p>
                <p className="text-2xl font-bold mt-1">
                  {stats.loading ? (
                    <span className="inline-block w-8 h-7 bg-gray-200 animate-pulse rounded"></span>
                  ) : (
                    stats.completed
                  )}
                </p>
              </div>
              <div className="p-2 rounded-full bg-purple-100">
                <User className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Cancelled</p>
                <p className="text-2xl font-bold mt-1">
                  {stats.loading ? (
                    <span className="inline-block w-8 h-7 bg-gray-200 animate-pulse rounded"></span>
                  ) : (
                    stats.cancelled
                  )}
                </p>
              </div>
              <div className="p-2 rounded-full bg-red-100">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Appointments table */}
      <DoctorAppointmentsTable />
    </div>
  );
};

export default AppointmentPage;