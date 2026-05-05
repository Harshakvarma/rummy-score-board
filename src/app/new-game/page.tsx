"use client";

import NewGameForm from "@/components/rummy/NewGameForm";
import { RummyProvider } from "@/components/rummy/RummyContext";

export default function NewGamePage() {
  return (
    <RummyProvider>
      <NewGameForm />
    </RummyProvider>
  );
}