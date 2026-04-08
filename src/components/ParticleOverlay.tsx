import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
}

export const ParticleOverlay: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [bgParticles, setBgParticles] = useState<Particle[]>([]);

  // Continuous background particles
  useEffect(() => {
    const interval = setInterval(() => {
      setBgParticles((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: Math.random() * window.innerWidth,
          y: -20,
        },
      ].slice(-20)); // Limit to max 20 at a time for performance
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newParticles = Array.from({ length: 4 }).map(() => ({
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      }));
      
      setParticles(prev => [...prev, ...newParticles].slice(-40)); // Keep max 40 interaction particles
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {bgParticles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: p.x, y: p.y, rotate: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              y: window.innerHeight + 100,
              rotate: 360,
              x: p.x + (Math.random() - 0.5) * 200,
            }}
            transition={{ duration: 10 + Math.random() * 5, ease: "linear" }}
            className="absolute w-3 h-3 md:w-4 md:h-4 bg-red-400/30 rounded-full blur-[1px]"
            style={{ borderRadius: '50% 0 50% 50%' }} // Simple petal shape
            onAnimationComplete={() => {
              setBgParticles(prev => prev.filter(item => item.id !== p.id));
            }}
          />
        ))}

        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, x: p.x, y: p.y, scale: 0.5, rotate: 0 }}
            animate={{
              opacity: 0,
              y: p.y + 150 + Math.random() * 100,
              x: p.x + (Math.random() - 0.5) * 150,
              scale: 1.5,
              rotate: (Math.random() - 0.5) * 360
            }}
            transition={{ duration: 3 + Math.random() * 2, ease: "easeOut" }}
            className="absolute w-4 h-4 bg-rose-500/40"
            style={{ borderRadius: '50% 0 50% 50%' }}
            onAnimationComplete={() => {
              setParticles((prev) => prev.filter((item) => item.id !== p.id));
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
