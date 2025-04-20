import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
    alert('Login submitted (Frontend only)');
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
      <p className="text-gray-600 mb-8">Please login to book your appointment</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent"
            placeholder="your@email.com *"
            required
          />
        </div>

        <div>
          
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent"
            placeholder="Password"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember-me"
              className="h-5 w-5 text-[#5F6FFF] focus:ring-[#5F6FFF] border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          <Link to="/forgot-password" className="text-sm text-[#5F6FFF] hover:text-[#4a5ae8]">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-[#5F6FFF] hover:bg-[#4a5ae8] text-white py-3 px-4 rounded-lg font-medium shadow-md transition duration-200"
        >
          Login
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-[#5F6FFF] hover:text-[#4a5ae8]">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;