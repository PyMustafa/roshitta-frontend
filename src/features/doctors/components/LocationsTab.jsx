import React, { useState } from "react";
import { useAuth } from "../../../context/auth/AuthContext";
import { createAppointment } from "../../../api/appointments";
export default function LocationsTab({ clinics }) {
  const [selectedDay, setSelectedDay] = useState({});
  const [selectedSlot, setSelectedSlot] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { currentUser } = useAuth(); // هنا جيبنا بيانات اليوزر
  const isDoctor = currentUser?.role === "doctor"; // هنا اتأكدنا لو كان الدكتور


  const handleBooking = async (clinicId, slotId) => {
    setLoading(true);
    try {
      const payload = {
        clinic: clinicId,
        slot_id: slotId,
      };
      const response = await createAppointment(payload);
      setModalMessage("Appointment booked successfully ✅");
      setShowModal(true);
      console.log(response);
    } catch (error) {
      setModalMessage("Failed to book appointment ❌");
      setShowModal(true);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  if (clinics.length === 0) {
    return (
      <div className="text-center text-gray-600 p-6">
        No clinics available.
      </div>
    );
  }

  return (
    <>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-xl font-bold mb-4">{modalMessage}</h2>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clinics.map((clinic, index) => (
          <div
            key={clinic.id}
            className="border border-gray-300 rounded-lg p-4 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-700">{clinic.name}</h3>
            <p className="text-sm text-gray-500">{clinic.city}</p>

            {clinic.working_hours && clinic.working_hours.length > 0 ? (
              <>
                {/* Days */}
                <div className="mt-4 flex items-center space-x-2 overflow-x-auto scrollbar-hide">
                  {clinic.working_hours.map((day) => (
                    <button
                      key={day.id}
                      onClick={() => {
                        setSelectedDay((prev) => ({ ...prev, [index]: day.day_name }));
                        setSelectedSlot((prev) => ({ ...prev, [index]: null }));
                      }}
                      className={`px-4 py-2 border rounded-full text-sm min-w-[100px] ${
                        selectedDay[index] === day.day_name
                          ? "bg-blue-500 text-white"
                          : "border-gray-300 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {day.day_name}
                    </button>
                  ))}
                </div>

                {/* Slots */}
                {clinic.working_hours.find(
                  (day) => day.day_name === selectedDay[index]
                )?.slots.length > 0 ? (
                  <>
                    <p className="w-100 m-3 mt-[30px] text-gray-700">
                      Available appointments
                    </p>
                    <div className="mt-4 overflow-x-auto flex items-center space-x-2">
                      {clinic.working_hours
                        .find((day) => day.day_name === selectedDay[index])
                        ?.slots.map((slot) => (
                          <button
                            key={slot.id}
                            onClick={() =>
                              setSelectedSlot((prev) => ({
                                ...prev,
                                [index]: slot,
                              }))
                            }
                            className={`px-4 py-2 border rounded-full text-sm ${
                              slot.is_available
                                ? selectedSlot[index]?.id === slot.id
                                  ? "bg-green-500 text-white"
                                  : "text-gray-600 border-gray-300 hover:bg-blue-500 hover:text-white"
                                : "text-gray-400 border-gray-200 cursor-not-allowed"
                            }`}
                            disabled={!slot.is_available || isDoctor}
                          >
                            {slot.start_time.slice(0, 5)}
                          </button>
                        ))}
                    </div>

                    {/* Confirm Button */}
                    {selectedSlot[index] && (
                      <div className="mt-4">
                        <button
                          onClick={() =>
                            handleBooking(clinic.id, selectedSlot[index].id)
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
                          disabled={loading}
                        >
                          {loading ? "Booking..." : "Confirm Appointment"}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-gray-600 mt-4">
                    Select a day to view the available appointments
                  </p>
                )}
              </>
            ) : (
              <p className="text-gray-600 mt-4">
                No schedule available for this clinic.
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
