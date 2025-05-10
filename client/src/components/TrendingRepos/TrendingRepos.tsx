import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl } from '../../config/api';

interface Repo {
  id: number;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
}

const TrendingRepos: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrendingRepos() {
      try {
        const response = await axios.get<Repo[]>(getApiUrl('/api/github/trending'));
        setRepos(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching trending repositories:', err);
        setError('Failed to fetch trending repositories');
        setLoading(false);
      }
    }

    fetchTrendingRepos();
  }, []);

  if (loading) return (
    <div className="main-container">
      <div className="text-center text-lg font-semibold">Loading...</div>
    </div>
  );
  
  if (error) return (
    <div className="main-container">
      <div className="text-center text-red-500">{error}</div>
    </div>
  );

  return (
    <div className="main-container space-y-6">
      <h1 className="text-3xl font-bold text-center">Trending GitHub Repositories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(repos) && repos.length > 0 ? (
          repos.map((repo) => (
            <div key={repo.id} className="glass-card p-6 hover:bg-white/90 transition duration-200">   
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                <h3 className="text-xl font-semibold hover:text-blue-500">{repo.full_name}</h3>
              </a>
              <p className="mt-2 text-gray-600">{repo.description || 'No description available'}</p> 
              <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                <span>{repo.stargazers_count.toLocaleString()} stars</span>
                {repo.language && (
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                    {repo.language}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-lg font-medium text-gray-600">
            No repositories available.
          </div>
        )}
      </div>
    </div>
  );
}

export default TrendingRepos;