import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import {
  LockIcon,
  Flag,
  CheckCircle2,
  Download,
  Terminal,
  X,
} from 'lucide-react';
import {
  Challenge,
  ChallengeCategory,
  ChallengeDifficulty,
} from '../../../shared/types/challenge';

type ChallengeCardProps = {
  challenge: Challenge;
  solved: boolean;
  onSubmit: (challengeId: string, flag: string) => Promise<{
    success: boolean;
    message: string;
  }>;
  isLoggedIn: boolean;
  onOpen?: () => void;
};

const difficultyColors: Record<ChallengeDifficulty, string> = {
  easy: 'bg-green-500/10 text-green-500',
  medium: 'bg-yellow-500/10 text-yellow-500',
  hard: 'bg-red-500/10 text-red-500',
};

const categoryColors: Record<ChallengeCategory, string> = {
  web: 'bg-blue-500/10 text-blue-500',
  crypto: 'bg-purple-500/10 text-purple-500',
  forensics: 'bg-green-500/10 text-green-500',
  reverse: 'bg-yellow-500/10 text-yellow-500',
  pwn: 'bg-red-500/10 text-red-500',
  misc: 'bg-gray-500/10 text-gray-400',
};

export default function ChallengeCard({
  challenge,
  solved,
  onSubmit,
  isLoggedIn,
}: ChallengeCardProps) {
  const [flag, setFlag] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [result, setResult] = useState<null | {
    success: boolean;
    message: string;
  }>(null);

  const handleSubmit = async () => {
    if (!flag) return;
    const submissionResult = await onSubmit(challenge._id, flag);
    setResult(submissionResult);

    if (submissionResult.success) {
      setFlag('');
    }
  };

  // ✅ Auto-dismiss result after 5 seconds
  useEffect(() => {
    if (result) {
      const timeout = setTimeout(() => setResult(null), 5000);
      return () => clearTimeout(timeout);
    }
  }, [result]);

  return (
    <Card className="bg-gray-800 border-gray-700 overflow-hidden relative flex flex-col justify-between min-h-[400px] w-full">
      {solved && (
        <div className="absolute -right-8 -top-8 w-16 h-16 bg-green-500 rotate-45" />
      )}

      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl text-white">{challenge.title}</CardTitle>
          <div className="flex gap-2">
            <Badge className={categoryColors[challenge.category]}>
              {challenge.category}
            </Badge>
            <Badge className={difficultyColors[challenge.difficulty]}>
              {challenge.difficulty}
            </Badge>
          </div>
        </div>
        <p className="text-gray-400 mt-2">{challenge.description}</p>
      </CardHeader>

      <CardContent>
        {challenge.file_url && (
          <a
            href={challenge.file_url}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Challenge File
          </a>
        )}

        {challenge.server_details && (
          <div className="p-3 bg-gray-900 rounded-md border border-gray-700">
            <div className="flex items-center gap-2 text-gray-400 mb-1">
              <Terminal className="w-4 h-4" />
              <span>Connection Details:</span>
            </div>
            <code className="text-green-500 text-sm font-mono block">
              {challenge.server_details}
            </code>
          </div>
        )}

        {challenge.hint && (
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHint(!showHint)}
              className="text-gray-400 hover:text-white"
            >
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </Button>
            {showHint && (
              <p className="mt-2 text-sm text-gray-500 italic">{challenge.hint}</p>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-3 pt-3 border-t border-gray-700">
        <div className="flex items-center gap-2 text-lg font-semibold text-yellow-500">
          <Flag className="w-5 h-5" />
          {challenge.score} points
        </div>

        {solved ? (
          <div className="flex items-center gap-2 text-green-500">
            <CheckCircle2 className="w-5 h-5" />
            Challenge Completed!
          </div>
        ) : !isLoggedIn ? (
          <Button
            onClick={() => onSubmit(challenge._id, flag)}
            className="w-full bg-gray-700 hover:bg-gray-600"
          >
            <LockIcon className="w-4 h-4 mr-2" />
            Login to Submit Flag
          </Button>
        ) : (
          <>
            <div className="flex gap-2 w-full">
              <Input
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
                placeholder="Enter flag"
                className="bg-gray-700 border-gray-600 text-white"
              />
              <Button
                onClick={handleSubmit}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Submit
              </Button>
            </div>

            {/* ✅ Inline result message */}
            {result && (
              <div
                className={`mt-2 p-3 rounded text-sm font-medium border transition-all duration-300 
                  ${
                    result.success
                      ? 'bg-green-900/20 text-green-400 border-green-700'
                      : 'bg-red-900/20 text-red-400 border-red-700'
                  }`}
              >
                <div className="flex justify-between items-center">
                  <span>{result.message}</span>
                  <button
                    onClick={() => setResult(null)}
                    className="text-xs text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}
