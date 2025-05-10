import React, { useState } from 'react';
import CommentForm from './CommentForm';
import CommentCard from './CommentCard';
import { ForumComment } from '../../types/forum.types';

interface CommentSectionProps {
  topicId: number;
  comments?: ForumComment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ topicId, comments = [] }) => {
  const [localComments, setLocalComments] = useState<ForumComment[]>(comments);

  const handleCommentAdded = (newComment: ForumComment) => {
    setLocalComments(prev => [newComment, ...prev]);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Comments ({localComments.length})</h2>
      
      <CommentForm 
        topicId={topicId} 
        onCommentAdded={handleCommentAdded} 
      />
      
      <div className="mt-8 space-y-4">
        {localComments.length > 0 ? (
          localComments.map(comment => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;