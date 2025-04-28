import { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../../api';
import { useNavigate } from 'react-router-dom';

// Create the Authentication context
const AuthContext = createContext();

// Hook for accessing auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Get user data from localStorage
        const userData = localStorage.getItem('user');
        const accessToken = localStorage.getItem('accessToken');

        if (userData && accessToken) {
          setCurrentUser(JSON.parse(userData));
          
          // Check email verification status
          try {
            const response = await auth.checkEmailVerificationStatus();
            setIsEmailVerified(response.is_verified);
          } catch (err) {
            console.error('Failed to check email verification status:', err);
          }
        }
      } catch (error) {
        console.error('Error restoring auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await auth.login({ email, password });

      // Store tokens and user data
      localStorage.setItem('accessToken', response.tokens.access);
      localStorage.setItem('refreshToken', response.tokens.refresh);
      localStorage.setItem('user', JSON.stringify(response.user));
      console.log(' data:', response);

      // Update state with user info
      setCurrentUser(response.user);
      
      // Check email verification status
      try {
        const verificationStatus = await auth.checkEmailVerificationStatus();
        setIsEmailVerified(verificationStatus.is_verified);
      } catch (err) {
        console.error('Failed to check email verification status:', err);
      }

      return response;
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to login');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await auth.register(userData);

      // Store tokens and user data
      localStorage.setItem('accessToken', response.tokens.access);
      localStorage.setItem('refreshToken', response.tokens.refresh);
      localStorage.setItem('user', JSON.stringify(response.user));

      // Update state with user info
      setCurrentUser(response.user);
      setIsEmailVerified(false); // New user needs to verify email

      // Request email verification code
      await auth.requestEmailVerification(userData.email);

      return response;
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Failed to register');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Verify email function
  const verifyEmail = async (code) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await auth.verifyEmail(code);
      setIsEmailVerified(true);
      return response;
    } catch (error) {
      console.error('Email verification error:', error);
      setError(error.message || 'Failed to verify email');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Request email verification code
  const requestVerificationCode = async (email) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await auth.requestEmailVerification(email);
      return response;
    } catch (error) {
      console.error('Request verification code error:', error);
      setError(error.message || 'Failed to request verification code');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await auth.logout({ refresh: refreshToken }).catch(console.error);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear storage and state regardless of API response
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setCurrentUser(null);
      setIsEmailVerified(false);
      setIsLoading(false);
      navigate('/');
    }
  };

  // Value to be provided by the context
  const value = {
    user: currentUser,
    currentUser,
    isAuthenticated: !!currentUser,
    isEmailVerified,
    isLoading,
    error,
    login,
    logout,
    register,
    verifyEmail,
    requestVerificationCode,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;