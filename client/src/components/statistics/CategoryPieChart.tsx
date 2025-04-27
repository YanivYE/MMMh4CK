import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Submission } from "../../entities/Submission";
import {
  ChallengeCategory,
  categoryHexColors,
} from "../../../../shared/types/challenge";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const chartOptions = {
  plugins: {
    legend: {
      position: "right" as const,
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        color: "#d1d5db", // Tailwind gray-300
        padding: 12,
        font: {
          size: 14,
          weight: 500,
        },
      },
    },
  },
};

export default function CategoryPieChart() {
  const [categoryCounts, setCategoryCounts] = useState<Record<ChallengeCategory, number>>({
    web: 0,
    crypto: 0,
    forensics: 0,
    reverse: 0,
    pwn: 0,
    misc: 0,
    osint: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await Submission.getStats();
        setCategoryCounts(stats.categoryCounts);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchData();
  }, []);

  const solvedCategories = Object.keys(categoryCounts).filter(
    (key) => categoryCounts[key as ChallengeCategory] > 0
  ) as ChallengeCategory[];

  const chartData = {
    labels: solvedCategories,
    datasets: [
      {
        data: solvedCategories.map((cat) => categoryCounts[cat]),
        backgroundColor: solvedCategories.map((cat) => categoryHexColors[cat]),
        borderColor: "#1f2937", // slate-800
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 shadow text-white h-full">
      <h2 className="text-lg font-semibold mb-4">Category Completion</h2>
      {solvedCategories.length > 0 ? (
        <div className="max-w-xs mx-auto">
          <Pie data={chartData} options={chartOptions} />
        </div>
      ) : (
        <p className="text-sm text-gray-400">No solved challenges yet.</p>
      )}
    </div>
  );
}
