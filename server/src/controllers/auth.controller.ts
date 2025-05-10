import { User } from '../models/user';
import { Response } from 'express';
import { AuthRequest } from '../types/express';

export const getUserProfile = async (req: AuthRequest, res: Response) => {
    try {
        const profiles = await User.findAll();
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profiles' });
    }
};

export const getProfileById = async (req: AuthRequest, res: Response) => {
    try {
        const profile = await User.findByPk(req.params.id);
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json(profile);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
};
