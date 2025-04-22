// shared/types/challenge.ts

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
