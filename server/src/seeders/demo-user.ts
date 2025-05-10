import { User } from '../models';
import bcrypt from 'bcryptjs';

export async function seedDemoUser() {
  try {
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const demoUser = await User.create({
      username: 'John Doe',
      email: 'john@example.com',
      password: hashedPassword,
      role: 'mentor',
      skills: ['JavaScript', 'React', 'Node.js'],
      rating: 4.5,
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
      bio: 'Experienced software developer and mentor',
      availability: ['Monday', 'Wednesday', 'Friday'],
      location: 'New York',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
      twitter: 'https://twitter.com/johndoe'
    });

    console.log('Demo user created successfully:', demoUser.email);
  } catch (error) {
    console.error('Error creating demo user:', error);
    throw error;
  }
} 