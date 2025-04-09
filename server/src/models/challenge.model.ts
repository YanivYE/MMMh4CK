import mongoose, { Schema, Document } from 'mongoose';

export interface IChallenge extends Document {
  title: string;
  description: string;
  flag: string;
  score: number;
  category: string;
}

const ChallengeSchema = new Schema<IChallenge>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  flag: { type: String, required: true },
  score: { type: Number, required: true },
  category: { type: String, required: true }
});

export const Challenge = mongoose.model<IChallenge>('Challenge', ChallengeSchema);
