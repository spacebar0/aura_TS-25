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
      // To ensure consistency, we'll use a specific time zone for display if possible,
      // but calculate the greeting based on the user's local time.
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
    return (
      <>
        <div className="h-12 mb-2"></div>
        <div className="h-6 mb-12"></div>
      </>
    );
  }

  return (
    <>
       <h1 className="text-5xl font-headline font-normal mb-2 relative text-reflect">
          <span className="sparkle-text">{greeting}</span>
        </h1>
      <p className="text-muted-foreground mb-12">
        {time}
      </p>
    </>
  );
}
