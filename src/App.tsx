import React, { useEffect, useRef } from 'react';
import { AppProvider, useAppContext } from './AppContext';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ParticleOverlay } from './components/ParticleOverlay';
import { FloatingNav } from './components/FloatingNav';
import { HeroSection } from './components/HeroSection';
import { InvitationLetter } from './components/InvitationLetter';
import { EventCards } from './components/EventCards';
import { CountdownTimer } from './components/CountdownTimer';
import { Gallery } from './components/Gallery';
import { ActionButtons } from './components/ActionButtons';
import { Footer } from './components/Footer';
import { CursorTrail } from './components/CursorTrail';

const AppContent: React.FC = () => {
  const { isPlaying } = useAppContext();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Audio play prevented:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="relative font-sans text-emerald-dark dark:text-ivory selection:bg-gold/30">
      <CursorTrail />
      <WelcomeScreen />

      <main className="relative z-10 w-full min-h-screen">
        <ParticleOverlay />
        <HeroSection />
        <div className="relative">
          {/* Transition connecting lines */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-gold/30 to-transparent -translate-x-1/2 pointer-events-none hidden md:block"></div>

          <InvitationLetter />
          <EventCards />
          <CountdownTimer />
          <Gallery />
          <ActionButtons />
        </div>
        <Footer />
        <FloatingNav />
      </main>

      {/* Put your music.mp3 in the public directory and reference it here */}
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
