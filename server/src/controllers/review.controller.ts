import { Request, Response } from 'express';
import { Review, User } from '../models';
import { AuthRequest } from '../types/express';

// Create a new review
export const createReview = async (req: AuthRequest, res: Response) => {
  try {
    const { rating, comment, mentor_id } = req.body;
    const mentee_id = req.user?.id;

    if (!mentee_id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const review = await Review.create({
      mentee_id,
      mentor_id,
      rating,
      comment
    });

    // Update mentor's average rating
    await Review.updateMentorRating(mentor_id, User);

    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
};

// Get reviews by mentor ID
export const getMentorReviews = async (req: Request, res: Response) => {
  try {
    const mentorId = parseInt(req.params.mentorId, 10);
    console.log('Fetching reviews for mentor:', mentorId);

    const reviews = await Review.findAll({
      where: { mentor_id: mentorId },
      include: [{
        model: User,
        as: 'mentee',
        attributes: ['id', 'username', 'profilePicture']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

// Update a review
export const updateReview = async (req: Request, res: Response) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.findByPk(req.params.id);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    await review.update({ rating, comment });

    // Update mentor's average rating
    await Review.updateMentorRating(review.mentor_id, User);

    const updatedReview = await Review.findByPk(review.id, {
      include: [{
        model: User,
        as: 'mentee',
        attributes: ['id', 'username', 'profilePicture']
      }]
    });

    res.json(updatedReview);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'Failed to update review' });
  }
};

// Delete a review
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findByPk(req.params.id);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    const mentorId = review.mentor_id;
    await review.destroy();

    // Update mentor's average rating
    await Review.updateMentorRating(mentorId, User);

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
}; 