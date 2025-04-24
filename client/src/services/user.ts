import axios from "axios";

const API_URL = "http://localhost:3000/api/user";

export const getUser = async (token: string | null) => {
  const res = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const logoutUser = async (token: string | null) => {
  const res = await axios.post(`${API_URL}/logout`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getTopUsers = async (token: string | null) => {
  const res = await axios.get(`${API_URL}/leaderboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getUserById = async (id: string, token: string | null) => {
  const res = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateUserAvatar = async (avatar: string, token: string | null) => {
  const res = await axios.put(
    `${API_URL}/avatar`,
    { avatar: avatar },
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
  const res = await axios.put(`${API_URL}/update`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
