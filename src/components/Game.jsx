import ImageService from "../services/ImageServices";
import GetImgChar from "../services/CharacterServices";
import GameStart from "../services/GameServies";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Game.css";

export default function Game() {
  const [image, setImage] = useState({});
  const [chDatas, setChdatas] = useState([]);
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
    }

    getImage();

    getCharacterIds();
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
            />
          ) : (
            <p className="game-status">Loading scene...</p>
          )}
        </section>
      </div>
    </main>
  );
}
