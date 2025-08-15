'use client';

import Image from 'next/image';
import { StoreGameCard } from '@/components/aura/StoreGameCard';
import { userProfile } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { usePinnedGames } from '@/context/PinnedGamesContext';

const ranks = [
    { name: 'Lumen', level: 1, color: 'text-gray-400' },
    { name: 'Radiant', level: 2, color: 'text-white' },
    { name: 'Halo', level: 3, color: 'text-sky-300' },
    { name: 'Prism', level: 4, color: 'text-pink-400' },
    { name: 'Nova', level: 5, color: 'text-orange-400' },
    { name: 'Eclipse', level: 6, color: 'text-indigo-400' },
    { name: 'Zenith', level: 7, color: 'text-yellow-300' },
    { name: 'Ascend', level: 8, color: 'text-green-300' },
    { name: 'Celestia', level: 9, color: 'text-purple-400' },
    { name: 'Infinity', level: 10, color: 'text-red-500 text-glow' },
];

const achievements = [
    { game: 'Cyber Runner 2099', rankName: 'Nova' },
    { game: 'Galaxy Raiders', rankName: 'Zenith' },
    { game: 'Aethelgard Online', rankName: 'Eclipse' },
    { game: 'The Last Sentinel', rankName: 'Ascend' },
    { game: 'Blade Symphony', rankName: 'Infinity' },
]

export default function ProfilePage() {
  const { pinnedGames } = usePinnedGames();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      <header className="flex items-center gap-6 mb-12">
        <Image
          src={userProfile.avatar}
          alt={userProfile.name}
          width={100}
          height={100}
          className="rounded-full border-4 border-primary"
          data-ai-hint="futuristic avatar"
        />
        <div>
          <h1 className="text-5xl font-poppins font-medium text-glow">
            {userProfile.name}
          </h1>
          <p className="font-silkscreen mt-2 text-primary/90">
            AURA Founder | Level 99
          </p>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-poppins mb-6">Pinned Games</h2>
        {pinnedGames.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {pinnedGames.map((game) => (
              <StoreGameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
            <p className="text-muted-foreground">No games pinned yet. Pin a game from the home screen!</p>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-poppins mb-6">Achievements</h2>
        <Card className="glass-pane border-primary/50">
            <CardContent className="p-6">
                <div className="space-y-6">
                    {achievements.map((ach) => {
                        const rank = ranks.find(r => r.name === ach.rankName);
                        const progress = rank ? (rank.level / ranks.length) * 100 : 0;
                        return (
                            <div key={ach.game} className="flex items-center gap-4">
                                <div className="flex-1">
                                    <p className="font-medium text-lg">{ach.game}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Star className={cn("w-5 h-5", rank?.color)} />
                                        <span className={cn("font-bold text-lg", rank?.color)}>
                                            {ach.rankName}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-1/2">
                                     <Progress value={progress} className="h-2 bg-muted/30" />
                                     <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                         <span>Level {rank?.level}</span>
                                         <span>Next: {ranks.find(r => r.level === (rank?.level ?? 0) + 1)?.name || 'Max'}</span>
                                     </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
      </section>
    </div>
  );
}
