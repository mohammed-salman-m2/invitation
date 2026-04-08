import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../AppContext';

export const Footer: React.FC = () => {
  const { t } = useAppContext();

  return (
    <footer className="relative py-24 px-4 overflow-hidden mt-12 border-t border-gold/10">
      <div className="absolute inset-0 flex justify-center items-center opacity-[0.03] dark:opacity-5 pointer-events-none">
        <div className="w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/40 via-transparent to-transparent -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1.5 }}
           className="w-16 h-16 mb-8 text-gold opacity-60"
        >
          {/* Subtle floral or geometric SVG */}
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 C60 40 100 50 100 50 C60 60 50 100 50 100 C40 60 0 50 0 50 C40 40 50 0 50 0 Z" />
          </svg>
        </motion.div>

        <div className="flex flex-col items-center gap-4 mb-6">
          <p className="text-3xl md:text-5xl font-arabic text-gold leading-relaxed">
            {t.quoteArabic}
          </p>
          <p className="text-lg md:text-xl font-serif text-glow italic opacity-90">
            "{t.quote}"
          </p>
        </div>
        
        <p className="text-sm opacity-50 uppercase tracking-[0.2em] mt-8 font-medium">
          Mohammed Salih <span className="text-rose-500 mx-1">❤️</span> Shifna
        </p>

        <div className="mt-20 pb-10 text-[10px] uppercase tracking-widest opacity-30">
          Created with ❤️
        </div>
      </div>
    </footer>
  );
};
