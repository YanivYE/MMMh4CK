import { Router } from 'express';
import { auth } from '../middleware/auth.middleware';
import { getSubmissionStats, getUserSubmissions } from '../controllers/submission.controller';

const router = Router();

router.get('/mine', auth, getUserSubmissions); 
router.get('/stats', auth, getSubmissionStats);

export default router;
