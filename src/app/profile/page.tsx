

'use client';

import Image from 'next/image';
import { StoreGameCard } from '@/components/aura/StoreGameCard';
import { userProfile, games } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Hourglass, Gamepad2, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { usePinnedGames } from '@/context/PinnedGamesContext';
import { FriendsList } from '@/components/aura/FriendsList';

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
        <Card className="glass-pane border-primary/20">
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                    <Hourglass className="w-8 h-8 text-primary mb-2" />
                    <p className="text-2xl font-bold">{userProfile.totalPlaytime}</p>
                    <p className="text-muted-foreground font-silkscreen">Total Playtime</p>
                </div>
                 <div className="flex flex-col items-center">
                    <Gamepad2 className="w-8 h-8 text-primary mb-2" />
                    <p className="text-2xl font-bold">{userProfile.gamesOwned}</p>
                    <p className="text-muted-foreground font-silkscreen">Games Played</p>
                </div>
                 <div className="flex flex-col items-center">
                    <Trophy className="w-8 h-8 text-primary mb-2" />
                    <p className="text-2xl font-bold truncate">{achievements.length}</p>
                    <p className="text-muted-foreground font-silkscreen">Achievements Won</p>
                </div>
            </CardContent>
        </Card>
      </section>

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <h2 className="text-3xl font-poppins mb-6">Achievements</h2>
          <Card className="glass-pane border-primary/50">
              <CardContent className="p-6">
                  <div className="space-y-8">
                      {achievements.map((ach) => {
                          const rank = ranks.find(r => r.name === ach.rankName);
                          const progress = rank ? (rank.level / ranks.length) * 100 : 0;
                          return (
                              <div key={ach.game} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1">
                                  {/* Game and Rank Name */}
                                  <div className="col-start-1">
                                      <p className="font-medium text-lg">{ach.game}</p>
                                      <div className="flex items-center gap-2 mt-1">
                                          <Star className={cn("w-5 h-5", rank?.color)} />
                                          <span className={cn("font-bold text-lg", rank?.color)}>
                                              {ach.rankName}
                                          </span>
                                      </div>
                                  </div>
                                  
                                  {/* Progress bar and text */}
                                  <div className="col-start-2 flex items-center gap-4">
                                    <div className="w-40">
                                        <Progress value={progress} className="h-2 bg-muted/30" />
                                    </div>
                                    <div className="text-right text-xs text-muted-foreground w-28">
                                        <span>Aura L{rank?.level}</span>
                                        <br />
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

        <section className="lg:col-span-1">
          {/* This section is intentionally left empty for the friends list */}
          <FriendsList />
        </section>
      </div>
    </div>
  );
}
