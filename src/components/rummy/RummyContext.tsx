"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Player = {
  name: string;
  score: number;
  roundScore: string;
};

export type Round = Player[];

interface RummyContextType {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  rounds: Round[];
  setRounds: (rounds: Round[]) => void;
  selectedPlayers: string[];
  setSelectedPlayers: (players: string[]) => void;
  allPlayers: string[];
  setAllPlayers: (players: string[]) => void;
}

const initialPlayers: Player[] = [];

const STORAGE_KEY = "rummy_game_data";

const RummyContext = createContext<RummyContextType | undefined>(undefined);

export function useRummy() {
  const ctx = useContext(RummyContext);
  if (!ctx) throw new Error("useRummy must be used within a RummyProvider");
  return ctx;
}

export function RummyProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [rounds, setRounds] = useState<Round[]>([initialPlayers]);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
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
          setSelectedPlayers(data.selectedPlayers || []);
          setAllPlayers(data.allPlayers || []);
          setPlayers(data.players || initialPlayers);
          setRounds(data.rounds || [initialPlayers]);
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
          selectedPlayers,
          allPlayers,
          players,
          rounds,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (error) {
        console.error("Failed to save to localStorage:", error);
      }
    }
  }, [selectedPlayers, allPlayers, players, rounds, isClient]);

  return (
    <RummyContext.Provider
      value={{
        players,
        setPlayers,
        rounds,
        setRounds,
        selectedPlayers,
        setSelectedPlayers,
        allPlayers,
        setAllPlayers,
      }}
    >
      {children}
    </RummyContext.Provider>
  );
}
