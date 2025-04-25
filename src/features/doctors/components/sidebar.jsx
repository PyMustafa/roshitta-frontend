import { LayoutDashboard, Calendar, Clock, MessageSquare, Settings, Menu, X, BookOpen, FileText } from "lucide-react"
import doctorImage from "./doctor.jpg"

export function Sidebar() {

  return (
    <>
      <aside
        className={`
        bg-white shadow-lg 
      `}
      >
        <div className="flex flex-col h-full">
          <div className="relative md:block">
            <div className="bg-blue-600 h-32 w-full relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-2 left-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
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
                <div className="absolute top-6 right-8">
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
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </div>
                <div className="absolute bottom-4 left-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="m8 2 4 10 3-6 3 6-4 10"></path>
                  </svg>
                </div>
                <div className="absolute top-12 left-20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <rect width="16" height="16" x="4" y="4" rx="2"></rect>
                    <path d="M12 4v16"></path>
                    <path d="M4 12h16"></path>
                  </svg>
                </div>
                <div className="absolute bottom-8 right-4">
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
                    <path d="M15 11h.01"></path>
                    <path d="M11 15h.01"></path>
                    <path d="M16 16h.01"></path>
                    <path d="m2 9 4-2 .6 3"></path>
                    <path d="M5 14h4"></path>
                    <path d="M9 16c.9.8 2.6 1 3.8 1"></path>
                    <path d="M21.5 12 17 9.5V12l-5 3 2 4.5L19.5 17l2-5Z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-35 h-35 rounded-full border-4 border-white overflow-hidden -mt-12 mb-4 z-10">
                <img
                  src={doctorImage}
                  alt="Doctor profile"
                  width={250}
                  height={250}
                  className="object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold">Dr Darren Elder</h2>
              <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs text-blue-600 bg-blue-100">
                <span className="mr-1 h-2 w-2 rounded-full bg-blue-600"></span>
                Doctor
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 mt-2">
            <ul className="space-y-1">
              <li>
                <a href="#" className="flex items-center px-4 py-3 text-white bg-blue-500 rounded-md">
                  <LayoutDashboard className="w-5 h-5 mr-3" />
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md">
                  <Calendar className="w-5 h-5 mr-3" />
                  Appointments
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md">
                  <Clock className="w-5 h-5 mr-3" />
                  Available Timings
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md">
                  <MessageSquare className="w-5 h-5 mr-3" />
                  Messages
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md">
                  <Settings className="w-5 h-5 mr-3" />
                  Profile Settings
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md">
                  <BookOpen className="w-5 h-5 mr-3" />
                  Specialties & Services
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md">
                  <FileText className="w-5 h-5 mr-3" />
                  Manage Article
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  )
}
