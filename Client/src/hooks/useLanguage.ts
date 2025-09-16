import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export function useLanguage() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem('careerAI_language', languageCode);
    
    // Update document direction for RTL languages
    const isRTL = ['ur', 'ks'].includes(languageCode);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = languageCode;
  };

  const getCurrentLanguage = () => {
    return i18n.language;
  };

  const isRTL = () => {
    return ['ur', 'ks'].includes(i18n.language);
  };

  const getLanguageName = (code: string) => {
    const languageNames: Record<string, string> = {
      en: 'English',
      hi: 'हिंदी',
      ur: 'اردو',
      ks: 'کٲشُر'
    };
    return languageNames[code] || code;
  };

  // Initialize language on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('careerAI_language');
    if (savedLanguage && savedLanguage !== i18n.language) {
      changeLanguage(savedLanguage);
    }
  }, []);

  return {
    t,
    changeLanguage,
    getCurrentLanguage,
    isRTL,
    getLanguageName,
    currentLanguage: i18n.language,
    availableLanguages: ['en', 'hi', 'ur', 'ks']
  };
}