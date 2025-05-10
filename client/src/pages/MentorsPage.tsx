import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserProfileCard from '../components/profile/UserProfileCard';
import mentorService, { Mentor } from '../services/mentorService';
import { User } from '../types/user.types';

const MentorsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills] = useState<string[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        console.log('Fetching mentors...');
        const data = await mentorService.getAllMentors();
        console.log('Received mentors data:', data);
        setMentors(data);
      } catch (err) {
        console.error('Error loading mentors:', err);
        setError('Failed to load mentors');
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.bio?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkills = selectedSkills.length === 0 || 
                         selectedSkills.every(skill => mentor.skills?.includes(skill));
    return matchesSearch && matchesSkills;
  });

  if (loading) return <div className="text-center py-8">Loading mentors...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Find a Mentor</h1>
        <p className="mt-2 text-gray-600">Connect with experienced mentors in your field</p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search mentors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
          <Link key={mentor.id} to={`/mentors/${mentor.id}`}>
            <UserProfileCard user={{
              id: String(mentor.id),
              username: mentor.username,
              email: mentor.email,
              role: mentor.role,
              profilePicture: mentor.profilePicture || undefined,
              bio: mentor.bio || undefined,
              skills: mentor.skills || [],
              rating: mentor.rating
            } as User} />
          </Link>
        ))}
      </div>

      {filteredMentors.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No mentors found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default MentorsPage; 