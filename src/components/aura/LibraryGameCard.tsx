import Image from 'next/image';
import type { Game } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

type LibraryGameCardProps = {
  game: Game;
};

export function LibraryGameCard({ game }: LibraryGameCardProps) {
  return (
    <div className="flex flex-col h-full">
      <Card
        className={cn(
          'group relative overflow-hidden rounded-lg transition-all duration-300 ease-in-out',
          'hover:scale-105 hover:shadow-2xl hover:shadow-primary/40 focus-within:scale-105 focus-within:shadow-2xl focus-within:shadow-primary/40',
          'flex-grow aspect-[4/3]',
          'aura-pulse-border' // Add the pulsing border class
        )}
      >
        <Image
          src={game.cover}
          alt={game.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          data-ai-hint="game poster"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <a
          href="#"
          className="absolute inset-0"
          aria-label={`View ${game.title}`}
        ></a>
      </Card>
    </div>
  );
}
