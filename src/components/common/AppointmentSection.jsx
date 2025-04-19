import React from 'react';
import appointmentImage from '../../assets/HomePage/appointment_img.png';

const AppointmentSection = () => {
  return (
    <div className="relative mt-12 mx-4 sm:mx-12 md:mx-20 lg:mx-32 xl:mx-40">
      
      <div className="bg-[#5F6FFF] rounded-[10px]  px-8 sm:px-12 md:px-16 lg:px-20 py-16 lg:py-24 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto">
          
          <div className="lg:w-[55%] text-white text-center lg:text-left lg:pl-2 lg:pr-8 z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-2">
              Book Appointment
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-0 mb-6">
              With <span className="font-bold">100+</span> Trusted Doctors
            </h2>

            <button className="bg-white text-[#595959] hover:bg-gray-100 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
              Create account
            </button>
          </div>

          <div className="lg:w-[45%]"></div>
        </div>
      </div>

      <div className="hidden lg:block absolute right-8 sm:right-12 md:right-20 lg:right-32 xl:right-40 top-0 w-[40%] max-w-[450px] h-full flex items-end">
        <img
          src={appointmentImage}
          alt="Trusted Doctors"
          className="w-full h-auto max-h-[108%] object-contain"
          style={{
            transform: 'translateY(-7.3%)'
          }}
        />
      </div>
    </div>
  );
};

export default AppointmentSection;