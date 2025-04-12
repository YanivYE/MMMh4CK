import { useEffect, useState } from 'react';
import { getUser } from '../services/user';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const [username, setUsername] = useState('');
  const [score, setScore] = useState(0);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const user = await getUser(token);
        setUsername(user.username);
        setScore(user.score ?? 0);
      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-blue-600">CTF Dashboard</h2>
        <nav className="space-y-4">
          <a href="#" className="block text-gray-700 hover:text-blue-500">Dashboard</a>
          <a href="#" className="block text-gray-700 hover:text-blue-500">Challenges</a>
          <a href="#" className="block text-gray-700 hover:text-blue-500">Profile</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Welcome, {username}!</h1>
          
          {/* Floating Logout Button */}
          <div className="relative">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center space-x-2 bg-white p-2 px-4 rounded-full shadow hover:bg-red-50"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${username}&background=random`}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">Logout</span>
            </button>
          </div>
        </header>

        {/* Profile Info */}
        <div className="bg-white p-6 rounded-lg shadow-md max-w-xl">
          <div className="flex items-center space-x-4">
            <img
              src={`https://ui-avatars.com/api/?name=${username}&background=random`}
              alt="avatar"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{username}</h2>
              <p className="text-gray-600">Score: {score}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
            <h3 className="text-xl font-semibold mb-4">Are you sure you want to logout?</h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
