import { useLanguage } from '../i18n/LanguageContext';

export default function Navigation({ activeSection, onNavigate, isMarching, isDonating }) {
  const { t } = useLanguage();

  const links = [
    { id: 'participate', key: 'nav.participate' },
    { id: 'collaborators', key: 'nav.collaborators' },
    { id: 'march', key: 'nav.march' },
    { id: 'sheets', key: 'nav.sheets' },
    { id: 'activists', key: 'nav.activists' },
  ];

  if (isMarching) {
    return (
      <nav className="main-nav">
        <div className="nav-inner">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.id === 'march' ? '/march' : `/#${link.id}`}
              className={`nav-link${link.id === 'march' ? ' active' : ''}`}
            >
              {t(link.key)}
            </a>
          ))}
        </div>
        <a href="/donate" className="donate-btn">{t('nav.donate')}</a>
      </nav>
    );
  }

  if (isDonating) {
    return (
      <nav className="main-nav">
        <div className="nav-inner">
          {links.map((link) => (
            <a
              key={link.id}
              href={`/#${link.id}`}
              className="nav-link"
            >
              {t(link.key)}
            </a>
          ))}
        </div>
        <a href="/donate" className="donate-btn active">{t('nav.donate')}</a>
      </nav>
    );
  }

  return (
    <nav className="main-nav">
      <div className="nav-inner">
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`nav-link${activeSection === link.id ? ' active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(link.id);
            }}
          >
            {t(link.key)}
          </a>
        ))}
      </div>
      <a href="/donate" className="donate-btn">{t('nav.donate')}</a>
    </nav>
  );
}
