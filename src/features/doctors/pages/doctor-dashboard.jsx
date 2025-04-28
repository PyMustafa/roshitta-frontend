import { Sidebar } from "../components/sidebar.jsx"
import { StatsCards } from "../components/stats-cards.jsx"
import { AppointmentsTable } from "../components/appointments-table.jsx"
import { useAuth } from "../../../context/auth/AuthContext.jsx";
import { Navigate } from 'react-router-dom';


export default function DoctorDashboard() {
    const { currentUser } = useAuth();
    if (!currentUser || currentUser.user_type !== 'doctor') {
      return <Navigate to="/" replace />;
    }
  
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <StatsCards />
          <AppointmentsTable />
        </main>
      </div>
    </div>
  )
}
