import Image from 'next/image';
import { GameCard } from '@/components/aura/GameCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { games, featuredGames } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      <section className="my-12">
        <h2 className="text-3xl font-headline mb-6">Featured</h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {featuredGames.map((game, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="relative aspect-video w-full rounded-lg overflow-hidden group">
                  <Image
                    src={game.cover}
                    alt={game.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint="game cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-headline text-white">
                      {game.title}
                    </h3>
                    <p className="text-white/80 text-sm mt-1">
                      {game.description}
                    </p>
                    <Button size="sm" className="mt-4">
                      <Play className="mr-2 h-4 w-4" />
                      Play Now
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </section>

      <section>
        <h2 className="text-3xl font-headline mb-6">Quick Play</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {games.slice(0, 12).map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </div>
  );
}
