// src/components/aura/RecentSquadsCarousel.tsx
'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { recentPlayers, RecentPlayer } from '@/lib/mock-data';
import { RecentPlayerCard } from './RecentPlayerCard';

interface RecentSquadsCarouselProps {
  onAdd: (player: RecentPlayer) => void;
  onInvite: (player: RecentPlayer) => void;
  onMessage: (player: RecentPlayer) => void;
}

export function RecentSquadsCarousel({ onAdd, onInvite, onMessage }: RecentSquadsCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{
        align: 'start',
        slidesToScroll: 2,
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {recentPlayers.map((player) => (
          <CarouselItem key={player.id} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
            <div className="h-full">
              <RecentPlayerCard 
                player={player}
                onAdd={onAdd}
                onInvite={onInvite}
                onMessage={onMessage}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}
