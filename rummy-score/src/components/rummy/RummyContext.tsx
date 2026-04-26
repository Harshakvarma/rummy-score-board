"use client";
import { createContext, useContext, useState, ReactNode } from "react";

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
}

const initialPlayers: Player[] = [
  { name: "Padma", score: 35, roundScore: "" },
  { name: "Babu", score: 67, roundScore: "" },
  { name: "Harsha", score: 58, roundScore: "" },
  { name: "Pragna", score: 0, roundScore: "" },
];

const RummyContext = createContext<RummyContextType | undefined>(undefined);

export function useRummy() {
  const ctx = useContext(RummyContext);
  if (!ctx) throw new Error("useRummy must be used within a RummyProvider");
  return ctx;
}

export function RummyProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [rounds, setRounds] = useState<Round[]>([initialPlayers]);

  return (
    <RummyContext.Provider value={{ players, setPlayers, rounds, setRounds }}>
      {children}
    </RummyContext.Provider>
  );
}
