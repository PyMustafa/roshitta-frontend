import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faHome } from '@fortawesome/free-solid-svg-icons'
import DoctorSchedule from './components/common/DoctorSchedule'
import DoctorProfile from './components/common/DoctorProfile'

// Add icons to the library for global usage
library.add(faUser, faHome)

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <DoctorProfile/>
    <DoctorSchedule/>
    </>
  )
}

export default App
