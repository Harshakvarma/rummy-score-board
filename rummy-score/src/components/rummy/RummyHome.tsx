"use client";
import { useState } from "react";
import { Button } from "../ui/button";

export default function RummyHome({
  onNavigate,
}: {
  onNavigate: (
    page: "addPlayers" | "newGame" | "continueGame" | "removeAds" | "addScore"
  ) => void;
}) {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="bg-blue-500 text-white text-lg font-bold py-3 px-4 flex items-center justify-between">
        <span>Rummy Score Board</span>
        {/* <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-white">
            <span className="material-icons">volume_off</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <span className="material-icons">share</span>
          </Button>
        </div> */}
      </div>
      {/* Main Menu */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white text-lg h-32 rounded-xl"
            onClick={() => onNavigate("addPlayers")}
          >
            Add Players
          </Button>
          <Button
            className="bg-green-700 hover:bg-green-800 text-white text-lg h-32 rounded-xl"
            onClick={() => onNavigate("newGame")}
          >
            Start New Game
          </Button>
          <Button
            className="bg-cyan-700 hover:bg-cyan-800 text-white text-lg h-32 rounded-xl"
            onClick={() => onNavigate("continueGame")}
          >
            Continue Game
          </Button>
          <Button
            className="bg-yellow-300 hover:bg-yellow-400 text-black text-lg h-32 rounded-xl"
            onClick={() => onNavigate("removeAds")}
          >
            Remove Ads
          </Button>
        </div>
      </div>
    </div>
  );
}
