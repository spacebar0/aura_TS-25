'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wand2, Sparkles, ShoppingCart } from 'lucide-react';
import { getCuratedCapsules } from '@/app/actions';
import { AuraBeamLoader } from './AuraBeamLoader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import type { CurateStoreCapsulesOutput } from '@/ai/flows/curate-store-capsules';
import { StoreGameCard } from './StoreGameCard';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

export function AiCurator() {
  const [curation, setCuration] = useState<CurateStoreCapsulesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCuration = async () => {
    setIsLoading(true);
    setError(null);
    setCuration(null);
    try {
      const result = await getCuratedCapsules();
      
      if ('error' in result) {
        setError(result.error);
      } else {
        setCuration(result);
      }

    } catch (e) {
      setError('Failed to generate recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="glass-pane border-accent/50 overflow-hidden">
      <CardHeader>
        <CardTitle>Your Personalized Capsules</CardTitle>
        <CardDescription>
          Let our AI curator craft weekly game collections just for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="h-96">
            <AuraBeamLoader />
          </div>
        )}

        {!isLoading && !curation && (
          <div className="flex flex-col items-center justify-center h-96 text-center">
            {error ? (
              <p className="text-destructive">{error}</p>
            ) : (
              <>
                <p className="text-muted-foreground mb-4">
                  Discover game collections and a unique bundle tailored to your taste.
                </p>
                <Button onClick={handleCuration}>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Curate For Me
                </Button>
              </>
            )}
          </div>
        )}

        {curation && (
          <div className="space-y-8">
            {/* Recommended Games */}
            <div className="grid md:grid-cols-3 gap-6">
              {curation.recommendedGames.map((game, index) => (
                <Card key={index} className="bg-background/40 flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-primary text-glow text-lg">
                      {game.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{game.genre}</span>
                        <span>&middot;</span>
                        <span>{game.price}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground">{game.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator />
            
            {/* AI Bundle Section */}
            <div className="group">
               <Card className="bg-gradient-to-tr from-primary/20 via-background to-accent/20 border-primary/50 p-6 relative overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/30 group-hover:scale-[1.02]">
                <div className="absolute top-4 right-4 text-primary text-glow">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-headline text-glow text-primary mb-2">
                  {curation.aiBundle.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  A special, limited-time offer curated just for you by AURA AI.
                </p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {(curation.recommendedGames as any[]).map(game => (
                    <StoreGameCard key={game.id} game={game} />
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-baseline gap-3">
                        <Badge className="text-xl" variant="destructive">{curation.aiBundle.discount}</Badge>
                        <span className="text-xl line-through text-muted-foreground">{curation.aiBundle.totalPrice}</span>
                        <span className="text-3xl font-bold text-glow text-primary">{curation.aiBundle.bundlePrice}</span>
                    </div>
                    <Button size="lg" className="w-full sm:w-auto">
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Purchase Bundle
                    </Button>
                </div>
              </Card>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
