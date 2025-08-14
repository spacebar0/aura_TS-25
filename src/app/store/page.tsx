import { AiCurator } from '@/components/aura/AiCurator';
import { GameCard } from '@/components/aura/GameCard';
import { StoreCarousel } from '@/components/aura/StoreCarousel';
import { games } from '@/lib/mock-data';

export default function StorePage() {
  const newReleases = [...games].sort(() => 0.5 - Math.random()).slice(0, 7);
  const topRated = [...games].sort((a, b) => b.rating - a.rating).slice(0, 7);

  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <StoreCarousel />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="my-16">
          <h2 className="text-3xl font-headline mb-6">AI Curator Weekly</h2>
          <AiCurator />
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-headline mb-6">Top Rated</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-12">
            <div className="md:col-span-2">
               {topRated.length > 0 && <GameCard game={topRated[0]} variant="landscape" showPrice />}
            </div>
             {topRated.slice(1, 3).map((game) => (
              <GameCard key={game.id} game={game} variant="landscape" showPrice />
            ))}
            {topRated.slice(3, 7).map((game) => (
              <GameCard key={game.id} game={game} variant="landscape" showPrice />
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-3xl font-headline mb-6">New Releases</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-12">
            {newReleases.slice(0, 2).map((game) => (
              <GameCard key={game.id} game={game} variant="landscape" showPrice />
            ))}
            <div className="md:col-span-2">
               {newReleases.length > 2 && <GameCard game={newReleases[2]} variant="landscape" showPrice />}
            </div>
            {newReleases.slice(3, 7).map((game) => (
              <GameCard key={game.id} game={game} variant="landscape" showPrice />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
