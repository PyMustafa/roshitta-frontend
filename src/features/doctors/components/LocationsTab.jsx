import React, { useState } from "react";

export default function LocationsTab({ clinics }) {
  const [selectedDay, setSelectedDay] = useState({});

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {clinics.map((clinic, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg p-4 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-700">{clinic.name}</h3>
          <p className="text-sm text-gray-500">{clinic.address}</p>

          {/* Check if the clinic has a schedule */}
          {clinic.schedule && Object.keys(clinic.schedule).length > 0 ? (
            <>
              {/* Days of the Week */}
              <div className="mt-4 flex items-center space-x-2 overflow-x-auto scrollbar-hide">
                {Object.keys(clinic.schedule).map((day) => (
                  <button
                    key={day}
                    onClick={() =>
                      setSelectedDay((prev) => ({
                        ...prev,
                        [index]: day,
                      }))
                    }
                    className={`px-4 py-2 border rounded-full text-sm ${
                      selectedDay[index] === day
                        ? "bg-blue-500 text-white h-[100px]"
                        : "border-gray-300 text-gray-600 hover:bg-gray-100 h-[100px]"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>

              {/* Appointments for Selected Day */}
              {clinic.schedule?.[selectedDay[index]]?.length > 0 ? (
                <>
                  <p className="w-100 m-3 mt-[30px] text-gray-700">
                    Available appointments
                  </p>
                  <div className="mt-4 overflow-x-auto flex items-center space-x-2">
                    {clinic.schedule[selectedDay[index]].map(
                      (appointment, idx) => (
                        <button
                          key={idx}
                          className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-600 hover:bg-blue-500 hover:text-white"
                        >
                          {appointment}
                        </button>
                      )
                    )}
                  </div>
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
  );
}