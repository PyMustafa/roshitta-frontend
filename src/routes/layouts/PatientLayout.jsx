import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../features/patients/components/Sidebar';

/**
 * Layout wrapper for patient dashboard pages
 * Includes sidebar and common elements
 */
export const PatientLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};