import ScoreCard from "../components/ScoreCard";
import CategoryPieChart from "../components/statistics/CategoryPieChart";

export default function DashboardPage() {
  return (
    <div className="px-4 md:px-8 py-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-4">Welcome Back</h1>

      {/* Score Overview */}
      <ScoreCard />

      {/* Statistic Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <CategoryPieChart />
        {/* Placeholder for more charts/widgets */}
        {/* <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 shadow text-white">
          <h2 className="text-lg font-semibold mb-4">Coming Soon</h2>
          <p className="text-sm text-gray-400">More visual insights will appear here.</p>
        </div> */}
      </div>
    </div>
  );
}
