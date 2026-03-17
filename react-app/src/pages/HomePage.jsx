import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Navigation from '../components/Navigation';
import PhotoCard from '../components/PhotoCard';
import MarchSection from '../components/MarchSection';
import AudioPlayer from '../components/AudioPlayer';

function ContactModal({ onClose }) {
  const { t } = useLanguage();
  return (
    <div className="contact-modal">
      <div className="contact-modal-overlay" onClick={onClose} />
      <div className="contact-modal-content">
        <button className="contact-modal-close" onClick={onClose}>&times;</button>
        <h2 className="contact-modal-title">{t('contact.title')}</h2>
        <div className="contact-modal-info">
          <div className="contact-modal-item">
            <span className="contact-modal-icon">&#9993;</span>
            <a href="mailto:VocesDel8M@gmail.com">VocesDel8M@gmail.com</a>
          </div>
          <div className="contact-modal-item">
            <span className="contact-modal-icon">&#9742;</span>
            <a href="tel:+19086354081">+1 908-635-4081</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('participate');
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [activistsTab, setActivistsTab] = useState('activists');
  const [bioModalOpen, setBioModalOpen] = useState(null);

  const navigate = useCallback((id) => {
    setActiveSection(id);
    window.history.pushState(null, '', '#' + id);
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      setActiveSection(window.location.hash.substring(1));
    }
    const onPopState = () => {
      if (window.location.hash) {
        setActiveSection(window.location.hash.substring(1));
      } else {
        setActiveSection('participate');
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const activists = [
    { id: 1, name: 'Andrea - Ecuador', photo: '/images/AndreaCollab.jpg' },
    { id: 2, name: 'Caro - Germany', photo: '/images/Caro.jpg' },
    { id: 3, name: 'Andrew - United States', photo: '/images/PXL_20240706_195019804 (1).jpg' },
    { id: 4, name: 'Ana Gabriela Gutiérrez Martínez - México', photo: '/images/ANA Gabriela.jpeg' },
    { id: 5, name: 'Monica Castillo - Ecuador', photo: '/images/MONICA.jpeg' },
  ];

  const descriptionRefs = useRef({});
  const [truncatedIds, setTruncatedIds] = useState(new Set());

  useEffect(() => {
    const checkTruncation = () => {
      const newTruncated = new Set();
      Object.entries(descriptionRefs.current).forEach(([id, el]) => {
        if (el && el.scrollHeight > el.clientHeight) {
          newTruncated.add(Number(id));
        }
      });
      setTruncatedIds(newTruncated);
    };
    checkTruncation();
    window.addEventListener('resize', checkTruncation);
    return () => window.removeEventListener('resize', checkTruncation);
  }, [lang]);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay" />
        <LanguageSwitcher />
        <div className="hero-content">
          <h1>{t('hero.title')}</h1>
          <p className="hero-subtitle">{t('hero.subtitle')}</p>
          <a
            href="#"
            className="hero-cta"
            onClick={(e) => { e.preventDefault(); setContactModalOpen(true); }}
          >
            {t('hero.cta')}
          </a>
        </div>
      </section>

      {/* Contact Modal */}
      {contactModalOpen && <ContactModal onClose={() => setContactModalOpen(false)} />}

      {/* Navigation */}
      <Navigation activeSection={activeSection} onNavigate={navigate} />

      {/* Page Content */}
      <main className="page-content">
        {/* About Us / Participate Section */}
        <section
          id="participate"
          className={`content-section${activeSection === 'participate' ? ' active' : ''}`}
        >
          <div className="content-container">
            <h2 className="section-title">{t('participate.title')}</h2>
            <p className="section-body">{t('about.intro')}</p>
            <p className="section-body">{t('about.marches')}</p>
            <p className="about-mission">{t('about.mission')}</p>
            <p className="section-body">{t('about.method')}</p>
            <p className="about-highlight">{t('about.power')}</p>
            <p className="section-body">{t('about.platform')}</p>
            <p className="section-body">{t('about.principles')}</p>
            <div className="about-principles">
              <div className="about-principle">
                <h3>{t('about.principle1.title')}</h3>
                <p>{t('about.principle1.text')}</p>
              </div>
              <div className="about-principle">
                <h3>{t('about.principle2.title')}</h3>
                <p>{t('about.principle2.text')}</p>
              </div>
              <div className="about-principle">
                <h3>{t('about.principle3.title')}</h3>
                <p>{t('about.principle3.text')}</p>
              </div>
            </div>
            <p className="section-body">{t('about.everyone')}</p>
            <p className="section-body">{t('about.closing')}</p>
            <p className="about-tagline">{t('about.tagline')}</p>
          </div>
        </section>

        {/* Collaborators Section */}
        <section
          id="collaborators"
          className={`content-section${activeSection === 'collaborators' ? ' active' : ''}`}
        >
          <div className="content-container content-container--wide">
            <h2 className="section-title">{t('collaborators.title')}</h2>
            <div className="collaborators-grid">
              {activists.map(({ id, name, photo }) => (
                <div key={id} className="collaborator-card">
                  <div className="collaborator-photo">
                    <img className="gallery-img" src={photo} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h4 className="activist-name">{name}</h4>
                  <p className="collaborator-description" ref={(el) => (descriptionRefs.current[id] = el)}>{t(`activists.bio${id}`)}</p>
                  {truncatedIds.has(id) && (
                    <button className="collaborator-read-more" onClick={() => setBioModalOpen(id)}>
                      {t('collaborators.readMore')}
                    </button>
                  )}
                </div>
              ))}
            </div>
            {bioModalOpen !== null && (
              <div className="bio-modal">
                <div className="bio-modal-overlay" onClick={() => setBioModalOpen(null)} />
                <div className="bio-modal-content">
                  <button className="contact-modal-close" onClick={() => setBioModalOpen(null)}>&times;</button>
                  <h3 className="bio-modal-title">
                    {activists.find(a => a.id === bioModalOpen)?.name}
                  </h3>
                  <div className="bio-modal-body">
                    {t(`activists.bio${bioModalOpen}`)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* The March Section */}
        <section
          id="march"
          className={`content-section${activeSection === 'march' ? ' active' : ''}`}
        >
          <MarchSection isActive={activeSection === 'march'} />
        </section>

        {/* Sheets Section */}
        <section
          id="sheets"
          className={`content-section${activeSection === 'sheets' ? ' active' : ''}`}
        >
          <div className="content-container content-container--wide">
            <h2 className="section-title">{t('sheets.title')}</h2>
            <p className="section-body" style={{ maxWidth: '75%', margin: '0 auto 16px' }}>{t('sheets.description.p1')}</p>
            <p className="section-body" style={{ maxWidth: '75%', margin: '0 auto 32px' }}>{t('sheets.description.p2')}</p>
            <div className="march-photo-gallery">
              <div className="gallery-row gallery-row-full">
                <div className="gallery-item">
                  <img className="gallery-img" src="/images/cobija.jpg" alt="La Cobija" />
                </div>
              </div>
              <div className="cobija-gallery">
                {[
                  { src: '/images/LC1.jpg', alt: 'La Cobija 1' },
                  { src: '/images/LC2.jpg', alt: 'La Cobija 2' },
                  { src: '/images/LC3.jpg', alt: 'La Cobija 3' },
                  { src: '/images/LC4.jpeg', alt: 'La Cobija 4' },
                  { src: '/images/LC5.jpg', alt: 'La Cobija 5' },
                  { src: '/images/LC6.jpeg', alt: 'La Cobija 6' },
                  { src: '/images/LC7.jpeg', alt: 'La Cobija 7' },
                  { src: '/images/LC8.jpeg', alt: 'La Cobija 8' },
                  { src: '/images/LC9.jpeg', alt: 'La Cobija 9' },
                ].map((img, i) => (
                  <div className="cobija-gallery-item" key={i}>
                    <img className="gallery-img" src={img.src} alt={img.alt} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Activists Section */}
        <section
          id="activists"
          className={`content-section${activeSection === 'activists' ? ' active' : ''}`}
        >
          <div className="content-container content-container--wide">
            <h2 className="section-title">{t('activists.title')}</h2>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
              <div className="march-detail-tabs">
                {['activists', 'artivismo'].map((tab) => (
                  <button
                    key={tab}
                    className={`march-tab-btn${activistsTab === tab ? ' active' : ''}`}
                    onClick={() => setActivistsTab(tab)}
                  >
                    {t(`activists.tab.${tab}`)}
                  </button>
                ))}
              </div>
            </div>

            <div className={`march-tab-panel${activistsTab === 'activists' ? ' active' : ''}`}>
              <p className="section-body activists-intro">{t('activists.intro')}</p>
              <div className="activists-list">
                <div className="activist-row">
                  <div className="activist-photo">
                    <img className="gallery-img" src="/images/Mel Pacheco.jpg" alt="Mel" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="activist-info">
                    <h4 className="activist-name">Mel Pacheco</h4>
                    <p className="activist-bio">{t('activists.bio.mel')}</p>
                    <div className="activist-links">
                      <span>Instagram: <a href="https://www.instagram.com/lapachepacheco" target="_blank" rel="noopener noreferrer">@lapachepacheco</a></span>
                      <span>Podcast: El Chal De Las Musas</span>
                    </div>
                    <div className="artivismo-mini-player">
                      <AudioPlayer audioId="mel-pacheco" src="/audio/Mel Pacheco.m4a" />
                    </div>
                  </div>
                </div>
                <div className="activist-row">
                  <div className="activist-photo">
                    <img className="gallery-img" src="/images/Andrea (1).jpg" alt="Andrea" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="activist-info">
                    <h4 className="activist-name">Andrea Rioseco Sanjuán</h4>
                    <p className="activist-bio">{t('activists.bio.andrea')}</p>
                    <div className="activist-links">
                      <span>Instagram: <a href="https://www.instagram.com/andreariosexo" target="_blank" rel="noopener noreferrer">@andreariosexo</a> <a href="https://www.instagram.com/ternuraSafica" target="_blank" rel="noopener noreferrer">@ternuraSafica</a></span>
                      <span>Podcast: Ellas Ahora</span>
                    </div>
                    <div className="artivismo-mini-player">
                      <AudioPlayer audioId="andrea-ella-mexico" src="/audio/Andrea de Ella Mexico.m4a" />
                    </div>
                  </div>
                </div>
                <div className="activist-row">
                  <div className="activist-photo">
                    <img className="gallery-img" src="/images/artivismo-19.jpg" alt="María Antonio" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="activist-info">
                    <h4 className="activist-name">María Antonio Núñez Díaz</h4>
                    <p className="activist-bio">{t('activists.bio.maria')}</p>
                    <div className="activist-links">
                      <span>Web: <a href="https://www.granom.com.mx" target="_blank" rel="noopener noreferrer">granom.com.mx</a></span>
                      <span>Instagram: <a href="https://www.instagram.com/granom" target="_blank" rel="noopener noreferrer">@granom</a></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`march-tab-panel${activistsTab === 'artivismo' ? ' active' : ''}`}>
              <div className="activists-list">
                <div className="activist-row">
                  <div className="activist-photo">
                    <img className="gallery-img" src="/images/artivismo-19.jpg" alt={t('activists.artivismo.desc19')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="activist-info">
                    <h4 className="activist-name">{t('activists.artivismo.name19')}</h4>
                    <p className="activist-bio">{t('activists.artivismo.bio19')}</p>
                    <div className="artivismo-mini-player">
                      <AudioPlayer audioId="artivismo-19" src="/audio/artivismo-19.mp3" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="march-photo-gallery">
                <div className="gallery-row gallery-row-3">
                  <div className="gallery-item">
                    <img className="gallery-img" src="/images/Poster1.png" alt="Artivismo poster 1" />
                  </div>
                  <div className="gallery-item">
                    <img className="gallery-img" src="/images/Posters2.png" alt="Artivismo poster 2" />
                  </div>
                  <div className="gallery-item">
                    <img className="gallery-img" src="/images/Posters3.png" alt="Artivismo poster 3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
