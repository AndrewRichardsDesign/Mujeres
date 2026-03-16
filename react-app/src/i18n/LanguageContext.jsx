import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import translations from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('voces8m-lang');
    return saved && translations[saved] ? saved : 'es';
  });

  useEffect(() => {
    localStorage.setItem('voces8m-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback((key) => {
    return translations[lang]?.[key] || translations.en?.[key] || key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
