import { useEffect, useState } from "react";
import { User } from "../entities/User";
import { Trophy, CheckCircle, Flame } from "lucide-react";

export default function ScoreCard() {
  const [profile, setProfile] = useState<any>(null);
  const [correctSubmissions, setCorrectSubmissions] = useState<number>(0);
  const [rank, setRank] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await User.me();
        const stats = await User.getStats();
        const leaderboard = await User.listTop();

        setProfile(userData);
        setCorrectSubmissions(stats.correctSubmissions);

        const foundRank = leaderboard.findIndex((u) => u._id === userData._id);
        setRank(foundRank >= 0 ? foundRank + 1 : null);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    };
    fetchData();
  }, []);

  if (!profile) return null;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 text-white flex flex-col gap-6 sm:flex-row sm:justify-between shadow">
      <div className="flex items-center gap-4">
        <img
          src={
            profile.avatar ||
            `https://api.dicebear.com/7.x/pixel-art/svg?seed=${profile.username}`
          }
          alt="avatar"
          className="w-16 h-16 rounded-full border border-gray-600"
        />
        <div>
          <h2 className="text-2xl font-bold text-white">{profile.username}</h2>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 sm:mt-0 text-center">
        <div className="flex flex-col items-center">
          <Trophy className="w-6 h-6 text-yellow-400 mb-1" />
          <p className="text-lg font-bold text-yellow-400">{profile.score ?? 0}</p>
          <p className="text-sm text-gray-400">Score</p>
        </div>

        <div className="flex flex-col items-center">
          <CheckCircle className="w-6 h-6 text-green-400 mb-1" />
          <p className="text-lg font-bold text-green-400">{correctSubmissions}</p>
          <p className="text-sm text-gray-400">Challenges Solved</p>
        </div>

        {rank !== null && (
          <div className="flex flex-col items-center">
            <Flame className="w-6 h-6 text-indigo-400 mb-1" />
            <p className="text-lg font-bold text-indigo-400">#{rank}</p>
            <p className="text-sm text-gray-400">Leaderboard Rank</p>
          </div>
        )}
      </div>
    </div>
  );
}
