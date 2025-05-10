import React from 'react';
import { ReviewListProps } from '../../types/reviews';
import ReviewCard from './ReviewCard';

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList; 