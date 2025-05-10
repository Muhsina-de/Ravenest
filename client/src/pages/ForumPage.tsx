import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 
import TopicCard from '../components/forums/TopicCard';
import { getApiUrl } from '../config/api';
import { ForumTopic } from '../types/forum.types';

const ForumPage: React.FC = () => {
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get<ForumTopic[]>(getApiUrl('/api/forum/topics'));
        setTopics(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load topics');
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-xl text-gray-600">Loading forum topics...</div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-xl text-red-500">{error}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Community Forum</h1>
          {user && (
            <Link
              to="/forum/new"
              className="px-4 py-2 bg-gradient-primary text-white rounded-lg hover:bg-gradient-light transition"
            >
              New Topic
            </Link>
          )}
        </div>

        <div className="space-y-4">
          {topics.length === 0 ? (
            <div className="p-6 text-center text-gray-500 bg-white rounded-lg shadow-sm">
              No topics yet. Be the first to start a discussion!
            </div>
          ) : (
            topics.map((topic) => <TopicCard key={topic.id} topic={topic} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
