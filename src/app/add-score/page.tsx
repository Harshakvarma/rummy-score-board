"use client";

import RummyScoreCounter from "@/components/rummy/RummyScoreCounter";
import { RummyProvider } from "@/components/rummy/RummyContext";

export default function AddScorePage() {
  return (
    <RummyProvider>
      <RummyScoreCounter />
    </RummyProvider>
  );
}