export enum ChallengeCategory {
    Web = "web",
    Crypto = "crypto",
    Forensics = "forensics",
    Reverse = "reverse",
    Pwn = "pwn",
    Misc = "misc"
  }
  
export enum ChallengeDifficulty {
    Easy = "easy",
    Medium = "medium",
    Hard = "hard"
  }
  
 enum Colors {
    Green = "bg-green-500/10 text-green-500",
    Yellow = "bg-yellow-500/10 text-yellow-500",
    Red = "bg-red-500/10 text-red-500",
    Blue = "bg-blue-500/10 text-blue-500",
    Purple = "bg-purple-500/10 text-purple-500",
    Gray = "bg-gray-500/10 text-gray-400"
}
  
  export const difficultyColors: Record<ChallengeDifficulty, string> = {
    [ChallengeDifficulty.Easy]: Colors.Green,
    [ChallengeDifficulty.Medium]: Colors.Yellow,
    [ChallengeDifficulty.Hard]: Colors.Red
  };
  
  export const categoryColors: Record<ChallengeCategory, string> = {
    [ChallengeCategory.Web]: Colors.Blue,
    [ChallengeCategory.Crypto]: Colors.Purple,
    [ChallengeCategory.Forensics]: Colors.Green,
    [ChallengeCategory.Reverse]: Colors.Yellow,
    [ChallengeCategory.Pwn]: Colors.Red,
    [ChallengeCategory.Misc]: Colors.Gray
  };
  
  export interface ChallengeBase {
    title: string;
    description: string;
    flag: string;
    score: number;
    category: ChallengeCategory;
    difficulty: ChallengeDifficulty;
    file_url?: string;
    server_details?: string;
    hint?: string;
  }
  
  export interface Challenge extends ChallengeBase {
    _id: string;
    completed?: boolean;
  }
  