import axios from "axios";

export interface User {
    _id: string;      // or "id" depending on what Mongo returns
    username: string;
    score: number;
  }  

export const User = {
    async me(): Promise<User> {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
  
        return await response.json();
      } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
      }
    },
  
    async logout(): Promise<void> {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/user/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to log out");
        }
  
        localStorage.removeItem("token");
      } catch (error) {
        console.error("Error logging out:", error);
        throw error;
      }
    },

    async listTop() {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/user/leaderboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  };
  