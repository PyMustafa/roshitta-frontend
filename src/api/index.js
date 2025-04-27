// Export all API modules for easy importing throughout the application
import api from './axios';
import * as auth from './auth';
import * as appointments from './appointments';
import * as profiles from './profiles';
import * as clinics from './clinics';
import * as medical from './medical';
import * as notifications from './notifications';
import * as endpoints from './endpoints';

// Re-export everything
export {
  api,
  auth,
  appointments,
  profiles,
  clinics,
  medical,
  notifications,
  endpoints
};

// Default export the api instance
export default api;