import React from "react";
import StarRating from "./StarRating";

export default function DoctorProfile({ doctor }) {
    const handleScrollDown = () => {
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
      };
  return (

    <>
    <div className="w-[vh] bg-gray-200 text-center h-[130px] p-4">
        <h1 className="font-semibold text-gray-900 text-[40px] text-center">
        {doctor?.name || "Unknown Doctor"}
        </h1>
    </div>
    <div className="doctor-profile flex flex-col md:flex-row items-center bg-white  rounded-lg border border-gray-200 m-[30px] lg:mx-[100px] mx-1 pe-0 pl-[60px]" >
      {/* doctor info section */}
      <div className="flex items-center w-100 m-auto">
        <img
          src={doctor?.image || "https://via.placeholder.com/150"}
          alt="no image found"
          className="w-32 h-32 rounded-md object-cover"
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-gray-500 flex items-center">
            {doctor?.name || "Unknown Doctor"}
          </h2>
          <p className="text-sm text-gray-500">{doctor?.qualifications || "N/A"}</p>
          <p className="text-sm text-blue-500">
            {doctor?.specialties?.join(", ") || "No specialties"}
          </p>
          <StarRating rating={doctor?.rating || 2.4} />
          <button className="mt-2 text-sm text-gray-500 hover:text-gray-700 flex">
            Add to favorites
          </button>
        </div>
      </div>

      {/* patients && location section */}
      <div className="mt-4 md:mt-0 md:ml-6 grid-cols-12 lg:grid-cols-3 rounded-lg p-0 p-4 w-100">
        <p className="text-sm text-gray-600 flex items-center">
          <span className="material-icons text-purple-500 mr-2"><i/></span>
          {doctor?.patients || "0"} Patients Treated
        </p>
        <p className="text-sm text-gray-600 flex items-center mt-2 bg-gray-100 p-4 rounded-md">
          <span className="material-icons font-semibold text-gray-900 mr-2">Name</span> <br/>
        </p>
      </div>

      {/* additional info section */}
      <div className="mt-4 md:mt-0 md:ml-6 grid-cols-12 lg:grid-cols-3 rounded-lg p-0 p-4 w-100">
        <p className="text-sm text-gray-600 flex items-center">
          <span className="material-icons text-gray-500 mr-2"><i/></span>
          {doctor?.votes || "0"} Votes
        </p>
        <p className="text-sm text-gray-600 flex items-center mt-2">
          <span className="material-icons text-gray-500 mr-2"><i/></span>
          {doctor?.availability || "No availability"}
        </p>
        <p className="text-sm text-gray-600 flex items-center mt-2">
          <span className="material-icons text-gray-500 mr-2"><i/></span>
          {doctor?.feedback || "0"} Feedback
        </p>
        <p className="text-sm text-gray-600 flex items-center mt-2">
          <span className="material-icons text-gray-500 mr-2"><i/></span>
          {doctor?.price || "$0.00"}
        </p>
        <div className="flex mt-4">
          <button className="text-blue-500 border border-blue-500 border-2 rounded-sm px-2 py-2 hover:bg-blue-500 hover:text-white text-sm">
            Add Feedback
          </button>
          <button className="ml-2 text-sm text-white bg-blue-500 rounded-sm px-2 py-2 hover:bg-blue-600" onClick={handleScrollDown}>
            Book Appointment
          </button>
        </div>
      </div>
    </div>
    </>
  );
}