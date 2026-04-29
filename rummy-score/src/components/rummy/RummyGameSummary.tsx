"use client";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit2, Plus } from "lucide-react";
import { useRummy } from "./RummyContext";

interface GamePlayer {
  name: string;
  isDealer?: boolean;
  isWinner?: boolean;
  roundCode?: string;
  roundScore?: number | string;
  totalScore: number;
}

interface RummyGameSummaryProps {
  date: string;
  players: GamePlayer[];
  rounds: Array<{ code: string; score: number | string }[]>;
}

export default function RummyGameSummary({
  date = "Aug 14, 2025 - 09:31 pm",
  players: initialPlayers,
  rounds = [
    [
      { code: "R", score: 35 },
      { code: "D", score: 42 },
      { code: "MD", score: 8 },
      { code: "FC", score: "R" },
    ],
  ],
}: Partial<RummyGameSummaryProps> = {}) {
  const navigate = useNavigate();
  const { selectedPlayers, players: contextPlayers } = useRummy();

  // Use selected players from context or fallback to initial players
  const players = initialPlayers || (selectedPlayers.length > 0
    ? selectedPlayers.map((name) => ({
        name,
        totalScore: contextPlayers.find((p) => p.name === name)?.score || 0,
      }))
    : []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-white text-2xl font-bold">Game Summary</h1>
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Date */}
          <div className="text-center mb-6">
            <p className="text-slate-300 text-lg">{date}</p>
          </div>

          {/* Game Table */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl overflow-hidden border border-slate-600/50 shadow-lg">
            {/* Player Headers */}
            <div className="grid grid-cols-4 gap-0 bg-gradient-to-r from-blue-600 to-cyan-600">
              {players.map((p) => (
                <div
                  key={p.name}
                  className={`text-white text-center py-3 font-bold border-r border-slate-700/50 last:border-r-0 ${
                    p.isDealer ? "bg-yellow-500/20 border-2 border-yellow-400" : ""
                  }`}
                >
                  <div className="text-sm sm:text-base">
                    {p.isDealer ? "★ " : ""}{p.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Round Codes */}
            {rounds.map((round, roundIdx) => (
              <div key={`codes-${roundIdx}`} className="grid grid-cols-4 gap-0 border-t border-slate-600/50">
                {round.map((r, i) => (
                  <div
                    key={i}
                    className="text-center py-3 font-bold text-yellow-300 bg-slate-700 border-r border-slate-600/50 last:border-r-0"
                  >
                    <span className="text-sm sm:text-base">{r.code}</span>
                  </div>
                ))}
              </div>
            ))}

            {/* Round Scores */}
            {rounds.map((round, roundIdx) => (
              <div key={`scores-${roundIdx}`} className="grid grid-cols-4 gap-0 border-t border-slate-600/50">
                {round.map((r, i) => (
                  <div
                    key={i}
                    className="text-center py-3 font-bold text-white bg-slate-800 border-r border-slate-600/50 last:border-r-0"
                  >
                    <span className="text-sm sm:text-base">{r.score}</span>
                  </div>
                ))}
              </div>
            ))}

            {/* Total Scores */}
            <div className="grid grid-cols-4 gap-0 border-t border-slate-600/50 bg-gradient-to-r from-cyan-600/20 to-blue-600/20">
              {players.map((p) => (
                <div
                  key={`total-${p.name}`}
                  className="text-center py-4 font-bold text-white bg-slate-700 border-r border-slate-600/50 last:border-r-0"
                >
                  <span className="text-lg sm:text-xl">{p.totalScore}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => navigate("/add-score")}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-lg transition-all active:scale-95 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Enter Score
            </button>
            <button
              onClick={() => {
                /* TODO: Edit score functionality */
              }}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-lg transition-all active:scale-95 shadow-lg hover:shadow-xl"
            >
              <Edit2 className="w-5 h-5" />
              Edit Score
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
