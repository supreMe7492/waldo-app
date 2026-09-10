import ImageService from "../services/ImageServices";
import GetImgChar from "../services/CharacterServices";
import GameStart from "../services/GameServies";
import CheckFound from "../services/FindController";
import CompleteGame from "../services/CompleteGame";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotFoundChs from "./NotFoundChs";
import "../styles/Game.css";

export default function Game() {
  const [image, setImage] = useState({});
  const [chDatas, setChdatas] = useState([]);
  const [notFoundChIds, setNotChFoundIds] = useState([]);
  const [clickPosition, setClickPosition] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { imgId } = useParams();
  const navigate = useNavigate();
  const sceneId = Number(imgId);

  useEffect(() => {
    async function getImage() {
      const img = await ImageService(imgId);
      setImage(img.data);
      await GameStart(imgId);
    }
    async function getCharacterIds() {
      const chData = await GetImgChar(imgId);
      setChdatas(chData);
      setNotChFoundIds(chData.map((ch) => ch.chId));
    }

    getImage();

    getCharacterIds();
  }, [imgId]);

  async function getCords(e) {
    setFeedback(null);
    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const xPixel = e.clientX - rect.left;
    const yPixel = e.clientY - rect.top;

    const xNorm = xPixel / width;
    const yNorm = yPixel / height;

    setClickPosition({ x: xNorm, y: yNorm });
  }

  async function selectCharacter(chId) {
    try {
      const found = await CheckFound(chId, clickPosition.x, clickPosition.y);

      if (found.found) {
        setFeedback({ type: "success", message: found.message });
        setNotChFoundIds(found.notFoundIds || []);
        setClickPosition(null);

        if (found.completed) {
          setIsComplete(true);
        }
      } else {
        setFeedback({ type: "error", message: found.message || "Try again" });
        setClickPosition(null);
      }
    } catch {
      setFeedback({ type: "error", message: "Could not check that find" });
      setClickPosition(null);
    }
  }

  async function submitScore(event) {
    event.preventDefault();
    if (!playerName.trim()) return;

    setIsSubmitting(true);
    try {
      await CompleteGame(playerName.trim());
      navigate(`/leaderboard/${imgId}`);
    } catch {
      setFeedback({ type: "error", message: "Could not save your score" });
      setIsSubmitting(false);
    }
  }

  return (
    <main className="game-page">
      <div className="game-shell">
        <header className="game-toolbar">
          <div>
            <p className="game-kicker">Scene {sceneId}</p>
            <h1>Find the characters</h1>
          </div>
          <button
            className="game-back"
            type="button"
            onClick={() => navigate("/")}
          >
            Back to scenes
          </button>
        </header>

        {feedback && (
          <p className={`game-feedback ${feedback.type}`} role="status">
            {feedback.message}
          </p>
        )}

        <section className="target-panel" aria-labelledby="target-title">
          <div className="target-heading">
            <p className="game-kicker">Your targets</p>
            <h2 id="target-title">Spot all three</h2>
          </div>
          <div className="target-list">
            {chDatas.map((character, index) => (
              <div className="target-card" key={character.chId}>
                <img
                  src={`/ch${character.chId}.png`}
                  alt={`${character.chId} target`}
                />
                <span>{character.chName}</span>
                <strong>0{index + 1}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="game-stage" aria-label="Waldo scene">
          {image.path ? (
            <img
              className="game-image"
              src={`http://localhost:3000${image.path}`}
              alt={`Waldo ${image.id}`}
              onClick={getCords}
            />
          ) : (
            <p className="game-status">Loading scene...</p>
          )}
        </section>
      </div>

      {clickPosition && (
        <NotFoundChs
          characters={chDatas.filter((character) =>
            notFoundChIds.includes(character.chId),
          )}
          clickPosition={clickPosition}
          onSelect={selectCharacter}
          onClose={() => setClickPosition(null)}
        />
      )}

      {isComplete && (
        <div className="completion-backdrop">
          <form className="completion-dialog" onSubmit={submitScore}>
            <p className="game-kicker">Scene complete</p>
            <h2>Put your name on the board</h2>
            <label htmlFor="player-name">Your name</label>
            <input
              id="player-name"
              value={playerName}
              onChange={(event) => setPlayerName(event.target.value)}
              maxLength={30}
              autoFocus
              required
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "View leaderboard"}
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
