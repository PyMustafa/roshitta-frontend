import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from '../features/patients/components/Sidebar'; 
import PatientDashboard from '../features/patients/pages/PatientDashboard';
import ProfileSettings from '../features/patients/pages/ProfileSettings';
import AppointmentsList from '../features/patients/pages/AppointmentsList';
import MedicalHistory from '../features/patients/pages/MedicalHistory';
import InvoicesPage from '../features/patients/pages/InvoicesPage';

function PatientDashboardLayout() {
  return (
    <Router>
      <div className="flex min-h-screen">
        {/* <Sidebar className="hidden lg:block"/> */}
        <div className="flex-1 p-6">
          <Routes>
          <Route path="/dashboard" element={<PatientDashboard />} />
            <Route path="/appointments" element={<AppointmentsList />} />
            <Route path="/medical-history" element={<MedicalHistory />} />
            <Route path="/invoices" element={<InvoicesPage />} />
            <Route path="/settings" element={<ProfileSettings />} />


          </Routes>
        </div>
      </div>
    </Router>           
  );
}

export default PatientDashboardLayout;