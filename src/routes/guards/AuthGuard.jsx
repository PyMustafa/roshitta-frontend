import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthContext';

/**
 * Guards routes that require authentication
 * Redirects to login if not authenticated
 */
export const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Save the location they were trying to go to for later redirect
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};