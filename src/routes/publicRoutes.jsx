import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import Doctors from '../pages/Doctors';
import DoctorProfilePage from '../features/doctors/pages/DoctorProfilePage';

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
      { path: 'doctors', element: <div> <Doctors /></div> }, // Placeholder
      { path: 'about', element: <div>About Page</div> }, // Placeholder
      { path: 'contact', element: <div>Contact Page</div> }, // Placeholder
      { path: 'doctor-profile/:doctorId', element: <div><DoctorProfilePage/></div>}
    ],
  },
];

export default publicRoutes;