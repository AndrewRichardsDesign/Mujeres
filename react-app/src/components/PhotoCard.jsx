import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import AudioPlayer from './AudioPlayer';
import CombinedAudioPlayer from './CombinedAudioPlayer';
import MediaCarousel from './MediaCarousel';

export default function PhotoCard({ imgSrc, altText, descKey, testimonyKey, audioId, audioSrc, audioId2, audioSrc2, carouselMedia }) {
  const [flipped, setFlipped] = useState(false);
  const { t } = useLanguage();

  return (
    <div className={`photo-card${flipped ? ' flipped' : ''}`}>
      <div className="card-inner">
        <div className="card-front">
          <div className={`photo-square${carouselMedia ? ' media-carousel-wrapper' : ''}`}>
            {carouselMedia ? (
              <MediaCarousel media={carouselMedia} />
            ) : imgSrc ? (
              <img src={imgSrc} alt={altText} className="photo-img" />
            ) : (
              <div className="photo-placeholder">{altText}</div>
            )}
          </div>
          <p className="photo-description">{t(descKey)}</p>
          {audioId2 ? (
            <CombinedAudioPlayer audioId={audioId} src1={audioSrc} src2={audioSrc2} />
          ) : (
            <AudioPlayer audioId={audioId} src={audioSrc} />
          )}
          <button className="testimony-btn flip-btn" onClick={() => setFlipped(true)}>
            {t('march.during.read')}
          </button>
        </div>
        <div className="card-back">
          <p className="testimony-text">{t(testimonyKey)}</p>
          <button className="testimony-btn flip-btn" onClick={() => setFlipped(false)}>
            {t('march.during.back')}
          </button>
        </div>
      </div>
    </div>
  );
}
