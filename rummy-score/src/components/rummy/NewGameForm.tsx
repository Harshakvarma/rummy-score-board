"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useRummy } from "./RummyContext";
import { ArrowLeft, Plus, X } from "lucide-react";

const NewGameForm: React.FC = () => {
  const router = useRouter();
  const { selectedPlayers, setSelectedPlayers } = useRummy();
  const [gameName, setGameName] = useState("Game 1");
  const [gameTotal, setGameTotal] = useState("200");
  const [openDrop, setOpenDrop] = useState("25");
  const [middleDrop, setMiddleDrop] = useState("50");
  const [fullCount, setFullCount] = useState("80");
  const [reentry, setReentry] = useState(false);

  const handleRemovePlayer = (player: string) => {
    setSelectedPlayers(selectedPlayers.filter((p) => p !== player));
  };

  const handleSelectPlayers = () => {
    // Navigate to players page with select mode query parameter
    router.push("/players?mode=select");
  };

  const handleStartGame = () => {
    if (selectedPlayers.length < 2) {
      alert("Please select at least 2 players");
      return;
    }
    // TODO: Navigate to score counter with game settings
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
            <h1 className="text-white text-2xl font-bold">New Game</h1>
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Game Name */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl p-6 border border-slate-600/50">
            <div className="flex items-center justify-between mb-4">
              <label className="text-white font-semibold">Game Name</label>
              <span className="text-xs text-slate-400 cursor-pointer hover:text-slate-300">
                Auto generate
              </span>
            </div>
            <input
              type="text"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>

          {/* Game Scores */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl p-6 border border-slate-600/50">
            <h3 className="text-white font-semibold mb-4">Game Scores</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Game Total Score
                </label>
                <input
                  type="number"
                  value={gameTotal}
                  onChange={(e) => setGameTotal(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Open Drop
                </label>
                <input
                  type="number"
                  value={openDrop}
                  onChange={(e) => setOpenDrop(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Middle Drop
                </label>
                <input
                  type="number"
                  value={middleDrop}
                  onChange={(e) => setMiddleDrop(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Full Count
                </label>
                <input
                  type="number"
                  value={fullCount}
                  onChange={(e) => setFullCount(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-slate-300">
              <input
                type="checkbox"
                checked={reentry}
                onChange={(e) => setReentry(e.target.checked)}
                className="w-4 h-4 rounded cursor-pointer"
              />
              <span className="text-sm">
                Adjust re-entry score to highest player score +1
              </span>
            </label>
          </div>

          {/* Select Players */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl p-6 border border-slate-600/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">
                Selected Players ({selectedPlayers.length})
              </h3>
              <button
                onClick={handleSelectPlayers}
                className="flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Edit
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedPlayers.length === 0 ? (
                <p className="text-slate-400">No players selected</p>
              ) : (
                selectedPlayers.map((player) => (
                  <div
                    key={player}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                  >
                    <span className="font-medium">{player}</span>
                    <button
                      onClick={() => handleRemovePlayer(player)}
                      className="hover:bg-white/20 rounded-full p-1 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
            <button
              onClick={handleSelectPlayers}
              className="text-blue-300 hover:text-blue-200 text-sm font-medium transition-colors"
            >
              Select Players →
            </button>
          </div>

          {/* Start Game Button */}
          <button
            onClick={handleStartGame}
            disabled={selectedPlayers.length < 2}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg transition-all active:scale-95"
          >
            Start Game
          </button>
        </div>
      </main>
    </div>
  );
};

export default NewGameForm;