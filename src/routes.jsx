import { Routes, Route } from "react-router-dom";
import App from "./components/App";
import Game from "./components/Game";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/game/:imgId" element={<Game />} />
    </Routes>
  );
}
