import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// Lazy load auth pages
const LoginPage = lazy(() => import('../features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('../features/auth/pages/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('../features/auth/pages/ForgotPasswordPage'));
const EmailVerificationPage = lazy(() => import('../features/auth/pages/EmailVerificationPage'));

// Auth routes configuration
const authRoutes = [
  {
    path: 'auth',
    children: [
      { path: '', element: <Navigate to="login" replace /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'verify-email', element: <EmailVerificationPage /> },
    ],
  },
];

export default authRoutes;