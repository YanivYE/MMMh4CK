import { useEffect, useState } from "react";
import { Submission, User } from "@/entities/all";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trophy, Medal } from "lucide-react";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const submissions = await Submission.list();
        const userPoints = {};
        submissions.forEach(s => {
          if (s.is_correct) {
            const id = s.created_by;
            userPoints[id] = (userPoints[id] || 0) + 1;
          }
        });

        const result = await Promise.all(
          Object.entries(userPoints)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 100)
            .map(async ([id, points]) => {
              const userData = await User.get(id);
              return { ...userData, points };
            })
        );

        setLeaderboard(result);
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Leaderboard</h1>
      <p className="text-gray-400 mb-6">Top CTF players and their achievements</p>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-white">Top Players</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboard.map((user, index) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-4">
                  {index < 3 ? (
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center rounded-full">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-gray-600 flex items-center justify-center rounded-full text-gray-300">
                      {index + 1}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-white">{user.full_name}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Medal className="w-5 h-5 text-yellow-500" />
                  <span className="font-bold text-white">{user.points} points</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}