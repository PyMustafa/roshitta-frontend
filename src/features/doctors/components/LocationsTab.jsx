import { useAuth } from "../../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function LocationsTab({ clinics }) {
  const [selectedDay, setSelectedDay] = useState({});
  const [selectedSlot, setSelectedSlot] = useState({}); // 🆕 بقى object لكل كلينك
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  

  const handleSlotSelect = (slot, index) => {
    if (!isAuthenticated) {
      alert("You need to login to book an appointment.");
      return;
    }

    setSelectedSlot((prev) => ({
      ...prev,
      [index]: slot, // 🆕 نخزن السلوت حسب الكلينك
    }));
  };

  const handleProceedToCheckout = (index) => {
    if (selectedSlot[index]) {
      navigate("/checkout", {
        state: {
          selectedClinic: clinics[index],
          selectedDay: selectedDay[index],
          selectedTime: selectedSlot[index],
        },
      });
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
              {/* أيام الأسبوع */}
              <div className="mt-4 flex items-center space-x-2 overflow-x-auto scrollbar-hide">
                {clinic.working_hours.map((day) => (
                  <button
                    key={day.id}
                    onClick={() =>
                      setSelectedDay((prev) => ({
                        ...prev,
                        [index]: day.day_name,
                      }))
                    }
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

              {/* السلوتات */}
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
                          onClick={() => handleSlotSelect(slot, index)}
                          className={`px-4 py-2 border rounded-full text-sm ${
                            selectedSlot[index]?.id === slot.id
                              ? "bg-blue-500 text-white"
                              : slot.is_available
                              ? "text-gray-600 border-gray-300 hover:bg-blue-500 hover:text-white"
                              : "text-gray-400 border-gray-200 cursor-not-allowed"
                          }`}
                          disabled={!slot.is_available}
                        >
                          {slot.start_time.slice(0, 5)}
                        </button>
                      ))}
                  </div>

                  {/* 🆕 زرار البروسيد لكل كلينك */}
                  {selectedSlot[index] && (
                    <div className="mt-6 ">
                      <button
                        onClick={() => handleProceedToCheckout(index)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full"
                      >
                        Proceed to Checkout
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
    
  );
}

