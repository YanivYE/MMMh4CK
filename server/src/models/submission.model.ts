import mongoose, { Document, Schema } from 'mongoose';

export interface ISubmission extends Document {
  challenge_id: mongoose.Types.ObjectId;
  created_by: mongoose.Types.ObjectId;
  flag_submitted: string;
  is_correct: boolean;
  created_at: Date;
}

const submissionSchema = new Schema<ISubmission>({
  challenge_id: {
    type: Schema.Types.ObjectId,
    ref: "Challenge",
    required: true,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  flag_submitted: {
    type: String,
    required: true,
  },
  is_correct: {
    type: Boolean,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const Submission = mongoose.model<ISubmission>('Submission', submissionSchema);
