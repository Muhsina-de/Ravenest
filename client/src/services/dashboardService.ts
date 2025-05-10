import axios from 'axios';

const API_URL = '/api/dashboard'; // Using Vite proxy

// Types for dashboard data
export interface Session {
  id: number;
  menteeId: number;
  mentorId: number;
  date: string;
  time: string;
  skill: string;
  status: string;
  mentee?: {
    username: string;
    email: string;
  };
  mentor?: {
    username: string;
    email: string;
  };
}

export interface MentorMetrics {
  totalSessions: number;
  averageRating: number;
  completionRate: number;
  totalMentees: number;
  totalEarnings: number;
}

export interface EarningsData {
  month: string;
  total: number;
}

export interface MentorDashboardData {
  upcomingSessions: Session[];
  metrics: MentorMetrics;
  earnings: EarningsData[];
}

export interface Mentor {
  id: number;
  username: string;
  email: string;
  reviews: { rating: number }[];
}

export interface LearningProgress {
  skill: string;
  sessionsCompleted: number;
}

export interface MenteeDashboardData {
  upcomingSessions: Session[];
  favoriteMentors: {
    mentorId: number;
    mentor: Mentor;
  }[];
  pendingReviews: Session[];
  learningProgress: LearningProgress[];
}

// Get the auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Configure axios instance with auth header
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle unauthorized errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data and reload page to trigger redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

// Dashboard service methods
const dashboardService = {
  // Get mentor dashboard data
  getMentorDashboard: async (): Promise<MentorDashboardData> => {
    try {
      const response = await api.get<MentorDashboardData>('/mentor');
      return response.data;
    } catch (error) {
      const err = error as { response?: { data?: { error?: string } } };
      if (err.response?.data?.error) {
        throw new Error(err.response.data.error);
      }
      throw new Error('Failed to fetch mentor dashboard data');
    }
  },

  // Get mentee dashboard data
  getMenteeDashboard: async (): Promise<MenteeDashboardData> => {
    try {
      const response = await api.get<MenteeDashboardData>('/mentee');
      return response.data;
    } catch (error) {
      const err = error as { response?: { data?: { error?: string } } };
      if (err.response?.data?.error) {
        throw new Error(err.response.data.error);
      }
      throw new Error('Failed to fetch mentee dashboard data');
    }
  }
};

export default dashboardService; 