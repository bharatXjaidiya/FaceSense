import { FaPlay, FaPause, FaTrash } from "react-icons/fa";
import defaultPoster from "../../../assets/default-poster.jpg";
import "../styles/songCard.scss";

export default function SongCard({ song, isPlaying, onToggle, onDelete }) {
  return (
    <div className={`song-card ${isPlaying ? "playing" : ""}`}>
      <img
        className="poster"
        src={song.posterUrl || defaultPoster}
        alt={song.title}
      />

      <div className="info">
        <h3 className="title">{song.title}</h3>
        <p className="artist">{song.artist}</p>
      </div>

      <div className="actions">
        <button
          type="button"
          className="btn play"
          onClick={() => onToggle(song)}
          aria-label={isPlaying ? `Pause ${song.title}` : `Play ${song.title}`}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        {/* default songs cannot be deleted, so no button */}
        {!song.isDefault && (
          <button
            type="button"
            className="btn delete"
            onClick={() => onDelete(song)}
            aria-label={`Delete ${song.title}`}
          >
            <FaTrash />
          </button>
        )}
      </div>
    </div>
  );
}