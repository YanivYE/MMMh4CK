// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import DashboardPage from "./pages/DashboardPage";
import { useAuth } from "./context/AuthContext";
import ChallengesPage from "./pages/ChallengesPage";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" />} />
      <Route path="/challenges" element={isLoggedIn ? <ChallengesPage /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
