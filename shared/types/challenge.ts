import {Colors, HexColors} from "./types";

export enum ChallengeCategory {
    Web = "web",
    Crypto = "crypto",
    Forensics = "forensics",
    Reverse = "reverse",
    Pwn = "pwn",
    Misc = "misc",
    Osint = "osint", 
}

export enum ChallengeDifficulty {
    Easy = "easy",
    Medium = "medium",
    Hard = "hard",
}

export const difficultyColors: Record<ChallengeDifficulty, string> = {
    [ChallengeDifficulty.Easy]: Colors.Green,
    [ChallengeDifficulty.Medium]: Colors.Yellow,
    [ChallengeDifficulty.Hard]: Colors.Red,
};

export const categoryColors: Record<ChallengeCategory, string> = {
    [ChallengeCategory.Web]: Colors.Blue,
    [ChallengeCategory.Crypto]: Colors.Purple,
    [ChallengeCategory.Forensics]: Colors.Green,
    [ChallengeCategory.Reverse]: Colors.Yellow,
    [ChallengeCategory.Pwn]: Colors.Red,
    [ChallengeCategory.Misc]: Colors.Gray,
    [ChallengeCategory.Osint]: Colors.Pink, 
};

export const categoryHexColors: Record<ChallengeCategory, string> = {
    [ChallengeCategory.Web]: HexColors.Blue,
    [ChallengeCategory.Crypto]: HexColors.Purple,
    [ChallengeCategory.Forensics]: HexColors.Green,
    [ChallengeCategory.Reverse]: HexColors.Yellow,
    [ChallengeCategory.Pwn]: HexColors.Red,
    [ChallengeCategory.Misc]: HexColors.Gray,
    [ChallengeCategory.Osint]: HexColors.Pink, 
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
