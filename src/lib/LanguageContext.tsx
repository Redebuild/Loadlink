import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language, languages } from './translations-extended';
import translationsData from './translations-extended';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
  direction: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const isRTL = languages[language]?.dir === 'rtl';
  const direction = languages[language]?.dir || 'ltr';

  // Apply RTL/LTR to document
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [language, direction]);

  const t = (key: string) => {
    const translation = translationsData.translations[key];
    if (translation && translation[language]) {
      return translation[language];
    }
    // Fallback to English
    return translation?.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL, direction }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
