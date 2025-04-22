import { useEffect, useState } from "react";
import { User } from "../entities/User";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/Card";
import { Trophy, Medal } from "lucide-react";

type LeaderboardUser = {
  _id: string;
  username: string;
  score: number;
};

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const users = await User.listTop();
        setLeaderboard(users);
      } catch (err) {
        console.error("Failed to load leaderboard:", err);
      }
    };
  
    loadData();
  }, []);
  

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-white mb-2">Leaderboard</h1>
      <p className="text-gray-400 mb-6">
        Top CTF players and their achievements
      </p>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-white">Top Players</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="space-y-4">
          {leaderboard.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center rounded-full">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <p className="font-medium text-white">{user.username}</p>
              </div>
              <div className="flex items-center gap-2">
                <Medal className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-white">
                  {user.score ?? 0} points
                </span>
              </div>
            </div>
          ))}
        </div>

        </CardContent>
      </Card>
    </div>
  );
}
