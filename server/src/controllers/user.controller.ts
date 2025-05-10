import { Response } from 'express';
import { User } from '../models/user';
import { generateToken } from '../utils/jwt';
import bcrypt from 'bcryptjs';
import { AuthRequest } from '../types/express';

export const signUp = async (req: AuthRequest, res: Response) => {        
  try {
    const { username, email, password, role } = req.body;

    // Check if user with same email already exists
    const existingUser = await User.findOne({ where: { email } });    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user with required fields
    const newUser = await User.create({
      username,
      email,
      password,
      role: role || 'mentee', // Default to mentee if no role specified
      profilePicture: undefined // Optional field
    });

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ error: errorMessage });
  }
};

export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Compare password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = generateToken(user.id, user.email);
    res.status(200).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ error: errorMessage });
  }
};