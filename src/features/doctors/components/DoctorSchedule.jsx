import React, { useState } from "react";
import Tabs from "./Taps";
import LocationsTab from "./LocationsTab";
import OverviewTab from "./OverviewTab";
import Gallery from "./Gallery";
import Reviews from "./Reviews";

export default function DoctorSchedule() {
  const [activeTab, setActiveTab] = useState("locations");

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
        // Tue: ["11:30", "12:00", "12:30"],
        // Wed: ["13:00", "13:30", "14:00"],
        // Thu: ["15:00", "15:30", "16:00"],
        // Fri: ["17:00", "17:30", "18:00"],
        // Sat: ["09:00", "09:30", "10:00"],
        // Sun: ["11:00", "11:30", "12:00"],
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
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab Content */}
      <div className="mt-4">
      {activeTab === "locations" && <LocationsTab clinics={clinics} />}
      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "gallery" && <p className="text-sm text-gray-600"><Gallery/></p>}
      {activeTab === "reviews" && <p className="text-sm text-gray-600"><Reviews/></p>}
      </div>
    </div>
  );
}

