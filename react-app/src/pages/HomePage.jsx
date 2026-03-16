import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Navigation from '../components/Navigation';
import PhotoCard from '../components/PhotoCard';
import MarchSection from '../components/MarchSection';
import AudioPlayer from '../components/AudioPlayer';
import MarchingFigures from '../components/MarchingFigures';

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
    { id: 1, name: 'Andrea', photo: '/images/Andrea & Andrew.jpg' },
    { id: 2, name: 'Caro', photo: '/images/Caro.jpg' },
    { id: 3, name: 'Andrew', photo: '/images/Andrea & Andrew.jpg' },
  ];

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
        <MarchingFigures />
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
                  <p className="collaborator-description">{t(`activists.bio${id}`)}</p>
                </div>
              ))}
            </div>
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
            <div className="march-photo-gallery">
              <div className="gallery-row gallery-row-full">
                <div className="gallery-item">
                  <img className="gallery-img" src="/images/cobija.jpg" alt="La Cobija" />
                </div>
              </div>
            </div>
            <p className="section-body" style={{ maxWidth: '50%', marginTop: '24px' }}>{t('sheets.description')}</p>
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
                    <div className="artivismo-mini-player">
                      <AudioPlayer audioId="andrea-ella-mexico" src="/audio/Andrea de Ella Mexico.m4a" />
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
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
