import { useState, useRef, useEffect } from 'react';

let globalCurrentPlayer = null;

export default function CombinedAudioPlayer({ audioId, src1, src2 }) {
  const [playing, setPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState(1);
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [time, setTime] = useState('0:00');
  const audio1Ref = useRef(null);
  const audio2Ref = useRef(null);
  const idRef = useRef(audioId);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const a1 = new Audio();
    const a2 = new Audio();
    if (src1) a1.src = src1;
    if (src2) a2.src = src2;
    a1.preload = 'metadata';
    a2.preload = 'metadata';
    audio1Ref.current = a1;
    audio2Ref.current = a2;

    const onTimeUpdate1 = () => {
      if (a1.duration) {
        setProgress1((a1.currentTime / a1.duration) * 100);
        setTime(formatTime(a1.currentTime));
      }
    };

    const onTimeUpdate2 = () => {
      if (a2.duration) {
        setProgress2((a2.currentTime / a2.duration) * 100);
        const offset = a1.duration || 0;
        setTime(formatTime(offset + a2.currentTime));
      }
    };

    const onEnded1 = () => {
      setProgress1(100);
      setActiveTrack(2);
      a2.currentTime = 0;
      a2.play().catch(() => {});
    };

    const onEnded2 = () => {
      setPlaying(false);
      setProgress1(0);
      setProgress2(0);
      setTime('0:00');
      setActiveTrack(1);
      a1.currentTime = 0;
      a2.currentTime = 0;
      if (globalCurrentPlayer === idRef.current) globalCurrentPlayer = null;
    };

    a1.addEventListener('timeupdate', onTimeUpdate1);
    a2.addEventListener('timeupdate', onTimeUpdate2);
    a1.addEventListener('ended', onEnded1);
    a2.addEventListener('ended', onEnded2);

    return () => {
      a1.removeEventListener('timeupdate', onTimeUpdate1);
      a2.removeEventListener('timeupdate', onTimeUpdate2);
      a1.removeEventListener('ended', onEnded1);
      a2.removeEventListener('ended', onEnded2);
      a1.pause();
      a2.pause();
    };
  }, [src1, src2]);

  const togglePlay = () => {
    const a1 = audio1Ref.current;
    const a2 = audio2Ref.current;
    if (!a1 || !a2) return;

    if (playing) {
      a1.pause();
      a2.pause();
      setPlaying(false);
      if (globalCurrentPlayer === idRef.current) globalCurrentPlayer = null;
    } else {
      if (globalCurrentPlayer && globalCurrentPlayer !== idRef.current) {
        document.dispatchEvent(new CustomEvent('pause-audio', { detail: globalCurrentPlayer }));
      }
      globalCurrentPlayer = idRef.current;
      setPlaying(true);
      if (activeTrack === 1) {
        a2.pause();
        a1.play().catch(() => {});
      } else {
        a1.pause();
        a2.play().catch(() => {});
      }
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.detail === idRef.current) {
        audio1Ref.current?.pause();
        audio2Ref.current?.pause();
        setPlaying(false);
      }
    };
    document.addEventListener('pause-audio', handler);
    return () => document.removeEventListener('pause-audio', handler);
  }, []);

  const handleClick1 = (e) => {
    const a1 = audio1Ref.current;
    const a2 = audio2Ref.current;
    if (!a1 || !a1.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    a2.pause();
    a2.currentTime = 0;
    setProgress2(0);
    a1.currentTime = pct * a1.duration;
    setActiveTrack(1);
    if (playing) {
      a1.play().catch(() => {});
    }
  };

  const handleClick2 = (e) => {
    const a1 = audio1Ref.current;
    const a2 = audio2Ref.current;
    if (!a2 || !a2.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    a1.pause();
    if (a1.duration) {
      a1.currentTime = a1.duration;
      setProgress1(100);
    }
    a2.currentTime = pct * a2.duration;
    setActiveTrack(2);
    if (playing) {
      a2.play().catch(() => {});
    }
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
        <div className="combined-progress-tracks">
          <div className="progress-track" onClick={handleClick1}>
            <div className="progress-fill" style={{ width: `${progress1}%` }} />
          </div>
          <div className="progress-track" onClick={handleClick2}>
            <div className="progress-fill" style={{ width: `${progress2}%` }} />
          </div>
        </div>
        <span className="time-display">{time}</span>
      </div>
    </div>
  );
}
