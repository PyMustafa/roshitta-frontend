import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthGuard } from './guards/AuthGuard';
import { EmailVerificationGuard } from './guards/EmailVerificationGuard';
import { RoleGuard } from './guards/RoleGuard';
import { DoctorLayout } from './layouts/DoctorLayout';

// Lazy load doctor pages
const DoctorDashboard = lazy(() => import('../features/doctors/pages/doctor-dashboard'));
const AppointmentPage = lazy(() => import('../features/doctors/pages/AppointmentPage'));
const ProfileSettings = lazy(() => import('../features/doctors/pages/profile-settings'));
const DoctorProfilePage = lazy(() => import('../features/doctors/pages/DoctorProfilePage'));
const ClinicPage = lazy(() => import('../features/doctors/pages/ClinicPage'));
const ClinicsSchedule = lazy(() => import('../features/doctors/pages/clinics-schedule'));
const PatientsPage = lazy(() => import('../features/doctors/pages/Patients'));

// Doctor routes configuration
const doctorRoutes = [
  {
    path: 'doctor',
    element: (
      <AuthGuard>
        <EmailVerificationGuard>
          <RoleGuard allowedRoles={['doctor']}>
            <DoctorLayout />
          </RoleGuard>
        </EmailVerificationGuard>
      </AuthGuard>
    ),
    children: [
      { path: '', element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <DoctorDashboard /> },
      { path: 'appointments', element: <AppointmentPage /> },
      { path: 'patients', element: <PatientsPage /> },
      { path: 'profile', element: <DoctorProfilePage /> },
      { path: 'settings', element: <ProfileSettings /> },
      { path: 'clinics', element: <ClinicPage /> },
      { path: 'clinics/schedule', element: <ClinicsSchedule /> },
    ],
  },
];

export default doctorRoutes;