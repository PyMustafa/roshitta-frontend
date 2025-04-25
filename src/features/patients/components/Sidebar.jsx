import { LayoutDashboard, Calendar, Clock,FileText, Settings, LogOut } from "lucide-react"
import doctorImage from "./doctor.jpg"
import patientSidebarBg from "./patient-sidebar-bg.jpg"
import { NavLink } from 'react-router-dom';

export function Sidebar() {
  const isActive = ({ isActive }) =>
    isActive ? "flex items-center px-4 py-2.5 text-white bg-[#5F6fff] rounded-lg" :
      "flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg";

  return (
    <aside className="ml-4 bg-white shadow-lg rounded-xl my-4 h-180 overflow-hidden">
      <div className="flex flex-col">
        <div className="relative">
          <div className="h-37 w-full relative overflow-hidden">
            <img
              src={patientSidebarBg}
              alt="Sidebar background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-2 left-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M8 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"></path>
                  <path d="M8 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2Z"></path>
                  <path d="M12 14v4"></path>
                  <path d="M10 16h4"></path>
                </svg>
              </div>
              <div className="absolute top-6 right-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center px-4">
            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden -mt-12 mb-3 z-10">
              <img
                src={doctorImage}
                alt="Doctor profile"
                className="object-cover w-full h-full"
              />
            </div>
            <h2 className="text-lg font-semibold mb-2">Dr Darren Elder</h2>
            <div className="mt-1 mb-4 inline-flex items-center px-2 py-0.5 text-xs text-red-600 bg-red-100 rounded-none">
              <span className="mr-1 h-2 w-2 rounded-full bg-red-600"></span>
              Patient
            </div>
          </div>
        </div>


        <nav className="px-4 py-2 pb-4">
          <ul className="space-y-1">
            <li>
              <NavLink to="/dashboard" className={isActive}>
                <LayoutDashboard className="w-5 h-5 mr-3" />
                Dashboard
              </NavLink>
            </li>



            <li>
              <NavLink to="/appointments" className={isActive}>
                <Calendar className="w-5 h-5 mr-3" />
                Appointment List
              </NavLink>
            </li>

            <li>
              <NavLink to="/medical-history" className={isActive}>
                <Clock className="w-5 h-5 mr-3" />
                Medical History
              </NavLink>
            </li>

            <li>
              <NavLink to="/invoices" className={isActive}>
              <FileText className="w-5 h-5 mr-3" /> 
              Invoices
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" className={isActive}>
                <Settings className="w-5 h-5 mr-3" />
                Profile Settings
              </NavLink>
            </li>
            <li>
              <NavLink to="/logout" className={isActive}>
              <LogOut className="w-5 h-5 mr-3" /> 
                              Logout
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}
