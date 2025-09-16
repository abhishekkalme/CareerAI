// RTL (Right-to-Left) language support utilities

export const RTL_LANGUAGES = ['ur', 'ks', 'ar', 'he', 'fa'];

export function isRTLLanguage(languageCode: string): boolean {
  return RTL_LANGUAGES.includes(languageCode);
}

export function updateDocumentDirection(languageCode: string): void {
  const isRTL = isRTLLanguage(languageCode);
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  document.documentElement.lang = languageCode;
  
  // Update CSS custom properties for RTL
  if (isRTL) {
    document.documentElement.style.setProperty('--text-align', 'right');
    document.documentElement.style.setProperty('--flex-direction', 'row-reverse');
  } else {
    document.documentElement.style.setProperty('--text-align', 'left');
    document.documentElement.style.setProperty('--flex-direction', 'row');
  }
}

export function getLanguageDisplayName(languageCode: string): string {
  const languageNames: Record<string, string> = {
    en: 'English',
    hi: 'हिंदी',
    ur: 'اردو',
    ks: 'کٲشُر'
  };
  return languageNames[languageCode] || languageCode;
}

export function getLanguageDirection(languageCode: string): 'ltr' | 'rtl' {
  return isRTLLanguage(languageCode) ? 'rtl' : 'ltr';
}

// Font families optimized for different languages
export function getLanguageFontFamily(languageCode: string): string {
  const fontFamilies: Record<string, string> = {
    en: "'Inter', 'Segoe UI', system-ui, sans-serif",
    hi: "'Noto Sans Devanagari', 'Segoe UI', system-ui, sans-serif",
    ur: "'Noto Nastaliq Urdu', 'Segoe UI', system-ui, sans-serif",
    ks: "'Noto Nastaliq Urdu', 'Segoe UI', system-ui, sans-serif"
  };
  return fontFamilies[languageCode] || fontFamilies.en;
}