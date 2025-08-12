'use client';

import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { AnimatePresence, motion } from 'framer-motion';

export default function ParallaxBackground({ backgroundUrl }: { backgroundUrl: string | null }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowParticles(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  const layerStyle = (factor: number): React.CSSProperties => ({
    transform: `translate3d(${mousePosition.x * factor}px, ${mousePosition.y * factor}px, 0)`,
    transition: 'transform 0.2s ease-out',
  });

  const particleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: Math.random() * 0.2 + 0.1,
      scale: Math.random() * 0.5 + 0.2,
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
      transition: {
        duration: Math.random() * 8 + 8,
        ease: 'linear',
        delay: i * 0.05,
        repeat: Infinity,
        repeatType: 'mirror',
      },
    }),
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-background">
       <AnimatePresence>
        {showParticles && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-10"
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={particleVariants}
                initial="hidden"
                animate="visible"
                className="absolute rounded-full bg-primary/30"
                style={{
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  top: '50%',
                  left: '50%',
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {backgroundUrl && (
          <motion.div
            key={backgroundUrl}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundUrl})` }}
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div 
        className="absolute inset-[-20%] bg-gradient-to-br from-primary/10 via-transparent to-accent/10"
        style={layerStyle(5)}
      />
      <div 
        className="absolute inset-[-20%] bg-gradient-to-tl from-primary/5 via-transparent to-accent/5 opacity-50"
        style={layerStyle(15)}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-background/50 via-background/80 to-background" />
    </div>
  );
}
