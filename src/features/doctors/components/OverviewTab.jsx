import React from "react";

export default function OverviewTab({ doctorInfo }) {
  console.log(doctorInfo)
  if (!doctorInfo) {
    return <div className="text-center text-gray-600">No information available.</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">About the Doctor</h2>
      <p className="mt-2 text-gray-600">{doctorInfo.description || "No bio available."}</p>
    </div>
  );
}