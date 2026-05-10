"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Edit2, Plus } from "lucide-react";
import { useRummy } from "./RummyContext";

export default function RummyGameSummary({
  date = "Aug 14, 2025 - 09:31 pm",
}: { date?: string } = {}) {
  const router = useRouter();
  const { allPlayers, rounds } = useRummy();

  const calculateTotalScore = (playerName: string): number => {
    return rounds.reduce((total, round) => {
      return total + (round[playerName] || 0);
    }, 0);
  };

  const handleEditScore = () => {
    if (rounds.length > 0) {
      const lastRound = rounds[rounds.length - 1];
      localStorage.setItem("rummy_edit_round", JSON.stringify({
        round: lastRound,
        roundIndex: rounds.length - 1
      }));
    }
    router.push("/add-score");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
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
      <main className="flex-1 flex flex-col overflow-auto sm:px-6 lg:px-8 py-6">
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto">
            {/* Date */}
            <div className="text-center mb-6">
              <p className="text-slate-300 text-lg">{date}</p>
            </div>

            {/* Game Table - Scrollable Container */}
            <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8 mb-6">
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl overflow-hidden border border-slate-600/50 shadow-lg min-w-max">
                  {/* Player Headers and Scores */}
                  <div className="grid gap-0 bg-gradient-to-r from-blue-600 to-cyan-600" style={{ gridTemplateColumns: `repeat(${allPlayers.length}, minmax(150px, 1fr))` }}>
                    {allPlayers.map((playerName) => (
                      <div
                        key={playerName}
                        className="text-white text-center py-3 border-r border-slate-700/50 last:border-r-0 px-2"
                      >
                        <div className="text-xs sm:text-sm lg:text-base break-words font-bold">{playerName}</div>
                      </div>
                    ))}
                  </div>

                  {/* Round Scores */}
                  {rounds.map((round, roundIdx) => (
                    <div
                      key={`round-${roundIdx}`}
                      className="grid gap-0 border-t border-slate-600/50 bg-slate-800"
                      style={{ gridTemplateColumns: `repeat(${allPlayers.length}, minmax(150px, 1fr))` }}
                    >
                      {allPlayers.map((playerName) => (
                        <div
                          key={`round-${roundIdx}-${playerName}`}
                          className="text-center py-2 text-white bg-slate-800 border-r border-slate-600/50 last:border-r-0 px-2"
                        >
                          <span className="text-xs sm:text-sm">{round[playerName] || 0}</span>
                        </div>
                      ))}
                    </div>
                  ))}

                  {/* Total Scores Row */}
                  <div className="grid gap-0 border-t border-slate-600/50 bg-gradient-to-r from-cyan-600/20 to-blue-600/20" style={{ gridTemplateColumns: `repeat(${allPlayers.length}, minmax(150px, 1fr))` }}>
                    {allPlayers.map((playerName) => (
                      <div
                        key={`total-${playerName}`}
                        className="text-center py-4 font-bold text-white bg-slate-700 border-r border-slate-600/50 last:border-r-0 px-2"
                      >
                        <span className="text-sm sm:text-base lg:text-lg">{calculateTotalScore(playerName)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Sticky Bottom */}
        <div className="max-w-4xl px-4 mx-auto w-full">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.push("/add-score")}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-lg transition-all active:scale-95 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Enter Score
            </button>
            <button
              onClick={handleEditScore}
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