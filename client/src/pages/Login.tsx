import { useState } from 'react';
import { login as loginService } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await loginService (username, password);
      login(token); // Store the token in context or local storage
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof AxiosError) {
        alert('Login failed: ' + err.response?.data?.message || 'Unknown error');
      } else {
        alert('Login failed: ' + err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-lg w-80 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded">
          Login
        </button>
        <p className="text-sm text-center">
          Don't have an account? <a className="text-blue-600" href="/register">Register</a>
        </p>
      </form>
    </div>
  );
}
