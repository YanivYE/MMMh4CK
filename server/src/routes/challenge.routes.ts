import { Router } from 'express';
import { getChallenges, submitFlag } from '../controllers/challenge.controller';
import { auth } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { flagSubmitSchema } from '../validation/schemas';

const router = Router();

router.get('/', auth, getChallenges);
router.post('/:id/submit', auth, validate(flagSubmitSchema), submitFlag);

export default router;
