import { useState } from 'react'
import LoginPage from './features/auth/pages/LoginPage'
import { AuthProvider } from './context/auth/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import RouterList from './routes/RouterList';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#333',
            },
            success: {
              style: {
                background: '#ECFDF5',
                border: '1px solid #10B981',
                color: '#10B981',
              },
            },
            error: {
              style: {
                background: '#FEF2F2',
                border: '1px solid #EF4444',
                color: '#EF4444',
              },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
