'use client';

import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export default function ParallaxBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

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

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-background">
        <div 
          className="absolute inset-[-20%] bg-gradient-to-br from-primary/10 via-transparent to-accent/10"
          style={layerStyle(5)}
        />
        <div 
          className="absolute inset-[-20%] bg-gradient-to-tl from-primary/5 via-transparent to-accent/5 opacity-50"
          style={layerStyle(15)}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-background via-background to-transparent" />
    </div>
  );
}
