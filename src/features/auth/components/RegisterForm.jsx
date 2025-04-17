import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    userType: 'patient',
    firstName: '',
    lastName: '',
    email: '',
    otp: '',
    phoneNumber: '',
    gender: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert(`Registration submitted as ${formData.userType}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSendOTP = () => {
    if (!formData.email) {
      alert('Please enter your email first');
      return;
    }
    alert(`OTP sent to: ${formData.email}`);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
      <p className="text-gray-600 mb-6">Please fill in the form to register</p>

      {/* Doctor/Patient Radio Buttons */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="userType"
              value="patient"
              checked={formData.userType === 'patient'}
              onChange={handleChange}
              className="h-4 w-4 text-[#5F6FFF] focus:ring-[#5F6FFF] border-gray-300"
            />
            <span className="ml-2 text-gray-700">Patient</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="userType"
              value="doctor"
              checked={formData.userType === 'doctor'}
              onChange={handleChange}
              className="h-4 w-4 text-[#5F6FFF] focus:ring-[#5F6FFF] border-gray-300"
            />
            <span className="ml-2 text-gray-700">Doctor</span>
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name - Full Width */}
        <div>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent"
            placeholder="First Name "
            required
          />
        </div>

        {/* Last Name - Full Width */}
        <div>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent"
            placeholder="Last Name "
            required
          />
        </div>

        {/* Email with OTP - Full Width */}
        <div>
          <div className="flex gap-2">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent"
              placeholder="Email *"
              required
            />
            <button
              type="button"
              onClick={handleSendOTP}
              className="bg-[#5F6FFF] hover:bg-[#4a5ae8] text-white py-2 px-4 rounded-lg font-medium transition duration-200 whitespace-nowrap"
            >
              SEND OTP
            </button>
          </div>
        </div>

        

        {/* Phone Number - Full Width */}
        <div className="flex gap-2">

            <input

              type="tel"

              id="phoneNumber"

              name="phoneNumber"

              value={formData.phoneNumber}
              onChange={handleChange}

              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent"

              placeholder="Phone Number"

              required

            />

            <button

              type="button"

              onClick={handleSendOTP}

              className="bg-[#5F6FFF] hover:bg-[#4a5ae8] text-white py-2 px-4 rounded-lg font-medium transition duration-200 whitespace-nowrap"

            >

              SEND OTP

            </button>

        </div>

        {/* Gender - Full Width */}
        <div>
            <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent text-gray-500 placeholder-gray-400"
                required
            >
                <option value="" disabled className="text-gray-400">Select Gender</option>
                <option value="male" className="text-gray-800">Male</option>
                <option value="female" className="text-gray-800">Female</option>
                <option value="other" className="text-gray-800">Other</option>
            </select>
        </div>

        {/* Password - Full Width */}
        <div>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent"
            placeholder="Password *"
            required
          />
        </div>

        {/* Confirm Password - Full Width */}
        <div>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent"
            placeholder="Confirm Password *"
            required
          />
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center pt-2">
          <input
            type="checkbox"
            id="terms"
            className="h-4 w-4 text-[#5F6FFF] focus:ring-[#5F6FFF] border-gray-300 rounded"
            required
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            Please Read The Terms & Conditions
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#5F6FFF] hover:bg-[#4a5ae8] text-white py-3 px-4 rounded-lg font-medium shadow-md transition duration-200 mt-6"
        >
          SIGNUP
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