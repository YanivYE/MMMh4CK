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

// import React, { useState, useEffect } from "react";
// import { Challenge, Submission, User } from "@/entities/all";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { CheckCircle, XCircle } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { createPageUrl } from "@/utils";
// import ChallengeCard from "../components/challenges/ChallengeCard";

// export default function Challenges() {
//   const [challenges, setChallenges] = useState([]);
//   const [submissions, setSubmissions] = useState([]);
//   const [category, setCategory] = useState("all");
//   const [user, setUser] = useState(null);
//   const [result, setResult] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const init = async () => {
//       try {
//         const userData = await User.me();
//         setUser(userData);
//         const [challengesData, submissionsData] = await Promise.all([
//           Challenge.list(),
//           Submission.list()
//         ]);
//         setChallenges(challengesData);
//         setSubmissions(submissionsData);
//       } catch (error) {
//         // User not logged in - redirect to auth page
//         navigate(createPageUrl("Auth"));
//         const challengesData = await Challenge.list();
//         setChallenges(challengesData);
//       }
//     };
//     init();
//   }, [navigate]);

//   const handleSubmit = async (challengeId, flag) => {
//     if (!user) {
//       User.login();
//       return;
//     }
    
//     const challenge = challenges.find(c => c.id === challengeId);
//     const isCorrect = challenge.flag === flag;
    
//     await Submission.create({
//       challenge_id: challengeId,
//       flag_submitted: flag,
//       is_correct: isCorrect
//     });

//     setResult({
//       success: isCorrect,
//       message: isCorrect 
//         ? `Congratulations! You found the flag for "${challenge.title}".` 
//         : "Incorrect flag, try again!"
//     });

//     const [challengesData, submissionsData] = await Promise.all([
//       Challenge.list(),
//       Submission.list()
//     ]);
//     setChallenges(challengesData);
//     setSubmissions(submissionsData);
//   };

//   const closeResult = () => {
//     setResult(null);
//   };

//   const filteredChallenges = category === "all" 
//     ? challenges 
//     : challenges.filter(c => c.category === category);

//   return (
//     <div>
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-white mb-2">Capture The Flag</h1>
//           <p className="text-gray-400">Solve challenges, find flags, climb the leaderboard!</p>
//         </div>
        
//         <Tabs defaultValue="all" onValueChange={setCategory}>
//           <TabsList className="bg-gray-800">
//             <TabsTrigger value="all">All</TabsTrigger>
//             <TabsTrigger value="web">Web</TabsTrigger>
//             <TabsTrigger value="crypto">Crypto</TabsTrigger>
//             <TabsTrigger value="forensics">Forensics</TabsTrigger>
//             <TabsTrigger value="reverse">Reverse</TabsTrigger>
//             <TabsTrigger value="pwn">Pwn</TabsTrigger>
//             <TabsTrigger value="misc">Misc</TabsTrigger>
//           </TabsList>
//         </Tabs>
//       </div>

//       {result && (
//         <Alert
//           className={`mb-6 ${
//             result.success ? "bg-green-900/20 border-green-900" : "bg-red-900/20 border-red-900"
//           }`}
//         >
//           <div className="flex items-center gap-2">
//             {result.success ? (
//               <CheckCircle className="h-5 w-5 text-green-500" />
//             ) : (
//               <XCircle className="h-5 w-5 text-red-500" />
//             )}
//             <AlertDescription className="text-white">{result.message}</AlertDescription>
//           </div>
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={closeResult}
//             className="absolute top-3 right-3 text-gray-400 hover:text-white"
//           >
//             Dismiss
//           </Button>
//         </Alert>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredChallenges.map(challenge => (
//           <ChallengeCard
//             key={challenge.id}
//             challenge={challenge}
//             solved={submissions.some(s => s.challenge_id === challenge.id && s.is_correct)}
//             onSubmit={handleSubmit}
//             isLoggedIn={!!user}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }