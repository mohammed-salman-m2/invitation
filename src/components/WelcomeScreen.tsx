import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../AppContext';

export const WelcomeScreen: React.FC = () => {
  const { isEntered, enterSite } = useAppContext();

  return (
    <AnimatePresence>
      {!isEntered && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-forest-night"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/40 via-forest-night to-forest-night" />
          
          <motion.button
            onClick={enterSite}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative z-10 flex flex-col items-center gap-8"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-gold/40 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.3)] bg-gold/5 backdrop-blur-sm relative">
               <div className="absolute inset-2 rounded-full border border-gold/20 border-dashed" />
              <span className="text-5xl md:text-7xl text-gold font-serif flex items-center justify-center whitespace-nowrap pt-2">
                S<span className="text-rose-500 mx-1 md:mx-2 text-4xl md:text-6xl animate-pulse">❤️</span>S
              </span>
            </div>
            
            <div className="text-ivory font-serif tracking-[0.3em] uppercase text-sm md:text-base border-b border-gold/50 pb-2 px-6 text-glow">
              Tap to Open
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
