import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';
import { useAppContext } from '../AppContext';

export const Gallery: React.FC = () => {
  const { t } = useAppContext();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto text-center">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-serif text-glow mb-4">{t.gallery.title}</h2>
        <p className="opacity-70 max-w-md mx-auto">{t.gallery.desc}</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
      >
        {[1, 2, 3].map((item) => (
          <motion.div 
            key={item}
            variants={itemVariants}
            className="aspect-[3/4] rounded-xl overflow-hidden glassmorphism relative group"
          >
            {/* Shimmer Effect Outline */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] animate-shimmer" />
            
            {/* Blurred Placeholder */}
            <div className="w-full h-full bg-black/5 dark:bg-white/5 backdrop-blur-xl flex flex-col items-center justify-center border border-white/10 opacity-70 group-hover:opacity-100 transition-opacity">
              <ImageIcon size={48} className="text-gold/50 mb-4" />
              <div className="w-16 h-1 bg-gold/30 rounded-full" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
