import React from 'react';
import { FaUserShield, FaCalendarAlt, FaClinicMedical } from 'react-icons/fa';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaUserShield className="text-2xl sm:text-3xl text-[#5F6FFF] flex-shrink-0" />,
      title: "Patient-Centered Approach",
      description: "We prioritize your comfort and preferences, tailoring our services to meet your individual needs and Care from Our Experts."
    },
    {
      icon: <FaCalendarAlt className="text-2xl sm:text-3xl text-[#5F6FFF] flex-shrink-0" />,
      title: "Convenient Access",
      description: "Easily book appointments online or through our dedicated customer service team, with flexible hours to fit your schedule."
    },
    {
      icon: <FaClinicMedical className="text-2xl sm:text-3xl text-[#5F6FFF] flex-shrink-0" />,
      title: "Follow-Up Care",
      description: "We ensure continuity of care through regular follow-ups and communication, helping you stay on track with health goals."
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block bg-[#5F6FFF] text-white text-sm sm:text-lg px-3 py-1 rounded-full mb-3 sm:mb-4">
            • Compelling Reasons to Choose •
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
           Appliance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 relative">
          {features.map((feature, index) => (
            <div key={index} className="relative">
              <div className="hidden md:block absolute left-0 top-0 bottom-0">
                <div className="h-full border-l-2 border-dotted border-gray-300"></div>
              </div>
              
              <div className="flex items-start gap-4 sm:gap-6 px-4 sm:px-6">
                <div className="mt-0.5 sm:mt-1">
                  {feature.icon}
                </div>
                
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;