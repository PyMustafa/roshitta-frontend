import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../context/auth/AuthContext';
import EmailVerificationForm from '../components/EmailVerificationForm';
import loginBannerImage from '../../../assets/login-banner.png';

const EmailVerificationPage = () => {
  const { user, isAuthenticated, isEmailVerified } = useAuth();

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If email is already verified, redirect to dashboard
  if (isEmailVerified) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-5xl">
        <div className="hidden md:block w-3/5">
          <img 
            src={loginBannerImage} 
            alt="Email Verification" 
            className="w-full h-auto max-h-[500px] object-contain"
          />
        </div>
        
        <div className="w-full md:w-3/5 bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <EmailVerificationForm />
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage; 