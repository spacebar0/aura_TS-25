
'use client';

import { Header } from "@/components/aura/Header";
import { Dock } from "@/components/aura/Dock";
import { LoadingAnimation } from "@/components/aura/LoadingAnimation";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export function AppLifecycle({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 9000); // 9 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleAnimationComplete = () => {
    setIsLoading(false);
    // Play audio after the app is 'interactive'
    if (audioRef.current) {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
  }

  useEffect(() => {
    // Setup audio element once on mount
    audioRef.current = new Audio('/audio/startup2.mp3');
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingAnimation onAnimationComplete={handleAnimationComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Header />
          <div className="relative z-10 flex flex-col h-full">
            <main className="flex-1 flex pt-16 pb-24 overflow-y-auto">{children}</main>
          </div>
          <Dock />
        </>
      )}
    </>
  );
}
