import { AiCurator } from '@/components/aura/AiCurator';
import { GameCard } from '@/components/aura/GameCard';
import { StoreCarousel } from '@/components/aura/StoreCarousel';
import { games } from '@/lib/mock-data';

export default function StorePage() {
  const newReleases = [...games].sort(() => 0.5 - Math.random()).slice(0, 6);
  const topRated = [...games].sort((a, b) => b.rating - a.rating).slice(0, 6);

  return (
    <div className="w-full animate-in fade-in duration-500">
      <StoreCarousel />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-16">
          <h2 className="text-3xl font-headline mb-6">AI Curator Weekly</h2>
          <AiCurator />
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-headline mb-6">Top Rated</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {topRated.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-3xl font-headline mb-6">New Releases</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {newReleases.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
