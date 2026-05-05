"use client";

import RummyHome from "@/components/rummy/RummyHome";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <RummyHome
      onNavigate={(page) => {
        switch (page) {
          case "addPlayers":
            router.push("/players");
            break;
          case "newGame":
            router.push("/new-game");
            break;
          case "addScore":
            router.push("/add-score");
            break;
          case "continueGame":
            router.push("/summary");
            break;
        }
      }}
    />
  );
}