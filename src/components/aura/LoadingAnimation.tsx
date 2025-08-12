// src/components/aura/LoadingAnimation.tsx
'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

export function LoadingAnimation({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  const [stage, setStage] = useState(0);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    setGreeting(getGreeting());
    const timers = [
      setTimeout(() => setStage(1), 500), // Start HCET animation
      setTimeout(() => setStage(2), 2500), // Start greeting animation
      setTimeout(() => setStage(3), 4000), // Fade out everything
      setTimeout(onAnimationComplete, 5000), // Complete
    ];
    return () => timers.forEach(clearTimeout);
  }, [onAnimationComplete]);

  const hcetVariants = {
    hidden: { opacity: 0, scaleY: 0 },
    visible: { 
      opacity: 1, 
      scaleY: 1,
      transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } 
    },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  const greetingVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1.5,
      transition: { duration: 1.5, ease: [0.34, 1.56, 0.64, 1] } 
    },
     exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  const particleContainerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.02,
      },
    },
  };

  const particleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: Math.random() * 0.5 + 0.2,
      scale: Math.random() * 0.8 + 0.2,
      x: (Math.random() - 0.5) * window.innerWidth * 1.5,
      y: (Math.random() - 0.5) * window.innerHeight * 1.5,
      transition: {
        duration: Math.random() * 2 + 1,
        ease: 'easeInOut',
        delay: i * 0.01,
        repeat: Infinity,
        repeatType: 'mirror',
      },
    }),
  };


  return (
    <div className="w-full h-full flex items-center justify-center bg-background overflow-hidden relative">
       <AnimatePresence>
        {(stage >= 1) && (
          <motion.div
            variants={particleContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 z-0"
          >
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={particleVariants}
                className="absolute rounded-full bg-primary/50"
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
      </AnimatePresence>

      <AnimatePresence>
        {stage === 1 && (
          <motion.div
            key="hcet"
            variants={hcetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="font-extralight text-8xl md:text-9xl tracking-widest text-center text-foreground/80 leading-none"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 100 }}
          >
            <div>HCET</div>
            <div className="text-reflect-vertical">TECH</div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {stage === 2 && (
          <motion.h1
            key="greeting"
            variants={greetingVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-6xl md:text-8xl font-headline font-medium text-glow z-10"
          >
            {greeting}
          </motion.h1>
        )}
      </AnimatePresence>
    </div>
  );
}
