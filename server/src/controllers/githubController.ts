import { Request, Response } from 'express';
import { getGithubUser, getGithubRepos, getGithubRepo } from '../utils/githubService';

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const userData = await getGithubUser(username);
    res.json(userData);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'User not found') {
        res.status(404).json({ error: 'GitHub user not found' });
      } else {
        res.status(500).json({ error: 'Failed to fetch GitHub user data' });
      }
    }
  }
};

export const getUserRepos = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const repos = await getGithubRepos(username);
    res.json(repos);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'User not found') {
        res.status(404).json({ error: 'GitHub user not found' });
      } else {
        res.status(500).json({ error: 'Failed to fetch GitHub repositories' });
      }
    }
  }
};

export const getRepoDetails = async (req: Request, res: Response) => {
  try {
    const { username, repo } = req.params;
    const repoData = await getGithubRepo(username, repo);
    res.json(repoData);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Repository not found') {
        res.status(404).json({ error: 'GitHub repository not found' });
      } else {
        res.status(500).json({ error: 'Failed to fetch repository details' });
      }
    }
  }
}; 