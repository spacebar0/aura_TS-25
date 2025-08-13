import Image from 'next/image';
import type { Game } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

type GameCardProps = {
  game: Game;
  className?: string;
  variant?: 'portrait' | 'landscape';
};

export function GameCard({ game, className, variant = 'portrait' }: GameCardProps) {
  return (
    <Card
      className={cn(
        'group relative w-full overflow-hidden rounded-lg transition-all duration-300 ease-in-out',
        'hover:scale-105 hover:shadow-2xl hover:shadow-primary/40 focus-within:scale-105 focus-within:shadow-2xl focus-within:shadow-primary/40',
        {
          'aspect-square': variant === 'portrait',
          'aspect-[4/3]': variant === 'landscape',
        },
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      <a
        href="#"
        className="absolute inset-0"
        aria-label={`View ${game.title}`}
      ></a>
    </Card>
  );
}
