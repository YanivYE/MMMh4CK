import { Request, Response } from 'express';
import { User } from '../models/user.model';

export const getUsername = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id; 
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await User.findById(userId).select('username score');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // With token-based auth, just "invalidate" on client (no need to clear server session)
    res.status(200).json({ message: 'Logged out' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTopUsers = async (req: Request, res: Response) => {
  try {
    const topUsers = await User.find()
      .select("username score")
      .sort({ score: -1 })
      .limit(10);

    res.json(topUsers);
  } catch (err) {
    console.error("Failed to fetch top users:", err);
    res.status(500).json({ message: "Server error" });
  }
};

