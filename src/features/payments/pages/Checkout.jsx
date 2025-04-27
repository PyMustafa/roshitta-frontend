import React, { useState } from "react";

export default function Checkout({ selectedClinic, selectedDay, selectedTime, patientInfo }) {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleConfirmBooking = () => {
    {/* make sure to pass the patient info object */}
    if (!paymentMethod) {
      alert("Please choose your payment method");
      return;
    }

    alert(`Booking confirmed for ${patientInfo.name} at ${selectedTime}`);
  };

  const handleCancelBooking = () => {
    alert("Booking cancelled");
    {/* add home route or something */}
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 m-[30px] md:mx-[120px] mx-1 ">
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">Checkout</h1>

      {/* Appointment Summary and Patient Details in the same row */}
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Appointment Summary */}
        <div className="flex-1 p-4">
          <h2 className="text-lg font-semibold text-gray-600">Appointment Summary</h2>
          <p className="text-sm text-gray-500 mt-2">
            <strong>Clinic:</strong> {selectedClinic?.name || "N/A"}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            <strong>Address:</strong> {selectedClinic?.address || "N/A"}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            <strong>Day:</strong> {selectedDay || "N/A"}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            <strong>Time:</strong> {selectedTime || "N/A"}
          </p>
        </div>

        {/* Patient Details */}
        <div className="flex-1 p-4">
          <h2 className="text-lg font-semibold text-gray-600">Patient Details</h2>
          <div className="mt-2">
            <h4 className="block text-sm text-gray-500 mb-1">Name</h4>
            <p className="w-full px-4 py-2 text-sm">{patientInfo.name}</p>
          </div>
          <div className="mt-4">
            <h4 className="block text-sm text-gray-500 mb-1">Email</h4>
            <p className="w-full px-4 py-2 text-sm">{patientInfo.email}</p>
          </div>
          <div className="mt-4">
            <h4 className="block text-sm text-gray-500 mb-1">Phone</h4>
            <p className="w-full px-4 py-2 text-sm">{patientInfo.phone}</p>
          </div>
        </div>
      </div>

      {/* Payment Options */}
      <div className="mb-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-600">Payment Method</h2>
        <div className="mt-2 flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Cash
          </label>
          {/* <p>{paymentMethod}</p> */}
        </div>
        <div className="mt-2 flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            paypal
          </label>
          {/* <p>{paymentMethod}</p> */}
        </div>
      </div>
      {/* Confirm and Cancel Buttons */}
      <div className="mt-6">
        <button
          onClick={handleConfirmBooking}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Confirm Booking
        </button>
      </div>
      <div className="mt-6">
        <button
          onClick={handleCancelBooking}
          className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
        >
          Cancel 
        </button>
        <div>{typeof(patientInfo)}</div>
      </div>
    </div>
  );
}