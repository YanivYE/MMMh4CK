import { Router } from 'express';
import { logoutUser, getUserDetails, getTopUsers, updateAvatar, updateUserProfile } from '../controllers/user.controller';
import { auth } from '../middleware/auth.middleware';

const router = Router();

router.get('/me', auth, getUserDetails); 
router.post('/logout', auth, logoutUser);
router.get('/leaderboard', auth, getTopUsers);
router.put("/avatar", auth, updateAvatar);
router.put("/update", auth, updateUserProfile);

export default router;
