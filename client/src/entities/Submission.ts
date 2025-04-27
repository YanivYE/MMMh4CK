import { ChallengeCategory } from "../../../shared/types/challenge";
import { getCorrectSubmissions, getUserSubmissions } from "../services/submission";

export interface Submission {
  _id: string;
  challenge_id: {
    _id: string;
    title: string;
    category: string;
  };
  created_by: string;
  flag_submitted: string;
  is_correct: boolean;
  created_at: Date; 
}

export type UserStats = {
    correctSubmissions: number;
    categoryCounts: Record<ChallengeCategory, number>;
    pointsOverTime: Array<{
      timestamp: Date;
      points: number;
    }>;
};

export const Submission = {
  async listByCurrentUser(): Promise<Submission[]> {
    const token = localStorage.getItem("token");
    return await getUserSubmissions(token);
  },

  async getStats(): Promise<UserStats> {
    const token = localStorage.getItem("token");
    return await getCorrectSubmissions(token);
},
};
