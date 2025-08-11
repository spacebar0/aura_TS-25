import { AiCurator } from '@/components/aura/AiCurator';
import { GameCard } from '@/components/aura/GameCard';
import { games } from '@/lib/mock-data';

export default function StorePage() {
  const newReleases = [...games].sort(() => 0.5 - Math.random()).slice(0, 6);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-5xl font-headline font-bold text-glow">Store</h1>
        <p className="text-muted-foreground mt-2">
          Discover your next favorite game.
        </p>
      </header>

      <section className="mb-16">
        <h2 className="text-3xl font-headline mb-6">AI Curator Weekly</h2>
        <AiCurator />
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
  );
}
