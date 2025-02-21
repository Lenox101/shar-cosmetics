import axios from 'axios';
import router from '@/router'; // Import your router

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Your backend URL
});

// Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 && !error.config.__isRetryRequest) {
      // Token expired or unauthorized, redirect to login
      localStorage.removeItem('userToken');
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 