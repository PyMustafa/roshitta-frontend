import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faHome } from '@fortawesome/free-solid-svg-icons'
// import DoctorDashboard from './features/doctors/pages/doctor-dashboard'
import { AppointmentPage } from './features/doctors/pages/AppointmentPage'

// Add icons to the library for global usage
library.add(faUser, faHome)

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p class="font-sans text-8xl text-blue-600/100 ">welcome to roshitta web app</p>
      <FontAwesomeIcon icon="user" className="text-blue-500 text-4xl" />
      <AppointmentPage/>
    </>
  )
}

export default App
