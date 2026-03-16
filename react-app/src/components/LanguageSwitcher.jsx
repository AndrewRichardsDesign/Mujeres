import { useLanguage } from '../i18n/LanguageContext';

export default function LanguageSwitcher({ variant }) {
  const { lang, setLang, t } = useLanguage();

  const className = variant === 'march' ? 'march-lang-switcher' : 'lang-switcher';

  return (
    <div className={className}>
      <a
        href="#"
        className={`lang-link${lang === 'es' ? ' active' : ''}`}
        onClick={(e) => { e.preventDefault(); setLang('es'); }}
      >
        {t('lang.spanish')}
      </a>
      <a
        href="#"
        className={`lang-link${lang === 'en' ? ' active' : ''}`}
        onClick={(e) => { e.preventDefault(); setLang('en'); }}
      >
        {t('lang.english')}
      </a>
    </div>
  );
}
