"use client";

import RummyGameSummary from "@/components/rummy/RummyGameSummary";
import { RummyProvider } from "@/components/rummy/RummyContext";

export default function SummaryPage() {
  return (
    <RummyProvider>
      <RummyGameSummary />
    </RummyProvider>
  );
}