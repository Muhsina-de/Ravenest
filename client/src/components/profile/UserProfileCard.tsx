import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../types/user.types';
import { useAuth } from '../../context/AuthContext';

interface UserProfileCardProps {
  user: User;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  const { user: currentUser } = useAuth();

  return (
    <div className="bg-primary/10 rounded-lg border border-primary-light/20 p-6 h-full flex flex-col">
      <div className="flex items-center space-x-4">
        <img
          src={user.profilePicture || 'https://via.placeholder.com/100'}
          alt={user.username}
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">{user.username}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      {user.bio && (
        <div className="mt-4">
          <h3 className="text-lg font-medium">About</h3>
          <p className="text-gray-600">{user.bio}</p>
        </div>
      )}
      {user.skills && user.skills.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-medium">Skills</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="mt-auto pt-4">
        {user.rating !== undefined && (
          <div className="flex items-center justify-between">
            <Link to={`/reviews?mentorId=${user.id}`} className="flex items-center hover:opacity-80 transition-opacity">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="text-2xl font-bold text-yellow-500">{user.rating.toFixed(1)}</span>
              <span className="text-gray-600 ml-2">/ 5.0</span>
            </Link>
            {currentUser && currentUser.role === 'mentee' && (
              <Link
                to={`/mentor/${user.id}`}
                className="px-4 py-1 bg-gradient-primary text-white rounded-md hover:bg-gradient-light transition-all text-sm"
              >
                Book Session
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileCard; 