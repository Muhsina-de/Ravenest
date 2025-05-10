// API Configuration
const isProduction = import.meta.env.PROD;
const BACKEND_URL = isProduction 
  ? 'https://ravenest-api.onrender.com'  // Your Render backend URL
  : '';  // Empty in development because we're using Vite's proxy

export const API_CONFIG = {
  BASE_URL: BACKEND_URL,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      SIGNUP: '/api/auth/register',  // Changed from signup to register to match backend
    }
  }
};

export const getApiUrl = (endpoint: string) => `${BACKEND_URL}${endpoint}`; 