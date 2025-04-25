import { useState } from "react"
import { Eye } from "lucide-react"

export function AppointmentsTable() {
  const [appointments] = useState([
    {
      id: 1,
      patientName: "Emily Rival",
      patientImage: "/placeholder.svg?height=40&width=40",
      date: "17 Apr 2025",
      status: "Confirmed",
      fee: 101.0,
    },
    {
      id: 2,
      patientName: "Emily Rival",
      patientImage: "/placeholder.svg?height=40&width=40",
      date: "15 Apr 2025",
      status: "Confirmed",
      fee: 101.0,
    },
    {
      id: 3,
      patientName: "Emily Rival",
      patientImage: "/placeholder.svg?height=40&width=40",
      date: "15 Apr 2025",
      status: "Confirmed",
      fee: 101.0,
    },
  ])

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-100">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">Patient Appointments</h2>
      </div>

      <div className="md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 text-sm border-b border-gray-100">
              <th className="px-6 py-4 font-medium">Patient Name</th>
              <th className="px-6 py-4 font-medium">Appt Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Consultation Fee</th>
              <th className="px-6 py-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <img
                        src={appointment.patientImage || "/placeholder.svg"}
                        alt={appointment.patientName}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium text-gray-700">{appointment.patientName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{appointment.date}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : appointment.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">${appointment.fee.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center text-sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
 )
}
