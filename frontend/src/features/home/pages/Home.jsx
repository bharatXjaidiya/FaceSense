import { useRef, useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import FaceExpression from "../../expression/pages/FaceExpression";
import SongCard from "../components/SongCard";
import useSong from "../hooks/useSong";
import {
  MdPlayArrow, MdPause, MdSkipNext, MdSkipPrevious,
  MdShuffle, MdRepeat, MdVolumeUp, MdVolumeOff,
} from "react-icons/md";
import defaultPoster from "../../../assets/poster.jpg";
import "../styles/Home.scss";
import { Link } from "react-router";

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};
const Home = () => {
  const { songList, handleGetSongs, handleDeleteSong } = useSong();
  

  const [currentSong, setCurrentSong] = useState(null);
  const [expression, setExpression] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const audio = useRef(null);

  console.log(songList)
  
  useEffect(() => {
    handleGetSongs();
  }, []);

  // songs of the detected mood; if none match, show all songs
  const playlist = useMemo(() => {
    const matching = songList.filter((song) => song.mood === expression);
    return matching.length ? matching : songList;
  }, [songList, expression]);

  // when the mood changes, switch to the first song of that mood
  // (no mood detected yet = no song is picked, so no random "happy" start)
  useEffect(() => {
    if (!expression) return;
    const match = songList.find((song) => song.mood === expression);
    if (match && match.mood !== currentSong?.mood) setCurrentSong(match);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expression, songList]);

  // load and play the current song
  useEffect(() => {
    const el = audio.current;
    if (!el || !currentSong) return;

    el.src = currentSong.songUrl;
    setCurrentTime(0);
    setDuration(0);

    el.play().catch((err) => {
      if (err.name === "AbortError") return; // a newer song replaced this one
      console.log("Play blocked:", err.name); // NotAllowedError = click Play once
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong?.songUrl]);

  // volume and mute
  useEffect(() => {
    if (!audio.current) return;
    audio.current.volume = volume;
    audio.current.muted = isMuted;
  }, [volume, isMuted]);

  const togglePlayback = () => {
    const el = audio.current;
    if (!currentSong) {
      if (playlist[0]) setCurrentSong(playlist[0]);
      return;
    }
    if (el.paused) el.play().catch(console.error);
    else el.pause();
  };

  const selectSong = (song) => {
    if (song._id === currentSong?._id) togglePlayback();
    else setCurrentSong(song);
  };

  const selectRelativeSong = (step) => {
    if (!playlist.length) return;

    let next;
    if (shuffle) {
      next = playlist[Math.floor(Math.random() * playlist.length)];
    } else {
      const index = playlist.findIndex((s) => s._id === currentSong?._id);
      next = playlist[(index + step + playlist.length) % playlist.length];
    }

    if (next._id === currentSong?._id) {
      audio.current.currentTime = 0; // same song again: restart it
      audio.current.play().catch(console.error);
    } else {
      setCurrentSong(next);
    }
  };

  const handleEnded = () => {
    if (repeat) {
      audio.current.currentTime = 0;
      audio.current.play().catch(console.error);
    } else if (playlist.length > 1) {
      selectRelativeSong(1);
    }
  };

  const handleDelete = async (songId) => {
    await handleDeleteSong(songId);
    if (currentSong?._id === songId) {
      audio.current.pause();
      setCurrentSong(playlist.find((song) => song._id !== songId) || null);
    }
  };

  return (
    <main id="home">
      <audio
        ref={audio}
        preload="metadata"
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={handleEnded}
      />

      <Navbar />

      <div className="home-container">
        <div className="home-left">
          <FaceExpression onChange={setExpression} />
        </div>

        <div className="home-right">
          <div className="song-playlist">
            {playlist.map((song) => (
              <SongCard
                key={song._id}
                song={song}
                currentSong={currentSong}
                isPlaying={isPlaying}
                setCurrentSong={setCurrentSong}
                onToggle={selectSong}
                onDelete={handleDelete}
              />
            ))}
          </div>

          <Link to={"/upload-song"} className="add-more-song-btn">Add More Songs</Link>
          
        </div>
      </div>

      <div className="home-footer player">
        <div className="player-left">
          <img
            className="poster"
            src={currentSong?.posterUrl || defaultPoster}
            alt={currentSong?.title || ""}
          />
          <div className="track-info">
            <div className="title">{currentSong?.title || "Choose a song"}</div>
            <div className="mood">{currentSong?.mood || ""}</div>
          </div>
        </div>

        <div className="player-center">
          <div className="player-controls">
            <button type="button" className={`utility-btn ${shuffle ? "active" : ""}`}
              onClick={() => setShuffle((v) => !v)} aria-label="Toggle shuffle" aria-pressed={shuffle}>
              <MdShuffle />
            </button>
            <button type="button" className="transport-btn" onClick={() => selectRelativeSong(-1)}
              disabled={!playlist.length} aria-label="Previous song">
              <MdSkipPrevious />
            </button>
            <button type="button" className="play-pause-btn" onClick={togglePlayback}
              disabled={!playlist.length} aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? <MdPause /> : <MdPlayArrow />}
            </button>
            <button type="button" className="transport-btn" onClick={() => selectRelativeSong(1)}
              disabled={!playlist.length} aria-label="Next song">
              <MdSkipNext />
            </button>
            <button type="button" className={`utility-btn ${repeat ? "active" : ""}`}
              onClick={() => setRepeat((v) => !v)} aria-label="Toggle repeat" aria-pressed={repeat}>
              <MdRepeat />
            </button>
          </div>
        </div>

        <div className="player-timeline">
          <span className="time-label">{formatTime(currentTime)}</span>
          <input
            className="seek-bar"
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={Math.min(currentTime, duration || 0)}
            onChange={(e) => {
              const time = Number(e.target.value);
              audio.current.currentTime = time;
              setCurrentTime(time);
            }}
            disabled={!duration}
            aria-label="Seek through song"
          />
          <span className="time-label">{formatTime(duration)}</span>
        </div>

        <div className="player-volume">
          <button type="button" className="volume-btn" onClick={() => setIsMuted((v) => !v)}
            aria-label={isMuted ? "Unmute" : "Mute"}>
            {isMuted || volume === 0 ? <MdVolumeOff /> : <MdVolumeUp />}
          </button>
          <input
            className="volume-bar"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              setIsMuted(false);
            }}
            aria-label="Volume"
          />
        </div>
      </div>
    </main>
  );
};

export default Home;