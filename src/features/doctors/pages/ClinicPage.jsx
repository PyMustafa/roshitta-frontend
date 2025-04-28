import React from 'react';
import { ClinicsTable } from '../components/clinics-table';
import { Sidebar } from '../components/sidebar';

const ClinicPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
        <div className='col-span-1 lg:col-span-1'>
          <Sidebar />
        </div>
        <div className='col-span-1 lg:col-span-3'>
          <div className="mt-8">
            <ClinicsTable />
          </div>
        </div>
      </div>
    </div>
  )
};

export default ClinicPage; 