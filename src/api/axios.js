// Axios base instance setup
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/', // Change this to your API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors and provide mock data in development if needed
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log the error for debugging
    console.error('API Error:', error);
    
    // For development: Return mock data for specific endpoints if backend is not ready
    if (process.env.NODE_ENV === 'development' && !error.response) {
      const url = error.config.url;
      console.log(`Network error for: ${url} - Using mock data in development`);
      
      // Check which endpoint failed and return appropriate mock data
      if (url.includes('/appointments/patients/me/today/')) {
        return Promise.resolve({
          data: {
            count: 1,
            next: null,
            previous: null,
            results: [
              {
                id: 123,
                clinic: {
                  id: 1,
                  name: "Mock Clinic",
                  city: "Mock City",
                  address: "123 Mock Street"
                },
                patient: {
                  id: 1,
                  email: "patient@example.com",
                  first_name: "Mock",
                  last_name: "Patient",
                  gender: "male",
                  user_type: "patient"
                },
                doctor: {
                  id: 2,
                  email: "doctor@example.com",
                  first_name: "Mock",
                  last_name: "Doctor",
                  gender: "male",
                  user_type: "doctor"
                },
                start_datetime: new Date().toISOString(),
                end_datetime: new Date(Date.now() + 3600000).toISOString(),
                status: "scheduled",
                status_display: "Scheduled",
                notes: "Mock appointment"
              }
            ]
          }
        });
      }
      
      if (url.includes('/appointments/patients/me/upcoming/')) {
        return Promise.resolve({
          data: {
            count: 2,
            next: null,
            previous: null,
            results: [
              {
                id: 124,
                clinic: {
                  id: 1,
                  name: "Mock Clinic",
                  city: "Mock City",
                  address: "123 Mock Street"
                },
                patient: {
                  id: 1,
                  email: "patient@example.com",
                  first_name: "Mock",
                  last_name: "Patient",
                  gender: "male",
                  user_type: "patient"
                },
                doctor: {
                  id: 2,
                  email: "doctor@example.com",
                  first_name: "Mock",
                  last_name: "Doctor",
                  gender: "male",
                  user_type: "doctor"
                },
                start_datetime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
                end_datetime: new Date(Date.now() + 86400000 + 3600000).toISOString(),
                status: "scheduled",
                status_display: "Scheduled",
                notes: "Future appointment"
              },
              {
                id: 125,
                clinic: {
                  id: 2,
                  name: "Another Clinic",
                  city: "Another City",
                  address: "456 Mock Avenue"
                },
                patient: {
                  id: 1,
                  email: "patient@example.com",
                  first_name: "Mock",
                  last_name: "Patient",
                  gender: "male", 
                  user_type: "patient"
                },
                doctor: {
                  id: 3,
                  email: "anotherdoctor@example.com",
                  first_name: "Another",
                  last_name: "Doctor",
                  gender: "female",
                  user_type: "doctor"
                },
                start_datetime: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
                end_datetime: new Date(Date.now() + 172800000 + 3600000).toISOString(),
                status: "confirmed",
                status_display: "Confirmed",
                notes: "Another future appointment"
              }
            ]
          }
        });
      }
      
      // Add more mock responses for other endpoints as needed
    }
    
    // Handle connection errors
    if (!error.response) {
      return Promise.reject({
        message: 'Network error. Please check your connection or the API server may be down.',
        original: error
      });
    }
    
    // Handle various HTTP errors
    switch (error.response.status) {
      case 401:
        // Unauthorized - clear tokens
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        break;
      case 403:
        console.log('Forbidden access');
        break;
      case 404:
        console.log('Resource not found');
        break;
      case 500:
        console.log('Server error');
        break;
      default:
        console.log(`Unhandled status code: ${error.response.status}`);
    }
    
    return Promise.reject(error);
  }
);

export default api
