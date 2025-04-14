// src/pages/ChallengesPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getUser } from '../services/user';
import { fetchChallenges } from '../services/challenge';
import ProfileCard from '../components/ProfileCard';
import ChallengeCard, { Challenge } from '../components/ChallengeCard';

export default function ChallengesPage() {
  const [username, setUsername] = useState('');
  const [score, setScore] = useState(0);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const user = await getUser(token);
        const challengeList = await fetchChallenges(token);
        setUsername(user.username);
        setScore(user.score ?? 0);
        setChallenges(challengeList);
      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };
    fetchData();
  }, [navigate]);

  // This function is called when a flag submission marks the challenge as solved.
  const handleFlagSubmit = (challengeId: string, solved: boolean) => {
    if (solved) {
      setChallenges(prev =>
        prev.map(ch => (ch._id === challengeId ? { ...ch, completed: true } : ch))
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">CTF Dashboard</h2>
        <nav className="sidebar-nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/challenges">Challenges</Link>
          <Link to="/profile">Profile</Link>
        </nav>
        <div className="logout-container">
          <button className="logout-button" onClick={() => setShowLogoutModal(true)}>
            Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        <section className="challenges-list">
          <h2 className="challenges-title">Available Challenges</h2>
          <div className="challenges-grid">
            {challenges.map(ch => (
              <ChallengeCard key={ch._id} challenge={ch} onFlagSubmit={handleFlagSubmit} />
            ))}
          </div>
        </section>
      </main>

      <section className="profile-card top-right">
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

      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to logout?</p>
            <div className="modal-buttons">
              <button onClick={handleLogout}>Yes</button>
              <button onClick={() => setShowLogoutModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
