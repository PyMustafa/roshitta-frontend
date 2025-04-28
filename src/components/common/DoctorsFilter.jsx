import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { PROFILES } from '../../api/endpoints';
import { egyptLocations } from '../../constants/locations';

const genderOptions = [
  { value: '', label: 'Search by gender' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

const DoctorsFilter = ({ filters = {}, onChange }) => {
  const [specialties, setSpecialties] = useState([]);
  // Local state for form inputs
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    api.get(PROFILES.SPECIALTIES)
      .then(res => setSpecialties(res.data.results || res.data))
      .catch(() => setSpecialties([]));
  }, []);

  // Keep local state in sync if parent filters change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleInputChange = (e) => {
    setLocalFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange && onChange(localFilters);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow-md border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-5">Search Filter</h3>
      <div className="space-y-5">
        {/* Search Input */}
        <div>
          <input
            type="text"
            name="search"
            value={localFilters.search || ''}
            onChange={handleInputChange}
            placeholder="Search doctors, clinics, etc."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent"
          />
        </div>
        {/* Location Dropdown */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <select
            name="location"
            value={localFilters.location || ''}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent appearance-none pr-8"
          >
            <option value="">Select a location</option>
            {egyptLocations.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 top-7 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {/* Gender Dropdown */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select
            name="gender"
            value={localFilters.gender || ''}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent appearance-none pr-8"
          >
            {genderOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 top-7 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {/* Specialist Dropdown */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Specialist</label>
          <select
            name="specialty"
            value={localFilters.specialty || ''}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent appearance-none pr-8"
          >
            <option value="">Select a speciality</option>
            {specialties.map(spec => (
              <option key={spec.id || spec.uid || spec.name} value={spec.name}>{spec.name}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 top-7 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {/* Search Button */}
        <button
          type="submit"
          className="w-full bg-[#5F6FFF] hover:bg-[#4a5ae8] text-white py-3 rounded-xl transition-colors duration-200 shadow-md"
        >
          SEARCH
        </button>
      </div>
    </form>
  );
};

export default DoctorsFilter;