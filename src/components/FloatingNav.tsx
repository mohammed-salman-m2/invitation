import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Languages, Music, Music3 } from 'lucide-react';
import { useAppContext } from '../AppContext';

export const FloatingNav: React.FC = () => {
  const { theme, toggleTheme, language, toggleLanguage, isPlaying, toggleAudio } = useAppContext();

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 glass-panel rounded-full px-6 py-3 flex items-center gap-6"
    >
      <button 
        onClick={toggleLanguage}
        className="flex flex-col items-center gap-1 group transition-transform hover:scale-110"
        aria-label="Toggle Language"
      >
        <Languages size={20} className={theme === 'dark' ? 'text-ivory group-hover:text-gold' : 'text-emerald-dark group-hover:text-gold-dark'} />
        <span className={`text-[10px] font-medium uppercase ${theme === 'dark' ? 'text-ivory' : 'text-emerald-dark'}`}>
          {language === 'en' ? 'ML' : 'EN'}
        </span>
      </button>

      <div className="w-[1px] h-6 bg-gold/30"></div>

      <button 
        onClick={toggleAudio}
        className="flex items-center justify-center transition-transform hover:scale-110"
        aria-label="Toggle Audio"
      >
        <div className={`p-2 rounded-full border border-gold/30 ${isPlaying ? 'bg-gold/10' : ''}`}>
           {isPlaying ? (
              <Music size={22} className={theme === 'dark' ? 'text-ivory' : 'text-emerald-dark'} />
           ) : (
              <Music3 size={22} className={theme === 'dark' ? 'text-ivory/50' : 'text-emerald-dark/50'} />
           )}
        </div>
      </button>

      <div className="w-[1px] h-6 bg-gold/30"></div>

      <button 
        onClick={toggleTheme}
        className="flex flex-col items-center gap-1 group transition-transform hover:scale-110"
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? (
          <Sun size={20} className="text-ivory group-hover:text-gold" />
        ) : (
          <Moon size={20} className="text-emerald-dark group-hover:text-gold-dark" />
        )}
      </button>
    </motion.div>
  );
};
