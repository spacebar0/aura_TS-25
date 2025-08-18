
// src/app/home/page.tsx
'use client';

import { useRef, useEffect, useCallback, useState, useMemo } from 'react';
import { HomeGameCard } from '@/components/aura/HomeGameCard';
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
import { Users, History, Pin, PinOff } from 'lucide-react';
import ParallaxBackground from '@/components/aura/ParallaxBackground';
import { usePinnedGames } from '@/context/PinnedGamesContext';
import { Button } from '@/components/ui/button';
import { AppLifecycle } from '../app-lifecycle';
import { useFocus } from '@/context/FocusContext';

type CarouselItemType = (Game & { type: 'game' }) | { type: 'music', id: string } | { type: 'library', id: string };

function HomePageContent() {
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
  const { pinnedGames, togglePinGame } = usePinnedGames();
  const { setHomeCarouselApi } = useFocus();

  // Expose the carousel API to the global context for gamepad control
  useEffect(() => {
    if (api) {
      setHomeCarouselApi(api);
    }
  }, [api, setHomeCarouselApi]);


  useEffect(() => {
    setIsClient(true);
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

    const genericReset = (e: Event) => {
        // Prevent reset if the key is 's'
        if (e instanceof KeyboardEvent && e.key.toLowerCase() === 's') {
            return;
        }
        resetInactivityTimer();
    }

    window.addEventListener('mousemove', genericReset);
    window.addEventListener('keydown', genericReset);
    window.addEventListener('scroll', genericReset);
    window.addEventListener('click', genericReset);
    
    return () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
      api?.off('select', onSelect);
      window.removeEventListener('mousemove', genericReset);
      window.removeEventListener('keydown', genericReset);
      window.removeEventListener('scroll', genericReset);
      window.removeEventListener('click', genericReset);
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
  const isPinned = selectedGame ? pinnedGames.some(p => p.id === selectedGame.id) : false;
  
  return (
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
                className="pl-4 basis-auto"
              >
                <div className="flex justify-center w-[18vw] h-[18vw] max-w-[220px] max-h-[220px]">
                  {item.type === 'game' && <HomeGameCard game={item} />}
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
              className="fixed bottom-24 left-8 z-20 p-4 rounded-lg glass-pane flex items-start gap-4"
            >
              <div>
                <h3 className="font-poppins text-2xl font-medium text-white text-glow">
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
              </div>
               <Button
                variant="ghost"
                size="icon"
                onClick={() => togglePinGame(selectedGame)}
                className="text-white/70 hover:text-white hover:bg-white/20"
                aria-label={isPinned ? 'Unpin game' : 'Pin game'}
              >
                {isPinned ? <PinOff className="w-5 h-5 text-primary" /> : <Pin className="w-5 h-5" />}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}


export default function HomePage() {
  return (
    <AppLifecycle>
      <HomePageContent />
    </AppLifecycle>
  )
}
