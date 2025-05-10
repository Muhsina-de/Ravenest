import { sequelize, User, Session, Review } from '../models';
import ForumTopic from '../models/ForumTopics';
import ForumComment from '../models/ForumComments';
import { forumSeeds } from './forum.Seeds';

/**
 * Seed all database tables in the correct order
 */
const seedAll = async () => {
  try {
    console.log('\n----- STARTING DATABASE SEEDING -----\n');

    // Initialize models with force sync
    console.log('Syncing database models...');
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    // Import seed functions
    console.log('Loading seed modules...');
    const { seedUserProfiles } = await import('./userprofile-seeds'); 
    const { seedSessions } = await import('./session-seeds');
    const { seedReviews } = await import('./review-seeds');
    const { seedMentees } = await import('./mentee-seeds');

    // Seed in order: Users -> Mentees -> Sessions -> Reviews
    console.log('Seeding users...');
    await seedUserProfiles();
    console.log('\n----- USERS SEEDED -----\n');

    console.log('Seeding mentees...');
    await seedMentees();
    console.log('\n----- MENTEES SEEDED -----\n');

    console.log('Seeding sessions...');
    await seedSessions();
    console.log('\n----- SESSIONS SEEDED -----\n');

    console.log('Seeding reviews...');
    await seedReviews();
    console.log('\n----- REVIEWS SEEDED -----\n');

    // Seed forum data
    console.log('Seeding forum topics...');
    await ForumTopic.bulkCreate(forumSeeds.topics);
    console.log('\n----- FORUM TOPICS SEEDED -----\n');

    console.log('Seeding forum comments...');
    await ForumComment.bulkCreate(forumSeeds.comments);
    console.log('\n----- FORUM COMMENTS SEEDED -----\n');

    // Verify seeded data
    const userCount = await User.count();
    const sessionCount = await Session.count();
    const reviewCount = await Review.count();
    const topicCount = await ForumTopic.count();
    const commentCount = await ForumComment.count();

    console.log('\n----- SEEDING SUMMARY -----');
    console.log(`Users seeded: ${userCount}`);
    console.log(`Sessions seeded: ${sessionCount}`);
    console.log(`Reviews seeded: ${reviewCount}`);
    console.log(`Forum topics seeded: ${topicCount}`);
    console.log(`Forum comments seeded: ${commentCount}`);
    console.log('\n----- ALL SEEDS COMPLETED SUCCESSFULLY -----\n');  

    // Exit successfully
    process.exit(0);
  } catch (err) {
    console.error('\n----- ERROR SEEDING DATABASE -----');
    if (err instanceof Error) {
      console.error('Error message:', err.message);
      console.error('Stack trace:', err.stack);
    } else {
      console.error('Unknown error:', err);
    }

    // Try to close database connection before exiting
    try {
      await sequelize.close();
    } catch (closeErr) {
      console.error('Error closing database connection:', closeErr);  
    }

    process.exit(1);
  }
};

// Handle process termination
process.on('SIGINT', async () => {
  console.log('\n----- SEEDING INTERRUPTED -----');
  try {
    await sequelize.close();
    console.log('Database connection closed.');
  } catch (err) {
    console.error('Error closing database connection:', err);
  }
  process.exit(1);
});

// Start seeding
seedAll();