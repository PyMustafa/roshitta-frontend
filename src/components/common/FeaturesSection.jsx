import React from 'react';
import { FaUserShield, FaCalendarAlt, FaClinicMedical } from 'react-icons/fa';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaUserShield className="text-3xl text-[#5F6FFF]" />,
      title: "Patient-Centered Approach",
      description: "We prioritize your comfort and preferences, tailoring our services to meet your individual needs and Care from Our Experts."
    },
    {
      icon: <FaCalendarAlt className="text-3xl text-[#5F6FFF]" />,
      title: "Convenient Access",
      description: "Easily book appointments online or through our dedicated customer service team, with flexible hours to fit your schedule."
    },
    {
      icon: <FaClinicMedical className="text-3xl text-[#5F6FFF]" />,
      title: "Follow-Up Care",
      description: "We ensure continuity of care through regular follow-ups and communication, helping you stay on track with health goals."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#5F6FFF] text-white text-lg px-3 py-1 rounded-full mb-4">
            • Compelling Reasons to Choose •
          </span>
          <h2 className="text-4xl font-bold text-gray-900">
            Our Approach
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          
          
          {features.map((feature, index) => (
            <div key={index} className="relative">
              <div className="hidden md:block absolute left-0 top-0 bottom-0">
                <div className="h-full border-l-2 border-dotted border-gray-300"></div>
              </div>
              
              <div className="px-6 flex items-start gap-4">
                <div className="mt-1">
                  {feature.icon}
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 inline-block">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
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