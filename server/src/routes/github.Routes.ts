import express from 'express';
import { getUserProfile, getUserRepos, getRepoDetails } from '../controllers/githubController';
import { getTrendingRepos } from '../utils/githubService';

const router = express.Router();

// Get trending repositories
router.get('/trending', async (req, res) => {
  try {
    const repos = await getTrendingRepos();
    res.json(repos);
  } catch (error) {
    console.error('Error fetching trending repositories:', error);
    res.status(500).json({ error: 'Failed to fetch trending repositories' });
  }
});

// Get GitHub user profile
router.get('/users/:username', getUserProfile);

// Get user's repositories
router.get('/users/:username/repos', getUserRepos);

// Get specific repository details
router.get('/repos/:username/:repo', getRepoDetails);

export default router;



