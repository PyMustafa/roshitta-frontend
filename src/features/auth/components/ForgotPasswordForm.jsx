import React, { useState } from 'react';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email');
      return;
    }
    console.log('Reset password requested for:', email);
    setIsSubmitted(true);
  };

  return (
    <div className="w-full max-w-md">
      {!isSubmitted ? (
        <>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password?</h1>
          <p className="text-gray-600 mb-6">
            Enter your email to receive a reset code
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent"
                placeholder="Your email address"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#5F6FFF] hover:bg-[#4a5ae8] text-white py-3 px-4 rounded-lg font-medium transition duration-200"
            >
              Send Code
            </button>
          </form>
        </>
      ) : (
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Check your email</h2>
          <p className="text-gray-600 mb-6">
            We sent a code to <span className="font-semibold">{email}</span>
          </p>
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Remember your password?{' '}
          <a href="/login" className="font-medium text-[#5F6FFF] hover:text-[#4a5ae8]">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;