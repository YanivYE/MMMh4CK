import React, { ReactNode } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { createPageUrl } from "../utils/createPageUrl";
import { Flag, Trophy, Home, Menu, X, LogOut, LogIn } from "lucide-react";
import { Button } from "./ui/Button";
import { User } from "../entities/User";

// Define props for the Layout component
interface LayoutProps {
  children: ReactNode;
  currentPageName?: string;
}

export default function Layout({ children, currentPageName }: LayoutProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await User.me();
        setUser(userData);
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await User.logout();
      setUser(null);
      navigate(createPageUrl("Auth"));
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Don't show navigation on Auth page
  if (location.pathname === createPageUrl("Auth")) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to={createPageUrl("")} className="flex items-center gap-2">
                <Flag className="h-8 w-8 text-indigo-500" />
                <span className="font-bold text-xl">CTF Platform</span>
              </Link>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:block">
              <div className="flex items-center gap-4">
                <Link to={createPageUrl("")}>
                  <Button variant="ghost" className="text-gray-300 hover:text-white">
                    <Home className="h-5 w-5 mr-2" />
                    Challenges
                  </Button>
                </Link>
                <Link to={createPageUrl("Leaderboard")}>
                  <Button variant="ghost" className="text-gray-300 hover:text-white">
                    <Trophy className="h-5 w-5 mr-2" />
                    Leaderboard
                  </Button>
                </Link>
                {!user ? (
                  <Link to={createPageUrl("Auth")}>
                    <Button className="bg-indigo-600 hover:bg-indigo-700">
                      <LogIn className="h-5 w-5 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-300">
                      Welcome, {user.full_name}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleLogout}
                      className="text-gray-400 hover:text-white"
                    >
                      <LogOut className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-400"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to={createPageUrl("")}>
                <Button variant="ghost" className="w-full text-left text-gray-300 hover:text-white">
                  <Home className="h-5 w-5 mr-2" />
                  Challenges
                </Button>
              </Link>
              <Link to={createPageUrl("Leaderboard")}>
                <Button variant="ghost" className="w-full text-left text-gray-300 hover:text-white">
                  <Trophy className="h-5 w-5 mr-2" />
                  Leaderboard
                </Button>
              </Link>
              {!user ? (
                <Link to={createPageUrl("Auth")}>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign In
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={handleLogout}
                  className="w-full text-left text-gray-300 hover:text-white flex items-center"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}