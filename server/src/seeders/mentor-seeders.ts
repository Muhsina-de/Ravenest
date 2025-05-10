import { User } from '../models';
import bcrypt from 'bcryptjs';

const mentors = [
  {
    username: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    password: 'password123',
    role: 'mentor',
    skills: ['Python', 'Data Science', 'Machine Learning'],
    rating: 4.8,
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    bio: 'Data scientist with 5+ years of experience in ML and AI. Passionate about teaching and helping others grow in tech.',
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    location: 'San Francisco',
    linkedin: 'https://linkedin.com/in/sarahchen',
    github: 'https://github.com/sarahchen',
    twitter: 'https://twitter.com/sarahchen'
  },
  {
    username: 'Michael Rodriguez',
    email: 'michael.rodriguez@example.com',
    password: 'password123',
    role: 'mentor',
    skills: ['Java', 'Spring Boot', 'Microservices'],
    rating: 4.6,
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    bio: 'Senior backend developer specializing in enterprise applications. Expert in Java ecosystem and cloud architecture.',
    availability: ['Monday', 'Wednesday', 'Friday'],
    location: 'Austin',
    linkedin: 'https://linkedin.com/in/michaelrodriguez',
    github: 'https://github.com/michaelrodriguez',
    twitter: 'https://twitter.com/michaelrodriguez'
  },
  {
    username: 'Emma Thompson',
    email: 'emma.thompson@example.com',
    password: 'password123',
    role: 'mentor',
    skills: ['UI/UX Design', 'Figma', 'Adobe XD'],
    rating: 4.9,
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    bio: 'UI/UX designer with a focus on creating beautiful and intuitive user experiences. Former design lead at Google.',
    availability: ['Monday', 'Tuesday', 'Thursday'],
    location: 'Seattle',
    linkedin: 'https://linkedin.com/in/emmathompson',
    github: 'https://github.com/emmathompson',
    twitter: 'https://twitter.com/emmathompson'
  },
  {
    username: 'David Kim',
    email: 'david.kim@example.com',
    password: 'password123',
    role: 'mentor',
    skills: ['React Native', 'iOS', 'Android'],
    rating: 4.7,
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    bio: 'Mobile app developer with expertise in cross-platform development. Created multiple successful apps on both App Store and Play Store.',
    availability: ['Wednesday', 'Friday', 'Saturday'],
    location: 'Los Angeles',
    linkedin: 'https://linkedin.com/in/davidkim',
    github: 'https://github.com/davidkim',
    twitter: 'https://twitter.com/davidkim'
  },
  {
    username: 'Lisa Patel',
    email: 'lisa.patel@example.com',
    password: 'password123',
    role: 'mentor',
    skills: ['DevOps', 'AWS', 'Docker'],
    rating: 4.5,
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    bio: 'DevOps engineer with extensive experience in cloud infrastructure and CI/CD pipelines. Certified AWS Solutions Architect.',
    availability: ['Tuesday', 'Thursday', 'Friday'],
    location: 'Boston',
    linkedin: 'https://linkedin.com/in/lisapatel',
    github: 'https://github.com/lisapatel',
    twitter: 'https://twitter.com/lisapatel'
  },
  {
    username: 'James Wilson',
    email: 'james.wilson@example.com',
    password: 'password123',
    role: 'mentor',
    skills: ['Full Stack', 'React', 'Node.js'],
    rating: 4.8,
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    bio: 'Full-stack developer with expertise in modern web technologies. Built scalable applications for startups and enterprises.',
    availability: ['Monday', 'Wednesday', 'Friday'],
    location: 'Chicago',
    linkedin: 'https://linkedin.com/in/jameswilson',
    github: 'https://github.com/jameswilson',
    twitter: 'https://twitter.com/jameswilson'
  }
];

export async function seedMentors() {
  try {
    // First, delete all existing mentors
    await User.destroy({ where: { role: 'mentor' } });

    // Then create new mentors
    for (const mentor of mentors) {
      const hashedPassword = await bcrypt.hash(mentor.password, 10);
      
      await User.create({
        ...mentor,
        password: hashedPassword
      });
    }

    console.log('Mentors created successfully');
  } catch (error) {
    console.error('Error creating mentors:', error);
    throw error;
  }
} 