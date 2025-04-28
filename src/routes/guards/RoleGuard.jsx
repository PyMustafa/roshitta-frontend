import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthContext';

/**
 * Guards routes based on user role
 * Redirects to appropriate dashboard if role doesn't match
 */
export const RoleGuard = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();

  // If not authenticated, let AuthGuard handle it
  if (!isAuthenticated) return children;

  // Check if user role is allowed
  if (!allowedRoles.includes(user?.role)) {
    // Redirect based on role
    if (user?.user_type === 'doctor') {
      return <Navigate to="/doctor/dashboard" replace />;
    } else if (user?.user_type === 'patient') {
      return <Navigate to="/patient/dashboard" replace />;
    } else {
      // Fallback
      return <Navigate to="/" replace />;
    }
  }

  return children;
};