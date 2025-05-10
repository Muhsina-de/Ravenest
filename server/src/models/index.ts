import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import { initUser } from './userprofile';
import { initSession } from './session';
import { initializeReview } from './review';
import ForumTopic from './ForumTopics';
import ForumComment from './ForumComments';
import appConfig from '../config';

// Load environment variables
config();

/**
 * Initialize Sequelize instance with database configuration
 */
const sequelize = new Sequelize({
  database: appConfig.DB_NAME,
  username: appConfig.DB_USER,
  password: appConfig.DB_PASSWORD,
  host: appConfig.DB_HOST,
  port: appConfig.DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
    decimalNumbers: true,
    ssl: appConfig.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  },
  logging: appConfig.NODE_ENV === 'production' ? false : console.log,
});

// Initialize models
const User = initUser(sequelize);
const Session = initSession(sequelize);
const Review = initializeReview(sequelize);

// Initialize forum models
ForumTopic.initialize(sequelize);
ForumComment.initialize(sequelize);

// Define associations
User.hasMany(Session, {
  foreignKey: 'menteeId',
  as: 'menteeSessions',
  onDelete: 'CASCADE'
});

User.hasMany(Session, {
  foreignKey: 'mentorId',
  as: 'mentorSessions',
  onDelete: 'CASCADE'
});

Session.belongsTo(User, {
  foreignKey: 'menteeId',
  as: 'mentee'
});

Session.belongsTo(User, {
  foreignKey: 'mentorId',
  as: 'mentor'
});

User.hasMany(Review, {
  foreignKey: 'mentee_id',
  as: 'givenReviews',
  onDelete: 'CASCADE'
});

User.hasMany(Review, {
  foreignKey: 'mentor_id',
  as: 'receivedReviews',
  onDelete: 'CASCADE'
});

Review.belongsTo(User, {
  foreignKey: 'mentee_id', 
  as: 'mentee'
});

Review.belongsTo(User, {
  foreignKey: 'mentor_id',
  as: 'mentor'
});

// Forum associations
ForumTopic.associate({ User, ForumComment });
ForumComment.associate({ User, ForumTopic });
User.hasMany(ForumTopic, { foreignKey: 'authorId' });
User.hasMany(ForumComment, { foreignKey: 'authorId' });

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);       
    process.exit(1); // Exit if we can't connect to the database      
  });

export { sequelize, User, Session, Review, ForumTopic, ForumComment };