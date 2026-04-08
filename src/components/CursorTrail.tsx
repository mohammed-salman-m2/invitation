import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeartParticle {
  id: number;
  x: number;
  y: number;
}

export const CursorTrail: React.FC = () => {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  useEffect(() => {
    // Throttle hearts to not overwhelm the DOM
    let lastSpawn = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const now = Date.now();
      if (now - lastSpawn < 50) return; // 50ms throttle
      lastSpawn = now;

      let clientX, clientY;
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      const newHeart = {
        id: now,
        x: clientX,
        y: clientY,
      };

      setHearts((prev) => [...prev, newHeart]);

      // Remove heart after animation (1s)
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, scale: 0.5, y: heart.y, x: heart.x }}
            animate={{ opacity: 0, scale: 1.5, y: heart.y - 40, x: heart.x + (Math.random() * 20 - 10) }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute text-rose-500 font-bold"
            style={{ left: 0, top: 0, marginLeft: -10, marginTop: -10 }}
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
