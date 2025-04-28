// Axios base instance setup
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/', // Change this to your API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})
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


export default api
