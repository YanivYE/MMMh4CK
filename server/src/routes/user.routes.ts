import { Router } from 'express';
import { getUsername } from '../controllers/user.controller';
import { auth } from '../middleware/auth.middleware';

const router = Router();

router.get('/me', auth, getUsername); // Token must be valid before calling getUsername

export default router;
