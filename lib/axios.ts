import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Add your API base URL here
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token from cookies
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth_token'); // Replace 'auth_token' with your cookie key
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
