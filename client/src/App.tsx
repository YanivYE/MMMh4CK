// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from "./pages/DashboardPage";
import ChallengesPage from "./pages/ChallengesPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/Layout";
import WorldMapPage from "./pages/WorldMapPage";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
    <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />

    {isLoggedIn && (
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/map" element={<WorldMapPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    )}

    {/* fallback route for not found or unauthorized */}
    <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
  </Routes>

  );
}

export default App;
