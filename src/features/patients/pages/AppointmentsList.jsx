import React, { useState } from 'react';
import AppointmentCard from '../components/AppointmentCard';
import AppointmentDetails from '../components/AppointmentDetails';
import { Sidebar } from '../components/Sidebar';

const AppointmentsList = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const appointments = [
    {
      id: '#5872',
      doctor: 'Darren Elder',
      date: '26 Apr 2025 - 10:10 am',
      email: 'patientdemo@example.com',
      phone: '4545435'
    },
    {
      id: '#1234',
      doctor: 'Sara Elagder',
      date: '26 Apr 2025 - 10:10 am',
      email: 'sara@example.com',
      phone: '123456'
    },
  ];

  return (
  
    <div className=" my-6 container mx-auto  grid grid-cols-4  gap-10 ">

      <Sidebar className="hidden lg:block col-span-1" />

      <div className="flex-1 p-6 border border-gray-300 col-span-3 my-4 rounded-xl">

        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Appointments</h1>

             <div className="">
              <div className="">
                 {selectedAppointment && (
                  <AppointmentDetails appointment={selectedAppointment} />
                )}

                <div className="mt-6 space-y-4">
                  {appointments.map((appointment) => (
                    <AppointmentCard 
                      key={appointment.id} 
                      appointment={appointment}
                      onClick={() => setSelectedAppointment(appointment)}
                    />
                  ))}
                </div>
              </div>

            </div>

        </div>
      </div>
    </div>
  );
};

export default AppointmentsList;