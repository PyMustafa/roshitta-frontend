import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/auth/AuthContext';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  const [formData, setFormData] = useState({
    user_type: 'patient',
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    password: '',
    password_confirm: ''
  });

  const validateForm = () => {
    const errors = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Name validation
    if (!formData.first_name) {
      errors.first_name = 'First name is required';
    }
    
    if (!formData.last_name) {
      errors.last_name = 'Last name is required';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    // Password confirmation
    if (formData.password !== formData.password_confirm) {
      errors.password_confirm = 'Passwords do not match';
    }
    
    // User type validation
    if (!formData.user_type) {
      errors.user_type = 'Please select user type';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setApiError(null);
    
    try {
      // Register the user
      await register(formData);
      
      // Redirect to email verification page
      navigate('/auth/verify-email');
    } catch (error) {
      setApiError(
        error.response?.data?.detail || 
        error.message || 
        'Registration failed. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear specific field error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
      <p className="text-gray-600 mb-6">Please fill in the form to register</p>

      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {apiError}
        </div>
      )}

      {/* Doctor/Patient Radio Buttons */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="user_type"
              value="patient"
              checked={formData.user_type === 'patient'}
              onChange={handleChange}
              className="h-4 w-4 text-[#5F6FFF] focus:ring-[#5F6FFF] border-gray-300"
            />
            <span className="ml-2 text-gray-700">Patient</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="user_type"
              value="doctor"
              checked={formData.user_type === 'doctor'}
              onChange={handleChange}
              className="h-4 w-4 text-[#5F6FFF] focus:ring-[#5F6FFF] border-gray-300"
            />
            <span className="ml-2 text-gray-700">Doctor</span>
          </label>
        </div>
        {formErrors.user_type && (
          <p className="text-red-500 text-xs mt-1">{formErrors.user_type}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              formErrors.first_name ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent`}
            placeholder="First Name *"
            required
          />
          {formErrors.first_name && (
            <p className="text-red-500 text-xs mt-1">{formErrors.first_name}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              formErrors.last_name ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent`}
            placeholder="Last Name *"
            required
          />
          {formErrors.last_name && (
            <p className="text-red-500 text-xs mt-1">{formErrors.last_name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              formErrors.email ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent`}
            placeholder="Email *"
            required
          />
          {formErrors.email && (
            <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent text-gray-500 placeholder-gray-400"
          >
            <option value="" disabled className="text-gray-400">Select Gender (Optional)</option>
            <option value="male" className="text-gray-800">Male</option>
            <option value="female" className="text-gray-800">Female</option>
          </select>
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              formErrors.password ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent`}
            placeholder="Password *"
            required
          />
          {formErrors.password && (
            <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <input
            type="password"
            id="password_confirm"
            name="password_confirm"
            value={formData.password_confirm}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              formErrors.password_confirm ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent`}
            placeholder="Confirm Password *"
            required
          />
          {formErrors.password_confirm && (
            <p className="text-red-500 text-xs mt-1">{formErrors.password_confirm}</p>
          )}
        </div>

        {/* Terms and Conditions */}
        {/* <div className="flex items-center pt-2">
          <input
            type="checkbox"
            id="terms"
            className="h-4 w-4 text-[#5F6FFF] focus:ring-[#5F6FFF] border-gray-300 rounded"
            required
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            Please Read The Terms & Conditions
          </label>
        </div> */}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#5F6FFF] hover:bg-[#4a5ae8] text-white py-3 px-4 rounded-lg font-medium shadow-md transition duration-200 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'CREATING ACCOUNT...' : 'SIGNUP'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[#5F6FFF] hover:text-[#4a5ae8]">
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;