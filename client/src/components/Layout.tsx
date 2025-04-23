import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { Flag, Trophy, Home, LogOut } from "lucide-react";
import { Button } from "./ui/Button";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as any).contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
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

              {user && (
                <div className="relative" ref={dropdownRef}>
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="focus:outline-none"
                    >
                      <img
                        src={
                          user.avatar ||
                          `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.username}`
                        }
                        alt="avatar"
                        className="w-8 h-8 rounded-full border border-gray-600"
                      />
                    </button>
                    <span className="text-xs text-yellow-400 font-semibold mt-1">
                      Score: {user.score ?? 0}
                    </span>
                  </div>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50 p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={
                            user.avatar ||
                            `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.username}`
                          }
                          alt="avatar"
                          className="w-10 h-10 rounded-full border border-gray-600"
                        />
                        <div>
                          <p className="text-white font-semibold">{user.username}</p>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Link
                          to="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="text-sm text-indigo-400 hover:text-indigo-300"
                        >
                          View Profile
                        </Link>
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            setShowLogoutConfirm(true);
                          }}
                          className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

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
