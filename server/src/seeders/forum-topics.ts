import { User } from '../models';
import ForumTopic from '../models/ForumTopics';
import ForumComment from '../models/ForumComments';
import { seedDemoUser } from './demo-user';

export async function clearForumData() {
  try {
    await ForumComment.destroy({ where: {} });
    await ForumTopic.destroy({ where: {} });
    console.log('Forum data cleared successfully');
  } catch (error) {
    console.error('Error clearing forum data:', error);
  }
}

export async function seedForumTopics() {
  try {
    // Get or create the demo user
    let demoUser = await User.findOne({ where: { email: 'john@example.com' } });
    if (!demoUser) {
      await seedDemoUser();
      demoUser = await User.findOne({ where: { email: 'john@example.com' } });
    }

    if (!demoUser) {
      throw new Error('Failed to find or create demo user');
    }

    // Create some initial topics
    const topics = await Promise.all([
      ForumTopic.create({
        title: 'Welcome to the Community!',
        content: 'This is a place to discuss coding, share experiences, and help each other grow.',
        category: 'General Discussion',
        authorId: demoUser.id
      }),
      ForumTopic.create({
        title: 'Best Practices for Code Review',
        content: 'What are your tips for conducting effective code reviews? Share your experiences and learn from others.',
        category: 'Backend Development',
        authorId: demoUser.id
      }),
      ForumTopic.create({
        title: 'Learning Resources',
        content: 'Share your favorite coding tutorials, books, and online courses! Let\'s help each other find the best learning materials.',
        category: 'General Discussion',
        authorId: demoUser.id
      }),
      ForumTopic.create({
        title: 'React vs Vue: Which to Choose?',
        content: 'I\'m starting a new project and can\'t decide between React and Vue. What are your thoughts and experiences?',
        category: 'Frontend Development',
        authorId: demoUser.id
      }),
      ForumTopic.create({
        title: 'Career Transition Tips',
        content: 'I\'m looking to transition into software development from a different field. Any advice or success stories to share?',
        category: 'Career Advice',
        authorId: demoUser.id
      })
    ]);

    // Add some comments to the first topic
    await Promise.all([
      ForumComment.create({
        content: 'Great to be here! Looking forward to learning from everyone.',
        topicId: topics[0].id,
        authorId: demoUser.id
      }),
      ForumComment.create({
        content: 'This community is amazing! I\'ve already learned so much.',
        topicId: topics[0].id,
        authorId: demoUser.id
      }),
      ForumComment.create({
        content: 'I\'m new to coding and this place seems perfect for learning!',
        topicId: topics[0].id,
        authorId: demoUser.id
      })
    ]);

    console.log('Forum topics and comments seeded successfully');
  } catch (error) {
    console.error('Error seeding forum topics:', error);
  }
} 