import { RequestHandler } from 'express';
import { User } from '../models/user.model';
import { Challenge } from '../models/challenge.model';

export const getChallenges: RequestHandler = async (req, res) => {
  const userId = (req as any).user?.id; 
  const user = await User.findById(userId).populate('completedChallenges');
  const challenges = await Challenge.find();

  const data = challenges.map(ch => ({
    _id: ch._id,
    title: ch.title,
    description: ch.description,
    score: ch.score,
    category: ch.category,
    difficulty: ch.difficulty,
    file_url: ch.file_url,
    hint: ch.hint,
    server_details: ch.server_details,
    completed: user?.completedChallenges?.some(c => (c._id as any).equals(ch._id)) ?? false,
  }));

  res.json(data);
};


export const submitFlag: RequestHandler = async (req, res) => {
    const userId = (req as any).user?.id;
    const { flag } = req.body;
    const challengeId = req.params.id;
  
    const challenge = await Challenge.findById(challengeId);
    const user = await User.findById(userId);
  
    if (!challenge || !user) {
      res.status(404).json({ message: 'Challenge or user not found' });
      return;
    }
  
    const alreadyCompleted = user.completedChallenges?.some((id: any) => id.equals(challengeId));
    if (alreadyCompleted) {
      res.status(400).json({ message: 'Challenge already completed' });
      return;
    }
  
    if (flag === challenge.flag) {
      // Update user's score and completedChallenges
      user.score += challenge.score;
      user.completedChallenges = [...(user.completedChallenges || []), challenge._id as any];
      await user.save();
  
      res.json({ message: 'Correct flag!', newScore: user.score });
      return;
    }
  
    res.status(400).json({ message: 'Incorrect flag' });
    return;
  };
  

