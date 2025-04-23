import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../entities/User";

export default function DashboardPage() {
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const user = await User.me();
        setUsername(user.username);
        setScore(user.score ?? 0);
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  return (
    <div className="text-center text-white mt-10">
      <h1 className="text-3xl font-bold">Welcome, {username}!</h1>
      <p className="text-gray-400">Your current score: {score}</p>
    </div>
  );
}