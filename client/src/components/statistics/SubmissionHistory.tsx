import { Submission } from "../../entities/Submission";
import { ChallengeCategory, categoryColors } from "../../../../shared/types/challenge";

interface SubmissionHistoryProps {
  history: Submission[];
  limit?: number; // Optional prop to limit how many to show
}

export default function SubmissionHistory({ history, limit }: SubmissionHistoryProps) {
  const limited = limit ? history.slice(0, limit) : history;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">{limit ? "Recent Submissions" : "Submission History"}</h2>
      {limited.length === 0 ? (
        <p className="text-sm text-gray-400">No submissions yet.</p>
      ) : (
        <div className="space-y-4">
          {limited.map(sub => (
            <div key={sub._id} className="bg-gray-900 border border-gray-700 rounded p-3 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <p className="text-white font-semibold">{sub.challenge_id.title}</p>
                <span className={`text-xs font-medium px-2 py-1 rounded ${categoryColors[sub.challenge_id.category as ChallengeCategory]}`}>
                  {sub.challenge_id.category}
                </span>
              </div>
              <div className="text-sm text-white mt-2 md:mt-0">
                {sub.is_correct ? <span className="text-green-400">✅ Correct</span> : <span className="text-red-400">❌ Incorrect</span>}
                <p className="text-gray-400">{new Date(sub.created_at).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
