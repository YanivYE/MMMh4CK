import { RequestHandler } from 'express';
import { Submission } from '../models/submission.model';

export const getUserSubmissions: RequestHandler = async (req, res) => {
    const userId = (req as any).user?.id; 
  
    const submissions = await Submission.find({ created_by: userId })
      .populate("challenge_id", "title category")
      .limit(25)
      .sort({ created_at: -1 });
  
    res.json(submissions);
  };
  