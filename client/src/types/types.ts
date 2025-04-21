export type Challenge = {
  _id: string;
  title: string;
  description: string;
  category: "web" | "crypto" | "forensics" | "reverse" | "pwn" | "misc";
  difficulty: "easy" | "medium" | "hard";
  points: number;
  file_url?: string;
  server_details?: string;
  hint?: string;
  flag?: string; // for client-side validation (demo only)
  completed?: boolean; // <-- add this line
};
