// Export all API modules for easy importing throughout the application
import api from './axios';
import * as auth from './auth';
import * as appointments from './appointments';
import * as endpoints from './endpoints';

// Re-export everything
export {
  api,
  auth,
  appointments,
  endpoints
};

// Default export the api instance
export default api;