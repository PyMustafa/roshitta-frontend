import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../features/doctors/components/sidebar';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

/**
 * Layout wrapper for doctor dashboard pages
 * Includes navbar, sidebar, and footer with proper container
 */
export const DoctorLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Main content with padding for fixed navbar */}
      <div className="flex flex-1 pt-[76px]">
        {/* Container for content */}
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="md:w-1/4 lg:w-1/5">
              <Sidebar />
            </div>

            {/* Page content */}
            <div className="md:w-3/4 lg:w-4/5 p-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      <Footer className='mt-auto' />
    </div>
  );
};