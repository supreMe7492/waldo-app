import ImageService from "../services/ImageServices";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Game.css";

export default function Game() {
  const [image, setImage] = useState({});
  const { imgId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getImage() {
      const img = await ImageService(imgId);
      setImage(img.data);
      console.log(imgId);
    }

    getImage();
  }, [imgId]);

  return (
    <main className="game-page">
      <div className="game-shell">
        <header className="game-toolbar">
          <h1>Find Waldo</h1>
          <button
            className="game-back"
            type="button"
            onClick={() => navigate("/")}
          >
            Back to scenes
          </button>
        </header>

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
