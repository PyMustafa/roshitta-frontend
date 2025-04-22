import React from 'react';
import ReservationTable from "../components/ReservationTable";
import { Sidebar } from '../components/Sidebar';



function PatientDashboard() {
  return (

//     <div className=" my-6 container mx-auto  grid grid-cols-4  gap-6">
//       <div className="flex-1 p-6 border border-gray-300 col-span-3 my-4 rounded-xl">

//         <ReservationTable />

//       </div>
//     </div>
//   );
// }
 <div className=" my-6 container mx-auto  grid grid-cols-4  gap-10 ">
      
    <Sidebar className="hidden lg:block col-span-1" />

  <div className="flex-1 p-6 border border-gray-300 col-span-3 my-4 rounded-xl">

    <div className="container mx-auto px-4 py-8">

           <ReservationTable />


   
    </div>
  </div>
</div>
);
};

export default PatientDashboard;


