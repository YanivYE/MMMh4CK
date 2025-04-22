import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/user";
import { fetchChallenges, submitFlag } from "../services/challenge";
import ChallengeCard from "../components/ChallengeCard";
import ChallengeFilters from "../components/ChallengeFilters"; 
import { Challenge } from "../../../shared/types/challenge";

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

  const handleFlagSubmit = async (challengeId: string, flag: string) => {
    try {
      const result = await submitFlag(challengeId, flag);
  
      // ✅ If the request succeeds, treat it as a correct flag
      setChallenges(prev =>
        prev.map(ch => (ch._id === challengeId ? { ...ch, completed: true } : ch))
      );
      setScore(result.newScore ?? score);
  
      return {
        success: true,
        message: `🎉 Correct! You solved "${result.title}"`,
      };
  
    } catch (err: any) {
      // ❌ Handle incorrect flags (400) and other errors
      if (err.response && err.response.status === 400) {
        return {
          success: false,
          message: err.response.data?.message || "❌ Incorrect flag. Try again.",
        };
      }
  
      return {
        success: false,
        message: "❌ An unexpected error occurred. Please try again later.",
      };
    }
  };

  const filtered = challenges.filter(ch =>
    (category === "all" || ch.category === category) &&
    ch.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Capture The Flag</h1>
      <p className="text-gray-400 mb-6">Solve challenges, find flags, climb the leaderboard!</p>
  
      {/* ✅ Filters at the top */}
      <ChallengeFilters
        activeCategory={category}
        setActiveCategory={setCategory}
        searchQuery={search}
        setSearchQuery={setSearch}
      />
  
      {/* ✅ Conditional message if no matches */}
      {filtered.length === 0 ? (
        <div className="text-gray-400 text-center py-8">
          No challenges found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((challenge) => (
            <ChallengeCard
              key={challenge._id}
              challenge={challenge}
              solved={challenge.completed ?? false}
              onSubmit={handleFlagSubmit}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      )}
    </div>
  );
  
}