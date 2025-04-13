import axios from 'axios';

const API_URL = 'http://localhost:3000/api/challenges';

export const fetchChallenges = async (token: string | null) => {
  const res = await axios.post(API_URL, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
