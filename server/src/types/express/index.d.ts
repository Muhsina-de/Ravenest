import { Request, Response } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
        email: string;
        role: string;
        profilePicture?: string;
      };
      headers: {
        authorization?: string;
        [key: string]: string | string[] | undefined;
      };
      body: any;
      params: any;
      query: any;
    }
  }
}

export interface AuthRequest extends Request {
  user?: {
    id: number;
    username: string;
    email: string;
    role: string;
    profilePicture?: string;
  };
}

export interface AuthenticatedRequest extends AuthRequest {
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
    profilePicture?: string;
  };
} 