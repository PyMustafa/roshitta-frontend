import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex">
      {/* Login banner - left side */}
      <div className="hidden md:flex md:w-1/2 bg-indigo-500">
        <img
          src="/src/assets/login-banner.png"
          alt="Healthcare Login Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Login form - right side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold mb-6 text-center">Roshitta Healthcare</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;