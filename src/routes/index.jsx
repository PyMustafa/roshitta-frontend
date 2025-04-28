import { Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

// Import route configurations
import authRoutes from './authRoutes';
import doctorRoutes from './doctorRoutes';
import patientRoutes from './patientRoutes';
import publicRoutes from './publicRoutes';

// Loading component for Suspense
const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

/**
 * Main router component that combines all routes
 */
export default function Router() {
  const routes = useRoutes([
    // Public routes (home, about, etc.)
    ...publicRoutes,

    // Auth routes (login, register, etc.)
    ...authRoutes,

    // Protected doctor routes
    ...doctorRoutes,

    // Protected patient routes
    ...patientRoutes,

    // Catch-all route - redirect to home
    { path: '*', element: <Navigate to="/" replace /> },
  ]);

  return <Suspense fallback={<LoadingScreen />}>{routes}</Suspense>;
}