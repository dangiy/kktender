'use client';

import { useState } from 'react';
import CandidateForm from '@/components/CandidateForm';
import Leaderboard from '@/components/Leaderboard';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'form' | 'leaderboard'>('form');

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <nav className="bg-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-yellow-400">KK Tender</h1>
                <span className="ml-2 text-gray-300 text-sm">| Tender Evaluation System</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('form')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'form'
                    ? 'bg-yellow-400 text-gray-900 font-semibold'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                Submit Tender
              </button>
              <button
                onClick={() => setActiveTab('leaderboard')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'leaderboard'
                    ? 'bg-yellow-400 text-gray-900 font-semibold'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                View Rankings
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === 'form' ? <CandidateForm /> : <Leaderboard />}
      </div>
    </main>
  );
}
