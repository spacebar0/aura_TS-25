import { GameCard } from '@/components/aura/GameCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { games } from '@/lib/mock-data';
import { SlidersHorizontal } from 'lucide-react';

const allGames = [...games].sort((a, b) => a.title.localeCompare(b.title));
const recentGames = [...games].sort((a, b) => new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime());
const actionGames = games.filter(g => g.genre.toLowerCase().includes('action'));
const rpgGames = games.filter(g => g.genre.toLowerCase().includes('rpg'));

export default function LibraryPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-headline font-medium text-glow">
            Game Library
          </h1>
          <p className="text-muted-foreground mt-2">
            All your games, ready to play.
          </p>
        </div>
      </header>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="recent">Recently Played</TabsTrigger>
          <TabsTrigger value="action">Action</TabsTrigger>
          <TabsTrigger value="rpg">RPG</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 sm:gap-x-6 gap-y-12">
            {allGames.map((game) => (
              <GameCard key={game.id} game={game} variant="landscape" showPrice />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="recent">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 sm:gap-x-6 gap-y-12">
            {recentGames.map((game) => (
              <GameCard key={game.id} game={game} variant="landscape" showPrice />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="action">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 sm:gap-x-6 gap-y-12">
                {actionGames.map((game) => (
                <GameCard key={game.id} game={game} variant="landscape" showPrice />
                ))}
            </div>
        </TabsContent>
        <TabsContent value="rpg">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 sm:gap-x-6 gap-y-12">
                {rpgGames.map((game) => (
                <GameCard key={game.id} game={game} variant="landscape" showPrice />
                ))}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
