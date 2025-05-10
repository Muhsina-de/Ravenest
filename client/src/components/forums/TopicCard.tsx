import React from 'react';
import { Link } from 'react-router-dom';
import { ForumTopic } from '../../types/forum.types';

const TopicCard: React.FC<{ topic: ForumTopic }> = ({ topic }) => {
  return (
    <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="flex justify-between items-start">
        <div>
          <Link
            to={`/forum/topics/${topic.id}`}
            className="text-xl font-semibold text-blue-600 hover:text-blue-800"
          >
            {topic.title}
          </Link>
          <p className="text-gray-600 mt-2">{topic.content}</p>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
          {topic.category}
        </span>
      </div>
      <div className="mt-4 flex items-center text-sm text-gray-500">
        <span>Posted by {topic.Author?.username || 'Anonymous'}</span>
        <span className="mx-2">•</span>
        <span>{new Date(topic.createdAt).toLocaleDateString()}</span>
        <span className="mx-2">•</span>
        <span>{topic.Comments?.length || 0} comments</span>
      </div>
    </div>
  );
};

export default TopicCard;