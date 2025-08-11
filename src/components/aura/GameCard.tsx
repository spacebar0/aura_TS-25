import Image from 'next/image';
import type { Game } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Users, History } from 'lucide-react';

type GameCardProps = {
  game: Game;
  className?: string;
};

export function GameCard({ game, className }: GameCardProps) {
  const friendsPlaying = Math.floor(Math.random() * 10); // Mock data for friends playing

  return (
    <Card
      className={cn(
        'group relative aspect-[3/4] w-60 overflow-hidden rounded-lg transition-all duration-300 ease-in-out',
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
      <div className="absolute bottom-0 left-0 right-0 p-4 transition-all duration-500 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
        <h3 className="font-headline text-lg font-bold text-white text-glow truncate">
          {game.title}
        </h3>
        <div className="mt-2 space-y-2 text-xs text-white/80">
          <div className="flex items-center gap-2">
            <History className="w-3 h-3" />
            <span>Last played: {game.lastPlayed}</span>
          </div>
          {friendsPlaying > 0 && (
            <div className="flex items-center gap-2">
              <Users className="w-3 h-3" />
              <span>{friendsPlaying} friends playing</span>
            </div>
          )}
        </div>
      </div>
      <a
        href="#"
        className="absolute inset-0"
        aria-label={`View ${game.title}`}
      ></a>
    </Card>
  );
}
