import { useEffect } from 'react';
import Navigation from '../components/Navigation';
import { useLanguage } from '../i18n/LanguageContext';

export default function DonatePage() {
  const { t } = useLanguage();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

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
              <div className="donate-stripe-container">
                {/*
                  Replace the placeholder below with your Stripe Buy Button.
                  Steps:
                  1. Go to Stripe Dashboard → Payment Links
                  2. Create a new link → "Customers choose what to pay"
                  3. Click "Buy button" → copy the generated code
                  4. Paste the <stripe-buy-button> element below

                  Example:
                  <stripe-buy-button
                    buy-button-id="buy_btn_XXXXXXXXXXXX"
                    publishable-key="pk_live_XXXXXXXXXXXX"
                  />
                */}
                <div className="donate-stripe-placeholder">
                  <p className="donate-stripe-setup">{t('donate.setup')}</p>
                  <a
                    href="https://dashboard.stripe.com/payment-links"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="donate-stripe-btn"
                  >
                    {t('donate.stripeSetup')}
                  </a>
                </div>
              </div>
              <p className="donate-stripe-note">{t('donate.stripe')}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
