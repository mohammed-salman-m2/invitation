import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language } from './translations';
import { translations } from './translations';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
  t: typeof translations['en'];
  isPlaying: boolean;
  toggleAudio: () => void;
  isEntered: boolean;
  enterSite: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<Language>('ml');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEntered, setIsEntered] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  const toggleLanguage = () => setLanguage(prev => (prev === 'en' ? 'ml' : 'en'));
  
  // Note: Audio object could be managed here or in a separate hook
  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    // Audio toggling logic will be handled where the audio element is rendered or via refs
  };

  const enterSite = () => {
    setIsEntered(true);
    setIsPlaying(true);
  };

  const value = {
    theme,
    toggleTheme,
    language,
    toggleLanguage,
    t: translations[language],
    isPlaying,
    toggleAudio,
    isEntered,
    enterSite
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
