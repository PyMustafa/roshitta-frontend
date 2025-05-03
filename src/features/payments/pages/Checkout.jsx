import React, { useState } from "react";
import { useAuth } from "../../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { createAppointment } from "../../../api/appointments";
import { useLocation } from "react-router-dom";

export default function Checkout() {
  const { state } = useLocation();
  const { selectedClinic, selectedDay, selectedTime } = state || {};
  const [paymentMethod, setPaymentMethod] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const patientInfo = currentUser;
  console.log(selectedClinic)

  const handleConfirmBooking = async () => {
    if (!paymentMethod) {
      alert("Please choose your payment method");
      return;
    }

    try {
      const appointmentData = {
        clinic: selectedClinic.id,
        slot_id: selectedTime.id, // تأكد إن selectedTime هو كائن يحتوي على id
      };
      console.log(appointmentData)
      await createAppointment(appointmentData);
      alert("Booking confirmed successfully!");
      navigate("/appointmentsuccess"); // غيّر ده حسب اسم صفحة التأكيد اللي عندك
    } catch (error) {
      console.error(error);
      alert("Error creating appointment. Please try again.");
    }
  };

  const handleCancelBooking = () => {
    alert("Booking cancelled");
    navigate("/"); // غيّر للمكان المناسب في موقعك
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 m-[30px] md:mx-[120px] mx-1 mt-[100px]">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Checkout</h1>

      {/* Appointment Summary and Patient Details */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Appointment Summary */}
        <div className="flex-1 border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-600 mb-4">Appointment Summary</h2>
          <div className="space-y-2 text-sm text-gray-500">
            <p><strong>Clinic:</strong> {selectedClinic?.name || "N/A"}</p>
            <p><strong>Address:</strong> {selectedClinic?.address || ""}</p>
            <p><strong>Day:</strong> {selectedDay || "N/A"}</p>
            <p><strong>Time:</strong> {selectedTime?.start_time?.slice(0, 5) || "N/A"}</p>
          </div>
        </div>

        {/* Patient Details */}
        <div className="flex-1 border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-600 mb-4">Patient Details</h2>
          <div className="space-y-4 text-sm text-gray-500">
            <div>
              <h4 className="text-gray-500">Name</h4>
              <p className="border border-gray-300 rounded-md px-4 py-2">{patientInfo?.first_name || "N/A"}</p>
            </div>
            <div>
              <h4 className="text-gray-500">Email</h4>
              <p className="border border-gray-300 rounded-md px-4 py-2">{patientInfo?.email || "N/A"}</p>
            </div>
            <div>
              <h4 className="text-gray-500">Phone</h4>
              <p className="border border-gray-300 rounded-md px-4 py-2">{patientInfo?.phone || "Not provided"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mt-8 border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-600 mb-4">Payment Method</h2>
        <div className="flex flex-col space-y-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            Cash
          </label>
          {/* <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            Paypal
          </label> */}
          <p>
            paypal payment will be available soon!
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <button
          onClick={handleConfirmBooking}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg"
        >
          Confirm Booking
        </button>
        <button
          onClick={handleCancelBooking}
          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
