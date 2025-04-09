import { useState } from 'react';
import { register } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios'; // Import AxiosError

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(username, password);
      alert('Registration successful! Please login.');
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err) {
      // Handle the error by typing it as AxiosError
      if (err instanceof AxiosError) {
        alert('Registration failed: ' + err.response?.data?.message || 'Unknown error');
      } else {
        alert('Registration failed: ' + err);
      }
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={e => setUsername(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
      />
      <button type="submit">Register</button>
    </form>
  );
}
