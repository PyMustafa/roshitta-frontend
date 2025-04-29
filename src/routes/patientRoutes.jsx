import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthGuard } from './guards/AuthGuard';
import { EmailVerificationGuard } from './guards/EmailVerificationGuard';
import { RoleGuard } from './guards/RoleGuard';
import { PatientLayout } from './layouts/PatientLayout';

// Lazy load patient pages
const PatientDashboard = lazy(() => import('../features/patients/pages/PatientDashboard'));
const AppointmentsList = lazy(() => import('../features/patients/pages/AppointmentsList'));
const MedicalHistory = lazy(() => import('../features/patients/pages/MedicalHistory'));
// Commented out for now
// const InvoicesPage = lazy(() => import('../features/patients/pages/InvoicesPage'));
const ProfileSettings = lazy(() => import('../features/patients/pages/ProfileSettings'));
const ChangePassword = lazy(() => import('../features/patients/pages/ChangePasswordPage'));
// Patient routes configuration
const patientRoutes = [
  {
    path: 'patient',
    element: (
      <AuthGuard>
        <EmailVerificationGuard>
          <RoleGuard allowedRoles={['patient']}>
            <PatientLayout />
          </RoleGuard>
        </EmailVerificationGuard>
      </AuthGuard>
    ),
    children: [
      { path: '', element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <PatientDashboard /> },
      { path: 'appointments', element: <AppointmentsList /> },
      { path: 'medical-history', element: <MedicalHistory /> },
      // Commented out invoices page for now
      // { path: 'invoices', element: <InvoicesPage /> },
      { path: 'settings', element: <ProfileSettings /> },
      { path: 'change-password', element: <ChangePassword /> },

    ],
  },
];

export default patientRoutes;