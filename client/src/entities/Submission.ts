import { getUserSubmissions } from "../services/submission";

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

export const Submission = {
  async listByCurrentUser(): Promise<Submission[]> {
    const token = localStorage.getItem("token");
    return await getUserSubmissions(token);
  }
};
