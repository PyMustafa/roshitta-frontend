import Navbar from '../components/common/Navbar';
import DoctorsFilter from '../components/common/DoctorsFilter';
import DoctorCard from '../components/common/DoctorCard';
import Pagination from '../components/common/Pagination';
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
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    gender: '',
    specialty: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8; // You can adjust this number

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const params = {};
        if (filters.search) params.search = filters.search;
        if (filters.specialty) params['specialty__name'] = filters.specialty;
        if (filters.gender) params.gender = filters.gender;
        // Do NOT send location to API, filter on frontend
        const data = await getDoctors(params);
        let filteredDoctors = data.results;
        if (filters.location) {
          filteredDoctors = filteredDoctors.filter(doctor =>
            Array.isArray(doctor.clinics) && doctor.clinics.some(clinic => clinic.city === filters.location)
          );
        }
        // Filter by gender on the frontend if selected
        if (filters.gender) {
          filteredDoctors = filteredDoctors.filter(doctor => doctor.gender === filters.gender);
        }
        setDoctors(filteredDoctors);
        setError(null);
        setCurrentPage(1); // Reset to first page on filter change
      } catch (err) {
        console.error('Failed to fetch doctors:', err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Pagination logic
  const totalPages = Math.ceil(doctors.length / cardsPerPage);
  const paginatedDoctors = doctors.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col lg:flex-row pt-16">
        <div className="w-full lg:w-1/4 p-4 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto">
          <DoctorsFilter filters={filters} onChange={handleFilterChange} />
        </div>
        <div className="w-full lg:w-3/4 p-4 lg:p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Available Doctors ({doctors.length})</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedDoctors.map((doctor, index) => (
              <DoctorCard key={index} doctor={doctor} />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;