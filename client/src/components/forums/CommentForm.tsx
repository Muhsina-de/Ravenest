import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ForumComment } from '../../types/forum.types';
import { createComment } from '../../services/forum.service';

interface CommentFormProps {
  topicId: number;
  onCommentAdded: (comment: ForumComment) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ topicId, onCommentAdded }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) return;
    
    if (!user) {
      setError('User is not authenticated');
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('User:', user);
      console.log('TopicId:', topicId);
      console.log('Content:', content);

      const response = await createComment(topicId, content);
      
      if (response.status === 201 && response.data) {
        console.log('Response:', response.data);
        onCommentAdded(response.data as ForumComment);
        setContent('');
        setError('');
      } else {
        throw new Error('Failed to post comment');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg text-center">
        Please sign in to comment
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      {error && <div className="text-red-500 mb-2">{error}</div>}
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        rows={3}
        required
      />
      
      <button
        type="submit"
        disabled={isSubmitting || !content.trim()}
        className="mt-2 px-4 py-2 bg-gradient-primary text-white rounded hover:bg-gradient-light disabled:opacity-50"
      >
        {isSubmitting ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
};

export default CommentForm;
