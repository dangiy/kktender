'use client';

import { useState, useEffect } from 'react';
import { Candidate } from '@/types/candidate';

interface TenderData extends Candidate {
  tenderId: string;
  status: 'pending' | 'shortlisted' | 'rejected';
  type: string;
  version: number;
}

export default function Leaderboard() {
  const [tenders, setTenders] = useState<TenderData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const response = await fetch('/api/tenders');
        if (response.ok) {
          const data = await response.json();
          // Sort tenders by score
          const sortedTenders = data.sort((a: TenderData, b: TenderData) => 
            (b.score || 0) - (a.score || 0)
          );
          // Add ranks
          const rankedTenders = sortedTenders.map((tender: TenderData, index: number) => ({
            ...tender,
            rank: index + 1
          }));
          setTenders(rankedTenders);
        }
      } catch (error) {
        console.error('Error fetching tenders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTenders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-yellow-400">Tender Rankings</h2>
      
      {/* Top 4 Candidates */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-300">Shortlisted Tenders</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tenders.slice(0, 4).map((tender) => (
            <div
              key={tender.tenderId}
              className="bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 text-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-bold text-yellow-400">{tender.name}</h4>
                  <p className="text-sm text-gray-400">{tender.college}</p>
                  <p className="text-xs text-gray-500 mt-1">Tender ID: {tender.tenderId}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-400">#{tender.rank}</div>
                  <div className="text-sm text-gray-400">Score: {tender.score}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Status: <span className="text-green-400">{tender.status}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-300">
                  {tender.evaluation?.split('Score:')[0]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Candidates */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-300">All Tenders</h3>
        <div className="space-y-4">
          {tenders.slice(4).map((tender) => (
            <div
              key={tender.tenderId}
              className="bg-gray-800 border border-gray-700 p-4 rounded-lg hover:border-yellow-400 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-yellow-400">{tender.name}</h4>
                  <p className="text-sm text-gray-400">{tender.college}</p>
                  <p className="text-xs text-gray-500 mt-1">Tender ID: {tender.tenderId}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-yellow-400">#{tender.rank}</div>
                  <div className="text-sm text-gray-400">Score: {tender.score}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Status: <span className="text-green-400">{tender.status}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 