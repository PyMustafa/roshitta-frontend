import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthContext';

/**
 * Guards routes that require email verification
 * Redirects to email verification page if email is not verified
 * Redirects to login if not authenticated
 */
export const EmailVerificationGuard = ({ children }) => {
  const { isAuthenticated, isEmailVerified } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Save the location they were trying to go to for later redirect
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (!isEmailVerified) {
    // If authenticated but email not verified, redirect to verification page
    return <Navigate to="/auth/verify-email" state={{ from: location }} replace />;
  }

  return children;
}; 