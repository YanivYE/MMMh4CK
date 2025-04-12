import axios from 'axios';

const API_URL = 'http://localhost:3000/api/user';

export const getUser = async (token: string | null) => {
  const res = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // { username, score }
};
