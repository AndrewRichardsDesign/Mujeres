import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Navigation from '../components/Navigation';
import PhotoCard from '../components/PhotoCard';
import MarchSection from '../components/MarchSection';

const CollaboratorSvg = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="30" r="14" fill="currentColor" />
    <ellipse cx="40" cy="62" rx="22" ry="14" fill="currentColor" />
  </svg>
);

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
  const [collabModalOpen, setCollabModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

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

  const activists = Array.from({ length: 13 }, (_, i) => i + 1);

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
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="collaborator-card" onClick={() => setCollabModalOpen(true)}>
                  <div className="collaborator-photo">
                    <div className="collaborator-placeholder">
                      <CollaboratorSvg />
                    </div>
                  </div>
                  <p className="collaborator-description">{t('collaborators.description')}</p>
                </div>
              ))}
            </div>

            {collabModalOpen && (
              <div className="collaborator-modal" style={{ display: 'flex' }}>
                <div
                  className="collaborator-modal-overlay"
                  onClick={() => setCollabModalOpen(false)}
                />
                <div className="collaborator-modal-content">
                  <button
                    className="collaborator-modal-close"
                    onClick={() => setCollabModalOpen(false)}
                  >
                    &times;
                  </button>
                  <p className="collaborator-modal-text">{t('collaborators.modal.text')}</p>
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
            <div className="march-photo-gallery">
              <div className="gallery-row gallery-row-full">
                <div className="gallery-item">
                  <img className="gallery-img" src="/images/cobija.jpg" alt="La Cobija" />
                </div>
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
            <p className="section-body activists-intro">{t('activists.intro')}</p>
            <div className="activists-list">
              {activists.map((i) => (
                <div key={i} className="activist-row">
                  <div className="activist-photo">
                    <div className="march-gallery-placeholder" />
                  </div>
                  <div className="activist-info">
                    <p className="activist-bio">{t(`activists.bio${i}`)}</p>
                    <a href="#" className="activist-link">{t('activists.learn')}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
