import { useState, useEffect } from "react";
import ImageService from "../services/ImageServices";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";

export default function Images() {
  const [images, setImages] = useState([]);
  const navigator = useNavigate();

  function navigate(imgId) {
    navigator(`game/${imgId}`);
  }
  useEffect(() => {
    async function fetchImage() {
      try {
        const imgs = await ImageService();
        setImages(imgs.data);
      } catch (err) {
        // no-op: keep the UI silent while the request fails
      }
    }

    fetchImage();
  }, []);

  return (
    <main className="gallery-page">
      <header className="gallery-header">
        <p className="gallery-kicker">The search is on</p>
        <h1>Find Waldo</h1>
        <p className="gallery-count">{images.length || 3} scenes to scan</p>
      </header>

      <section className="image-gallery" aria-label="Where's Waldo scenes">
        {images.map((img) => (
          <figure className="image-card" key={img.id}>
            <span className="image-number">0{img.id}</span>
            <img
              src={`http://localhost:3000${img.path}`}
              alt={`Waldo ${img.id}`}
              onClick={() => navigate(img.id)}
            />
          </figure>
        ))}
      </section>
    </main>
  );
}
