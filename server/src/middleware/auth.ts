import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/express';

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    console.log("TOKEnPASSES!")

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-fallback-secret') as {
      id: number;
      username: string;
      email: string;
      role: string;
      profilePicture?: string;
    };
    
    // Add user info to request object
    req.user = decoded;
    // console.log("reqUser", req.user);
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};