import Image from 'next/image';
import { GameCard } from '@/components/aura/GameCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
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

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-center h-full animate-in fade-in duration-500">
      <h1 className="text-5xl font-headline font-bold text-glow mb-2">AURA</h1>
      <Clock />
      <Carousel
        opts={{
          align: 'center',
          loop: true,
        }}
        className="w-full max-w-5xl"
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
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
}
