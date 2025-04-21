import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faHome } from '@fortawesome/free-solid-svg-icons'
import DoctorProfilePage from './features/doctors/pages/DoctorProfilePage'
import './App.css'

// Add icons to the library for global usage
library.add(faUser, faHome)

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
    <DoctorProfilePage/>
    </>
  )
}

export default App
