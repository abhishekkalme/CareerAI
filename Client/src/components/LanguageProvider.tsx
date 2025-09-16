import React, { createContext, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { updateDocumentDirection, getLanguageFontFamily } from '../utils/rtlSupport';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (languageCode: string) => void;
  isRTL: boolean;
  availableLanguages: Array<{
    code: string;
    name: string;
    nativeName: string;
  }>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const availableLanguages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'ks', name: 'Kashmiri', nativeName: 'کٲشُر' }
];

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem('careerAI_language', languageCode);
    updateDocumentDirection(languageCode);
    
    // Update font family for the language
    const fontFamily = getLanguageFontFamily(languageCode);
    document.documentElement.style.setProperty('--font-family', fontFamily);
  };

  const isRTL = ['ur', 'ks'].includes(i18n.language);

  useEffect(() => {
    // Initialize language settings on mount
    updateDocumentDirection(i18n.language);
    const fontFamily = getLanguageFontFamily(i18n.language);
    document.documentElement.style.setProperty('--font-family', fontFamily);
  }, [i18n.language]);

  const contextValue: LanguageContextType = {
    currentLanguage: i18n.language,
    changeLanguage,
    isRTL,
    availableLanguages
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
}