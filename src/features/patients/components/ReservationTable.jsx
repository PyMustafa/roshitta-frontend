import { useState, useEffect } from "react";
import defaultDoctorImage from "./doctor.jpg";

const ReservationTable = ({ apiData = [] }) => {
  const [reservations, setReservations] = useState([]);

  // Transform API data to match the expected format for the table
  useEffect(() => {
    if (apiData && apiData.length > 0) {
      const formattedReservations = apiData.map(appointment => ({
        id: `#${appointment.id.toString().slice(0, 4)}`,
        doctor: `Dr ${appointment.doctor?.name || 'Unknown'}`,
        doctorImage: appointment.doctor?.profile_image || defaultDoctorImage,
        date: new Date(appointment.appointment_time).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
        status: appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)
      }));

      setReservations(formattedReservations);
    } else {
      // Fallback to sample data if no API data is provided
      setReservations([
        {
          id: "#AP5872",
          doctor: "Dr Darren Elder",
          doctorImage: defaultDoctorImage,
          date: "25 Apr 2025",
          status: "Scheduled",
        },
        {
          id: "#AP5870",
          doctor: "Dr Darren Elder",
          doctorImage: defaultDoctorImage,
          date: "18 Apr 2025",
          status: "Completed",
        },
        {
          id: "#AP5868",
          doctor: "Dr Ruby Perrin",
          doctorImage: defaultDoctorImage,
          date: "21 Apr 2025",
          status: "Scheduled",
        }
      ]);
    }
  }, [apiData]);

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      {reservations.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No upcoming reservations found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-gray-50 rounded-t-lg overflow-hidden">
                <th className="px-4 py-3 text-sm font-semibold text-black-600 uppercase tracking-wider rounded-tl-lg">ID</th>
                <th className="px-4 py-3 text-sm font-semibold text-black-600 uppercase tracking-wider">Doctor</th>
                <th className="px-4 py-3 text-sm font-semibold text-black-600 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-sm font-semibold text-black-600 uppercase tracking-wider rounded-tr-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-200">
                  <td className="p-4 text-sm font-medium text-gray-900">{reservation.id}</td>
                  <td className="p-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                        <img
                          src={reservation.doctorImage}
                          alt={reservation.doctor}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = defaultDoctorImage;
                          }}
                        />
                      </div>
                      {reservation.doctor}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{reservation.date}</td>
                  <td className="p-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${reservation.status === "Scheduled" || reservation.status === "Confirmed"
                          ? "bg-blue-100 text-blue-800"
                          : reservation.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                    >
                      {reservation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReservationTable;