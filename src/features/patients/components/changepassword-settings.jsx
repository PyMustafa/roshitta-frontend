import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export const ChangePasswordSettings = () => {
  const [showPassword, setShowPassword] = useState({
    new: false,
    repeat: false
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-6 mb-6">
      <h2 className="text-xl font-semibold mb-6">Change Password</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Old Password"
          />
        </div>
        <div>
          <div className="relative">
            <input
              type={showPassword.new ? "text" : "password"}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              placeholder="New Password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => togglePasswordVisibility('new')}
              title={showPassword.new ? "Hide password" : "Show password"} // هنا أضفنا الـ Tooltip
            >
              <FontAwesomeIcon 
                icon={showPassword.new ? faEyeSlash : faEye} 
                className="text-gray-500 hover:text-gray-700"
              />
            </button>
          </div>
        </div>
        <div>
          <div className="relative">
            <input
              type={showPassword.repeat ? "text" : "password"}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              placeholder="Repeat New Password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => togglePasswordVisibility('repeat')}
              title={showPassword.repeat ? "Hide password" : "Show password"} // وهنا كمان
            >
              <FontAwesomeIcon 
                icon={showPassword.repeat ? faEyeSlash : faEye} 
                className="text-gray-500 hover:text-gray-700"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
