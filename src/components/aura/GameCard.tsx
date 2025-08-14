import Image from 'next/image';
import type { Game } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '../ui/badge';

type GameCardProps = {
  game: Game;
  className?: string;
  variant?: 'portrait' | 'landscape';
  showPrice?: boolean;
};

export function GameCard({ game, className, variant = 'portrait', showPrice = false }: GameCardProps) {
  return (
    <div className={cn('flex flex-col h-full', className)}>
      <Card
        className={cn(
          'group relative overflow-hidden rounded-lg transition-all duration-300 ease-in-out',
          'hover:scale-105 hover:shadow-2xl hover:shadow-primary/40 focus-within:scale-105 focus-within:shadow-2xl focus-within:shadow-primary/40',
           'flex-grow',
          {
            'aspect-square': variant === 'portrait',
            'aspect-[4/3]': variant === 'landscape',
          },
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
      {showPrice && (
        <div className="mt-2 text-left">
          <h3 className="font-medium text-sm truncate text-foreground">{game.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            {game.discount && (
              <Badge variant="destructive" className="bg-orange-500 text-white text-xs">{game.discount}</Badge>
            )}
            {game.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">{game.originalPrice}</span>
            )}
            <span className="text-sm font-medium text-foreground">{game.price}</span>
          </div>
        </div>
      )}
    </div>
  );
}
