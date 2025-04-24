import { useState } from 'react';
import { login as loginService } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { parseErrorMessage } from '../utils/parseErrorMessage';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { token } = await loginService(username, password);
      login(token);
      navigate('/dashboard');
    } catch (err) {
      setError(parseErrorMessage(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-700">
        <h2 className="text-2xl text-white font-bold mb-6 text-center">Sign In</h2>

        {error && (
          <div className="bg-red-900/20 border border-red-700 text-red-400 rounded p-3 mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full bg-gray-900 text-white border border-gray-700 rounded px-4 py-2"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-gray-900 text-white border border-gray-700 rounded px-4 py-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-indigo-400 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
