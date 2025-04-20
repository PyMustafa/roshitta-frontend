import { Sidebar } from "../components/sidebar.jsx"
import { StatsCards } from "../components/stats-cards.jsx"
import { AppointmentsTable } from "../components/appointments-table.jsx"

export default function DoctorDashboard() {
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
