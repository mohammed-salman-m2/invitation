// src/components/EventCards.tsx (Final Corrected Version)

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Utensils, HeartHandshake } from 'lucide-react';
import { useAppContext } from '../AppContext';

export const EventCards: React.FC = () => {
  const { t } = useAppContext();

  const nikahVenueUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.events.nikah.venue)}`;
  const receptionVenueUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.events.reception.venue)}`;

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">

        {/* Nikah Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ scale: 1.05 }}
          className="flex-1 glassmorphism rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] relative overflow-hidden group"
        >
          {/* THE FIX IS HERE: Added 'pointer-events-none' to let clicks pass through */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6 border border-gold/30 group-hover:border-gold transition-colors">
            <HeartHandshake className="text-gold" size={32} />
          </div>

          <div className="flex flex-col items-center w-full flex-grow">
            <h3 className="text-2xl font-serif font-semibold mb-2">{t.events.nikah.title}</h3>
            <p className="text-lg mb-2 text-gold font-medium">{t.events.nikah.time}</p>
            <p className="text-sm opacity-80 mb-8 max-w-[250px]">{t.events.nikah.venue}</p>

            <a
              href={nikahVenueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center justify-center gap-2 w-full py-3 px-6 rounded-full border border-gold/50 text-sm font-medium hover:bg-gold hover:text-forest-night dark:hover:text-forest-night transition-colors"
            >
              <MapPin size={16} />
              <span>{t.events.mapBtn}</span>
            </a>
          </div>
        </motion.div>

        {/* Reception Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ scale: 1.05 }}
          className="flex-1 glassmorphism rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] relative overflow-hidden group"
        >
          {/* THE FIX IS HERE: Added 'pointer-events-none' to let clicks pass through */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6 border border-gold/30 group-hover:border-gold transition-colors">
            <Utensils className="text-gold" size={32} />
          </div>

          <div className="flex flex-col items-center w-full flex-grow">
            <h3 className="text-2xl font-serif font-semibold mb-2">{t.events.reception.title}</h3>
            <p className="text-lg mb-2 text-gold font-medium">{t.events.reception.time}</p>
            <p className="text-sm opacity-80 mb-8 max-w-[250px]">{t.events.reception.venue}</p>

            <a
              href={receptionVenueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center justify-center gap-2 w-full py-3 px-6 rounded-full border border-gold/50 text-sm font-medium hover:bg-gold hover:text-forest-night dark:hover:text-forest-night transition-colors"
            >
              <MapPin size={16} />
              <span>{t.events.mapBtn}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};