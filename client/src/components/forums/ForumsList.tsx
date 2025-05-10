import React, { useState, useEffect } from 'react';
import { getTopics } from '../../services/forum.service';
import TopicCard from './TopicCard';
import { ForumTopic } from '../../types/forum.types';
import { Link } from 'react-router-dom';

const ForumsList: React.FC = () => {
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const response = await getTopics();
        setTopics(response.data as ForumTopic[]);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch topics');
        setLoading(false);
      }
    }

    fetchTopics();
  }, []);

  if (loading) return <div className="p-4">Loading topics...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Forum Discussions</h1>
        <Link 
          to="/forum/new" 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          New Topic
        </Link>
      </div>

      <div className="space-y-4">
        {topics.length > 0 ? (
          topics.map(topic => <TopicCard key={topic.id} topic={topic} />)
        ) : (
          <p className="text-center text-gray-500 p-4">No topics found. Be the first to create a discussion!</p>
        )}
      </div>
    </div>
  );
};

export default ForumsList;
