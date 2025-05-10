import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTopic } from '../../services/forum.service';
import { ForumTopic } from '../../types/forum.types';
import CommentSection from './CommentSection';

const TopicDetail: React.FC = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState<ForumTopic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTopic() {
      try {
        const response = await getTopic(Number(id));
        setTopic(response.data as ForumTopic);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch topic details');
        setLoading(false);
      }
    }

    fetchTopic();
  }, [id]);  

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!topic) return <div className="p-4">Topic not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">{topic.title}</h1>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <span>Posted by {topic.Author?.username || 'Anonymous'}</span>
          <span className="mx-2">•</span>
          <span>{new Date(topic.createdAt).toLocaleDateString()}</span>
        </div>
        <p className="mt-4 text-gray-600">{topic.content}</p>
      </div>
     
      <CommentSection
        topicId={Number(id)}
        comments={topic?.Comments || []}
      />
    </div>
  );
};

export default TopicDetail;