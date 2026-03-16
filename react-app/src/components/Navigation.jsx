import { useLanguage } from '../i18n/LanguageContext';

export default function Navigation({ activeSection, onNavigate, isMarching }) {
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
    </nav>
  );
}
