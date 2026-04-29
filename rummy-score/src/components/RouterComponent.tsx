"use client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import RummyHome from "./rummy/RummyHome";
import PlayerList from "./rummy/PlayerList";
import RummyScoreCounter from "./rummy/RummyScoreCounter";
import RummyGameSummary from "./rummy/RummyGameSummary";
import { RummyProvider } from "./rummy/RummyContext";
import NewGamePage from "./rummy/NewGameForm";

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
            }}
          />
        }
      />
      <Route path="/players" element={<PlayerList />} />
      <Route path="/new-game" element={<NewGamePage />} />
      <Route path="/add-score" element={<RummyScoreCounter />} />
      <Route path="/summary" element={<RummyGameSummary />} />
    </Routes>
  );
}

export default function RouterComponent() {
  return (
    <RummyProvider>
      <Router>
        <AppRoutes />
      </Router>
    </RummyProvider>
  );
}
