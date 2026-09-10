import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GetLeaderboard from "../services/LeaderboardService";
import "../styles/Leaderboard.css";

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds.toString().padStart(2, "0")}s`;
}

export default function Leaderboard() {
  const { imgId } = useParams();
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    GetLeaderboard(imgId)
      .then(setEntries)
      .catch(() => {
        setError("Could not load the leaderboard");
      });
  }, [imgId]);

  return (
    <main className="leaderboard-page">
      <section className="leaderboard-shell">
        <header className="leaderboard-header">
          <div>
            <p className="game-kicker">Scene {imgId}</p>
            <h1>Leaderboard</h1>
          </div>
          <button type="button" onClick={() => navigate("/")}>
            Back to scenes
          </button>
        </header>

        {error ? (
          <p className="leaderboard-status">{error}</p>
        ) : entries.length === 0 ? (
          <p className="leaderboard-status">Loading scores...</p>
        ) : (
          <ol className="leaderboard-list">
            {entries.map((entry) => (
              <li key={entry.gameId}>
                <strong>{entry.rank}</strong>
                <span>{entry.name}</span>
                <time>{formatTime(entry.timescore)}</time>
              </li>
            ))}
          </ol>
        )}
      </section>
    </main>
  );
}
