import { Review, User } from '../models';

export async function seedReviews() {
    try {
        // Get all mentors and mentees
        const mentors = await User.findAll({ where: { role: 'mentor' } });
        const mentees = await User.findAll({ where: { role: 'mentee' } });

        if (mentors.length === 0 || mentees.length === 0) {
            console.log('No mentors or mentees found for seeding reviews');
            return;
        }

        // Create reviews for each mentor
        for (const mentor of mentors) {
            // Get 1-3 random mentees to review this mentor
            const numReviews = Math.floor(Math.random() * 3) + 1;
            const randomMentees = mentees
                .sort(() => 0.5 - Math.random())
                .slice(0, numReviews);

            for (const mentee of randomMentees) {
                await Review.create({
                    mentor_id: mentor.id,
                    mentee_id: mentee.id,
                    rating: Math.floor(Math.random() * 2) + 4, // Random rating between 4-5
                    comment: `Great mentoring experience with ${mentor.username}! They were very helpful and knowledgeable.`
                });
            }
        }

        console.log('Reviews seeded successfully');
    } catch (error) {
        console.error('Error seeding reviews:', error);
        throw error;
    }
} 