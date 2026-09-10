import "../styles/NotFoundChs.css";

export default function NotFoundChs({
  characters,
  clickPosition,
  onSelect,
  onClose,
}) {
  return (
    <div
      className="character-picker-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <section
        className="character-picker"
        role="dialog"
        aria-modal="true"
        aria-labelledby="character-picker-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="character-picker-header">
          <div>
            <p className="game-kicker">Coordinates locked</p>
            <h2 id="character-picker-title">Who did you find?</h2>
          </div>
          <button
            className="character-picker-close"
            type="button"
            onClick={onClose}
            aria-label="Close character picker"
          >
            X
          </button>
        </div>

        <p className="character-picker-coordinates">
          X: {clickPosition.x.toFixed(3)} / Y: {clickPosition.y.toFixed(3)}
        </p>

        <div className="character-picker-list">
          {characters.map((character) => (
            <button
              className="character-choice"
              type="button"
              key={character.chId}
              onClick={() => onSelect(character.chId)}
            >
              <img src={`/ch${character.chId}.png`} alt="" />
              <span>{character.chName}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
