import React, { useState, useEffect, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { FaUserPlus } from 'react-icons/fa';

const Navbar = () => {
  // State to handle dropdown visibility for "Specialties"
  const [showSpecialties, setShowSpecialties] = useState(false);

  // State to handle mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Ref to detect clicks outside the specialties dropdown
  const dropdownRef = useRef(null);

  // Toggle the dropdown menu for specialties
  const handleToggleSpecialties = () => {
    setShowSpecialties(!showSpecialties);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowSpecialties(false);
    }
  };

  // Add event listener to detect outside clicks
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className="bg-white shadow-md py-4 px-6">
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
            {/* Hamburger icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop navigation links */}
        <div className="hidden md:flex space-x-8 items-center">
          <a href="#" className="text-gray-700 hover:text-[#09e5ab] transition duration-300">Home</a>

          {/* Dropdown for specialties */}
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

            {/* Dropdown menu */}
            {showSpecialties && (
              <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Cardiology</a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dermatology</a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Neurology</a>
              </div>
            )}
          </div>

          {/* More navigation links */}
          <a href="#" className="text-gray-700 hover:text-[#09e5ab] transition duration-300">Doctors</a>
          <a href="#" className="text-gray-700 hover:text-[#09e5ab] transition duration-300">Contact Us</a>
          <a href="#" className="text-gray-700 hover:text-[#09e5ab] transition duration-300">About Us</a>
        </div>

        {/* Auth buttons (Login/Register) */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="#"
            className="flex items-center px-4 py-2 text-sm rounded-full bg-[#09e5ab] hover:bg-[#07c797] text-white transition duration-300"
          >
            <FiLock className="w-5 h-5 mr-2" />
            Login
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-sm rounded-full bg-[#5F6FFF] hover:bg-[#4a5ae8] text-white transition duration-300"
          >
            <FaUserPlus className="w-5 h-5 mr-2" />
            Register
          </a>
        </div>
      </div>

      {/* Mobile menu content */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6 space-y-4">
          <a href="#" className="block text-gray-700 hover:text-[#09e5ab]">Home</a>

          {/* Mobile dropdown */}
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
                <a href="#" className="block text-gray-700 hover:text-[#09e5ab]">Cardiology</a>
                <a href="#" className="block text-gray-700 hover:text-[#09e5ab]">Dermatology</a>
                <a href="#" className="block text-gray-700 hover:text-[#09e5ab]">Neurology</a>
              </div>
            )}
          </div>

          {/* Other mobile links */}
          <a href="#" className="block text-gray-700 hover:text-[#09e5ab]">Doctors</a>
          <a href="#" className="block text-gray-700 hover:text-[#09e5ab]">Contact Us</a>
          <a href="#" className="block text-gray-700 hover:text-[#09e5ab]">About Us</a>

          {/* Mobile auth buttons */}
          <div className="pt-4 space-y-3">
            <a
              href="#"
              className="flex items-center justify-center px-4 py-2 text-sm rounded-full bg-[#09e5ab] hover:bg-[#07c797] text-white"
            >
              <FiLock className="w-5 h-5 mr-2" />
              Login
            </a>
            <a
              href="#"
              className="flex items-center justify-center px-4 py-2 text-sm rounded-full bg-[#5F6FFF] hover:bg-[#4a5ae8] text-white"
            >
              <FaUserPlus className="w-5 h-5 mr-2" />
              Register
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
