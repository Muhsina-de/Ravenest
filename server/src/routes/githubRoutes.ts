import express from 'express';
import { getUserProfile, getUserRepos, getRepoDetails } from '../controllers/githubController';

const router = express.Router();

// Get GitHub user profile
router.get('/users/:username', getUserProfile);

// Get user's repositories
router.get('/users/:username/repos', getUserRepos);

// Get specific repository details
router.get('/repos/:username/:repo', getRepoDetails);

export default router; 