import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import reviewRoutes from './routes/review.routes';
import gitRoutes from './routes/github.Routes';
import authRoutes from './routes/authRoutes';
import profileRoutes from './routes/profile.Route';
import forumRoutes from './routes/forums.routes';
import { UserFactory } from './models/user';
import ForumTopic from './models/ForumTopics';
import ForumComment from './models/ForumComments';
import { authenticateJWT } from './middleware/authmiddleware';
import { sequelize } from './models';
import { seedDemoUser } from './seeders/demo-user';
import { seedForumTopics, clearForumData } from './seeders/forum-topics';
import { seedMentors } from './seeders/mentor-seeders';
import config from './config';
import { limiter, authLimiter } from './middleware/rateLimiter';
import { up as runMigrations } from './migrations';

// Initialize models so they are registered with the sequelize instance
const User = UserFactory(sequelize);

// Define associations
ForumTopic.hasMany(ForumComment, { foreignKey: 'topicId' });
ForumComment.belongsTo(ForumTopic, { foreignKey: 'topicId' });        

export function createServer() {
  const app = express();

  const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://ravenest.onrender.com', 'https://ravenest-kma6.onrender.com']
      : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
  };
  app.use(cors(corsOptions));

  app.use(express.json());

  // Apply rate limiting to all routes
  app.use(limiter);

  // Apply stricter rate limiting to auth routes
  app.use('/api/auth', authLimiter);

  // Health check and test endpoints
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ message: 'Server is running!' });
  });

  app.get('/api/test', (_req: Request, res: Response) => {
    res.json({ message: 'Server is running!' });
  });

  // API Routes
  app.use('/api/reviews', authenticateJWT, reviewRoutes);
  app.use('/api/github', gitRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/profiles', authenticateJWT, profileRoutes);
  app.use('/api/forum', forumRoutes);

  // Serve static files (moved after API routes)
  app.use(express.static(path.join(__dirname, '../public')));
  
  // Catch-all route for SPA (moved after static files)
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));       
  });

  app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to RaveNest API');
  });

  return app;
}

export function startServer(app: express.Application, port: number = process.env.PORT ? parseInt(process.env.PORT) : 3001) {
  // Run migrations first, then sync models and start the server
  runMigrations().then(async () => {
    try {
      // Drop all tables and recreate them
      await sequelize.query('DROP TABLE IF EXISTS "users" CASCADE;');
      await sequelize.query('DROP TABLE IF EXISTS "sessions" CASCADE;');
      await sequelize.query('DROP TABLE IF EXISTS "reviews" CASCADE;');
      await sequelize.query('DROP TABLE IF EXISTS "forum_topics" CASCADE;');
      await sequelize.query('DROP TABLE IF EXISTS "forum_replies" CASCADE;');
      
      // Run migrations again to create tables
      await runMigrations();
      
      // Wait a moment to ensure the database is ready
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // First, ensure demo user exists
      let demoUser = await User.findOne({ where: { email: 'john@example.com' } });
      if (!demoUser) {
        console.log('Creating demo user...');
        await seedDemoUser();
        demoUser = await User.findOne({ where: { email: 'john@example.com' } });
        if (!demoUser) {
          throw new Error('Failed to create demo user');
        }
        console.log('Demo user created successfully');
      }
      
      // Then seed mentors
      console.log('Seeding mentors...');
      await seedMentors();
      console.log('Mentors seeded successfully');
      
      // Finally, seed forum data
      console.log('Seeding forum data...');
      await clearForumData();
      await seedForumTopics();
      console.log('Forum data seeded successfully');
      
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
        if (process.env.NODE_ENV === 'production') {
          console.log('Running in production mode');
          console.log('CORS enabled for:', ['https://ravenest.onrender.com', 'https://ravenest-kma6.onrender.com']);
        } else {
          console.log('Running in development mode');
          console.log('CORS enabled for:', ['http://localhost:5173', 'http://localhost:3000']);
        }
      });
    } catch (error) {
      console.error('Error during server startup:', error);
      process.exit(1);
    }
  }).catch((err) => {
    console.error('Error during migration:', err);
    process.exit(1);
  });
}