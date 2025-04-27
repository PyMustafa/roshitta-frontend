// Export all API modules for easy importing throughout the application
import api from './axios';
import * as auth from './auth';


// Re-export everything
export {
  api,
  auth,
};

// Default export the api instance
export default api;