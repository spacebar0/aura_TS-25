// src/components/aura/LoadingAnimation.tsx
'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingAnimation({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const completeTimer = setTimeout(() => {
        setIsAnimating(false);
    }, 3000); 

    const unmountTimer = setTimeout(onAnimationComplete, 4000);

    return () => {
      clearTimeout(completeTimer);
      clearTimeout(unmountTimer);
    };
  }, [onAnimationComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      transition: { duration: 1, ease: 'easeInOut' }
    }
  };

  const hcetVariants = {
    hidden: { opacity: 0, scaleY: 0 },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
    },
    exit: {
      opacity: 0,
      scaleY: 20,
      transition: { duration: 1.5, ease: [0.6, 0.01, 0.05, 0.95] }
    }
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
        staggerChildren: 0.01,
      },
    }
  };

  const particleVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: (i: number) => ({
      opacity: Math.random() * 0.5 + 0.2,
      scale: Math.random() * 0.8 + 0.2,
      x: `${(Math.random() - 0.5) * 150}vw`,
      y: `${(Math.random() - 0.5) * 150}vh`,
      transition: {
        duration: Math.random() * 2 + 1, // Shortened duration
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
                      <div className="text-reflect-vertical">TECH</div>
                    </motion.div>
                  </>
            )}
        </AnimatePresence>
    </motion.div>
  );
}
