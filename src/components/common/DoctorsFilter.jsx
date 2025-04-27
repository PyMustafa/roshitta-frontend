const DoctorsFilter = () => {
    return (
      <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-5">Search Filter</h3>
        
        <div className="space-y-5">
          {/* Search Input */}
          <div>
            <input 
              type="text" 
              placeholder="Search doctors, clinics, etc." 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent"
            />
          </div>
          
          {/* Location Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent appearance-none pr-8">
              <option>Select a location</option>
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
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent appearance-none pr-8">
              <option>Search by gender</option>
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
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent appearance-none pr-8">
              <option>Select a speciality</option>
            </select>
            <div className="absolute inset-y-0 right-0 top-7 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          {/* Search Button */}
          <button className="w-full bg-[#5F6FFF] hover:bg-[#4a5ae8] text-white py-3 rounded-xl transition-colors duration-200 shadow-md">
            SEARCH
          </button>
        </div>
      </div>
    );
  };
  
  export default DoctorsFilter;