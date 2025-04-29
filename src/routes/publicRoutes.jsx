import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import Doctors from '../pages/Doctors';
import DoctorProfilePage from '../features/doctors/pages/DoctorProfilePage';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import { AuthGuard } from './guards/AuthGuard';
import Checkout from '../features/payments/pages/Checkout';

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
      { path: 'clinics', element: <div>Clinics Page</div> },
      { path: 'doctors', element: <div> <Doctors /></div> }, 
      { path: 'about', element: <div> <AboutUs /></div> }, 
      { path: 'contact', element: <div><ContactUs /></div> }, 
      { path: 'doctor-profile/:doctorId', element: <div><DoctorProfilePage/></div>},
      { path: 'specialties/:specialtyId/doctors', element: <Doctors /> },
      { path: 'checkout', element: 
        <AuthGuard>
          <Checkout/>
        </AuthGuard>
      }

    ],
  },
];

export default publicRoutes;