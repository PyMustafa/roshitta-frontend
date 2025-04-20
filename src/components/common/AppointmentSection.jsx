import React from 'react';
import appointmentImage from '../../assets/HomePage/appointment_img.png';

const AppointmentSection = () => {
  return (
    <div className='px-4 sm:px-6 md:px-10'>
      <div className="relative mt-8 sm:mt-10 md:mt-12 mx-auto max-w-7xl">
        <div className="bg-[#5F6FFF] rounded-lg md:rounded-[10px] px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-16 lg:py-20 xl:py-24 overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between mx-auto">
            
            <div className="lg:w-[55%] text-white text-center lg:text-left lg:pl-2 lg:pr-8 z-10">
              <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold leading-tight mb-2">
                Book Appointment
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mt-0 mb-4 sm:mb-5 md:mb-6">
                With 100+ Trusted Doctors
              </h2>

              <button className="bg-white cursor-pointer text-[#595959] hover:bg-gray-100 px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 hover:scale-105">
                Create account
              </button>
            </div>

            <div className="lg:w-[45%]"></div>
          </div>
        </div>

        <div className="hidden lg:block absolute right-0 top-0 w-[40%] max-w-[450px] h-full flex items-end">
          <img
            src={appointmentImage}
            alt="Trusted Doctors"
            className="w-full h-auto max-h-[108%] object-contain"
            style={{
              transform: 'translateY(-7.2%)'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentSection;