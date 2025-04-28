import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/auth/AuthContext';

const EmailVerificationForm = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [codeError, setCodeError] = useState(null);
  const navigate = useNavigate();
  
  const { user, verifyEmail, requestVerificationCode } = useAuth();
  
  const validateCode = () => {
    if (!code) {
      setCodeError('Verification code is required');
      return false;
    }
    
    if (!/^\d+$/.test(code)) {
      setCodeError('Code must contain only numbers');
      return false;
    }
    
    setCodeError(null);
    return true;
  };
  
  const handleVerify = async (e) => {
    e.preventDefault();
    
    if (!validateCode()) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      await verifyEmail(code);
      setSuccess(true);
      
      // Redirect to the appropriate dashboard based on user type
      setTimeout(() => {
        const dashboardPath = user?.user_type === 'doctor' 
          ? '/doctor/dashboard' 
          : '/patient/dashboard';
        navigate(dashboardPath);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleResend = async () => {
    setResendLoading(true);
    setError(null);
    
    try {
      await requestVerificationCode(user?.email);
      // Show temporary success message
      setError('Verification code sent successfully!');
      setTimeout(() => setError(null), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to resend verification code');
    } finally {
      setResendLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Verify Your Email</h1>
      <p className="text-gray-600 mb-6">
        A verification code has been sent to{' '}
        <span className="font-semibold">{user?.email}</span>
      </p>
      
      {error && (
        <div className={`p-3 mb-4 text-sm rounded ${
          error.includes('successfully') 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-3 mb-4 text-sm rounded">
          Email verified successfully! Redirecting to dashboard...
        </div>
      )}
      
      <form onSubmit={handleVerify} className="space-y-4">
        <div>
          <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700 mb-1">
            Verification Code
          </label>
          <input
            id="verification-code"
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setCodeError(null);
            }}
            className={`w-full px-4 py-2 border ${
              codeError ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent`}
            placeholder="Enter your verification code"
            maxLength={6}
          />
          {codeError && (
            <p className="text-red-500 text-xs mt-1">{codeError}</p>
          )}
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-[#5F6FFF] hover:bg-[#4a5ae8] text-white py-3 px-4 rounded-lg font-medium transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify Email'}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 mb-3">
          Didn't receive the code?
        </p>
        <button
          onClick={handleResend}
          className="text-[#5F6FFF] hover:text-[#4a5ae8] font-medium text-sm disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={resendLoading}
        >
          {resendLoading ? 'Sending...' : 'Resend Code'}
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationForm; 