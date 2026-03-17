import Navigation from '../components/Navigation';
import { useLanguage } from '../i18n/LanguageContext';

export default function DonatePage() {
  const { t } = useLanguage();

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
            <div className="donate-form-placeholder">
              <div className="donate-form-icon">&#128156;</div>
              <h2 className="donate-form-heading">{t('donate.formTitle')}</h2>
              <p className="donate-form-text">{t('donate.formDesc')}</p>
              <a
                href="https://www.zeffy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="donate-zeffy-btn"
              >
                {t('donate.formBtn')}
              </a>
              <p className="donate-zeffy-note">{t('donate.zeffy')}</p>
            </div>
            {/*
              To embed your Zeffy form, replace the placeholder above with:
              <iframe
                title="Zeffy Donation Form"
                src="https://www.zeffy.com/en-US/embed/donation-form/YOUR_FORM_ID"
                style={{ width: '100%', height: '700px', border: 'none' }}
                allowpaymentrequest="true"
              />
            */}
          </div>
        </div>
      </div>
    </>
  );
}
