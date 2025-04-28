import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User as UserService } from "../entities/User";

type User = {
  username: string;
  email: string;
  avatar?: string;
  score: number;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    refreshUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const currentUser = await UserService.me();
      setUser(currentUser);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      refreshUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
