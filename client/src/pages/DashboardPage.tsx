import ScoreCard from "../components/ScoreCard";

export default function DashboardPage() {
  return (
    <div className="px-4 md:px-8 py-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-4">Welcome Back</h1>
      <ScoreCard />

      {/* Other widgets will go here (graph, pie, history...) */}
    </div>
  );
}
