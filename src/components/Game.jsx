import ImageService from "../services/ImageServices";
import GameStart from "../services/GameServies";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Game.css";

export default function Game() {
  const [image, setImage] = useState({});
  const { imgId } = useParams();
  const navigate = useNavigate();
  const sceneId = Number(imgId);
  const characterIds = [1, 2, 3].map(
    (characterId) => `${sceneId}ch${characterId}`,
  );

  useEffect(() => {
    async function getImage() {
      const img = await ImageService(imgId);
      setImage(img.data);
      const gameData = await GameStart(imgId);
      console.log(gameData);
    }

    getImage();
  }, [imgId]);

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

        <section className="target-panel" aria-labelledby="target-title">
          <div className="target-heading">
            <p className="game-kicker">Your targets</p>
            <h2 id="target-title">Spot all three</h2>
          </div>
          <div className="target-list">
            {characterIds.map((characterId, index) => (
              <div className="target-card" key={characterId}>
                <img
                  src={`/${characterId}.png`}
                  alt={`${characterId} target`}
                />
                <span>{characterId}</span>
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
            />
          ) : (
            <p className="game-status">Loading scene...</p>
          )}
        </section>
      </div>
    </main>
  );
}
