import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AppRouter } from './router/AppRouter';
import { SplashScreen } from './pages/SplashScreen';

export default function App() {
  const { i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('career-ai-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDarkMode(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  // Set document direction based on language
  useEffect(() => {
    const isRTL = ['ur', 'ks'].includes(i18n.language);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
  // Toggle theme and save preference
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('career-ai-theme', newTheme ? 'dark' : 'light');
  };

    // Handle splash screen completion
  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Show splash screen first, then main app
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <AppRouter 
      isDarkMode={isDarkMode} 
      toggleTheme={toggleTheme} 
    />
  );
}