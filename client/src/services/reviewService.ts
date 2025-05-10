import axiosInstance from '../utils/axios';
import { REVIEW_ENDPOINTS } from '../constants/api';
import { Review, ReviewSubmission } from '../types/reviews';
import { validateReviews } from '../utils/validation';

// Get the auth token from localStorage
const getAuthToken = () => localStorage.getItem('token');

const reviewService = {
  getReviewsByMentor: async (mentorId: number): Promise<Review[]> => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.get<unknown>(
        REVIEW_ENDPOINTS.GET_MENTOR_REVIEWS(mentorId),
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return validateReviews(response.data);
    } catch (error) {
      console.error('Error fetching mentor reviews:', error);
      throw error;
    }
  },

  getReviewBySession: async (sessionId: number): Promise<Review | null> => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.get<unknown>(
        REVIEW_ENDPOINTS.GET_BY_SESSION(sessionId),
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      const reviews = validateReviews([response.data]);
      return reviews[0] || null;
    } catch (error) {
      console.error('Error fetching session review:', error);
      throw error;
    }
  },

  submitReview: async (reviewData: ReviewSubmission): Promise<Review> => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.post<Review>(
        REVIEW_ENDPOINTS.CREATE_REVIEW,
        reviewData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error submitting review:', error);
      throw error;
    }
  },

  updateReview: async (reviewId: number, data: Partial<ReviewSubmission>): Promise<Review> => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.put<Review>(
        REVIEW_ENDPOINTS.UPDATE_REVIEW(reviewId),
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating review:', error);
      throw error;
    }
  },

  deleteReview: async (reviewId: number): Promise<void> => {
    try {
      const token = getAuthToken();
      await axiosInstance.delete(
        REVIEW_ENDPOINTS.DELETE_REVIEW(reviewId),
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  },
};

export default reviewService; 