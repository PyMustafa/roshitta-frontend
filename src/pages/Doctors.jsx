import Navbar from '../components/common/Navbar';
import DoctorsFilter from '../components/common/DoctorsFilter';
import DoctorCard from '../components/common/DoctorCard';
import { useEffect, useState } from 'react';
import { getDoctors } from '../api/profiles/doctor';
import doc1 from '../assets/Doctors/doc1.png';
import doc2 from '../assets/Doctors/doc2.png';
import doc3 from '../assets/Doctors/doc3.png';
import doc4 from '../assets/Doctors/doc4.png';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const data = await getDoctors();   // هنا بتجيب الدكاترة من السيرفر
        setDoctors(data.results);          // لو عندك pagination غالباً هيبقى data.results
        console.log(data.results)
      } catch (err) {
        console.error('Failed to fetch doctors:', err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  // const doctors = [
  //   { name: "Dr. Richard James", specialty: "General physician", available: true, image: doc1 },
  //   { name: "Dr. Emily Larson", specialty: "Gynecologist", available: true, image: doc2 },
  //   { name: "Dr. Sarah Patel", specialty: "Dermatologist", available: true, image: doc3 },
  //   { name: "Dr. Christopher Lee", specialty: "Pediatrician", available: true, image: doc4 },
  //   { name: "Dr. Michael Brown", specialty: "Cardiologist", available: false, image: doc1 },
  //   { name: "Dr. Jessica Wilson", specialty: "Neurologist", available: true, image: doc2 },
  //   { name: "Dr. David Garcia", specialty: "Orthopedist", available: true, image: doc3 },
  //   { name: "Dr. Olivia Martinez", specialty: "Psychiatrist", available: false, image: doc4 },
  //   { name: "Dr. William Taylor", specialty: "Dentist", available: true, image: doc1 },
  //   { name: "Dr. Sophia Anderson", specialty: "Ophthalmologist", available: true, image: doc2 },
  //   { name: "Dr. James Thomas", specialty: "Endocrinologist", available: true, image: doc3 },
  //   { name: "Dr. Emma Hernandez", specialty: "Rheumatologist", available: false, image: doc4 },
  // ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex flex-col lg:flex-row pt-16">
        {/* Sidebar - Filters */}
        <div className="w-full lg:w-1/4 p-4 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto">
          <DoctorsFilter />
        </div>

        {/* Main Content - Doctors Cards */}
        <div className="w-full lg:w-3/4 p-4 lg:p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Available Doctors ({doctors.length})</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {doctors.map((doctor, index) => (
              <DoctorCard key={index} doctor={doctor} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;