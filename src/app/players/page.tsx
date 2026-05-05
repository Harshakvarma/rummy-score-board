"use client";

import PlayerList from "@/components/rummy/PlayerList";
import { RummyProvider } from "@/components/rummy/RummyContext";

export default function PlayersPage() {
  return (
    <RummyProvider>
      <PlayerList />
    </RummyProvider>
  );
}