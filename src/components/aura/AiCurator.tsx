'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
import { getCuratedCapsules } from '@/app/actions';
import { AuraBeamLoader } from './AuraBeamLoader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

type Capsule = {
  title: string;
  description: string;
};

export function AiCurator() {
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCuration = async () => {
    setIsLoading(true);
    setError(null);
    setCapsules([]);
    try {
      const result = await getCuratedCapsules();
      
      if ('error' in result) {
        setError(result.error);
      } else {
        setCapsules(result);
      }

    } catch (e) {
      setError('Failed to generate recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="glass-pane border-accent/50">
      <CardHeader>
        <CardTitle>Your Personalized Capsules</CardTitle>
        <CardDescription>
          Let our AI curator craft weekly game collections just for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-64">
            <AuraBeamLoader />
          </div>
        ) : (
          <>
            {error && <p className="text-destructive text-center py-8">{error}</p>}
            {capsules.length === 0 && !error && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <p className="text-muted-foreground mb-4">
                  Discover game collections tailored to your taste.
                </p>
                <Button onClick={handleCuration} disabled={isLoading}>
                  <Wand2 className="mr-2 h-4 w-4" />
                  {isLoading ? 'Generating...' : 'Curate For Me'}
                </Button>
              </div>
            )}
            {capsules.length > 0 && (
              <div className="grid md:grid-cols-3 gap-4">
                {capsules.map((capsule, index) => (
                  <Card key={index} className="bg-background/40">
                    <CardHeader>
                      <CardTitle className="text-primary text-glow text-lg">
                        {capsule.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{capsule.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
