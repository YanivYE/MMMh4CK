import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';

export const getUserDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id; 
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await User.findById(userId).select('username email score avatar');
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
      .select("username score avatar")
      .sort({ score: -1 })
      .limit(10);

    res.json(topUsers);
  } catch (err) {
    console.error("Failed to fetch top users:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateAvatar = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { avatar } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: avatar || ""},
      { new: true }
    ).select("avatar username email score");

    res.json(user);
  } catch (err) {
    console.error("Failed to update avatar:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { username, email, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    } 

    if (newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        res.status(400).json({ message: "Current password is incorrect" });
        return;
      } 
      user.password = await bcrypt.hash(newPassword, 10);
    }

    user.username = username || user.username;
    user.email = email || user.email;
    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error("Failed to update profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};
