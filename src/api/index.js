// Export all API modules for easy importing throughout the application
import api from './axios';
import * as auth from './auth';
import * as appointments from './appointments';
import * as profiles from './profiles';
import * as clinics from './clinics';
import * as endpoints from './endpoints';

// Re-export everything
export {
  api,
  auth,
  appointments,
  profiles,
  clinics,
  endpoints
};

// Default export the api instance
export default api;