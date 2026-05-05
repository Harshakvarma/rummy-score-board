"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRummy } from "./RummyContext";
import { ArrowLeft, Check } from "lucide-react";

type Player = {
  name: string;
  score: number;
  roundScore: string;
};

export default function RummyScoreCounter() {
  const router = useRouter();
  const { players, setPlayers, rounds, setRounds, selectedPlayers } =
    useRummy();
  const [showScoreOptions, setShowScoreOptions] = useState(true);

  // Get only selected players for this game
  const gamePlayersArray = selectedPlayers
    .map((name) => players.find((p) => p.name === name))
    .filter((p) => p !== undefined) as Player[];

  const handleScoreInput = (playerName: string, value: string) => {
    const updated = players.map((p) =>
      p.name === playerName ? { ...p, roundScore: value } : p
    );
    setPlayers(updated);
  };

  const handleScoreAction = (playerName: string, action: string) => {
    let value = "";
    switch (action) {
      case "Show":
        value = "0";
        break;
      case "Drop":
        value = "20";
        break;
      case "M Drop":
        value = "40";
        break;
      case "Full":
        value = "80";
        break;
      case "Out":
        value = "100";
        break;
      default:
        value = "";
    }
    handleScoreInput(playerName, value);
  };

  const handleSubmit = () => {
    const updatedPlayers = players.map((p) => ({
      ...p,
      score: p.score + (parseInt(p.roundScore) || 0),
      roundScore: "",
    }));
    setRounds([...rounds, updatedPlayers]);
    setPlayers(updatedPlayers);
    router.push("/summary");
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
            <h1 className="text-white text-2xl font-bold">Add Scores</h1>
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Players Score Input */}
          {gamePlayersArray.map((player) => (
            <div
              key={player.name}
              className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl p-6 border border-slate-600/50"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-white font-bold text-lg">{player.name}</h3>
                  <p className="text-slate-300 text-sm">Score: {player.score}</p>
                </div>
                <input
                  type="number"
                  placeholder="Enter score"
                  value={player.roundScore}
                  onChange={(e) =>
                    handleScoreInput(player.name, e.target.value)
                  }
                  className="w-full sm:w-32 px-4 py-2 rounded-lg bg-slate-600 text-white border border-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 placeholder-slate-400"
                />
              </div>

              {/* Score Buttons */}
              {showScoreOptions && (
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <button
                    onClick={() => handleScoreAction(player.name, "Show")}
                    className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
                  >
                    Show
                  </button>
                  <button
                    onClick={() => handleScoreAction(player.name, "Drop")}
                    className="px-3 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-medium transition-colors"
                  >
                    Drop
                  </button>
                  <button
                    onClick={() => handleScoreAction(player.name, "M Drop")}
                    className="px-3 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-medium transition-colors"
                  >
                    M Drop
                  </button>
                  <button
                    onClick={() => handleScoreAction(player.name, "Full")}
                    className="px-3 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-colors"
                  >
                    Full
                  </button>
                  <button
                    onClick={() => handleScoreAction(player.name, "Out")}
                    className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
                  >
                    Out
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Options & Submit */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl p-6 border border-slate-600/50">
            <label className="flex items-center gap-3 mb-6 cursor-pointer">
              <input
                type="checkbox"
                checked={showScoreOptions}
                onChange={() => setShowScoreOptions((v) => !v)}
                className="w-5 h-5 rounded accent-blue-500 cursor-pointer"
              />
              <span className="text-white font-medium">Show Score Options?</span>
            </label>

            <button
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-lg transition-all active:scale-95 shadow-lg hover:shadow-xl"
            >
              <Check className="w-5 h-5" />
              Submit Scores
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}