import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/Card";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { LockIcon, Flag, CheckCircle2, Download, Terminal } from "lucide-react";
import { Challenge } from "../types/types";

type ChallengeCardProps = {
  challenge: Challenge;
  solved: boolean;
  onSubmit: (challengeId: string, solved: boolean) => void;
  isLoggedIn: boolean;
  onOpen?: () => void;
};

const difficultyColors = {
  easy: "bg-green-500/10 text-green-500",
  medium: "bg-yellow-500/10 text-yellow-500",
  hard: "bg-red-500/10 text-red-500"
};

const categoryColors = {
  web: "bg-blue-500/10 text-blue-500",
  crypto: "bg-purple-500/10 text-purple-500",
  forensics: "bg-green-500/10 text-green-500",
  reverse: "bg-yellow-500/10 text-yellow-500",
  pwn: "bg-red-500/10 text-red-500",
  misc: "bg-gray-500/10 text-gray-400"
};

export default function ChallengeCard({ challenge, solved, onSubmit, isLoggedIn, onOpen }: ChallengeCardProps) {
  const [flag, setFlag] = useState("");
  const [showHint, setShowHint] = useState(false);

  return (
    <Card className="bg-gray-800 border-gray-700 overflow-hidden relative">
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
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 mb-4">{challenge.description}</p>

        {challenge.file_url && (
          <div className="mb-4">
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
          </div>
        )}

        {challenge.server_details && (
          <div className="mb-4 p-3 bg-gray-900 rounded-md border border-gray-700">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Terminal className="w-4 h-4" />
              <span>Connection Details:</span>
            </div>
            <code className="text-green-500 text-sm font-mono block">
              {challenge.server_details}
            </code>
          </div>
        )}

        {challenge.hint && (
          <div className="mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHint(!showHint)}
              className="text-gray-400 hover:text-white"
            >
              {showHint ? "Hide Hint" : "Show Hint"}
            </Button>
            {showHint && (
              <p className="mt-2 text-sm text-gray-500 italic">{challenge.hint}</p>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 text-lg font-semibold text-yellow-500">
          <Flag className="w-5 h-5" />
          {challenge.points} points
        </div>
      </CardContent>
      <CardFooter className="bg-gray-850 border-t border-gray-700 mt-4">
        {solved ? (
          <div className="flex items-center gap-2 text-green-500">
            <CheckCircle2 className="w-5 h-5" />
            Challenge Completed!
          </div>
        ) : !isLoggedIn ? (
          <Button
            onClick={() => onSubmit(challenge._id, false)}
            className="w-full bg-gray-700 hover:bg-gray-600"
          >
            <LockIcon className="w-4 h-4 mr-2" />
            Login to Submit Flag
          </Button>
        ) : (
          <div className="flex gap-2 w-full">
            <Input
              value={flag}
              onChange={(e) => setFlag(e.target.value)}
              placeholder="Enter flag"
              className="bg-gray-700 border-gray-600 text-white"
            />
            <Button
              onClick={() => onSubmit(challenge._id, flag === challenge.flag)}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Submit
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}