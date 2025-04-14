import axios from 'axios';

const API_URL = 'http://localhost:3000/api/challenges';

export const fetchChallenges = async (token: string | null) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const submitFlag = async (challengeId: string, flag: string) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/${challengeId}/submit`,
      { flag },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};