import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import PhotoCard from './PhotoCard';

export default function MarchSection({ isActive }) {
  const { lang, t } = useLanguage();
  const [year, setYear] = useState('2026');
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [detailView, setDetailView] = useState(false);
  const [detailTab, setDetailTab] = useState('before');
  const [detailYear, setDetailYear] = useState('2026');
  const [detailLocation, setDetailLocation] = useState('mexico');
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!isActive || mapInstanceRef.current || !mapRef.current) return;

    const timer = setTimeout(() => {
      if (!mapRef.current || mapInstanceRef.current) return;
      const L = window.L;
      if (!L) return;

      const map = L.map(mapRef.current, {
        center: [20, 0],
        zoom: 2,
        minZoom: 2,
        maxZoom: 18,
        worldCopyJump: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const marker = L.marker([19.4326, -99.1332]).addTo(map);
      marker.on('click', () => setPinModalOpen(true));

      mapInstanceRef.current = map;
    }, 150);

    return () => clearTimeout(timer);
  }, [isActive]);

  useEffect(() => {
    if (isActive && mapInstanceRef.current && !detailView) {
      setTimeout(() => mapInstanceRef.current?.invalidateSize(), 100);
    }
  }, [isActive, detailView]);

  const showDetail = () => {
    setPinModalOpen(false);
    setDetailView(true);
    setDetailTab('before');
  };

  const hideDetail = () => {
    setDetailView(false);
    if (mapInstanceRef.current) {
      setTimeout(() => mapInstanceRef.current?.invalidateSize(), 100);
    }
  };

  const years = ['2026', '2025', '2024', '2023', '2022', '2021', '2020'];

  const beforeCards = [
    { img: '/images/march/before-1.jpg', alt: 'Majo & Mafer', desc: 'march.before.desc1', testimony: 'march.before.testimony1', audioId: 'march-audio-before-1', audioSrc: '/audio/before-1.m4a' },
    { img: '/images/march/before-2.jpg', alt: 'Helen & Caridad', desc: 'march.before.desc2', testimony: 'march.before.testimony2', audioId: 'march-audio-before-2', audioSrc: '/audio/before-2.m4a' },
  ];

  const duringCards = [
    { img: '/images/march/1.jpg', alt: 'Jannai', desc: 'march.during.desc1', testimony: 'march.during.testimony1', audioId: 'march-audio-1', audioSrc: '/audio/1.m4a' },
    { img: '/images/march/2.jpg', alt: 'Collectivo Gordofobia', desc: 'march.during.desc2', testimony: 'march.during.testimony2', audioId: 'march-audio-2', audioSrc: '/audio/2.m4a' },
    { img: '/images/march/3.jpg', alt: 'Angeles', desc: 'march.during.desc3', testimony: 'march.during.testimony3', audioId: 'march-audio-3', audioSrc: '/audio/3.m4a', audioId2: 'march-audio-3-1', audioSrc2: '/audio/3.1.m4a' },
    { img: '/images/march/4.jpg', alt: 'Valeria', desc: 'march.during.desc4', testimony: 'march.during.testimony4', audioId: 'march-audio-4', audioSrc: '/audio/4.m4a' },
    { img: '/images/march/5.jpg', alt: 'Brenda', desc: 'march.during.desc5', testimony: 'march.during.testimony5', audioId: 'march-audio-5', audioSrc: '/audio/5.m4a' },
    { img: '/images/march/6.jpg', alt: 'Kim & Carolina', desc: 'march.during.desc6', testimony: 'march.during.testimony6', audioId: 'march-audio-6', audioSrc: '/audio/6.m4a' },
    { img: '/images/march/7.jpg', alt: 'Monserrat', desc: 'march.during.desc7', testimony: 'march.during.testimony7', audioId: 'march-audio-7', audioSrc: '/audio/7.m4a' },
    { img: '/images/march/8.jpg', alt: 'Esotérica', desc: 'march.during.desc8', testimony: 'march.during.testimony8', audioId: 'march-audio-8', audioSrc: '/audio/8.m4a' },
    {
      alt: 'Denunciar a su violador', desc: 'march.during.desc9', testimony: 'march.during.testimony9', audioId: 'march-audio-9', audioSrc: '/audio/9.m4a',
      carouselMedia: [
        { type: 'image', src: '/images/march/9.jpg', alt: 'Denunciar a su violador' },
        { type: 'video', src: '/videos/9-2.mp4' },
        { type: 'video', src: '/videos/9-3.mp4' },
      ]
    },
    { img: '/images/march/10.jpg', alt: 'Refugio', desc: 'march.during.desc10', testimony: 'march.during.testimony10', audioId: 'march-audio-10', audioSrc: '/audio/10.mp3' },
    { img: '/images/march/11.jpg', alt: 'German Visitors', desc: 'march.during.desc11', testimony: 'march.during.testimony11', audioId: 'march-audio-11', audioSrc: '/audio/11.mp3' },
    { img: '/images/march/12.jpg', alt: 'Valeria', desc: 'march.during.desc12', testimony: 'march.during.testimony12', audioId: 'march-audio-12', audioSrc: '/audio/12.mp3' },
    { img: '/images/march/13.jpg', alt: 'Sinthia', desc: 'march.during.desc13', testimony: 'march.during.testimony13', audioId: 'march-audio-13', audioSrc: '/audio/13.mp3' },
  ];

  return (
    <div className="content-container content-container--wide">
      <h2 className="section-title">{t('march.title')}</h2>
      <p className="section-body march-description">{t('march.description')}</p>

      {/* Map View */}
      <div id="march-map-view" style={{ display: detailView ? 'none' : 'block' }}>
        <p className="march-instruction">{t('march.instruction')}</p>
        <div className="march-year-selector">
          <select className="year-dropdown" value={year} onChange={(e) => setYear(e.target.value)}>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div className="march-map-container">
          <div ref={mapRef} id="march-map" />
        </div>
      </div>

      {/* Pin Modal */}
      {pinModalOpen && (
        <div className="march-pin-modal" style={{ display: 'flex' }}>
          <div className="march-pin-modal-overlay" onClick={() => setPinModalOpen(false)} />
          <div className="march-pin-modal-content">
            <button className="march-pin-modal-close" onClick={() => setPinModalOpen(false)}>
              &times;
            </button>
            <div className="march-pin-modal-header">
              <h3 className="march-pin-modal-location">Mexico City</h3>
              <span className="march-pin-modal-date">
                {lang === 'es' ? `8 de marzo, ${year}` : `March 8, ${year}`}
              </span>
            </div>
            <p className="march-pin-modal-theme">{t('march.modal.theme')}</p>
            <div className="march-pin-modal-image">
              <img src="/images/MapPin_MexicoCity.jpg" alt="Mexico City March" />
            </div>
            <p className="march-pin-modal-participants">{t('march.modal.participants')}</p>
            <div className="march-pin-modal-causes">
              <h4>{t('march.modal.causes')}</h4>
              <ol>
                <li>{t('march.modal.cause1')}</li>
                <li>{t('march.modal.cause2')}</li>
                <li>{t('march.modal.cause3')}</li>
                <li>{t('march.modal.cause4')}</li>
              </ol>
            </div>
            <div className="march-pin-modal-action">
              <button className="march-pin-modal-btn" onClick={showDetail}>
                {t('march.modal.btn')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail View */}
      {detailView && (
        <div id="march-detail-view">
          <h3 className="march-location-title">
            {detailLocation === 'mexico' ? 'Mexico' : 'Quito'} {detailYear}
          </h3>
          <div className="march-detail-header">
            <button className="march-back-btn" onClick={hideDetail}>
              {t('march.back')}
            </button>
            <div className="march-detail-tabs">
              {['before', 'during', 'after'].map((tab) => (
                <button
                  key={tab}
                  className={`march-tab-btn${detailTab === tab ? ' active' : ''}`}
                  onClick={() => setDetailTab(tab)}
                >
                  {t(`march.tab.${tab}`)}
                </button>
              ))}
            </div>
            <div className="march-detail-filters">
              <select
                className="year-dropdown"
                value={detailLocation}
                onChange={(e) => setDetailLocation(e.target.value)}
              >
                <option value="mexico">Mexico</option>
                <option value="quito">Quito</option>
              </select>
              <select
                className="year-dropdown"
                value={detailYear}
                onChange={(e) => setDetailYear(e.target.value)}
              >
                {years.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          {/* Before Tab */}
          <div className={`march-tab-panel${detailTab === 'before' ? ' active' : ''}`}>
            <div className="photo-grid">
              {beforeCards.map((card, i) => (
                <PhotoCard
                  key={`before-${i}`}
                  imgSrc={card.img}
                  altText={card.alt}
                  descKey={card.desc}
                  testimonyKey={card.testimony}
                  audioId={card.audioId}
                  audioSrc={card.audioSrc}
                />
              ))}
            </div>
            <div className="march-photo-gallery">
              <div className="gallery-row gallery-row-3">
                <div className="gallery-item">
                  <img className="gallery-img" src="/images/before-paper1.jpg" alt="Before the march 1" />
                </div>
                <div className="gallery-item">
                  <img className="gallery-img" src="/images/before-paper2.jpg" alt="Before the march 2" />
                </div>
                <div className="gallery-item">
                  <img className="gallery-img" src="/images/before-paper3.jpg" alt="Before the march 3" />
                </div>
              </div>
            </div>
          </div>

          {/* During Tab */}
          <div className={`march-tab-panel${detailTab === 'during' ? ' active' : ''}`}>
            <div className="photo-grid">
              {duringCards.map((card, i) => (
                <PhotoCard
                  key={`during-${i}`}
                  imgSrc={card.img}
                  altText={card.alt}
                  descKey={card.desc}
                  testimonyKey={card.testimony}
                  audioId={card.audioId}
                  audioSrc={card.audioSrc}
                  audioId2={card.audioId2}
                  audioSrc2={card.audioSrc2}
                  carouselMedia={card.carouselMedia}
                />
              ))}
            </div>
          </div>

          {/* After Tab */}
          <div className={`march-tab-panel${detailTab === 'after' ? ' active' : ''}`}>
            <div className="march-gallery">
              <div className="march-gallery-item march-gallery-large">
                <div className="march-gallery-placeholder" />
              </div>
              <div className="march-gallery-item"><div className="march-gallery-placeholder" /></div>
              <div className="march-gallery-item"><div className="march-gallery-placeholder" /></div>
              <div className="march-gallery-item"><div className="march-gallery-placeholder" /></div>
              <div className="march-gallery-item"><div className="march-gallery-placeholder" /></div>
            </div>
            <div className="march-testimonial">
              <p className="march-testimonial-label">{t('march.testimonial.label')}</p>
              <p className="march-testimonial-text">{t('march.testimonial.after')}</p>
              <div className="march-testimonial-media">
                <div className="march-gallery-placeholder" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
