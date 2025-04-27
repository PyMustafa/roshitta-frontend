import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/auth/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Basic form validation
    if (!email) {
      setFormError('Email is required');
      return;
    }
    if (!password) {
      setFormError('Password is required');
      return;
    }

    try {
      // Call login function from AuthContext
      const response = await login(email, password);

      // Redirect user after successful login
      if (response && response.user) {
        const userType = response.user.user_type;
        if (userType === 'doctor') {
          navigate('/dashboard/doctor');
        } else if (userType === 'patient') {
          navigate('/dashboard/patient');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      // Error handling is managed in the AuthContext,
      // but we can add specific UI feedback here
      if (err.response?.status === 401) {
        setFormError('Invalid email or password');
      } else {
        setFormError('An error occurred during login. Please try again.');
      }
    }
  };

  return (
    <div className="w-full">
      <div className="rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sign In</h2>
        <p className="text-gray-600 mb-6">Please login to your account</p>

        {/* Form error message */}
        {(formError || error) && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {formError || error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="your@email.com"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <Link to="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200"
          >
            {isLoading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        {/* Registration Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;