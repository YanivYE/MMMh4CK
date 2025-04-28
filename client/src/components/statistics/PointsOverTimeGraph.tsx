import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Submission } from "../../entities/Submission";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

interface PointData {
  date: string;
  points: number;
}

export default function PointsOverTimeGraph() {
  const [pointsData, setPointsData] = useState<PointData[]>([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const stats = await Submission.getStats();

        const sortedSubs = stats.pointsOverTime.sort(
          (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );

        let cumulativePoints = 0;
        const processed: PointData[] = [];

        if (sortedSubs.length > 0) {
          processed.push({
            date: new Date(sortedSubs[0].timestamp).toLocaleDateString(),
            points: 0,
          });
        }

        sortedSubs.forEach(entry => {
          cumulativePoints += entry.points;
          processed.push({
            date: new Date(entry.timestamp).toLocaleDateString(),
            points: cumulativePoints,
          });
        });

        setPointsData(processed);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };

    fetchSubmissions();
  }, []);

  const chartData = {
    labels: pointsData.map(d => d.date),
    datasets: [
      {
        label: "Points Over Time",
        data: pointsData.map(d => d.points),
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56, 189, 248, 0.2)", 
        fill: true, 
        tension: 0.4, 
        pointRadius: 0, 
        pointHoverRadius: 4, 
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#38bdf8",
        bodyColor: "#ffffff",
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },
        ticks: {
          color: "#94a3b8",
          font: { size: 11 },
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.05)", 
        },
        ticks: {
          color: "#94a3b8",
          font: { size: 11 },
        },
        min: 0, 
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-80">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}
