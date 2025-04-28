import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../features/doctors/components/sidebar';

/**
 * Layout wrapper for doctor dashboard pages
 * Includes sidebar and common elements
 */
export const DoctorLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};