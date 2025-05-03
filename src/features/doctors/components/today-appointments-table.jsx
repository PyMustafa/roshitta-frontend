import { useState, useEffect } from "react";
import { getMyTodayAppointments } from "../../../api/appointments/doctor";
import { CalendarClock, Clock, User, MapPin, AlertCircle } from "lucide-react";

export function TodayAppointmentsTable() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const data = await getMyTodayAppointments();
        setAppointments(Array.isArray(data.results) ? data.results : []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching today's appointments:", error);
        setError("Failed to load today's appointments");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    
    try {
      // Handle different time formats
      const time = timeString.includes('T') 
        ? new Date(timeString)
        : new Date(`2000-01-01T${timeString}`);
      
      return time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      console.error("Error formatting time:", e);
      return timeString;
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'scheduled': { color: 'bg-blue-100 text-blue-800', label: 'Scheduled' },
      'confirmed': { color: 'bg-green-100 text-green-800', label: 'Confirmed' },
      'completed': { color: 'bg-gray-100 text-gray-800', label: 'Completed' },
      'cancelled': { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
      'no_show': { color: 'bg-yellow-100 text-yellow-800', label: 'No Show' },
    };

    const statusInfo = statusMap[status?.toLowerCase()] || { color: 'bg-gray-100 text-gray-800', label: status || 'Unknown' };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8 text-red-500">
        <AlertCircle className="w-5 h-5 mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <CalendarClock className="w-12 h-12 mx-auto text-gray-400 mb-3" />
        <h3 className="text-lg font-medium">No appointments today</h3>
        <p className="mt-1">You have no scheduled appointments for today.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Patient
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Clinic
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {appointment.patient?.name || appointment.patient?.first_name || "Patient"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.patient?.phone || "No phone"}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-900">{formatTime(appointment.start_time)} - {formatTime(appointment.end_time)}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-900">{appointment.clinic?.name || "No clinic"}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(appointment.status)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 