import React from 'react';
import smallImage from '../../assets/HomePage/header.png';
import largeImage from '../../assets/HomePage/group_profiles.png';

const HeaderSection = () => {
  return (
    <div className="bg-[#5F6FFF] rounded-[10px] mx-4 sm:mx-8 md:mx-16 lg:mx-32 mt-26 px-6 sm:px-10 md:px-16 py-10">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
        
        {/* Text Section */}
        <div className="lg:w-1/2 text-white text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.3]">
            Book Appointment <br />
            With Trusted Doctors
          </h1>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mt-6">
            <img 
              src={largeImage} 
              alt="Group of doctors"
              className="w-24 h-12 rounded-full object-cover"
            />
            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-s mt-1">
              Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
            </p>
          </div>

          <div className="mt-4 sm:mt-6">
            <button className="flex items-center justify-center cursor-pointer gap-2 bg-white px-8 py-3 rounded-full text-[#595959] text-sm hover:scale-105 transition-all duration-300 mx-auto lg:mx-0">
              Book appointment
              <span className="text-base">→</span>
            </button>
          </div>
        </div>

        {/* Image Section */}
        
        <div className="lg:w-1/2 relative w-full hidden lg:block">
          <img 
            src={smallImage} 
            alt="Trusted Doctors"
            className="w-full h-auto rounded-xl object-cover lg:translate-y-10"
          />
        </div>

      </div>
    </div>
  );
};

export default HeaderSection;
