'use client';

import { useState } from 'react';
import { LibraryGameCard } from '@/components/aura/LibraryGameCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePinnedGames } from '@/context/PinnedGamesContext';
import { games } from '@/lib/mock-data';
import { Pin } from 'lucide-react';
import { AppLifecycle } from '../app-lifecycle';
import { useGamepad } from '@/hooks/use-gamepad';

const tabValues = ['all', 'pinned', 'recent', 'action', 'rpg'];

const allGames = [...games].sort((a, b) => a.title.localeCompare(b.title));
const recentGames = [...games].sort((a, b) => new Date(b.lastPlayedDate).getTime() - new Date(a.lastPlayedDate).getTime());
const actionGames = games.filter(g => g.genre.toLowerCase().includes('action'));
const rpgGames = games.filter(g => g.genre.toLowerCase().includes('rpg'));

function LibraryPageContent() {
  const { pinnedGames } = usePinnedGames();
  const [activeTab, setActiveTab] = useState(tabValues[0]);

  useGamepad({
    onLeft: () => {
      const currentIndex = tabValues.indexOf(activeTab);
      const nextIndex = (currentIndex - 1 + tabValues.length) % tabValues.length;
      setActiveTab(tabValues[nextIndex]);
    },
    onRight: () => {
      const currentIndex = tabValues.indexOf(activeTab);
      const nextIndex = (currentIndex + 1) % tabValues.length;
      setActiveTab(tabValues[nextIndex]);
    },
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-poppins font-medium text-glow">
            Game Vault
          </h1>
          <p className="text-muted-foreground mt-2 font-silkscreen">
            All your games, ready to play.
          </p>
        </div>
      </header>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pinned">Pinned</TabsTrigger>
          <TabsTrigger value="recent">Recently Played</TabsTrigger>
          <TabsTrigger value="action">Action</TabsTrigger>
          <TabsTrigger value="rpg">RPG</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 sm:gap-x-6 gap-y-12">
            {allGames.map((game) => (
              <LibraryGameCard key={game.id} game={game} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="pinned">
            {pinnedGames.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 sm:gap-x-6 gap-y-12">
                    {pinnedGames.map((game) => (
                    <LibraryGameCard key={game.id} game={game} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-center h-64 glass-pane rounded-lg">
                    <Pin className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium">No Pinned Games</h3>
                    <p className="text-muted-foreground mt-2">
                        You can pin games from the home screen to see them here.
                    </p>
                </div>
            )}
        </TabsContent>
        <TabsContent value="recent">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 sm:gap-x-6 gap-y-12">
            {recentGames.map((game) => (
              <LibraryGameCard key={game.id} game={game} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="action">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 sm:gap-x-6 gap-y-12">
                {actionGames.map((game) => (
                <LibraryGameCard key={game.id} game={game} />
                ))}
            </div>
        </TabsContent>
        <TabsContent value="rpg">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 sm:gap-x-6 gap-y-12">
                {rpgGames.map((game) => (
                <LibraryGameCard key={game.id} game={game} />
                ))}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}


export default function LibraryPage() {
    return (
        <AppLifecycle>
            <LibraryPageContent />
        </AppLifecycle>
    )
}
