import { Routes, Route } from "react-router-dom";
import App from "./components/App";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  );
}
