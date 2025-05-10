import axios from 'axios';
import { Session } from './dashboardService';

const API_URL = '/api/sessions';

// Get the auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Configure axios instance with auth header
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}`
  }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface CreateSessionData {
  menteeId: number;
  mentorId: number;
  date: string;
  time: string;
  skill: string;
  price?: number;
  duration?: number;
  message?: string;
  timezone: string;
}

const sessionService = {
  // Create a new session
  createSession: async (sessionData: CreateSessionData): Promise<Session> => {
    try {
      const response = await api.post<Session>('/', sessionData);
      return response.data;
    } catch (error) {
      const err = error as { response?: { data?: { error?: string } } };
      if (err.response?.data?.error) {
        throw new Error(err.response.data.error);
      }
      throw new Error('Failed to create session');
    }
  },

  // Get sessions for a user
  getUserSessions: async (userId: string): Promise<Session[]> => {
    try {
      const response = await api.get<Session[]>(`/user/${userId}`);
      return response.data;
    } catch (error) {
      const err = error as { response?: { data?: { error?: string } } };
      if (err.response?.data?.error) {
        throw new Error(err.response.data.error);
      }
      throw new Error('Failed to fetch user sessions');
    }
  },

  // Update session status
  updateSessionStatus: async (sessionId: number, status: string): Promise<Session> => {
    try {
      const response = await api.patch<Session>(`/${sessionId}/status`, { status });
      return response.data;
    } catch (error) {
      const err = error as { response?: { data?: { error?: string } } };
      if (err.response?.data?.error) {
        throw new Error(err.response.data.error);
      }
      throw new Error('Failed to update session status');
    }
  }
};

export default sessionService; 