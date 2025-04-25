import axiosInstance from "../utils/axiosInstance";

const API_URL = "http://localhost:3000/api/user";

export const getUser = async (token: string | null) => {
  const res = await axiosInstance.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const logoutUser = async (token: string | null) => {
  const res = await axiosInstance.post(`${API_URL}/logout`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getTopUsers = async (token: string | null) => {
  const res = await axiosInstance.get(`${API_URL}/leaderboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateUserAvatar = async (avatar: string, token: string | null) => {
  const res = await axiosInstance.put(
    `${API_URL}/avatar`,
    { avatar },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const updateUserProfile = async (
  data: {
    username?: string;
    email?: string;
    currentPassword?: string;
    newPassword?: string;
  },
  token: string | null
) => {
  const res = await axiosInstance.put(`${API_URL}/update`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
