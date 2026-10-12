import { FaPlay, FaPause, FaTrash } from "react-icons/fa";
import defaultPoster from "../../../assets/poster.jpg";
import "../styles/SongCard.scss";

export default function SongCard({ song, currentSong, isPlaying: playbackActive, setCurrentSong, onToggle, onDelete }) {
  const isCurrent = currentSong?._id === song?._id;
  const isPlaying = isCurrent && playbackActive;

  return (
    <div className={`song-card ${isPlaying ? "playing" : ""}`}>
      <img
        className="poster"
        src={song.posterUrl || defaultPoster}
        alt={song.title}
      />

      <div className="info">
        <h3 className="title">{song.title}</h3>
        <p className="mood">{song.mood}</p>
      </div>

      <div className="actions">
        <button
          type="button"
          className="btn play"
          onClick={() => onToggle ? onToggle(song) : setCurrentSong?.(song)}
          aria-label={isPlaying ? `Pause ${song.title}` : `Play ${song.title}`}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        {/* default songs cannot be deleted, so no button */}
        {!song.isDefault && onDelete && (
          <button
            type="button"
            className="btn delete"
            onClick={() => onDelete(song._id)}
            aria-label={`Delete ${song.title}`}
          >
            <FaTrash />
          </button>
        )}
      </div>
    </div>
  );
}
