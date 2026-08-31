import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create a singleton axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  // No automatic retries, failing fast aligns with our UI pattern.
});

// Request interceptor to attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('client_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle 401s
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('client_token');
      localStorage.removeItem('client_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
