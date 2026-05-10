"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRummy } from "./RummyContext";
import { ArrowLeft, Plus, Users, Check } from "lucide-react";

export default function PlayerList() {
  const router = useRouter();
  const { allPlayers, setAllPlayers } = useRummy();
  const [showDialog, setShowDialog] = useState(false);
  const [newPlayer, setNewPlayer] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  const handleAddPlayer = () => {
    if (newPlayer.trim() && !allPlayers.includes(newPlayer.trim())) {
      setAllPlayers([...allPlayers, newPlayer.trim()]);
      setNewPlayer("");
      setShowDialog(false);
    }
  };

  const handleRemovePlayer = (player: string) => {
    setAllPlayers(allPlayers.filter((p) => p !== player));
    setSelectedPlayers(selectedPlayers.filter((p) => p !== player));
  };

  const handleToggleSelect = (player: string) => {
    setSelectedPlayers(
      selectedPlayers.includes(player)
        ? selectedPlayers.filter((p) => p !== player)
        : [...selectedPlayers, player],
    );
  };

const handleConfirmSelection = () => {
     if (selectedPlayers.length < 2) {
       alert("Please select at least 2 players");
       return;
     }
     // Save game players to localStorage
     const gamePlayers = selectedPlayers.map((name) => ({
       name,
       score: 0,
     }));
     localStorage.setItem("rummy_game_players", JSON.stringify(gamePlayers));
     router.push("/new-game");
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
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-white" />
              <h1 className="text-white text-2xl font-bold">
                Select Players ({selectedPlayers.length})
              </h1>
            </div>
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      {/* Player List */}
      <main className="flex-1 overflow-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-2xl mx-auto space-y-3">
          {allPlayers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No players added yet</p>
            </div>
          ) : (
            allPlayers.map((name, idx) => {
              const isSelected = selectedPlayers.includes(name);
              return (
                <div
                  key={name}
                  onClick={() => handleToggleSelect(name)}
                  className={`group flex items-center gap-4 px-4 sm:px-6 py-4 rounded-xl shadow-md transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 border-blue-400 shadow-lg shadow-blue-500/50"
                      : "bg-gradient-to-r from-slate-700 to-slate-800 border-slate-600/50 hover:from-slate-600 hover:to-slate-700 hover:shadow-lg"
                  }`}
                >
                  <div className="w-6 h-6 rounded border-2 border-white flex items-center justify-center flex-shrink-0">
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <span className="text-white text-lg font-medium flex-1">
                    {name}
                  </span>
                </div>
              );
            })
          )}
        </div>
        {/* Add Player Button */}
        <button
          onClick={() => setShowDialog(true)}
          className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <Plus className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      </main>

      {/* Done Button */}
      <div className="border-t border-slate-700 bg-slate-900/80 backdrop-blur p-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleConfirmSelection}
            disabled={selectedPlayers.length < 2}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg transition-all active:scale-95"
          >
            Confirm Selection ({selectedPlayers.length})
          </button>
        </div>
      </div>

      {/* Add Player Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl border border-slate-700">
            <h2 className="text-white text-xl sm:text-2xl font-bold mb-6">
              Add New Player
            </h2>
            <input
              placeholder="Enter player name"
              value={newPlayer}
              onChange={(e) => setNewPlayer(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddPlayer()}
              className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 placeholder-slate-400 mb-6"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowDialog(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPlayer}
                disabled={!newPlayer.trim()}
                className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-all"
              >
                Add Player
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}