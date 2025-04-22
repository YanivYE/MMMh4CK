// src/components/ChallengeCard.tsx
import { useState } from 'react';
import { submitFlag } from '../../services/challenge';

export type Challenge = {
  _id: string;
  title: string;
  description: string;
  category: string;
  points: number;
  completed: boolean;
};

type ChallengeCardProps = {
  challenge: Challenge;
  onFlagSubmit: (challengeId: string, solved: boolean) => void;
};

export default function ChallengeCard({ challenge, onFlagSubmit }: ChallengeCardProps) {
  const [flag, setFlag] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async () => {
    if (!flag) return;
    setLoading(true);
    try {
      // Call the service function to submit the flag.
      // Assume submitFlag returns an object with a success property.
      const response = await submitFlag(challenge._id, flag);
      if (response.success) {
        setFeedback('Correct flag! Challenge completed.');
        onFlagSubmit(challenge._id, true);
      } else {
        setFeedback(response.message || 'Incorrect flag. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setFeedback('Error submitting flag.');
    }
    setLoading(false);
  };

  return (
    <div className={`challenge-card ${challenge.completed ? 'completed' : ''}`}>
      <h3>{challenge.title}</h3>
      <p>{challenge.description}</p>
      <p>Category: {challenge.category}</p>
      <p>Points: {challenge.points}</p>

      {challenge.completed ? (
        <p>Challenge Completed</p>
      ) : (
        <div className="flag-submission">
          <input
            type="text"
            placeholder="Enter flag..."
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
            disabled={loading}
          />
          <button onClick={handleSubmit} disabled={loading}>
            Submit Flag
          </button>
          {feedback && <p>{feedback}</p>}
        </div>
      )}
    </div>
  );
}
