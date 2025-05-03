import { useState, useEffect } from 'react';
import { useDebounce } from 'react-use';
import { Search, UserSquare2, RefreshCcw } from 'lucide-react';
import { getPatients } from '../../../api/profiles/doctor';
import PatientCard from '../components/patient-card';
import Pagination from '../../../components/common/Pagination';
import { toast } from 'react-hot-toast';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  
  // Debounce search query to prevent too many API calls
  useDebounce(
    () => {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1); // Reset to page 1 when search changes
    },
    500,
    [searchQuery]
  );
  
  // Fetch patients when page, page size, or search query changes
  useEffect(() => {
    fetchPatients();
  }, [currentPage, pageSize, debouncedSearchQuery]);
  
  const fetchPatients = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {
        page: currentPage,
        page_size: pageSize,
      };
      
      if (debouncedSearchQuery) {
        params.search = debouncedSearchQuery;
      }
      
      const response = await getPatients(params);
      
      setPatients(response.results || []);
      
      // Calculate total pages
      const total = response.count || 0;
      setTotalPages(Math.ceil(total / pageSize));
      
    } catch (err) {
      console.error('Error fetching patients:', err);
      setError('Failed to load patients. Please try again.');
      toast.error('Failed to load patients');
    } finally {
      setLoading(false);
    }
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of the page
    window.scrollTo(0, 0);
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleRefresh = () => {
    fetchPatients();
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <UserSquare2 className="w-6 h-6 mr-2 text-blue-600" />
            My Patients
          </h1>
          <p className="text-gray-600 mt-1">Manage your patients and their prescriptions</p>
        </div>
        
        <div className="flex items-center">
          <div className="relative mr-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <button
            onClick={handleRefresh}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            aria-label="Refresh"
          >
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
          <button 
            onClick={handleRefresh}
            className="ml-2 underline"
          >
            Try again
          </button>
        </div>
      ) : patients.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 text-gray-700 px-6 py-10 rounded-md text-center">
          <UserSquare2 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium mb-2">No patients found</h3>
          <p className="text-gray-600 mb-4">
            {debouncedSearchQuery 
              ? `No patients matching "${debouncedSearchQuery}"`
              : "You don't have any patients yet."}
          </p>
          {debouncedSearchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                hasPrescription={patient.has_prescription}
              />
            ))}
          </div>
          
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Patients; 