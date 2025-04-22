import React from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { Flag, Trophy, Home, LogOut, LogIn } from "lucide-react";
import { Button } from "./ui/Button";
import { User } from "../entities/User";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const [user, setUser] = React.useState<User | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (!isLoggedIn) return;

    const loadUser = async () => {
      try {
        const userData = await User.me();
        setUser(userData);
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };

    loadUser();
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      await User.logout();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (location.pathname.startsWith("/login") || location.pathname.startsWith("/register")) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center gap-2">
                <Flag className="h-8 w-8 text-indigo-500" />
                <span className="font-bold text-xl">MMMH4CK CTFs</span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/challenges">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  <Home className="h-5 w-5 mr-2" />
                  Challenges
                </Button>
              </Link>
              <Link to="/leaderboard">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  <Trophy className="h-5 w-5 mr-2" />
                  Leaderboard
                </Button>
              </Link>

              {user ? (
                <>
                  <div className="text-sm text-gray-300 leading-tight text-center w-full">
                    <div>Welcome, {user.username}</div>
                    <div className="text-xs text-gray-300">Score: {user.score ?? 0}</div>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                    onClick={() => setShowLogoutConfirm(true)}
                  >
                    <LogOut className="h-5 w-5 mr-1" />
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/login">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-gray-800 rounded-lg p-6 shadow-2xl border border-gray-600 text-white w-80">
            <h2 className="text-lg font-semibold mb-3">Confirm Logout</h2>
            <p className="text-gray-400 text-sm mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-3">
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={handleLogout}
              >
                Logout
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
