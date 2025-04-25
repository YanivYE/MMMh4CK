import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

type ChallengeSolvedProps = {
  points: number;
  title: string;
};

export default function ChallengeSolved({ points, title }: ChallengeSolvedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 flex flex-col items-center"
    >
      <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
        <CheckCircle className="w-10 h-10 text-green-500" />
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">Challenge Solved!</h2>
      <p className="text-gray-400 mb-4">You've successfully solved {title}</p>

      <div className="flex items-center gap-2 text-yellow-500 text-lg font-bold">
        +{points} points added to your score
      </div>
    </motion.div>
  );
}
