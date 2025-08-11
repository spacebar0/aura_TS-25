'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { GameCard } from '@/components/aura/GameCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { games } from '@/lib/mock-data';
import { MusicCard } from '@/components/aura/MusicCard';
import { LibraryCard } from '@/components/aura/LibraryCard';
import { Clock } from '@/components/aura/Clock';

export default function HomePage() {
  const allItems = [
    { type: 'music', id: 'music-card' },
    ...games.map((g) => ({ ...g, type: 'game' })),
    { type: 'library', id: 'library-card' },
  ];

  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true }));
  const inactivityTimer = useRef<NodeJS.Timeout>();
  const [api, setApi] = useState<CarouselApi>()

  const startAutoplay = useCallback(() => {
    plugin.current.play();
  }, []);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    plugin.current.stop();
    inactivityTimer.current = setTimeout(startAutoplay, 180000); // 3 minutes
  }, [startAutoplay]);

  useEffect(() => {
    if (!api) {
      return
    }

    resetInactivityTimer();

    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('keydown', resetInactivityTimer);
    window.addEventListener('scroll', resetInactivityTimer);
    window.addEventListener('click', resetInactivityTimer);

    api.on('pointerDown', resetInactivityTimer)
    
    return () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('keydown', resetInactivityTimer);
      window.removeEventListener('scroll', resetInactivityTimer);
      window.removeEventListener('click', resetInactivityTimer);
    };
  }, [api, resetInactivityTimer]);


  return (
    <div className="w-full h-full flex flex-col items-center justify-center animate-in fade-in duration-500">
      <div className="py-8 text-center">
        <Clock />
      </div>
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{
          align: 'center',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {allItems.map((item, index) => (
            <CarouselItem
              key={item.id}
              className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <div className="flex justify-center">
                {item.type === 'game' && <GameCard game={item} />}
                {item.type === 'music' && <MusicCard />}
                {item.type === 'library' && <LibraryCard />}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
