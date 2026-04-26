"use client";
import { Button } from "../ui/button";

interface Player {
  name: string;
  isDealer?: boolean;
  isWinner?: boolean;
  roundCode?: string; // e.g. R, D, MD, FC
  roundScore?: number | string;
  totalScore: number;
}

interface RummyGameSummaryProps {
  date: string;
  players: Player[];
  rounds: Array<{ code: string; score: number | string }[]>; // rounds[roundIndex][playerIndex]
}

export default function RummyGameSummary({
  date = "Aug 14, 2025 - 09:31 pm",
  players = [
    { name: "Padma", totalScore: 35 },
    { name: "Babu", totalScore: 67 },
    { name: "Harsha", totalScore: 58, isDealer: true },
    { name: "Pragna", totalScore: 80 },
  ],
  rounds = [
    [
      { code: "R", score: 35 },
      { code: "D", score: 42 },
      { code: "MD", score: 8 },
      { code: "FC", score: "R" },
    ],
  ],
}: Partial<RummyGameSummaryProps>) {
  return (
    <div className="max-w-md mx-auto w-full min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white text-center py-2 font-semibold text-lg flex items-center justify-center gap-2">
        <span>{date}</span>
      </div>
      {/* Table */}
      <div className="w-full overflow-x-auto">
        <div className="grid grid-cols-4 bg-black">
          {players.map((p, i) => (
            <div
              key={p.name}
              className={`text-white text-center py-1 font-bold border-b border-black bg-neutral-900 ${
                p.isDealer ? "border-2 border-yellow-400" : ""
              }`}
            >
              {p.isDealer ? "*" : ""}
              {p.name}
            </div>
          ))}
        </div>
        {/* Round codes */}
        {rounds.map((round, roundIdx) => (
          <div key={roundIdx} className="grid grid-cols-4">
            {round.map((r, i) => (
              <div
                key={i}
                className={`text-center py-2 font-bold text-yellow-400 bg-blue-800 border-b border-black`}
              >
                {r.code}
              </div>
            ))}
          </div>
        ))}
        {/* Round scores */}
        {rounds.map((round, roundIdx) => (
          <div key={roundIdx} className="grid grid-cols-4">
            {round.map((r, i) => (
              <div
                key={i}
                className={`text-center py-2 font-bold text-white bg-blue-900 border-b border-black`}
              >
                {r.score}
              </div>
            ))}
          </div>
        ))}
        {/* Total scores */}
        <div className="grid grid-cols-4">
          {players.map((p, i) => (
            <div
              key={p.name}
              className="text-center py-2 font-bold text-white bg-neutral-900 border-b border-black"
            >
              {p.totalScore}
            </div>
          ))}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mt-8 px-4">
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white text-base rounded-full py-2"
          onClick={() => {
            window.location.href = "/new-game"; // adjust path if needed
          }}
        >
          ENTER SCORE
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white text-base rounded-full py-2">
          EDIT SCORE
        </Button>
      </div>
    </div>
  );
}
