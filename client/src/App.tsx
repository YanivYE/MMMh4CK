// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from "./pages/DashboardPage";
import ChallengesPage from "./pages/ChallengesPage";
// import LeaderboardPage from "./pages/LeaderboardPage"; // Added missing import
import Layout from "./components/Layout";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/challenges"
        element={isLoggedIn ? <ChallengesPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/*"
        element={
          <Layout currentPageName="Challenges">
            <Routes>
              <Route index element={<ChallengesPage />} />
              {/* <Route path="leaderboard" element={<LeaderboardPage />} /> */}
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
