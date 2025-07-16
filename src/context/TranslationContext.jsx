import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '../locales/transalation';


const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const storedLanguage = localStorage.getItem('appLanguage');
  const [language, setLanguage] = useState(storedLanguage || 'en');

  const t = (key) => translations[language][key] || key;

  useEffect(() => {
    localStorage.setItem('appLanguage', language);
  }, [language]);

  return (
    <TranslationContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
