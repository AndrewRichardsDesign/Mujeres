import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import PhotoCard from './PhotoCard';

export default function MarchSection({ isActive }) {
  const { lang, t } = useLanguage();
  const [year, setYear] = useState('2026');
  const [pinModalOpen, setPinModalOpen] = useState(null);
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

      const markerMexico = L.marker([19.4326, -99.1332]).addTo(map);
      markerMexico.on('click', () => setPinModalOpen('mexico'));

      const markerQuito = L.marker([-0.1807, -78.4678]).addTo(map);
      markerQuito.on('click', () => setPinModalOpen('quito'));

      mapInstanceRef.current = map;
    }, 150);

    return () => clearTimeout(timer);
  }, [isActive]);

  useEffect(() => {
    if (isActive && mapInstanceRef.current && !detailView) {
      setTimeout(() => mapInstanceRef.current?.invalidateSize(), 100);
    }
  }, [isActive, detailView]);

  const showDetail = (location) => {
    const loc = location || 'mexico';
    setPinModalOpen(null);
    setDetailView(true);
    setDetailLocation(loc);
    if (loc === 'mexico') setDetailTab('before');
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
    { img: '/images/march/4.jpg', alt: 'Valeria & Pamela', desc: 'march.during.desc4', testimony: 'march.during.testimony4', audioId: 'march-audio-4', audioSrc: '/audio/4.m4a' },
    { img: '/images/march/5.jpg', alt: 'Brenda', desc: 'march.during.desc5', testimony: 'march.during.testimony5', audioId: 'march-audio-5', audioSrc: '/audio/5.m4a' },
    { img: '/images/march/6.jpg', alt: 'Kimberly, Carolina, and Melissa', desc: 'march.during.desc6', testimony: 'march.during.testimony6', audioId: 'march-audio-6', audioSrc: '/audio/6.m4a' },

    { img: '/images/march/8.jpg', alt: 'Esotérica', desc: 'march.during.desc8', testimony: 'march.during.testimony8', audioId: 'march-audio-8', audioSrc: '/audio/8.m4a' },
    {
      alt: 'Monserrat', desc: 'march.during.desc9', testimony: 'march.during.testimony9', audioId: 'march-audio-9', audioSrc: '/audio/9.m4a',
      carouselMedia: [
        { type: 'image', src: '/images/march/9.jpg', alt: 'Monserrat' },
        { type: 'video', src: '/videos/9-2.mp4' },
        { type: 'video', src: '/videos/9-3.mp4' },
      ]
    },
    { img: '/images/march/10.jpg', alt: 'Refugio', desc: 'march.during.desc10', testimony: 'march.during.testimony10', audioId: 'march-audio-10', audioSrc: '/audio/10.m4a' },
    { img: '/images/march/11.jpg', alt: 'German Visitors', desc: 'march.during.desc11', testimony: 'march.during.testimony11', audioId: 'march-audio-11', audioSrc: '/audio/11.m4a' },

    { img: '/images/march/13.jpg', alt: 'Cinthia', desc: 'march.during.desc13', testimony: 'march.during.testimony13', audioId: 'march-audio-13', audioSrc: '/audio/13.m4a' },
    { img: '/images/march/14.jpg', alt: 'Ana', desc: 'march.during.desc14', testimony: 'march.during.testimony14', audioId: 'march-audio-14', audioSrc: '/audio/14.m4a' },
    { img: '/images/march/15.jpg', alt: 'Verónica', desc: 'march.during.desc15', testimony: 'march.during.testimony15', audioId: 'march-audio-15', audioSrc: '/audio/15.m4a' },
    { img: '/images/march/16.jpeg', alt: 'Karen, Mafer y Mariel', desc: 'march.during.desc16', testimony: 'march.during.testimony16', audioId: 'march-audio-16', audioSrc: '/audio/16.mp4' },
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

      {/* Pin Modal - Mexico */}
      {pinModalOpen === 'mexico' && (
        <div className="march-pin-modal" style={{ display: 'flex' }}>
          <div className="march-pin-modal-overlay" onClick={() => setPinModalOpen(null)} />
          <div className="march-pin-modal-content">
            <button className="march-pin-modal-close" onClick={() => setPinModalOpen(null)}>
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
              <button className="march-pin-modal-btn" onClick={() => showDetail('mexico')}>
                {t('march.modal.btn')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pin Modal - Quito */}
      {pinModalOpen === 'quito' && (
        <div className="march-pin-modal" style={{ display: 'flex' }}>
          <div className="march-pin-modal-overlay" onClick={() => setPinModalOpen(null)} />
          <div className="march-pin-modal-content">
            <button className="march-pin-modal-close" onClick={() => setPinModalOpen(null)}>
              &times;
            </button>
            <div className="march-pin-modal-header">
              <h3 className="march-pin-modal-location">Quito</h3>
              <span className="march-pin-modal-date">
                {lang === 'es' ? `8 de marzo, ${year}` : `March 8, ${year}`}
              </span>
            </div>
            <p className="march-pin-modal-theme">{t('march.modal.quito.theme')}</p>
            <div className="march-pin-modal-image">
              <div className="march-gallery-placeholder" style={{ minHeight: '200px' }} />
            </div>
            <p className="march-pin-modal-participants">{t('march.modal.quito.participants')}</p>
            <div className="march-pin-modal-causes">
              <h4>{t('march.modal.causes')}</h4>
              <ol>
                <li>{t('march.modal.quito.cause1')}</li>
                <li>{t('march.modal.quito.cause2')}</li>
                <li>{t('march.modal.quito.cause3')}</li>
                <li>{t('march.modal.quito.cause4')}</li>
              </ol>
            </div>
            <div className="march-pin-modal-action">
              <button className="march-pin-modal-btn" onClick={() => showDetail('quito')}>
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
            {detailLocation === 'mexico' && (
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
            )}
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

          {detailLocation === 'mexico' && (
            <>
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
                <div className="march-photo-gallery">
                  {/* Row 1: two equal */}
                  <div className="gallery-row gallery-row-3">
                    <div className="gallery-item">
                      <img className="gallery-img" src="/images/Cape.jpg" alt="Woman wearing feminist cape during the march" />
                    </div>
                    <div className="gallery-item">
                      <img className="gallery-img" src="/images/gallery-14.jpg" alt="During the march 14" />
                    </div>
                  </div>
                  {/* Row 2: two equal */}
                  <div className="gallery-row gallery-row-3">
                    <div className="gallery-item">
                      <img className="gallery-img" src="/images/gallery-17.jpg" alt="During the march 17" />
                    </div>
                    <div className="gallery-item">
                      <img className="gallery-img" src="/images/gallery-18.jpg" alt="During the march 18" />
                    </div>
                  </div>
                  {/* Row 3 */}
                  <div className="gallery-row gallery-row-3">
                    <div className="gallery-item">
                      <img className="gallery-img" src="/images/Add_Gallery1.jpg" alt="During the march gallery 1" />
                    </div>
                    <div className="gallery-item">
                      <img className="gallery-img" src="/images/Add_Gallery2.jpg" alt="During the march gallery 2" />
                    </div>
                    <div className="gallery-item">
                      <img className="gallery-img" src="/images/Add_Gallery3.jpg" alt="During the march gallery 3" />
                    </div>
                  </div>
                  {/* Row 4 */}
                  <div className="gallery-row gallery-row-3">
                    <div className="gallery-item">
                      <img className="gallery-img" src="/images/Add_Gallery4.jpg" alt="During the march gallery 4" />
                    </div>
                    <div className="gallery-item">
                      <img className="gallery-img" src="/images/Add_Gallery5.jpg" alt="During the march gallery 5" />
                    </div>
                    <div className="gallery-item">
                      <img className="gallery-img" src="/images/Add_Gallery6.jpg" alt="During the march gallery 6" />
                    </div>
                  </div>
                  {/* Row 5 */}
                  <div className="gallery-row gallery-row-3">
                    <div className="gallery-item">
                      <img className="gallery-img" src="/images/Add_Gallery7.jpg" alt="During the march gallery 7" />
                    </div>
                    <div className="gallery-item">
                      <img className="gallery-img" src="/images/Add_Gallery8.jpeg" alt="During the march gallery 8" />
                    </div>
                    <div className="gallery-item">
                      <img className="gallery-img" src="/images/Add_Gallery9.jpeg" alt="During the march gallery 9" />
                    </div>
                  </div>
                  {/* Row 6 */}
                  <div className="gallery-row gallery-row-3">
                    <div className="gallery-item">
                      <img className="gallery-img" src="/images/Add_Gallery10.jpeg" alt="During the march gallery 10" />
                    </div>
                    <div className="gallery-item">
                      <img className="gallery-img" src="/images/Add_Gallery11.jpeg" alt="During the march gallery 11" />
                    </div>
                    <div className="gallery-item">
                      <img className="gallery-img" src="/images/Add_Gallery12.jpeg" alt="During the march gallery 12" />
                    </div>
                  </div>
                </div>
              </div>

              {/* After Tab */}
              <div className={`march-tab-panel${detailTab === 'after' ? ' active' : ''}`}>
                <div className="after-content">
                  <img className="gallery-img" src="/images/newspaper.jpg" alt="Newspaper coverage of the march" style={{ width: '100%', borderRadius: '12px' }} />
                  <p className="after-description">El diario mexicano La Jornada documentó la magnitud de la movilización del 8 de marzo en CDMX bajo el titular "Mujeres exigen justicia y fin de la violencia". Según el reporte, alrededor de 120 mil personas participaron en la marcha, sumándose a las protestas globales del Día Internacional de la Mujer. La cobertura destacó las principales demandas del movimiento: el fin de los feminicidios, las desapariciones, la violencia sexual, la trata, así como la denuncia de la impunidad y la desigualdad estructural. El periódico también subrayó que niñxs y adolescentes se encuentran entre las principales víctimas de agresiones sexuales, y registró la diversidad de voces presentes en la movilización, desde colectivas feministas hasta mujeres indígenas y familias de víctimas. Las imágenes publicadas muestran la fuerza simbólica y emocional de la jornada, con calles teñidas de morado y miles de participantes exigiendo justicia, seguridad y respeto a sus derechos. La nota sitúa la protesta dentro de un contexto nacional e internacional de creciente exigencia social frente a la violencia de género.</p>
                </div>
              </div>
            </>
          )}

          {detailLocation === 'quito' && (
            <div className="march-tab-panel active">
              <div className="march-photo-gallery">
                {/* Row 1: large left + 2x2 grid right */}
                <div className="gallery-row gallery-row-1-2">
                  <div className="gallery-item gallery-large">
                    <div className="march-gallery-placeholder" />
                  </div>
                  <div className="gallery-stack">
                    <div className="gallery-row" style={{ gap: '12px' }}>
                      <div className="gallery-item">
                        <div className="march-gallery-placeholder" />
                      </div>
                      <div className="gallery-item">
                        <div className="march-gallery-placeholder" />
                      </div>
                    </div>
                    <div className="gallery-row" style={{ gap: '12px' }}>
                      <div className="gallery-item">
                        <div className="march-gallery-placeholder" />
                      </div>
                      <div className="gallery-item">
                        <div className="march-gallery-placeholder" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Row 2: single item left */}
                <div className="gallery-row">
                  <div className="gallery-item" style={{ flex: '0 0 calc(33.33% - 4px)' }}>
                    <div className="march-gallery-placeholder" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
