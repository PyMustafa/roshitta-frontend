import React, { useState, useEffect } from "react";
import Tabs from "./Taps";
import LocationsTab from "./LocationsTab";
import OverviewTab from "./OverviewTab";
import Gallery from "./Gallery";
import Reviews from "./Reviews";
import { getDoctorClinics } from "../../../api/profiles/doctor";
export default function DoctorSchedule({ doctorId }) {
  const [clinics, setClinics] = useState([]);
  const [doctorInfo, setDoctorInfo] = useState(null); // 🆕 دكتور انفو
  const [activeTab, setActiveTab] = useState("locations");
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: "locations", label: "Clinics and Appointments" },
    // { id: "overview", label: "Overview" },
    { id: "gallery", label: "Blogs" },
    { id: "reviews", label: "Reviews" },
  ];

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const data = await getDoctorClinics(doctorId);
        setClinics(data.results);
        setDoctorInfo(data.results); // 🆕 تأكد إن الـ API بيرجع دكتور، أو نزبطها حسب الريسبونس
      } catch (error) {
        console.error("Error fetching clinics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, [doctorId]); // حطيت doctorId هنا عشان لو اتغير

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 m-[30px] lg:mx-[120px] mx-1 p-[50px]">
      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "locations" && <LocationsTab clinics={clinics} />}
        {activeTab === "overview" && <OverviewTab doctorInfo={doctorInfo} />}
        {activeTab === "gallery" && (
          <p className="text-sm text-gray-600">
            <Gallery />
          </p>
        )}
        {activeTab === "reviews" && (
          <p className="text-sm text-gray-600">
            <Reviews />
          </p>
        )}
      </div>
    </div>
  );
}
