import React from "react";

const NewGameForm: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-gray-900 text-white">
      <header className="w-full flex items-center bg-blue-500 p-4 rounded-t-lg">
        <button className="mr-4 text-2xl">&#8592;</button>
        <h1 className="text-xl font-bold flex-1 text-center">New Game</h1>
      </header>
      <section className="w-full max-w-md mt-4 bg-gray-800 rounded-lg p-4 mb-4">
        <div className="mb-2 flex items-center justify-between">
          <label className="block text-sm font-semibold">Game Name</label>
          <span className="text-xs text-gray-400">Auto generate</span>
          <span className="text-gray-500 ml-2">&gt;</span>
        </div>
      </section>
      <section className="w-full max-w-md bg-gray-800 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">Game Scores</span>
          <button className="text-lg">&#9660;</button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div>
            <label className="block text-xs">Game total score</label>
            <input
              className="w-full mt-1 p-2 rounded bg-gray-700 text-white"
              defaultValue="200"
            />
          </div>
          <div>
            <label className="block text-xs">Open drop</label>
            <input
              className="w-full mt-1 p-2 rounded bg-gray-700 text-white"
              defaultValue="25"
            />
          </div>
          <div>
            <label className="block text-xs">Middle Drop</label>
            <input
              className="w-full mt-1 p-2 rounded bg-gray-700 text-white"
              defaultValue="50"
            />
          </div>
          <div>
            <label className="block text-xs">Full count</label>
            <input
              className="w-full mt-1 p-2 rounded bg-gray-700 text-white"
              defaultValue="80"
            />
          </div>
        </div>
        <div className="flex items-center mb-2">
          <input type="checkbox" id="reentry" className="mr-2" />
          <label htmlFor="reentry" className="text-xs">
            Adjust re-entry score to highest player score +1
          </label>
        </div>
      </section>
      <section className="w-full max-w-md bg-gray-800 rounded-lg p-4 mb-4">
        <span className="text-sm font-semibold mb-2 block">Select Players</span>
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="bg-blue-600 px-3 py-1 rounded-full flex items-center">
            Padma <span className="ml-1 cursor-pointer">&times;</span>
          </span>
          <span className="bg-blue-600 px-3 py-1 rounded-full flex items-center">
            Babu <span className="ml-1 cursor-pointer">&times;</span>
          </span>
          <span className="bg-blue-600 px-3 py-1 rounded-full flex items-center">
            Harsha <span className="ml-1 cursor-pointer">&times;</span>
          </span>
          <span className="bg-blue-600 px-3 py-1 rounded-full flex items-center">
            Pragna <span className="ml-1 cursor-pointer">&times;</span>
          </span>
        </div>
        <button className="text-blue-400 underline">SELECT PLAYERS</button>
      </section>
    </main>
  );
};

export default NewGameForm;
