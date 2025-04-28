import { useEffect, useState } from "react";
import ScoreCard from "../components/ScoreCard";
import CategoryPieChart from "../components/statistics/CategoryPieChart";
import PointsOverTimeGraph from "../components/statistics/PointsOverTimeGraph";
import { Submission } from "../entities/Submission";
import SubmissionHistory from "../components/statistics/SubmissionHistory";

export default function DashboardPage() {
  const [submissionHistory, setSubmissionHistory] = useState<Submission[]>([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const submissions = await Submission.listByCurrentUser(); 
        setSubmissionHistory(submissions);
      } catch (err) {
        console.error("Failed to fetch submissions", err);
      }
    };

    fetchSubmissions();
  }, []);
  
  return (
    <div className="px-4 md:px-8 py-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-4">Welcome Back</h1>

      {/* Score Overview */}
      <ScoreCard />

      {/* Statistic Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <CategoryPieChart />
        <div className="bg-slate-800 rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-white mb-4">Points Over Time</h2>
          <PointsOverTimeGraph />
        </div>
      </div>

      {/* Submission History Section */}
      <div className="mt-8">
        <SubmissionHistory history={submissionHistory} limit={5} />
      </div>
    </div>
  );
}
