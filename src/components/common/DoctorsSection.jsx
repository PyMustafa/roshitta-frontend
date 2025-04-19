import React from 'react';

const DoctorsSection = () => {
  const doctors = [
    { name: "Dr. Richard James", specialty: "General physician", available: true },
    { name: "Dr. Emily Larson", specialty: "Gynecologist", available: true },
    { name: "Dr. Sarah Patel", specialty: "Dermatologist", available: true },
    { name: "Dr. Christopher Lee", specialty: "Pediatricians", available: true },
    { name: "Dr. Jennifer Garcia", specialty: "Neurologist", available: true },
    { name: "Dr. Andrew Williams", specialty: "Gastroenterologist", available: true },
  ];

  const handleMoreClick = () => {
    console.log("More button clicked");
    // يمكنك إضافة أي وظيفة تريدينها هنا
  };

  return (
    <section className="py-12 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Top Doctors to Book</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simply browse through our extensive list of trusted doctors.
          </p>
        </div>

        

        <div className="mt-4 sm:mt-6 flex justify-center">
            <button className="bg-gray-100 text-gray-600 px-12 py-3 rounded-full mt-10">
                more
            </button>
        </div>

      </div>
    </section>
  );
};

export default DoctorsSection;