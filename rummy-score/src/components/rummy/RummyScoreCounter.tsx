"use client";
import { useState } from "react";
import { useRummy } from "./RummyContext";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Player = {
  name: string;
  score: number;
  roundScore: string;
};

export default function RummyScoreCounter() {
  const { players, setPlayers, rounds, setRounds } = useRummy();
  const [showScoreOptions, setShowScoreOptions] = useState(true);

  // Score action handlers
  const handleScoreInput = (playerIdx: number, value: string) => {
    const updated = [...players];
    updated[playerIdx].roundScore = value;
    setPlayers(updated);
  };

  const handleScoreAction = (playerIdx: number, action: string) => {
    // Example: set roundScore based on action
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
    handleScoreInput(playerIdx, value);
  };

  const handleSubmit = () => {
    // Add new round with updated scores
    const updatedPlayers = players.map((p) => ({
      ...p,
      score: p.score + (parseInt(p.roundScore) || 0),
      roundScore: "",
    }));
    setRounds([...rounds, updatedPlayers]);
    setPlayers(updatedPlayers);
  };

  return (
    <div className="max-w-md mx-auto py-4">
      <h1 className="text-xl font-bold text-center mb-2 bg-blue-500 text-white py-2 rounded-t">
        Add Round Scores
      </h1>
      <div className="bg-black/80 p-2 rounded-b">
        {players.map((player, idx) => (
          <Card
            key={player.name}
            className="bg-neutral-800 border-0 rounded-none mb-2"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between p-3 gap-2">
              <div className="flex-1">
                <div className="font-bold text-lg text-white">
                  {player.name}
                </div>
                <div className="text-gray-300 text-sm">
                  Score: {player.score}
                </div>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <Input
                  className="bg-neutral-700 text-white border-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Score"
                  value={player.roundScore}
                  onChange={(e) => handleScoreInput(idx, e.target.value)}
                  type="number"
                />
              </div>
            </div>
            {showScoreOptions && (
              <div className="flex gap-2 justify-center pb-2">
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => handleScoreAction(idx, "Show")}
                >
                  Show
                </Button>
                <Button
                  size="sm"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black"
                  onClick={() => handleScoreAction(idx, "Drop")}
                >
                  Drop
                </Button>
                <Button
                  size="sm"
                  className="bg-yellow-300 hover:bg-yellow-400 text-black"
                  onClick={() => handleScoreAction(idx, "M Drop")}
                >
                  M Drop
                </Button>
                <Button
                  size="sm"
                  className="bg-indigo-400 hover:bg-indigo-500 text-white"
                  onClick={() => handleScoreAction(idx, "Full")}
                >
                  Full
                </Button>
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => handleScoreAction(idx, "Out")}
                >
                  Out
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
      <div className="bg-black/90 p-4 rounded-b-xl mt-2">
        <label className="flex items-center gap-2 mb-4 text-white">
          <input
            type="checkbox"
            checked={showScoreOptions}
            onChange={() => setShowScoreOptions((v) => !v)}
            className="accent-blue-500 w-4 h-4"
          />
          Show Score Options?
        </label>
        <Button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg py-2"
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
      </div>
      <div className="mt-4">
        {rounds.length > 1 && (
          <>
            <h2 className="text-center text-white text-base mb-2">
              Game Rounds
            </h2>
            {rounds.map((round, i) =>
              i === 0 ? null : (
                <div key={i} className="bg-neutral-900 rounded mb-2 p-2">
                  <div className="text-xs text-gray-400 mb-1">Round {i}</div>
                  <div className="flex flex-wrap gap-2">
                    {round.map((p) => (
                      <div
                        key={p.name}
                        className="text-white text-xs bg-neutral-700 rounded px-2 py-1"
                      >
                        {p.name}: +{p.roundScore || 0}
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}
