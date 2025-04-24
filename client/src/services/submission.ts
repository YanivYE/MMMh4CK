import axios from 'axios';

const API_URL = 'http://localhost:3000/api/submission';

export const getUserSubmissions = async (token: string | null) => {
  const res = await axios.get(`${API_URL}/mine`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
