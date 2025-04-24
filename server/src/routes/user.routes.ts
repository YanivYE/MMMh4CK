import { Router } from 'express';
import { logoutUser, getUserDetails, getTopUsers, updateAvatar, updateUserProfile } from '../controllers/user.controller';
import { auth } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { profileUpdateSchema } from '../validation/schemas';
import { upload } from '../utils/multer';

const router = Router();

router.get('/me', auth, getUserDetails); 
router.post('/logout', auth, logoutUser);
router.get('/leaderboard', auth, getTopUsers);
router.put("/avatar", auth, upload.single("avatar"), updateAvatar);
router.put("/update", auth, validate(profileUpdateSchema), updateUserProfile);

export default router;
