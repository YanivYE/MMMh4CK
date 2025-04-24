import { Router } from 'express';
import { auth } from '../middleware/auth.middleware';
import { getUserSubmissions } from '../controllers/submission.controller';

const router = Router();

router.get('/mine', auth, getUserSubmissions); 

export default router;
