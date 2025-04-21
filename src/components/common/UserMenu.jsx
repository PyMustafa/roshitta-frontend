import React, { useState, useRef, useEffect } from 'react';
import loginImage from '../../assets/Navbar/login.png';

const UserMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={toggleMenu} className="focus:outline-none">
        <img
          src={loginImage}
          alt="user avatar"
          className="w-10 h-10 rounded-full border-2 border-[#5F6FFF] object-cover"
        />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg z-50 text-sm">
          {/* Info section */}
          <div className="flex items-center space-x-3 px-3 py-1 bg-gray-50 rounded-[10px] mx-3 mt-3">

            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <img
                src={loginImage} 
                alt="user"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div>
              <p className="text-gray-800 font-semibold">Patientdemo</p>
              <p className="text-green-600 text-xs font-semibold">Patients</p>
            </div>
          </div>

          {/* Menu items */}
          <ul className="py-2">
            <li>
              <a
                href="#"
                className="block px-4 py-2 mx-2 rounded-md text-gray-700 transition duration-200 transform hover:text-[#09e5ab] hover:translate-x-1 hover:scale-105"
              >
                Dashboard
              </a>
            </li>

            {/* Divider */}
            <li className="px-4">
              <hr className="border-gray-200" />
            </li>

            <li>
              <button

                className="w-full text-left px-4 py-2 mx-2 rounded-md text-gray-700 transition duration-200 transform hover:text-[#09e5ab] hover:translate-x-1 hover:scale-105"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;