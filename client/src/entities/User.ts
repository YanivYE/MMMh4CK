export interface User {
  id: string;
  full_name: string;
  email: string;
}

export const User = {
  /**
   * Fetch the current logged-in user.
   * @returns {Promise<User>} The user data.
   */
  async me(): Promise<User> {
    try {
      const response = await fetch("/api/user/me", {
        method: "GET",
        credentials: "include",
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

  /**
   * Log out the current user.
   * @returns {Promise<void>}
   */
  async logout(): Promise<void> {
    try {
      const response = await fetch("/api/user/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  },
};