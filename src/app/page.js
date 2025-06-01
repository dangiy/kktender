import CandidateForm from '@/components/CandidateForm';
import Leaderboard from '@/components/Leaderboard';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-yellow-400">
          Tender Evaluation System
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CandidateForm />
          <Leaderboard />
        </div>
      </div>
    </main>
  );
} 