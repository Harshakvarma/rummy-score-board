"use client";
import { Users, Play, RotateCcw, Zap } from "lucide-react";
import { Button } from "../ui/button";

export default function RummyHome({
  onNavigate,
}: {
  onNavigate: (
    page: "addPlayers" | "newGame" | "continueGame" | "removeAds" | "addScore",
  ) => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  ♠️
                </span>
              </div>
              <h1 className="text-white text-2xl sm:text-3xl font-bold">
                Rummy Score Board
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Menu */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-2xl">
          <h2 className="text-white text-xl sm:text-2xl font-semibold mb-8 text-center">
            What would you like to do?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Start New Game */}
            <button
              onClick={() => onNavigate("newGame")}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 sm:p-8 text-left transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/50 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative flex flex-col h-full">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white mb-3 sm:mb-4" />
                <h3 className="text-white font-bold text-lg sm:text-xl">
                  Start New Game
                </h3>
                <p className="text-emerald-100 text-sm mt-1">Begin playing</p>
              </div>
            </button>

            {/* Continue Game */}
            <button
              onClick={() => onNavigate("continueGame")}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 p-6 sm:p-8 text-left transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative flex flex-col h-full">
                <RotateCcw className="w-8 h-8 sm:w-10 sm:h-10 text-white mb-3 sm:mb-4" />
                <h3 className="text-white font-bold text-lg sm:text-xl">
                  Continue Game
                </h3>
                <p className="text-cyan-100 text-sm mt-1">Resume playing</p>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
