import { Request, Response } from 'express';
import { Submission } from '../models/submission.model';
import { ChallengeCategory } from '../../../shared/types/challenge';

export const getUserSubmissions = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user?.id; 
  
    const submissions = await Submission.find({ created_by: userId })
      .populate("challenge_id", "title category")
      .limit(25)
      .sort({ created_at: -1 });
  
    res.json(submissions);
};

export const getSubmissionStats = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;

  const correctSubs = await Submission.find({
    created_by: userId,
    is_correct: true
  }).populate("challenge_id", "category score"); 

  const categoryCounts: Record<ChallengeCategory, number> = {
    web: 0,
    crypto: 0,
    forensics: 0,
    reverse: 0,
    pwn: 0,
    misc: 0,
    osint: 0
  };

  correctSubs.forEach((sub: any) => {
    const cat = sub.challenge_id?.category as ChallengeCategory;
    if (cat && categoryCounts[cat] !== undefined) {
      categoryCounts[cat]++;
    }
  });

  const pointsOverTime = correctSubs.map((sub: any) => ({
    timestamp: sub.created_at, 
    points: sub.challenge_id?.score || 0 
  }));

  pointsOverTime.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  res.json({
    correctSubmissions: correctSubs.length,
    categoryCounts,
    pointsOverTime
  });
};
  