import { Router } from 'express';
import { logoutUser, getUsername, getTopUsers } from '../controllers/user.controller';
import { auth } from '../middleware/auth.middleware';

const router = Router();

router.get('/me', auth, getUsername); 
router.post('/logout', auth, logoutUser);
router.get('/leaderboard', auth, getTopUsers);

export default router;
