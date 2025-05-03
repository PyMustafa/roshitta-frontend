import { useState, useEffect } from "react";
import { Users, Calendar, Clock, DollarSign } from "lucide-react";
import { getMyDoctorPatients } from "../../../api/profiles/patient";
import { getMyTodayAppointments } from "../../../api/appointments/doctor";

export function StatsCards() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    completedAppointments: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total patients
        const patientsData = await getMyDoctorPatients({ limit: 1 });
        
        // Fetch today's appointments
        const appointmentsData = await getMyTodayAppointments();
        
        // Calculate completed appointments from today's appointments
        const completedCount = appointmentsData.results?.filter(
          appointment => appointment.status?.toLowerCase() === 'completed'
        ).length || 0;
        
        setStats({
          totalPatients: patientsData.count || 0,
          todayAppointments: appointmentsData.results?.length || 0,
          completedAppointments: completedCount,
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-blue-100 mr-3">
            <Users className="h-4 w-4 text-blue-600" />
          </div>
          <span className="text-gray-500 text-sm">Total Patients</span>
        </div>
        <p className="text-2xl font-bold mt-2">
          {stats.loading ? (
            <span className="inline-block w-10 h-6 bg-gray-200 animate-pulse rounded"></span>
          ) : (
            stats.totalPatients
          )}
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-yellow-100 mr-3">
            <Calendar className="h-4 w-4 text-yellow-600" />
          </div>
          <span className="text-gray-500 text-sm">Today's Appointments</span>
        </div>
        <p className="text-2xl font-bold mt-2">
          {stats.loading ? (
            <span className="inline-block w-10 h-6 bg-gray-200 animate-pulse rounded"></span>
          ) : (
            stats.todayAppointments
          )}
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-green-100 mr-3">
            <Clock className="h-4 w-4 text-green-600" />
          </div>
          <span className="text-gray-500 text-sm">Completed</span>
        </div>
        <p className="text-2xl font-bold mt-2">
          {stats.loading ? (
            <span className="inline-block w-10 h-6 bg-gray-200 animate-pulse rounded"></span>
          ) : (
            stats.completedAppointments
          )}
        </p>
      </div>
    </div>
  );
}
