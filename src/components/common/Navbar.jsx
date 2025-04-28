import React, { useState, useEffect, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { FaUserPlus } from 'react-icons/fa';
import UserMenu from './UserMenu';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const [showSpecialties, setShowSpecialties] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleSpecialties = () => {
    setShowSpecialties(!showSpecialties);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowSpecialties(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className="bg-white shadow-md py-4 px-6 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-[#4a5ae8]">Roshitta</h1>
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
                <Link to="/specialties/cardiology" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Cardiology</Link>
                <Link to="/specialties/dermatology" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dermatology</Link>
                <Link to="/specialties/neurology" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Neurology</Link>
              </div>
            )}
          </div>

          <Link to="/doctors" className="text-gray-700 hover:text-[#09e5ab] transition duration-300">Doctors</Link>
          <Link to="/contact" className="text-gray-700 hover:text-[#09e5ab] transition duration-300">Contact Us</Link>
          <Link to="/about" className="text-gray-700 hover:text-[#09e5ab] transition duration-300">About Us</Link>
        </div>

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

      {/* Mobile menu content */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6 space-y-4">
          <Link to="/" className="block text-gray-700 hover:text-[#09e5ab]">Home</Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={handleToggleSpecialties}
              className="flex items-center text-gray-700 hover:text-[#09e5ab]"
            >
              Specialties
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showSpecialties ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
              </svg>
            </button>

            {showSpecialties && (
              <div className="pl-4 mt-2 space-y-2">
                <Link to="/specialties/cardiology" className="block text-gray-700 hover:text-[#09e5ab]">Cardiology</Link>
   re             <Link to="/specialties/dermatology" className="block text-gray-700 hover:text-[#09e5ab]">Dermatology</Link>
                <Link to="/specialties/neurology" className="block text-gray-700 hover:text-[#09e5ab]">Neurology</Link>
              </div>
            )}
          </div>

          <Link to="/doctors" className="block text-gray-700 hover:text-[#09e5ab]">Doctors</Link>
          <Link to="/contact" className="block text-gray-700 hover:text-[#09e5ab]">Contact Us</Link>
          <Link to="/about" className="block text-gray-700 hover:text-[#09e5ab]">About Us</Link>

          <div className="pt-4 space-y-3">
            {isAuthenticated && user ? (
              <UserMenu />
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="flex items-center justify-center px-4 py-2 text-sm rounded-full bg-[#09e5ab] hover:bg-[#07c797] text-white"
                >
                  <FiLock className="w-5 h-5 mr-2" />
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="flex items-center justify-center px-4 py-2 text-sm rounded-full bg-[#5F6FFF] hover:bg-[#4a5ae8] text-white"
                >
                  <FaUserPlus className="w-5 h-5 mr-2" />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;