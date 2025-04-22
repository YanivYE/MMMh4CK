import mongoose, { Schema, Document } from 'mongoose';
import {
  ChallengeCategory,
  ChallengeDifficulty,
  ChallengeBase
} from '../../../shared/types/challenge';

export interface IChallenge extends ChallengeBase, Document {}

const ChallengeSchema = new Schema<IChallenge>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  flag: { type: String, required: true },
  score: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: Object.values(ChallengeCategory)
  },
  difficulty: {
    type: String,
    required: true,
    enum: Object.values(ChallengeDifficulty)
  },
  file_url: String,
  server_details: String,
  hint: String
});

export const Challenge = mongoose.model<IChallenge>('Challenge', ChallengeSchema);
