import { User } from '../models';
import bcrypt from 'bcryptjs';

const mentees = [
  {
    username: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    password: 'password123',
    role: 'mentee',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    bio: 'Learning web development and looking for guidance',
    location: 'Miami',
    linkedin: 'https://linkedin.com/in/alexrivera',
    github: 'https://github.com/alexrivera'
  },
  {
    username: 'Sophie Chen',
    email: 'sophie.chen@example.com',
    password: 'password123',
    role: 'mentee',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
    bio: 'New to programming, excited to learn!',
    location: 'Vancouver',
    linkedin: 'https://linkedin.com/in/sophiechen',
    github: 'https://github.com/sophiechen'
  },
  {
    username: 'Marcus Johnson',
    email: 'marcus.johnson@example.com',
    password: 'password123',
    role: 'mentee',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    bio: 'Career switcher looking to break into tech',
    location: 'Atlanta',
    linkedin: 'https://linkedin.com/in/marcusjohnson',
    github: 'https://github.com/marcusjohnson'
  }
];

export async function seedMentees() {
  try {
    // First, delete all existing mentees
    await User.destroy({ where: { role: 'mentee' } });

    // Then create new mentees
    for (const mentee of mentees) {
      const hashedPassword = await bcrypt.hash(mentee.password, 10);
      
      await User.create({
        ...mentee,
        password: hashedPassword
      });
    }

    console.log('Mentees created successfully');
  } catch (error) {
    console.error('Error creating mentees:', error);
    throw error;
  }
} 