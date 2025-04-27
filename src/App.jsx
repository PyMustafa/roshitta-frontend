import { useState } from 'react'
import LoginPage from './features/auth/pages/LoginPage'
import { AuthProvider } from './context/auth/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)


  return (

    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
