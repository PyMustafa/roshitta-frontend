// Export all API modules for easy importing throughout the application
import api from './axios';
import * as auth from './auth';
import * as appointments from './appointments';
import * as profiles from './profiles';
import * as endpoints from './endpoints';

// Re-export everything
export {
  api,
  auth,
  appointments,
  profiles,
  endpoints
};

// Default export the api instance
export default api;