import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/user";
import { fetchChallenges } from "../services/challenge";
import ChallengeCard from "../components/ChallengeCard";
import { Challenge } from "../types/types";

const categories = ["all", "web", "crypto", "forensics", "reverse", "pwn", "misc"];

export default function ChallengesPage() {
  const [username, setUsername] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");
      try {
        const user = await getUser(token);
        const data = await fetchChallenges(token);
        setUsername(user.username);
        setScore(user.score ?? 0);
        setChallenges(data);
        setIsLoggedIn(true);
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate]);

  const handleFlagSubmit = (challengeId: string, solved: boolean) => {
    if (solved) {
      setChallenges(prev =>
        prev.map(ch => (ch._id === challengeId ? { ...ch, completed: true } : ch))
      );
    }
  };

  const filtered = challenges.filter(ch =>
    (category === "all" || ch.category === category) &&
    ch.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex gap-6">
      <aside className="w-48 bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h2 className="text-white font-bold mb-4">Categories</h2>
        <ul className="space-y-2">
          {categories.map(cat => (
            <li key={cat}>
              <button
                onClick={() => setCategory(cat)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  cat === category ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search..."
          className="mt-6 w-full p-2 rounded bg-gray-900 border border-gray-700 text-white"
        />
      </aside>

      <main className="flex-1">
        <h1 className="text-3xl font-bold text-white mb-4">Capture The Flag</h1>
        <p className="text-gray-400 mb-6">Solve challenges, find flags, climb the leaderboard!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(challenge => (
            <ChallengeCard
              key={challenge._id}
              challenge={challenge}
              solved={challenge.completed ?? false}
              onSubmit={handleFlagSubmit}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      </main>
    </div>
  );
}