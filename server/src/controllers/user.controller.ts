import { Request, Response } from 'express';
import { User } from '../models/user.model';

export const getUsername = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id; 
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await User.findById(userId).select('username');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
