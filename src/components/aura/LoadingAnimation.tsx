// src/components/aura/LoadingAnimation.tsx
'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingAnimation({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 500), // Start HCET animation
      setTimeout(() => setStage(2), 3000), // Fade out everything
      setTimeout(onAnimationComplete, 4000), // Complete
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
    exit: { 
        opacity: 0,
        y: -100,
        transition: { duration: 1, ease: 'easeInOut' }
    }
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
            animate={stage === 2 ? 'hidden' : 'visible'}
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
    </div>
  );
}
