import { Routes, Route } from "react-router-dom";
import App from "./components/App";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/game/:imgId" element={<Game />} />
      <Route path="/leaderboard/:imgId" element={<Leaderboard />} />
    </Routes>
  );
}
