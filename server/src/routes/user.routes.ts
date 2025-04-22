import { Router } from 'express';
import { logoutUser, getUsername } from '../controllers/user.controller';
import { auth } from '../middleware/auth.middleware';

const router = Router();

router.get('/me', auth, getUsername); 
router.post('/logout', auth, logoutUser);

export default router;
