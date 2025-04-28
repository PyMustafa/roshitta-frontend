import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';

// Lazy load public pages
const HomePage = lazy(() => import('../pages/Home'));
// Add more public pages here as needed

// Public routes configuration
const publicRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <HomePage /> },
      // Add more public routes here as needed
      { path: 'clinics', element: <div>Clinics Page</div> }, // Placeholder
      { path: 'doctors', element: <div>Find Doctors Page</div> }, // Placeholder
      { path: 'about', element: <div>About Page</div> }, // Placeholder
      { path: 'contact', element: <div>Contact Page</div> }, // Placeholder
    ],
  },
];

export default publicRoutes;