// src/components/aura/RecentSquadsCarousel.tsx
'use client';

import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { recentPlayers } from '@/lib/mock-data';
import { RecentPlayerCard } from './RecentPlayerCard';

export function RecentSquadsCarousel() {
  return (
    <Carousel
      opts={{
        align: 'start',
        slidesToScroll: 2,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {recentPlayers.map((player) => (
          <CarouselItem key={player.id} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
            <div className="h-full">
              <RecentPlayerCard player={player} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}
