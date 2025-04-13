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
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">CTF Dashboard</h2>
        <nav className="sidebar-nav">
          <a href="#">Dashboard</a>
          <a href="#">Challenges</a>
          <a href="#">Profile</a>
        </nav>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Welcome, {username}!</h1>
          <button className="logout-button" onClick={() => setShowLogoutModal(true)}>
            <img
              src={`https://ui-avatars.com/api/?name=${username}&background=random`}
              alt="avatar"
              className="logout-avatar"
            />
            Logout
          </button>
        </header>

        <section className="profile-card">
          <img
            src={`https://ui-avatars.com/api/?name=${username}&background=random`}
            alt="avatar"
            className="profile-avatar"
          />
          <div className="profile-info">
            <h2>{username}</h2>
            <p>Score: {score}</p>
          </div>
        </section>
      </main>

      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Are you sure you want to logout?</h3>
            <div className="modal-buttons">
              <button className="confirm-button" onClick={handleLogout}>Confirm</button>
              <button className="cancel-button" onClick={() => setShowLogoutModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
