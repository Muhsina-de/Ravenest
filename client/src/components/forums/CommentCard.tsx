import React from 'react';
import { ForumComment } from '../../types/forum.types';

interface CommentCardProps {
  comment: ForumComment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {comment.Author?.profilePicture ? (
            <img 
              src={comment.Author.profilePicture} 
              alt={comment.Author.username}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-medium">
                {comment.Author?.username?.charAt(0)?.toUpperCase() || 'A'}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-grow">
          <div className="flex items-center">
            <h4 className="font-medium">{comment.Author?.username || 'Anonymous'}</h4>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-sm text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>
          <div className="mt-1 text-gray-700">
            {comment.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;