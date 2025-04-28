import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthGuard } from './guards/AuthGuard';
import { RoleGuard } from './guards/RoleGuard';
import { PatientLayout } from './layouts/PatientLayout';

// Lazy load patient pages
const PatientDashboard = lazy(() => import('../features/patients/pages/PatientDashboard'));
const AppointmentsList = lazy(() => import('../features/patients/pages/AppointmentsList'));
const MedicalHistory = lazy(() => import('../features/patients/pages/MedicalHistory'));
const InvoicesPage = lazy(() => import('../features/patients/pages/InvoicesPage'));
const ProfileSettings = lazy(() => import('../features/patients/pages/ProfileSettings'));

// Patient routes configuration
const patientRoutes = [
  {
    path: 'patient',
    element: (
          <PatientLayout />
    ),
    children: [
      { path: '', element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <PatientDashboard /> },
      { path: 'appointments', element: <AppointmentsList /> },
      { path: 'medical-history', element: <MedicalHistory /> },
      { path: 'invoices', element: <InvoicesPage /> },
      { path: 'settings', element: <ProfileSettings /> },
    ],
  },
];

export default patientRoutes;