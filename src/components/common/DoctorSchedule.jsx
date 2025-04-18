import React, { useState } from "react";

export default function DoctorSchedule() {
  const [activeTab, setActiveTab] = useState("locations");
  const [selectedDay, setSelectedDay] = useState({}); // Tracks the selected day for each clinic

  const tabs = [
    { id: "locations", label: "Locations" },
    { id: "overview", label: "Overview" },
    { id: "gallery", label: "Gallery" },
    { id: "reviews", label: "Reviews" },
  ];

  const clinics = [
    {
      name: "Clinic 1",
      address: "123 Main Street, City",
      schedule: {
        Tue: ["11:30", "12:00", "12:30"],
        Wed: ["13:00", "13:30", "14:00"],
        Thu: ["15:00", "15:30", "16:00"],
        Fri: ["17:00", "17:30", "18:00"],
        Sat: ["09:00", "09:30", "10:00"],
        Sun: ["11:00", "11:30", "12:00"],
      },
    },
    {
      name: "Clinic 2",
      address: "456 Elm Street, City",
      schedule: {
        Mon: ["09:00", "09:30", "10:00"],
        Tue: ["10:30", "11:00", "11:30"],
        Wed: ["12:00", "12:30", "13:00"],
        Thu: ["14:00", "14:30", "15:00"],
        Fri: ["16:00", "16:30", "17:00"],
        Sat: ["18:00", "18:30", "19:00"],
        Sun: ["20:00", "20:30", "21:00"],
      },
    },
  ];
  

  return (
    <div className="border border-gray-200 rounded-lg p-4 m-[30px] lg:mx-[120px] mx-1 p-[50px]">
      {/* Tabs */}
      <div className="flex flex-col md:flex-row border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 text-center py-2 px-4 text-sm font-medium ${
              activeTab === tab.id
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "locations" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clinics.map((clinic, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-4 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-700">
                  {clinic.name}
                </h3>
                <p className="text-sm text-gray-500">{clinic.address}</p>

                {/* Days of the Week */}
                <div className="mt-4 flex items-center space-x-2 overflow-x-auto">
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
                <p className="w-100 m-3 mt-[30px] text-gray-700"> available appointments</p>
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
                  <p className="text-gray-600 mt-4">select a day to view the available appointments</p>
                )}
              </div>
              
            ))}
          </div>
        )}
        {activeTab !== "locations" && (
          <p className="text-sm text-gray-600">
            This is the {tabs.find((tab) => tab.id === activeTab)?.label} tab
            content.
          </p>
        )}
      </div>
    </div>
  );
}

