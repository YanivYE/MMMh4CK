import { Router } from 'express';
import { getChallenges, submitFlag } from '../controllers/challenge.controller';
import { auth } from '../middleware/auth.middleware';

const router = Router();

router.get('/', auth, getChallenges);
router.post('/id/submit', auth, submitFlag);

export default router;
