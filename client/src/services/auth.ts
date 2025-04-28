import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

export const login = async (username: string, password: string) => {
  const res = await axios.post(`${API_URL}/login`, { username, password });
  return res.data; 
};

export const register = async (username: string, email: string, password: string) => {
  const res = await axios.post(`${API_URL}/register`, { username, email, password });
  return res.data; 
};
