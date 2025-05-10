import { Router, Request, Response } from 'express';
import { signUp, login } from '../controllers/user.controller';

const router = Router();

router.post('/register', signUp);
router.post('/login', login);

export default router;