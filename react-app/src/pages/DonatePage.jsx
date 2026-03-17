import { useEffect } from 'react';
import Navigation from '../components/Navigation';
import { useLanguage } from '../i18n/LanguageContext';

export default function DonatePage() {
  const { t } = useLanguage();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
    script.async = true;
    script.onload = () => {
      if (window.kofiWidgetOverlay) {
        window.kofiWidgetOverlay.draw('vocesdel8m', {
          'type': 'floating-chat',
          'floating-chat.donateButton.text': t('donate.formBtn'),
          'floating-chat.donateButton.background-color': '#5150f7',
          'floating-chat.donateButton.text-color': '#fff',
        });
      }
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
      const frame = document.getElementById('kofi-overlay');
      if (frame) frame.remove();
    };
  }, [t]);

  return (
    <>
      <Navigation isDonating />
      <div className="donate-page">
        <div className="donate-split">
          <div className="donate-info">
            <h1 className="donate-title">{t('donate.title')}</h1>
            <p className="donate-body">{t('donate.intro')}</p>
            <p className="donate-body">{t('donate.mission')}</p>
            <p className="donate-body">{t('donate.impact')}</p>
            <div className="donate-highlights">
              <div className="donate-highlight-item">
                <span className="donate-highlight-icon">&#9829;</span>
                <span>{t('donate.highlight1')}</span>
              </div>
              <div className="donate-highlight-item">
                <span className="donate-highlight-icon">&#9733;</span>
                <span>{t('donate.highlight2')}</span>
              </div>
              <div className="donate-highlight-item">
                <span className="donate-highlight-icon">&#9992;</span>
                <span>{t('donate.highlight3')}</span>
              </div>
            </div>
            <p className="donate-thankyou">{t('donate.thankyou')}</p>
          </div>
          <div className="donate-form">
            <div className="donate-form-card">
              <div className="donate-form-icon">&#128156;</div>
              <h2 className="donate-form-heading">{t('donate.formTitle')}</h2>
              <p className="donate-form-text">{t('donate.formDesc')}</p>
              <iframe
                id="kofiframe"
                src="https://ko-fi.com/vocesdel8m/?hidefeed=true&widget=true&embed=true&preview=true"
                title="Ko-fi Donation"
                className="donate-kofi-iframe"
              />
              <p className="donate-kofi-note">{t('donate.kofi')}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
