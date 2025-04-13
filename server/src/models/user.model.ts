import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  role: 'user' | 'admin';
  score: number;
  completedChallenges: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  score: { type: Number, default: 0 },
  completedChallenges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' }],
});

export const User = mongoose.model<IUser>('User', userSchema);
