// src/components/aura/StoreCarousel.tsx
'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { games, type Game } from '@/lib/mock-data';
import { Button } from '../ui/button';

export function StoreCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const featuredGames = [...games]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {featuredGames.map((game) => (
          <CarouselItem key={game.id}>
            <div className="relative w-full h-[50vh] md:h-[60vh]">
              <Image
                src={game.cover}
                alt={game.title}
                fill
                className="object-cover object-center"
                data-ai-hint="gameplay screenshot"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 lg:p-16 max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-headline font-bold text-glow text-white mb-4">
                  {game.title}
                </h2>
                <p className="text-base md:text-lg text-white/80 mb-6">
                  {game.description}
                </p>
                <Button size="lg" className="text-lg py-6 px-8">
                  Play Now
                </Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
    </Carousel>
  );
}
