import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../AppContext';

export const HeroSection: React.FC = () => {
  const { t, language } = useAppContext();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 dark:opacity-[0.02] pointer-events-none">
        <svg width="80%" height="80%" viewBox="0 0 100 100" preserveAspectRatio="none">
           {/* Abstract minimal geometric element representing Islamic patterns loosely */}
          <path d="M50 0 L100 50 L50 100 L0 50 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M25 25 L75 25 L75 75 L25 75 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 uppercase tracking-[0.3em] text-sm md:text-base font-medium text-gold"
        >
          {t.hero.save}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-8 font-serif leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-glow w-full overflow-hidden"
        >
          <h1 className="py-4 w-full flex justify-center">
            <div className={`flex flex-col items-center justify-center gap-4 md:gap-6 ${language === 'ml' ? 'leading-[1.5]' : ''}`}>
              {t.hero.names.split('❤️').map((name, i, arr) => (
                <React.Fragment key={i}>
                  <span className="whitespace-nowrap">{name.trim()}</span>
                  {i < arr.length - 1 && (
                     <span className="text-rose-500 my-1 md:my-2 inline-block animate-pulse text-2xl sm:text-3xl md:text-4xl lg:text-5xl">❤️</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-16 h-[1px] bg-gold mb-8 shadow-[0_0_10px_rgba(212,175,55,0.8)]"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-lg md:text-2xl font-serif tracking-wider"
        >
          <p>{t.hero.date}</p>
        </motion.div>
      </div>
    </section>
  );
};
