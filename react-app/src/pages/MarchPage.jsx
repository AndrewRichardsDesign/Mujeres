import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Navigation from '../components/Navigation';
import AudioPlayer from '../components/AudioPlayer';

const EmptyState = ({ titleKey, descKey }) => {
  const { t } = useLanguage();
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
          <path d="M32 40h16M40 32v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <h3>{t(titleKey)}</h3>
      <p>{t(descKey)}</p>
    </div>
  );
};

function MarchPhotoCard({ num, descKey }) {
  const [flipped, setFlipped] = useState(false);
  const { t } = useLanguage();

  return (
    <div className={`photo-card${flipped ? ' flipped' : ''}`}>
      <div className="card-inner">
        <div className="card-front">
          <div className="photo-square">
            <div className="photo-placeholder">{num}</div>
          </div>
          <p className="photo-description">{t(descKey)}</p>
          <AudioPlayer audioId={`audio-${num}`} />
          <button className="testimony-btn flip-btn" onClick={() => setFlipped(true)}>
            {t('march.during.read')}
          </button>
        </div>
        <div className="card-back">
          <p className="testimony-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className="testimony-btn flip-btn" onClick={() => setFlipped(false)}>
            {t('march.during.back')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MarchPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('before');

  const tabs = ['before', 'during', 'after'];

  const duringDescs = Array.from({ length: 16 }, (_, i) => `march.html.during.desc${i + 1}`);

  return (
    <>
      <LanguageSwitcher variant="march" />
      <Navigation isMarching />

      <section className="tabs-section">
        <div className="container">
          <div className="tabs-nav">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`tab-btn${activeTab === tab ? ' active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {t(`march.tab.${tab}`)}
              </button>
            ))}
          </div>

          {/* Before Tab */}
          <div className={`tab-panel${activeTab === 'before' ? ' active' : ''}`}>
            <EmptyState titleKey="march.html.before.title" descKey="march.html.before.desc" />
          </div>

          {/* During Tab */}
          <div className={`tab-panel${activeTab === 'during' ? ' active' : ''}`}>
            <div className="photo-grid">
              {duringDescs.map((descKey, i) => (
                <MarchPhotoCard key={i} num={i + 1} descKey={descKey} />
              ))}
            </div>
          </div>

          {/* After Tab */}
          <div className={`tab-panel${activeTab === 'after' ? ' active' : ''}`}>
            <EmptyState titleKey="march.html.after.title" descKey="march.html.after.desc" />
          </div>
        </div>
      </section>
    </>
  );
}
