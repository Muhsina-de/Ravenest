import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { format, parseISO } from 'date-fns';
import { API_BASE_URL } from '../constants/api';
import CommentCard from '../components/forums/CommentCard';
import CommentForm from '../components/forums/CommentForm';
import { ForumTopic, ForumComment } from '../types/forum.types';

const TopicDetailPage: React.FC = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState<ForumTopic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get<ForumTopic>(`${API_BASE_URL}/forum/topics/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTopic(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load topic');
        setLoading(false);
      }
    };

    fetchTopic();
  }, [id]);

  const handleDeleteTopic = async () => {
    if (!window.confirm('Are you sure you want to delete this topic?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/forum/topics/${id}?userId=${user?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate('/forum');
    } catch (err) {
      setError('Failed to delete topic');
    }
  };

  const handleAddComment = (newComment: ForumComment) => {
    if (topic) {
      const comment: ForumComment = {
        id: newComment.id,
        content: newComment.content,
        authorId: newComment.authorId,
        topicId: newComment.topicId,
        createdAt: newComment.createdAt,
        updatedAt: newComment.updatedAt,
        Author: newComment.Author
      };
      
      setTopic({
        ...topic,
        Comments: [...(topic.Comments || []), comment]
      });
    }
  };

  if (loading) return <div className="text-center py-8">Loading topic...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!topic) return <div className="text-center py-8">Topic not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="mb-4">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-gray-900">{topic.title}</h1>
            {user && parseInt(user.id.toString(), 10) === topic.authorId && (
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(`/forum/edit-topics/${topic.id}`)}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                >
                  Edit 
                </button>
                <button
                  onClick={handleDeleteTopic}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
       
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs mr-3">
              {topic.category}
            </span>
            <span className="flex items-center mr-3">
              By {topic.Author?.username || 'Anonymous'} • {topic.createdAt && topic.createdAt.length > 0 ? format(parseISO(topic.createdAt), 'MMM d, yyyy') : 'Unknown date'}
            </span>
          </div>
        </div>
     
        <div className="prose max-w-none mt-4">
          {topic.content}
        </div>
      </div>
   
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Comments ({topic.Comments?.length || 0})
        </h2>
     
        {topic.Comments && topic.Comments.length > 0 ? (
          <div className="space-y-4">
            {topic.Comments.map(comment => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
            No comments yet. Be the first to share your thoughts!
          </div>
        )}
      </div>
   
      {user ? (
        <CommentForm topicId={parseInt(topic.id.toString(), 10)} onCommentAdded={handleAddComment} />
      ) : (
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-gray-600 mb-2">You must be logged in to comment</p>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
};

export default TopicDetailPage;