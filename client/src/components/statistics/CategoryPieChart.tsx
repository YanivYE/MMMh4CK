import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Submission } from "../../entities/Submission";
import {
  ChallengeCategory,
  categoryColors
} from "../../../../shared/types/challenge";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Mapping Tailwind classes -> HEX colors
const tailwindColorToHex: Record<string, string> = {
  "green-500": "#22c55e",
  "yellow-500": "#eab308",
  "red-500": "#ef4444",
  "blue-500": "#3b82f6",
  "purple-500": "#8b5cf6",
  "gray-400": "#9ca3af"
};

const chartOptions = {
    plugins: {
      legend: {
        position: "right" as const, // or 'left' / 'top' if you prefer
        labels: {
          usePointStyle: true,     // ✔ shows circle bullets like your screenshot
          pointStyle: "circle",
          color: "#d1d5db",        // Tailwind gray-300
          padding: 12,
          font: {
            size: 14,
            weight: 500
          }
        }
      }
    }
  };
  

function mapTailwindClassToHex(tailwindClass: string): string {
  const color = tailwindClass.split(" ")[1]?.replace("text-", "") || "";
  return tailwindColorToHex[color] || "#888"; // fallback gray
}

export default function CategoryPieChart() {
  const [categoryCounts, setCategoryCounts] = useState<Record<ChallengeCategory, number>>({
    web: 0,
    crypto: 0,
    forensics: 0,
    reverse: 0,
    pwn: 0,
    misc: 0
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
        backgroundColor: solvedCategories.map((cat) =>
          mapTailwindClassToHex(categoryColors[cat])
        ),
        borderColor: "#1f2937",
        borderWidth: 2
      }
    ]
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 shadow text-white h-full">
      <h2 className="text-lg font-semibold mb-4">Category Completion</h2>
      {solvedCategories.length > 0 ? (
        <div className="max-w-xs mx-auto">
          <Pie data={chartData} options={chartOptions}/>
        </div>
      ) : (
        <p className="text-sm text-gray-400">No solved challenges yet.</p>
      )}
    </div>
  );
}
