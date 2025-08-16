// src/components/aura/LoadingAnimation.tsx
'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingAnimation({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  const [isAnimating, setIsAnimating] = useState(true);
  const [showParticles, setShowParticles] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setShowParticles(true);
    
    // Create and play the audio inside the effect to better handle browser policies
    audioRef.current = new Audio('/audio/startup2.mp3');
    audioRef.current.loop = true;
    
    const playPromise = audioRef.current.play();

    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Autoplay was prevented.
        console.error("Audio autoplay failed:", error);
      });
    }

    const completeTimer = setTimeout(() => {
      setIsAnimating(false);
    }, 8000); // Start fade-out at 8 seconds

    const unmountTimer = setTimeout(onAnimationComplete, 9000); // Unmount at 9 seconds

    return () => {
      clearTimeout(completeTimer);
      clearTimeout(unmountTimer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [onAnimationComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      transition: { duration: 1, ease: 'easeInOut' },
    },
  };

  const hcetVariants = {
    hidden: { opacity: 0, scaleY: 0 },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      scaleY: 1.5,
      opacity: 0,
      transition: { duration: 1.5, ease: [0.6, 0.01, 0.05, 0.95] },
    },
  };

  const particleContainerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.02,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const particleVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: (i: number) => ({
      opacity: Math.random() * 0.8 + 0.4,
      scale: Math.random() * 1.2 + 0.3,
      x: `${(Math.random() - 0.5) * 150}vw`,
      y: `${(Math.random() - 0.5) * 150}vh`,
      transition: {
        duration: Math.random() * 4 + 4, // Slower: 4 to 8 seconds
        ease: 'linear',
        delay: i * 0.01,
        repeat: Infinity,
        repeatType: 'mirror',
      },
    }),
  };

  return (
    <motion.div
      key="loading-screen"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full flex items-center justify-center bg-background overflow-hidden fixed inset-0 z-50"
    >
      <AnimatePresence>
        {isAnimating && (
          <>
            {showParticles && (
              <motion.div
                key="particles"
                variants={particleContainerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 z-0"
              >
                {[...Array(100)].map((_, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={particleVariants}
                    className="absolute particle bg-primary/50"
                    style={{
                      width: `${Math.random() * 15 + 5}px`,
                      height: `${Math.random() * 15 + 5}px`,
                      top: '50%',
                      left: '50%',
                    }}
                  />
                ))}
              </motion.div>
            )}

            <motion.div
              key="hcet"
              variants={hcetVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="font-extralight text-8xl md:text-9xl tracking-widest text-center text-foreground/80 leading-none z-10"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 100 }}
            >
              <div>HCET</div>
              <div className="text-reflect-vertical opacity-50">TECH</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
