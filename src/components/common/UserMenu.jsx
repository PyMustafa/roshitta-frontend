import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthContext';
import Avatar from './Avatar';

const UserMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
    setShowMenu(false);
  };

  // Determine dashboard route based on user role
  const dashboardRoute = currentUser?.user_type === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard';

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={toggleMenu} className="focus:outline-none">
        <Avatar 
          src={currentUser?.profile_image || currentUser?.profile_picture} 
          alt={currentUser?.first_name || 'User'}
          size={40}
          className="border-2 border-[#5F6FFF]"
        />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg z-50 text-sm">
          {/* Info section */}
          <div className="flex items-center space-x-3 px-3 py-1 bg-gray-50 rounded-[10px] mx-3 mt-3">
            <Avatar 
              src={currentUser?.profile_image || currentUser?.profile_picture} 
              alt={currentUser?.first_name || 'User'}
              size={48}
            />
            <div>
              <p className="text-gray-800 font-semibold">
                {currentUser ? `${currentUser.first_name || ''} ${currentUser.last_name || ''}` : 'User'}
              </p>
              <p className="text-green-600 text-xs font-semibold">
                {currentUser?.user_type === 'doctor' ? 'Doctor' : 'Patient'}
              </p>
            </div>
          </div>

          {/* Menu items */}
          <ul className="py-2">
            <li>
              <Link
                to={dashboardRoute}
                onClick={() => setShowMenu(false)}
                className="block px-4 py-2 mx-2 rounded-md text-gray-700 transition duration-200 transform hover:text-[#09e5ab] hover:translate-x-1 hover:scale-105"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to={currentUser?.user_type === 'doctor' ? '/doctor/settings' : '/patient/settings'}
                onClick={() => setShowMenu(false)}
                className="block px-4 py-2 mx-2 rounded-md text-gray-700 transition duration-200 transform hover:text-[#09e5ab] hover:translate-x-1 hover:scale-105"
              >
                Profile Settings
              </Link>
            </li>

            {/* Divider */}
            <li className="px-4">
              <hr className="border-gray-200" />
            </li>

            <li>
              <button
                onClick={handleLogout}
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