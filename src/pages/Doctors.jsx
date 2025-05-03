import Navbar from '../components/common/Navbar';
import DoctorsFilter from '../components/common/DoctorsFilter';
import DoctorCard from '../components/common/DoctorCard';
import Pagination from '../components/common/Pagination';
import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDoctors } from '../api/profiles/doctor';

const Doctors = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  // Refs to prevent infinite loops
  const isInitialMount = useRef(true);
  const isUrlUpdate = useRef(false);

  // Initialize filters with URL params
  const queryParams = new URLSearchParams(location.search);
  const initialFilters = {
    search: queryParams.get('search') || '',
    specialty: queryParams.get('specialty') || '',
    gender: queryParams.get('gender') || '',
    location: queryParams.get('location') || ''
  };

  const [filters, setFilters] = useState(initialFilters);

  // Fetch doctors whenever filters change
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const params = {};

        if (filters.search) params.search = filters.search;
        if (filters.specialty) params.specialty__name = filters.specialty;
        if (filters.gender) params.gender = filters.gender;

        console.log("Fetching doctors with params:", params);
        const data = await getDoctors(params);
        let filteredDoctors = data.results || [];

        if (filters.location) {
          filteredDoctors = filteredDoctors.filter(doctor =>
            Array.isArray(doctor.clinics) && doctor.clinics.some(clinic => clinic.city === filters.location)
          );
        }

        setDoctors(filteredDoctors);
        setCurrentPage(1);
      } catch (err) {
        console.error('Failed to fetch doctors:', err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [filters]);

  // Listen to URL changes (back/forward navigation)
  useEffect(() => {
    // Skip on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Skip if we're the ones who just updated the URL
    if (isUrlUpdate.current) {
      isUrlUpdate.current = false;
      return;
    }

    const queryParams = new URLSearchParams(location.search);
    const newFilters = {
      search: queryParams.get('search') || '',
      specialty: queryParams.get('specialty') || '',
      gender: queryParams.get('gender') || '',
      location: queryParams.get('location') || ''
    };

    // Deep comparison
    const filtersChanged = JSON.stringify(newFilters) !== JSON.stringify(filters);

    if (filtersChanged) {
      setFilters(newFilters);
    }
  }, [location.search]);

  // Update URL when filters change
  useEffect(() => {
    // Skip on initial mount
    if (isInitialMount.current) {
      return;
    }

    const queryParams = new URLSearchParams();

    // Only add non-empty values
    if (filters.specialty) queryParams.set('specialty', filters.specialty);
    if (filters.search) queryParams.set('search', filters.search);
    if (filters.gender) queryParams.set('gender', filters.gender);
    if (filters.location) queryParams.set('location', filters.location);

    const queryString = queryParams.toString();
    const currentQueryString = location.search.replace('?', '');

    // Only update URL if the query parameters have changed
    if (queryString !== currentQueryString) {
      // Flag that we're updating the URL ourselves
      isUrlUpdate.current = true;
      navigate(`?${queryString}`, { replace: true });
    }
  }, [filters, navigate, location.search]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Pagination logic
  const totalPages = Math.ceil(doctors.length / cardsPerPage);
  const paginatedDoctors = doctors.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col lg:flex-row pt-16">
        <div className="w-full lg:w-1/4 p-4 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto">
          <DoctorsFilter filters={filters} onChange={handleFilterChange} />
        </div>
        <div className="w-full lg:w-3/4 p-4 lg:p-6">
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#09e5ab]"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">{error}</div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Available Doctors ({doctors.length})
                {filters.specialty && <span className="ml-2 text-lg text-[#09e5ab]"> - {filters.specialty}</span>}
              </h1>
              {doctors.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No doctors match your search criteria</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {paginatedDoctors.map((doctor, index) => (
                    <DoctorCard key={doctor.id || index} doctor={doctor} />
                  ))}
                </div>
              )}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Doctors;