import LoginPage from '../features/auth/pages/LoginPage'
import RegisterPage from '../features/auth/pages/RegisterPage'
import { AuthProvider } from '../context/auth/AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home';
import PatientDashboard from '../features/patients/pages/PatientDashboard';
import DoctorDashboard from '../features/doctors/pages/doctor-dashboard';

function RouterList() {
  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('accessToken');
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  }; //to protect the components


  return (
    <>
      <BrowserRouter>
        <AuthProvider>
        <Routes>
            <Route path="" element={<Home />} />
            <Route path="login/" element={<LoginPage/>}/>
            <Route path="register/" element={<RegisterPage/>}/>
            <Route path="dashboard/patient" element={
                <ProtectedRoute>
                <PatientDashboard/>
                </ProtectedRoute>
        }/>
            <Route path="dashboard/doctor" element={
                        <ProtectedRoute>
                        <DoctorDashboard/>
                        </ProtectedRoute>
            }/>
            <Route/>
            <Route path="doctors" element={<Doctors/>}/>

          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default RouterList
