import axios, { AxiosError } from 'axios';
import NodeCache from 'node-cache';

// Initialize cache with 5 minutes TTL
const cache = new NodeCache({ stdTTL: 300 });

// GitHub API base URL
const GITHUB_API_BASE = 'https://api.github.com';

// GitHub token from environment variables
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Common headers for GitHub API requests
const headers = {
  'Authorization': `Bearer ${GITHUB_TOKEN}`,
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'RaveNest-App'
};

// TypeScript interfaces for GitHub data
interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
}

interface TrendingRepo {
  id: number;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
}

// Function to get GitHub user information
export const getGithubUser = async (username: string): Promise<GithubUser> => {
  const cacheKey = `user_${username}`;
  const cachedData = cache.get<GithubUser>(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(`${GITHUB_API_BASE}/users/${username}`, { headers });
    const userData = response.data;
    cache.set(cacheKey, userData);
    return userData;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error('User not found');
    }
    throw error;
  }
};

// Function to get user's repositories
export const getGithubRepos = async (username: string): Promise<GithubRepo[]> => {
  const cacheKey = `repos_${username}`;
  const cachedData = cache.get<GithubRepo[]>(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(`${GITHUB_API_BASE}/users/${username}/repos`, { headers });
    const reposData = response.data;
    cache.set(cacheKey, reposData);
    return reposData;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error('User not found');
    }
    throw error;
  }
};

// Function to get specific repository details
export const getGithubRepo = async (username: string, repo: string): Promise<GithubRepo> => {
  const cacheKey = `repo_${username}_${repo}`;
  const cachedData = cache.get<GithubRepo>(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(`${GITHUB_API_BASE}/repos/${username}/${repo}`, { headers });
    const repoData = response.data;
    cache.set(cacheKey, repoData);
    return repoData;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error('Repository not found');
    }
    throw error;
  }
};

// Function to get trending repositories
export const getTrendingRepos = async (): Promise<TrendingRepo[]> => {
  const cacheKey = 'trending_repos';
  const cachedData = cache.get<TrendingRepo[]>(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(`${GITHUB_API_BASE}/search/repositories`, {
      headers,
      params: {
        q: 'stars:>1000',
        sort: 'stars',
        order: 'desc'
      }
    });
    
    const trendingRepos = response.data.items.map((repo: any) => ({
      id: repo.id,
      full_name: repo.full_name,
      html_url: repo.html_url,
      description: repo.description,
      stargazers_count: repo.stargazers_count,
      language: repo.language
    }));
    
    cache.set(cacheKey, trendingRepos);
    return trendingRepos;
  } catch (error) {
    throw error;
  }
}; 