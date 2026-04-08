import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useAppContext } from '../AppContext';

export const CountdownTimer: React.FC = () => {
  const { t } = useAppContext();
  
  // April 11, 2026 11:30 AM
  const targetDate = new Date('2026-04-11T11:30:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (!isFinished) {
          setIsFinished(true);
          triggerConfetti();
        }
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, isFinished]);

  const triggerConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center">
      <div className={`w-16 h-20 md:w-20 md:h-24 rounded-lg flex items-center justify-center border border-gold/40 bg-white/90 shadow-[0_8px_15px_rgba(0,0,0,0.1),inset_0_-4px_10px_rgba(0,0,0,0.05),inset_0_2px_10px_rgba(255,255,255,1)] mb-3 relative overflow-hidden transform perspective-1000`}>
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/5 w-full z-20"></div>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ rotateX: -90, opacity: 0, y: -20 }}
            animate={{ rotateX: 0, opacity: 1, y: 0 }}
            exit={{ rotateX: 90, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
            className="text-3xl md:text-5xl font-serif text-maroon absolute font-bold drop-shadow-sm"
            style={{ transformOrigin: "bottom center" }}
          >
            {value.toString().padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-xs uppercase tracking-[0.2em] opacity-80 font-semibold">{label}</span>
    </div>
  );

  return (
    <section className="py-20 px-4 relative overflow-hidden min-h-[40vh] flex flex-col justify-center items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent opacity-50" />
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-serif text-center mb-12 text-glow relative z-10"
      >
        {t.countdown.title}
      </motion.h2>

      <div className="flex justify-center gap-4 md:gap-8 relative z-10">
        <div className="flex gap-4 md:gap-8">
          <TimeUnit value={timeLeft.days} label={t.countdown.days} />
          <TimeUnit value={timeLeft.hours} label={t.countdown.hours} />
          <TimeUnit value={timeLeft.minutes} label={t.countdown.minutes} />
          <TimeUnit value={timeLeft.seconds} label={t.countdown.seconds} />
        </div>
      </div>
    </section>
  );
};
