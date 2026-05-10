"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRummy } from "./RummyContext";
import { ArrowLeft, Check } from "lucide-react";

export default function RummyScoreCounter() {
  const router = useRouter();
  const { allPlayers, rounds, setRounds } = useRummy();
  const [showScoreOptions, setShowScoreOptions] = useState(true);
  const [roundScores, setRoundScores] = useState<Record<string, string>>({});
  const [editRoundIndex, setEditRoundIndex] = useState<number | null>(null);

  // Calculate player scores from rounds
  const getPlayerScores = (): Record<string, number> => {
    const playerScores: Record<string, number> = {};
    allPlayers.forEach(name => {
      playerScores[name] = 0;
    });

    rounds.forEach(round => {
      Object.entries(round).forEach(([name, score]) => {
        if (playerScores[name] !== undefined) {
          playerScores[name] += score;
        }
      });
    });

    return playerScores;
  };

  // Initialize roundScores and detect edit mode
  useEffect(() => {
    if (allPlayers.length > 0) {
      const editData = localStorage.getItem("rummy_edit_round");
      if (editData) {
        const { round, roundIndex } = JSON.parse(editData);
        setEditRoundIndex(roundIndex);
        setRoundScores(
          Object.fromEntries(allPlayers.map((name) => [name, String(round[name] || "")]))
        );
        localStorage.removeItem("rummy_edit_round");
      } else {
        setRoundScores(
          Object.fromEntries(allPlayers.map((name) => [name, ""]))
        );
      }
    }
  }, [allPlayers]);

  const handleScoreInput = (playerName: string, value: string) => {
    setRoundScores((prev) => ({
      ...prev,
      [playerName]: value,
    }));
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
     // Create round object with player names as keys and their scores as values
     const newRound: Record<string, number> = Object.fromEntries(
       allPlayers.map((name) => [name, parseInt(roundScores[name] || "0") || 0])
     );

     if (editRoundIndex !== null) {
       // Update existing round
       const updatedRounds = [...rounds];
       updatedRounds[editRoundIndex] = newRound;
       setRounds(updatedRounds);
       setEditRoundIndex(null);
     } else {
       // Add new round
       setRounds([...rounds, newRound]);
     }
     setRoundScores(Object.fromEntries(allPlayers.map((name) => [name, ""])));
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
          {allPlayers.map((playerName) => {
            const playerScores = getPlayerScores();
            const currentScore = playerScores[playerName] || 0;
            return (
              <div
              key={playerName}
              className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl p-6 border border-slate-600/50"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-white font-bold text-lg">{playerName}</h3>
                    <p className="text-slate-300 text-sm">Score: {currentScore}</p>
                  </div>
                  <input
                    type="number"
                    placeholder="Enter score"
                    value={roundScores[playerName] || ""}
                    onChange={(e) =>
                      handleScoreInput(playerName, e.target.value)
                    }
                    className="w-full sm:w-32 px-4 py-2 rounded-lg bg-slate-600 text-white border border-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 placeholder-slate-400"
                  />
                </div>

                {/* Score Buttons */}
                {showScoreOptions && (
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <button
                      onClick={() => handleScoreAction(playerName, "Show")}
                      className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
                    >
                      Show
                    </button>
                    <button
                      onClick={() => handleScoreAction(playerName, "Drop")}
                      className="px-3 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-medium transition-colors"
                    >
                      Drop
                    </button>
                    <button
                      onClick={() => handleScoreAction(playerName, "M Drop")}
                      className="px-3 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-medium transition-colors"
                    >
                      M Drop
                    </button>
                    <button
                      onClick={() => handleScoreAction(playerName, "Full")}
                      className="px-3 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-colors"
                    >
                      Full
                    </button>
                    <button
                      onClick={() => handleScoreAction(playerName, "Out")}
                      className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
                    >
                      Out
                    </button>
                  </div>
                )}
              </div>
            );
          })}

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