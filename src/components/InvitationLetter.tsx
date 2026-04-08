import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useAppContext } from '../AppContext';

export const InvitationLetter: React.FC = () => {
  const { t, theme } = useAppContext();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section className="py-20 px-4 relative flex justify-center">
      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`relative z-10 w-full max-w-3xl glass-panel p-8 md:p-14 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-glow ${theme === 'dark' ? 'bg-[#043326]/60' : 'bg-[#fffdf7]/80'}`}
      >
        {/* Paper texture overlay attempt using SVG noise if available or simple radial gradient. 
            For true paper texture, an image is ideal, but here we use a subtle blend. */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.01] mix-blend-multiply dark:mix-blend-overlay pointer-events-none rounded-xl" 
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}>
        </div>

        <div className="relative z-10 flex flex-col gap-8 text-center md:text-left">
          <motion.p variants={itemVariants} className="font-serif text-xl md:text-2xl text-gold italic text-center mb-4">
            {t.letter.greeting}
          </motion.p>
          
          <motion.p variants={itemVariants} className="text-base md:text-lg leading-relaxed">
            {t.letter.body1}
          </motion.p>
          
          <motion.div variants={itemVariants} className="my-6 p-6 border-y border-gold/30 bg-gold/5 dark:bg-gold/10 rounded-lg text-center backdrop-blur-sm">
            <p className="font-semibold text-lg md:text-xl font-serif">{t.letter.bride}</p>
          </motion.div>
          
          <motion.p variants={itemVariants} className="text-base md:text-lg leading-relaxed text-center">
            {t.letter.invite}
          </motion.p>
          
          <motion.div variants={itemVariants} className="mt-8 pt-8 border-t border-gold/20 flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
            <div className="whitespace-pre-line text-sm md:text-base opacity-80 text-center md:text-left">
              {t.letter.from}
            </div>
            <div className="text-sm md:text-base italic font-serif text-gold text-center md:text-right">
              {t.letter.compliments}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
