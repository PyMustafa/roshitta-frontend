import React, { useState, useEffect, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { FaUserPlus } from 'react-icons/fa';
import UserMenu from './UserMenu';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthContext';
import { getSpecialties } from '../../api/profiles/specialty';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [showSpecialties, setShowSpecialties] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [specialties, setSpecialties] = useState([]);
  const dropdownRef = useRef(null);

  const handleToggleSpecialties = () => {
    setShowSpecialties(!showSpecialties);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowSpecialties(false);
    }
  };

  // Handle specialty selection with programmatic navigation
  const handleSpecialtyClick = (specialty) => {
    // Close the dropdown
    setShowSpecialties(false);
    
    // Navigate programmatically to ensure filter is applied
    navigate({
      pathname: '/doctors',
      search: `?specialty=${encodeURIComponent(specialty.name)}`,
    });
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Fetch specialties from the API
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const data = await getSpecialties();
        setSpecialties(Array.isArray(data) ? data : data.results || []);
      } catch (error) {
        console.error('Error fetching specialties:', error);
      }
    };

    fetchSpecialties();
  }, []);

  return (
    <nav className="bg-white shadow-md py-4 px-6 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo with home link */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-[#4a5ae8] hover:text-[#09e5ab] transition duration-300">
            Roshitta
          </Link>
        </div>

        {/* Mobile menu toggle button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 hover:text-[#09e5ab] focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop navigation links */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-gray-700 hover:text-[#09e5ab] transition duration-300">Home</Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={handleToggleSpecialties}
              className="text-gray-700 hover:text-[#09e5ab] transition duration-300 flex items-center"
            >
              Specialties
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showSpecialties && (
              <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                {specialties.length > 0 ? (
                  specialties.map((specialty) => (
                    <div
                      key={specialty.id}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSpecialtyClick(specialty)}
                    >
                      {specialty.name}
                    </div>
                  ))
                ) : (
                  <p className="px-4 py-2 text-gray-500">No specialties available</p>
                )}
              </div>
            )}
          </div>

          <Link to="/doctors" className="text-gray-700 hover:text-[#09e5ab] transition duration-300">Doctors</Link>
          <Link to="/contact" className="text-gray-700 hover:text-[#09e5ab] transition duration-300">Contact Us</Link>
          <Link to="/about" className="text-gray-700 hover:text-[#09e5ab] transition duration-300">About Us</Link>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md mt-0.5 py-2 px-4 md:hidden z-50">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-[#09e5ab] py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              <div className="py-2 border-b border-gray-100">
                <button
                  onClick={handleToggleSpecialties}
                  className="w-full text-left text-gray-700 hover:text-[#09e5ab] flex items-center justify-between"
                >
                  Specialties
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showSpecialties ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                  </svg>
                </button>

                {showSpecialties && (
                  <div className="mt-2 pl-4">
                    {specialties.length > 0 ? (
                      specialties.map((specialty) => (
                        <Link
                          key={specialty.id}
                          to={`/specialties/${specialty.id}`}
                          className="block py-1.5 text-gray-700 hover:text-[#09e5ab]"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {specialty.name}
                        </Link>
                      ))
                    ) : (
                      <p className="py-1.5 text-gray-500">No specialties available</p>
                    )}
                  </div>
                )}
              </div>

              <Link
                to="/doctors"
                className="text-gray-700 hover:text-[#09e5ab] py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Doctors
              </Link>

              <Link
                to="/contact"
                className="text-gray-700 hover:text-[#09e5ab] py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>

              <Link
                to="/about"
                className="text-gray-700 hover:text-[#09e5ab] py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>

              {/* Auth buttons for mobile */}
              <div className="flex flex-col space-y-2 py-2">
                {isAuthenticated ? (
                  <div className="py-2">
                    <UserMenu />
                  </div>
                ) : (
                  <>
                    <Link
                      to="/auth/login"
                      className="flex items-center justify-center px-4 py-2 rounded-full bg-[#09e5ab] hover:bg-[#07c797] text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FiLock className="w-5 h-5 mr-2" />
                      Login
                    </Link>
                    <Link
                      to="/auth/register"
                      className="flex items-center justify-center px-4 py-2 rounded-full bg-[#5F6FFF] hover:bg-[#4a5ae8] text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaUserPlus className="w-5 h-5 mr-2" />
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <>
              <Link
                to="/auth/login"
                className="flex items-center px-4 py-2 text-sm rounded-full bg-[#09e5ab] hover:bg-[#07c797] text-white transition duration-300"
              >
                <FiLock className="w-5 h-5 mr-2" />
                Login
              </Link>
              <Link
                to="/auth/register"
                className="flex items-center px-4 py-2 text-sm rounded-full bg-[#5F6FFF] hover:bg-[#4a5ae8] text-white transition duration-300"
              >
                <FaUserPlus className="w-5 h-5 mr-2" />
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;