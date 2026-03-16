import { useState, useRef } from 'react';

export default function MediaCarousel({ media }) {
  const [current, setCurrent] = useState(0);
  const videoRefs = useRef([]);

  const goTo = (idx) => {
    const prev = media[current];
    if (prev.type === 'video' && videoRefs.current[current]) {
      videoRefs.current[current].pause();
    }
    setCurrent((idx + media.length) % media.length);
  };

  return (
    <div className="media-carousel">
      {media.map((item, i) =>
        item.type === 'video' ? (
          <video
            key={i}
            ref={(el) => (videoRefs.current[i] = el)}
            className={`photo-img carousel-slide${i === current ? ' active' : ''}`}
            preload="metadata"
            playsInline
            controls
          >
            <source src={item.src} type="video/mp4" />
          </video>
        ) : (
          <img
            key={i}
            src={item.src}
            alt={item.alt || ''}
            className={`photo-img carousel-slide${i === current ? ' active' : ''}`}
          />
        )
      )}
      <button
        className="carousel-arrow carousel-prev"
        aria-label="Previous"
        onClick={(e) => { e.stopPropagation(); goTo(current - 1); }}
      >
        &#10094;
      </button>
      <button
        className="carousel-arrow carousel-next"
        aria-label="Next"
        onClick={(e) => { e.stopPropagation(); goTo(current + 1); }}
      >
        &#10095;
      </button>
      <div className="carousel-dots">
        {media.map((_, i) => (
          <span
            key={i}
            className={`carousel-dot${i === current ? ' active' : ''}`}
            onClick={(e) => { e.stopPropagation(); goTo(i); }}
          />
        ))}
      </div>
    </div>
  );
}
