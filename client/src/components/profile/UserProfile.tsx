import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../constants/api';
import ReviewList from '../reviews/ReviewList';
import { Review } from '../../types/reviews';

// Simple User interface matching what we've been using
interface User {
  id: number;
  username: string;
  email?: string;
  profilePicture?: string;
  role?: string;
  bio?: string;
  skills?: string[];
  rating?: number;
}

interface UserProfileProps {
  user: User;
  isCurrentUser?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  isCurrentUser = false
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserReviews = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<Review[]>(`${API_BASE_URL}/api/reviews/mentor/${user.id}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserReviews();
  }, [user.id]);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {/* Profile Header */}
      <div className="flex items-start gap-4">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          {user.profilePicture ? (
            <img 
              src={user.profilePicture} 
              alt={user.username} 
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl font-medium">
                {user.username.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        
        {/* User Info */}
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">{user.username}</h2>
              {user.role && (
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  {user.role}
                </span>
              )}
            </div>
            
            {!isCurrentUser && (
              <Link
                to={`/messages/${user.id}`}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Message
              </Link>
            )}
          </div>
          
          {/* Bio */}
          {user.bio && (
            <div className="mt-3">
              <p className="text-gray-600 text-sm">{user.bio}</p>
            </div>
          )}
          
          {/* Skills */}
          {user.skills && user.skills.length > 0 && (
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Rating */}
          {user.rating && (
            <div className="mt-3 flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="text-gray-700 text-sm">
                {user.rating.toFixed(1)} ({reviews.length} reviews)
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Reviews Section */}
      {!isLoading && reviews.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <h3 className="text-lg font-medium mb-3">Recent Reviews</h3>
          <ReviewList 
            reviews={reviews.slice(0, 3)} 
            mentorId={user.id}
          />
          
          {reviews.length > 3 && (
            <Link 
              to={`/users/${user.id}/reviews`}
              className="text-blue-600 hover:underline text-sm mt-3 inline-block"
            >
              View all {reviews.length} reviews
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;