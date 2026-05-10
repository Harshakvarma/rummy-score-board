"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Round = Record<string, number>;

interface RummyContextType {
  rounds: Round[];
  setRounds: (rounds: Round[]) => void;
  allPlayers: string[];
  setAllPlayers: (players: string[]) => void;
}

const STORAGE_KEY = "rummy_game_data";

const RummyContext = createContext<RummyContextType | undefined>(undefined);

export function useRummy() {
  const ctx = useContext(RummyContext);
  if (!ctx) throw new Error("useRummy must be used within a RummyProvider");
  return ctx;
}

export function RummyProvider({ children }: { children: ReactNode }) {
  const [rounds, setRounds] = useState<Round[]>([]);
  const [allPlayers, setAllPlayers] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const data = JSON.parse(saved);
          setAllPlayers(data.allPlayers || []);
          setRounds(data.rounds || []);
        }
      } catch (error) {
        console.error("Failed to load from localStorage:", error);
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (isClient && typeof window !== "undefined") {
      try {
        const data = {
          allPlayers,
          rounds,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (error) {
        console.error("Failed to save to localStorage:", error);
      }
    }
  }, [allPlayers, rounds, isClient]);

  return (
    <RummyContext.Provider
      value={{
        rounds,
        setRounds,
        allPlayers,
        setAllPlayers,
      }}
    >
      {children}
    </RummyContext.Provider>
  );
}
