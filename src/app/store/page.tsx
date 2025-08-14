import { AiCurator } from '@/components/aura/AiCurator';
import { StoreGameCard } from '@/components/aura/StoreGameCard';
import { StoreCarousel } from '@/components/aura/StoreCarousel';
import { games } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

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
          <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-3 gap-4 sm:gap-6">
            {topRated.map((game, index) => (
              <div
                key={game.id}
                className={cn({
                  'md:col-span-2 md:row-span-2': index === 0,
                  'md:col-span-1 md:row-span-1': index > 0,
                })}
              >
                <StoreGameCard
                  game={game}
                  showPrice
                  className="h-full"
                />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-headline mb-6">New Releases</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-3 gap-4 sm:gap-6">
            {newReleases.map((game, index) => (
              <div
                key={game.id}
                className={cn({
                  'md:col-span-2 md:row-span-2': index === 0,
                  'md:col-span-1 md:row-span-1': index > 0,
                })}
              >
                <StoreGameCard
                  game={game}
                  showPrice
                  className="h-full"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
