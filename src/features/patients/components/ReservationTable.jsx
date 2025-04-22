import { useState } from "react";

const ReservationTable = () => {
  const [reservations] = useState([
    {
      id: "#AP5872",
      doctor: "Dr Darren Elder",
      doctorImage: "./doctor.jpg", 
      date: "25 Apr 2025",
      status: "Scheduled",
    },
    {
      id: "#AP5870",
      doctor: "Dr Darren Elder",
      doctorImage: "./doctor.jpg", 
      date: "18 Apr 2025",
      status: "Completed",
    },
    {
      id: "#AP5868",
      doctor: "Dr Ruby Perrin",
      doctorImage: "./doctor.jpg", 
      date: "21 Apr 2025",
      status: "Scheduled",
    },
    {
      id: "#AP5866",
      doctor: "Dr Darren Elder",
      doctorImage: "./doctor.jpg", 
      date: "17 Apr 2025",
      status: "Cancelled",
    },
    {
      id: "#AP5864",
      doctor: "Dr Carl Kelly",
      doctorImage: "./doctor.jpg", 
      date: "24 Apr 2025",
      status: "Scheduled",
    },
    {
      id: "#AP5862",
      doctor: "Dr Darren Elder",
      doctorImage: "./doctor.jpg", 
      date: "15 Apr 2025",
      status: "Completed",
    },
    {
      id: "#AP5860",
      doctor: "Dr Darren Elder",
      doctorImage: "./doctor.jpg", 
      date: "15 Apr 2025",
      status: "Scheduled",
    },
    {
      id: "#AP5857",
      doctor: "Dr Darren Elder",
      doctorImage: "./doctor.jpg", 
      date: "23 Apr 2025",
      status: "Cancelled",
    },
  ]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Patient Reservations</h2>
      </div>

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
                        }}
                      />
                    </div>
                    {reservation.doctor}
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-600">{reservation.date}</td>
                <td className="p-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      reservation.status === "Scheduled"
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
    </div>
  );
};

export default ReservationTable;