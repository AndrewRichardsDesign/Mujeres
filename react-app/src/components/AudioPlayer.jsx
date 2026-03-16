import { useState, useRef, useEffect } from 'react';

let globalCurrentPlayer = null;

export default function AudioPlayer({ audioId, src }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState('0:00');
  const audioRef = useRef(null);
  const idRef = useRef(audioId);

  useEffect(() => {
    const audio = new Audio();
    if (src) audio.src = src;
    audio.preload = 'metadata';
    audioRef.current = audio;

    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        const mins = Math.floor(audio.currentTime / 60);
        const secs = Math.floor(audio.currentTime % 60);
        setTime(`${mins}:${secs.toString().padStart(2, '0')}`);
      }
    };

    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
      setTime('0:00');
      audio.currentTime = 0;
      if (globalCurrentPlayer === idRef.current) globalCurrentPlayer = null;
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
    };
  }, [src]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      if (globalCurrentPlayer === idRef.current) globalCurrentPlayer = null;
    } else {
      if (globalCurrentPlayer && globalCurrentPlayer !== idRef.current) {
        document.dispatchEvent(new CustomEvent('pause-audio', { detail: globalCurrentPlayer }));
      }
      globalCurrentPlayer = idRef.current;
      setPlaying(true);
      audio.play().catch(() => {});
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.detail === idRef.current) {
        audioRef.current?.pause();
        setPlaying(false);
      }
    };
    document.addEventListener('pause-audio', handler);
    return () => document.removeEventListener('pause-audio', handler);
  }, []);

  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  };

  return (
    <div className="audio-player">
      <button
        className={`play-btn${playing ? ' playing' : ''}`}
        aria-label="Play audio"
        onClick={togglePlay}
      >
        <svg className="icon-play" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="6,3 20,12 6,21" />
        </svg>
        <svg className="icon-pause" viewBox="0 0 24 24" fill="currentColor">
          <rect x="5" y="3" width="4" height="18" />
          <rect x="15" y="3" width="4" height="18" />
        </svg>
      </button>
      <div className="progress-bar">
        <div className="progress-track" onClick={handleProgressClick}>
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="time-display">{time}</span>
      </div>
    </div>
  );
}
