import Image from 'next/image';
import type { Game } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

type GameCardProps = {
  game: Game;
  className?: string;
};

export function GameCard({ game, className }: GameCardProps) {
  return (
    <Card
      className={cn(
        'group relative aspect-[3/4] overflow-hidden rounded-lg transition-all duration-300 ease-in-out',
        'hover:scale-105 hover:shadow-2xl hover:shadow-primary/40 focus-within:scale-105 focus-within:shadow-2xl focus-within:shadow-primary/40',
        className
      )}
    >
      <Image
        src={game.cover}
        alt={game.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        data-ai-hint="game poster"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h3 className="font-headline text-sm font-bold text-white truncate group-hover:text-glow">
          {game.title}
        </h3>
      </div>
      <a href="#" className="absolute inset-0" aria-label={`View ${game.title}`}></a>
    </Card>
  );
}
