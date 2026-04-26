"use client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import RummyHome from "../components/rummy/RummyHome";

import PlayerList from "../components/rummy/PlayerList";

import RummyScoreCounter from "../components/rummy/RummyScoreCounter";
import RummyGameSummary from "../components/rummy/RummyGameSummary";
import { RummyProvider } from "../components/rummy/RummyContext";
import NewGamePage from "../components/rummy/NewGameForm";

function RemoveAds() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white text-2xl">
      Remove Ads (Coming Soon)
    </div>
  );
}

function AppRoutes() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RummyHome
            onNavigate={(page) => {
              if (page === "addPlayers") navigate("/players");
              else if (page === "newGame") navigate("/new-game");
              else if (page === "addScore") navigate("/add-score");
              else if (page === "continueGame") navigate("/summary");
              else if (page === "removeAds") navigate("/remove-ads");
            }}
          />
        }
      />
      <Route path="/players" element={<PlayerList />} />
      <Route path="/new-game" element={<NewGamePage />} />
      <Route path="/score" element={<RummyScoreCounter />} />
      <Route path="/summary" element={<RummyGameSummary />} />
      <Route path="/remove-ads" element={<RemoveAds />} />
    </Routes>
  );
}

export default function Home() {
  return (
    <RummyProvider>
      <Router>
        <main className="min-h-screen bg-black flex items-center justify-center">
          <AppRoutes />
        </main>
      </Router>
    </RummyProvider>
  );
}
