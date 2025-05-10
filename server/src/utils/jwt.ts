import jwt from 'jsonwebtoken';
import config from '../config';

const secret = config.JWT_SECRET;

export const generateToken = (userId: number, email: string) => {
  return jwt.sign({ id: userId, email }, secret, { expiresIn: '24h' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};