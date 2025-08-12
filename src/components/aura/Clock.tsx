// src/components/aura/Clock.tsx
'use client';

import { useState, useEffect } from 'react';

export function Clock() {
  const [time, setTime] = useState('');
  const [greeting, setGreeting] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const getGreeting = (hour: number) => {
      if (hour < 12) {
        return 'Good morning';
      } else if (hour < 18) {
        return 'Good afternoon';
      } else {
        return 'Good evening';
      }
    };
    
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      const currentHour = now.getHours();
      
      setTime(timeString);
      setGreeting(getGreeting(currentHour));
    };

    updateClock();
    const intervalId = setInterval(updateClock, 1000 * 60); // Update every minute

    return () => clearInterval(intervalId);
  }, [isClient]);

  if (!isClient) {
    // Render a placeholder on the server and during the initial client render
    return (
      <div className="text-center">
        <div className="h-12 mb-2 bg-muted/20 rounded-md w-72 mx-auto animate-pulse"></div>
        <div className="h-6 bg-muted/20 rounded-md w-24 mx-auto animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="text-center">
       <h1 className="text-5xl font-headline font-normal mb-2 relative text-reflect">
          <span className="sparkle-text">{greeting}</span>
        </h1>
      <p className="text-muted-foreground">
        {time}
      </p>
    </div>
  );
}
