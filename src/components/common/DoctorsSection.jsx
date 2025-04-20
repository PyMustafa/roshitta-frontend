import React from 'react';

const DoctorsSection = () => {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">
            Top Doctors to Book
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Simply browse through our extensive list of trusted doctors.
          </p>
        </div>


        <div className="mt-4 sm:mt-6 flex justify-center">
          <button className="bg-gray-100 hover:bg-[#09e5ab] hover:text-white transition-colors cursor-pointer text-gray-600 px-8 py-2 md:px-12 md:py-3 rounded-full mt-6 md:mt-10 text-sm md:text-base">
            more 
          </button>
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;