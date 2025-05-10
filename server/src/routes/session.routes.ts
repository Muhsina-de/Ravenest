import express from 'express';
import { Session } from '../models/session';
import { authenticateJWT } from '../middleware/authmiddleware';

const router = express.Router();

// Get all sessions for a mentee
router.get('/mentee/:menteeId', authenticateJWT, async (req, res) => {
  try {
    const { menteeId } = req.params;
    const sessions = await Session.findAll({
      where: {
        menteeId: menteeId
      },
      order: [['createdAt', 'DESC']]
    });
    res.json(sessions);
  } catch (error) {
    console.error('Error fetching mentee sessions:', error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// Get all sessions for a mentor
router.get('/mentor/:mentorId', authenticateJWT, async (req, res) => {
  try {
    const { mentorId } = req.params;
    const sessions = await Session.findAll({
      where: {
        mentorId: mentorId
      },
      order: [['createdAt', 'DESC']]
    });
    res.json(sessions);
  } catch (error) {
    console.error('Error fetching mentor sessions:', error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// Create a new session
router.post('/', authenticateJWT, async (req, res) => {
  try {
    const { mentorId, menteeId, date, time, skill, price, duration, message } = req.body;
    const session = await Session.create({
      mentorId,
      menteeId,
      date,
      time,
      skill,
      price,
      duration,
      message,
      status: 'pending'
    });
    res.status(201).json(session);
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ error: 'Failed to create session' });
  }
});

// Update session status
router.patch('/:sessionId', authenticateJWT, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { status } = req.body;
    const session = await Session.findByPk(sessionId);
    
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    await session.update({ status });
    res.json(session);
  } catch (error) {
    console.error('Error updating session:', error);
    res.status(500).json({ error: 'Failed to update session' });
  }
});

export default router; 