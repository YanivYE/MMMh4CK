import {
  getUser,
  logoutUser,
  getTopUsers,
  updateUserAvatar,
  updateUserProfile,
  getCorrectSubmissions,
} from "../services/user";

export interface User {
  _id: string;
  username: string;
  email: string;
  score: number;
  avatar?: string;
}

export const User = {
  async me(): Promise<User> {
    const token = localStorage.getItem("token");
    return await getUser(token);
  },

  async logout(): Promise<void> {
    const token = localStorage.getItem("token");
    await logoutUser(token);
    localStorage.removeItem("token");
  },

  async listTop(): Promise<User[]> {
    const token = localStorage.getItem("token");
    return await getTopUsers(token);
  },

  async getStats(): Promise<{ correctSubmissions: number }> {
    const token = localStorage.getItem("token");
    return await getCorrectSubmissions(token);
  },

  async updateAvatar(avatar: string): Promise<User> {
    const token = localStorage.getItem("token");
    return await updateUserAvatar(avatar, token);
  },

  async updateProfile(data: {
    username?: string;
    email?: string;
    currentPassword?: string;
    newPassword?: string;
  }): Promise<User> {
    const token = localStorage.getItem("token");
    const res = await updateUserProfile(data, token);
    return res.user;
  },
};
