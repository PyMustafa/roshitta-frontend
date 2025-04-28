import { useState } from 'react'
import LoginPage from './features/auth/pages/LoginPage'
import { AuthProvider } from './context/auth/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import RouterList from './routes/RouterList';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
