// src/components/ActionButtons.tsx (Modified for direct Google Calendar link)

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Download, Share2, Check } from 'lucide-react';
import { useAppContext } from '../AppContext';

export const ActionButtons: React.FC = () => {
  const { t } = useAppContext();
  const [showToast, setShowToast] = useState(false);

  // --- GOOGLE CALENDAR EVENT DETAILS ---
  // The event time is converted to UTC (IST is UTC+5:30) for the link to work globally.
  // Start: 11:30 IST -> 06:00 UTC
  // End:   15:00 IST -> 09:30 UTC
  const eventDetails = {
    title: 'Wedding: Mohammed Salih & Shifna',
    description: 'You are invited to the Nikah and Wedding Reception of Mohammed Salih & Shifna.',
    location: 'Rahmath Community Hall, Moonnaini',
    startTimeUTC: '20260411T060000Z',
    endTimeUTC: '20260411T093000Z',
  };

  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.startTimeUTC}/${eventDetails.endTimeUTC}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}`;
  // -------------------------------------

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Wedding Invitation - Mohammed Salih & Shifna',
          text: 'You are invited to the wedding of Mohammed Salih & Shifna on April 11, 2026.',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto flex flex-col items-center relative">
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 cursor-pointer">

        {/* --- MODIFIED CALENDAR BUTTON (NOW A DIRECT LINK) --- */}
        <motion.a
          href={googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center gap-3 p-4 w-32 glassmorphism rounded-xl hover:border-gold transition-colors group"
        >
          <div className="bg-gold/10 p-4 rounded-full group-hover:bg-gold/20 transition-colors">
            <CalendarDays className="text-gold" />
          </div>
          <span className="text-xs font-medium text-center">{t.actions.calendar}</span>
        </motion.a>
        {/* ---------------------------------------------------- */}

        <motion.a
          href="/invitation.jpg"
          download="Invitation-Mohammed-Salih.jpg"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center gap-3 p-4 w-32 glassmorphism rounded-xl hover:border-gold transition-colors group"
        >
          <div className="bg-gold/10 p-4 rounded-full group-hover:bg-gold/20 transition-colors">
            <Download className="text-gold" />
          </div>
          <span className="text-xs font-medium text-center">{t.actions.download}</span>
        </motion.a>

        <motion.button
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="flex flex-col items-center gap-3 p-4 w-32 glassmorphism rounded-xl hover:border-gold transition-colors group"
        >
          <div className="bg-gold/10 p-4 rounded-full group-hover:bg-gold/20 transition-colors">
            <Share2 className="text-gold" />
          </div>
          <span className="text-xs font-medium text-center">{t.actions.share}</span>
        </motion.button>

      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 bg-forest-night border border-gold text-white px-6 py-3 rounded-full flex items-center gap-3 z-50 shadow-xl"
          >
            <Check size={18} className="text-gold" />
            <span className="text-sm font-medium">Link copied to clipboard</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};