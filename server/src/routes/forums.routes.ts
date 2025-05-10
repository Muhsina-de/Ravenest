import { Router } from 'express';
import { authenticateJWT } from '../middleware/authmiddleware';
import {
  getTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
  getComments,
  createComment
} from '../controllers/forum.controller';

const router = Router();

// Public routes (no auth required)
router.get('/topics', getTopics);
router.get('/topics/:id', getTopicById);
router.get('/topics/:topicId/comments', getComments);

// Protected routes (auth required)
router.post('/topics', authenticateJWT, createTopic);
router.put('/topics/:id', authenticateJWT, updateTopic);
router.delete('/topics/:id', authenticateJWT, deleteTopic);
router.post('/topics/:topicId/comments', authenticateJWT, createComment);

export default router;
