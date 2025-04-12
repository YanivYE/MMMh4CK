import { Router } from 'express';
import { getUsername } from '../controllers/user.controller';
import { authenticateToken } from '../middleware/authenticateToken';

const router = Router();

router.get('/me', authenticateToken, getUsername); // Token must be valid before calling getUsername

export default router;
