// src/components/aura/MusicCard.tsx
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Music, ListMusic, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { MusicLoginDialog } from './MusicLoginDialog';
import { MusicSidebar } from './MusicSidebar';

type MusicService = 'Spotify' | 'Apple Music' | 'YouTube Music';

export function MusicCard({ className }: { className?: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [connectedService, setConnectedService] = useState<MusicService | null>(null);

  const handleConnect = (service: MusicService) => {
    setConnectedService(service);
    setIsDialogOpen(false); // Close dialog on connect
  };

  const handleCardClick = () => {
    if (connectedService) {
      setIsSidebarOpen(true);
    }
  };

  return (
    <>
      <Card
        className={cn(
          'group relative aspect-square w-full h-full overflow-hidden rounded-lg transition-all duration-300 ease-in-out',
          'flex flex-col items-center justify-center bg-accent/20 border-accent/50',
          'hover:scale-105 hover:shadow-2xl hover:shadow-accent/40 focus-within:scale-105 focus-within:shadow-2xl focus-within:shadow-accent/40',
          connectedService ? 'cursor-pointer' : 'cursor-default',
          className
        )}
        onClick={handleCardClick}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="relative z-10 flex flex-col items-center text-center p-4">
          <Music className="w-16 h-16 text-accent text-glow mb-4" />
          <h3 className="font-headline text-lg font-medium text-white text-glow">
            {connectedService ? `${connectedService}` : 'Music'}
          </h3>

          {connectedService ? (
             <div className="flex items-center gap-2 mt-4 text-green-400">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-medium">Connected</span>
            </div>
          ) : (
            <>
              <p className="text-xs text-white/80 mt-1 mb-4">
                Connect your favorite music service.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDialogOpen(true);
                }}
              >
                <ListMusic className="mr-2 h-4 w-4" />
                Connect
              </Button>
            </>
          )}
        </div>
      </Card>
      <MusicLoginDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConnect={handleConnect}
      />
      <MusicSidebar isOpen={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
    </>
  );
}
