import Image from 'next/image';
import { StoreGameCard } from '@/components/aura/StoreGameCard';
import { userProfile } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';

export default function ProfilePage() {
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
        <h2 className="text-3xl font-silkscreen mb-6">Pinned Games</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {userProfile.pinnedGames.map((game) => (
            <StoreGameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-silkscreen mb-6">Trophy Case</h2>
        <Card className="glass-pane border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="text-primary" />
              <span>3D Trophy Case</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-48 bg-background/50 rounded-lg">
              <p className="text-muted-foreground">
                3D Trophy Showcase coming soon.
              </p>
            </div>
          </CardContent>
        </card>
      </section>
    </div>
  );
}
