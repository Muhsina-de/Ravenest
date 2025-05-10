import { Response } from 'express';
import { AuthRequest } from '../types/express';
import ForumTopic from '../models/ForumTopics';
import ForumComment from '../models/ForumComments';
import { User } from '../models';

export const getTopics = async (req: AuthRequest, res: Response) => {
  try {
    const topics = await ForumTopic.findAll({
      include: [
        {
          model: User,
          as: 'Author',
          attributes: ['username', 'profilePicture']
        },
        {
          model: ForumComment,
          as: 'Comments',
          include: [{
            model: User,
            as: 'Author',
            attributes: ['username', 'profilePicture']
          }]
        }
      ]
    });
    res.json(topics);
  } catch (error) {
    console.error('Error fetching topics:', error);
    res.status(500).json({ message: 'Error fetching topics' });
  }
};

export const getTopicById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const topic = await ForumTopic.findByPk(id, {
      include: [
        {
          model: User,
          as: 'Author',
          attributes: ['username', 'profilePicture']
        },
        {
          model: ForumComment,
          as: 'Comments',
          include: [{
            model: User,
            as: 'Author',
            attributes: ['username', 'profilePicture']
          }]
        }
      ]
    });

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    res.json(topic);
  } catch (error) {
    console.error('Error fetching topic:', error);
    res.status(500).json({ message: 'Error fetching topic' });
  }
};

export const createTopic = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, category } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const topic = await ForumTopic.create({
      title,
      content,
      category,
      authorId: userId
    });

    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ message: 'Error creating topic' });
  }
};

export const updateTopic = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;
    const userId = req.user?.id;

    const topic = await ForumTopic.findByPk(id);

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    if (topic.authorId !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this topic' });
    }

    await topic.update({ title, content, category });
    res.json(topic);
  } catch (error) {
    res.status(500).json({ message: 'Error updating topic' });
  }
};

export const deleteTopic = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const topic = await ForumTopic.findByPk(id);

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    if (topic.authorId !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this topic' });
    }

    await topic.destroy();
    res.json({ message: 'Topic deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting topic' });
  }
};

export const getComments = async (req: AuthRequest, res: Response) => {
  try {
    const { topicId } = req.params;
    const comments = await ForumComment.findAll({
      where: { topicId },
      include: [{ model: User, attributes: ['username', 'profilePicture'] }],
      order: [['createdAt', 'ASC']]
    });
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error fetching comments' });
  }
};

export const createComment = async (req: AuthRequest, res: Response) => {
  try {
    const { topicId } = req.params;
    const { content } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if topic exists
    const topic = await ForumTopic.findByPk(topicId);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    console.log('Creating comment with:', { content, topicId, authorId: userId });

    const comment = await ForumComment.create({
      content,
      topicId: parseInt(topicId),
      authorId: userId
    });

    // Fetch the created comment with user information
    const commentWithUser = await ForumComment.findByPk(comment.id, {
      include: [{
        model: User,
        as: 'Author',
        attributes: ['username', 'profilePicture']
      }]
    });

    res.status(201).json(commentWithUser);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ 
      message: 'Error creating comment',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};