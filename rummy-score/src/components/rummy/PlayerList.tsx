"use client";
import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";

export default function PlayerList() {
  const [players, setPlayers] = useState(["Babu", "Harsha", "Padma", "Pragna"]);
  const [showDialog, setShowDialog] = useState(false);
  const [newPlayer, setNewPlayer] = useState("");
  const navigate = useNavigate();

  const handleAddPlayer = () => {
    if (newPlayer.trim() && !players.includes(newPlayer.trim())) {
      setPlayers([...players, newPlayer.trim()]);
      setNewPlayer("");
      setShowDialog(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="bg-blue-500 text-white text-lg font-bold py-3 px-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={() => navigate(-1)}
        >
          <span className="material-icons">←</span>
        </Button>
        <span>Player List</span>
        <Button
          variant="ghost"
          size="icon"
          className="text-white opacity-0 cursor-default"
        >
          <span className="material-icons">more_vert</span>
        </Button>
      </div>
      {/* Player List */}
      <ul className="flex-1 flex flex-col gap-2 p-4">
        {players.map((name) => (
          <li key={name}>
            <div className="flex items-center gap-4 px-4 py-3 bg-neutral-800 rounded-lg shadow text-white">
              <span className="material-icons text-blue-400">O</span>
              <span className="text-lg">{name}</span>
            </div>
          </li>
        ))}
      </ul>
      {/* Add Player Button */}
      <Button
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
        onClick={() => setShowDialog(true)}
      >
        <span className="material-icons text-white text-3xl">+</span>
      </Button>
      {/* Add Player Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-neutral-800 rounded-xl p-6 w-80 flex flex-col gap-4">
            <Input
              placeholder="Enter Player Name"
              value={newPlayer}
              onChange={(e) => setNewPlayer(e.target.value)}
              className="bg-neutral-700 text-white border-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex gap-4 justify-center mt-2">
              <Button
                className="bg-gray-600 hover:bg-gray-700 text-white px-6"
                onClick={() => setShowDialog(false)}
              >
                CANCEL
              </Button>
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white px-6"
                onClick={handleAddPlayer}
              >
                ADD
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
