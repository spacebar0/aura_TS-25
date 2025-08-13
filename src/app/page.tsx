'use client';

import { useRef, useEffect, useCallback, useState, useMemo } from 'react';
import { GameCard } from '@/components/aura/GameCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Game, games } from '@/lib/mock-data';
import { MusicCard } from '@/components/aura/MusicCard';
import { LibraryCard } from '@/components/aura/LibraryCard';
import { Clock } from '@/components/aura/Clock';
import { AnimatePresence, motion } from 'framer-motion';
import { Users, History } from 'lucide-react';
import ParallaxBackground from '@/components/aura/ParallaxBackground';
import { LoadingAnimation } from '@/components/aura/LoadingAnimation';

type CarouselItemType = (Game & { type: 'game' }) | { type: 'music', id: string } | { type: 'library', id: string };

export default function HomePage() {
  const allItems: CarouselItemType[] = useMemo(() => [
    { type: 'music', id: 'music-card' },
    ...games.map((g) => ({ ...g, type: 'game' as const })),
    { type: 'library', id: 'library-card' },
  ], []);

  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true }));
  const inactivityTimer = useRef<NodeJS.Timeout>();
  const [api, setApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
  const [friendsPlaying, setFriendsPlaying] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000); // 6 seconds

    return () => clearTimeout(timer);
  }, []);

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

  const onSelect = useCallback((carouselApi: CarouselApi) => {
    setSelectedIndex(carouselApi.selectedScrollSnap());
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  useEffect(() => {
    if (!api) {
      return
    }

    resetInactivityTimer();
    onSelect(api);

    api.on('select', onSelect);
    api.on('pointerDown', resetInactivityTimer)

    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('keydown', resetInactivityTimer);
    window.addEventListener('scroll', resetInactivityTimer);
    window.addEventListener('click', resetInactivityTimer);
    
    return () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
      api?.off('select', onSelect);
      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('keydown', resetInactivityTimer);
      window.removeEventListener('scroll', resetInactivityTimer);
      window.removeEventListener('click', resetInactivityTimer);
    };
  }, [api, resetInactivityTimer, onSelect]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 's') {
        startAutoplay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [startAutoplay]);

  useEffect(() => {
    const currentItem = allItems[selectedIndex];
    if (currentItem?.type === 'game') {
      setBackgroundUrl(currentItem.cover);
       if (isClient) {
        setFriendsPlaying(Math.floor(Math.random() * 10));
      }
    } else {
      setBackgroundUrl(null);
    }
  }, [selectedIndex, allItems, isClient]);

  const selectedGame = allItems[selectedIndex]?.type === 'game' ? allItems[selectedIndex] as Game : null;
  
  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingAnimation onAnimationComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <ParallaxBackground backgroundUrl={backgroundUrl} />
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full h-full flex flex-col items-center justify-center relative"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
              className="py-8 text-center"
            >
              <Clock />
            </motion.div>
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
                    className="pl-4 basis-[40%] sm:basis-[30%] md:basis-1/4 lg:basis-1/5"
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

            <AnimatePresence>
              {selectedGame && (
                <motion.div
                  key={selectedGame.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="fixed bottom-24 left-8 z-20 p-4 rounded-lg glass-pane"
                >
                  <h3 className="font-headline text-2xl font-medium text-white text-glow">
                    {selectedGame.title}
                  </h3>
                  <div className="mt-2 space-y-2 text-sm text-white/80">
                    <div className="flex items-center gap-2">
                      <History className="w-4 h-4" />
                      <span>Last played: {selectedGame.lastPlayed}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{friendsPlaying} friends playing</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </>
  );
}
