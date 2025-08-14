// src/components/aura/MusicCard.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Music } from 'lucide-react';
import { MusicLoginDialog } from './MusicLoginDialog';
import { MusicSidebar } from './MusicSidebar';

type MusicService = 'Spotify' | 'Apple Music' | 'YouTube Music';

export function MusicCard({ className }: { className?: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [connectedService, setConnectedService] = useState<MusicService | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = (service: MusicService) => {
    setIsConnecting(true);
    setIsDialogOpen(false); // Close dialog

    // Simulate API call to connect service
    setTimeout(() => {
      setConnectedService(service);
      setIsConnecting(false);
    }, 1500); // 1.5 second delay to simulate auth
  };

  useEffect(() => {
    if (connectedService && !isConnecting) {
      setIsSidebarOpen(true);
    }
  }, [connectedService, isConnecting]);

  const handleCardClick = () => {
    if (connectedService) {
      setIsSidebarOpen(true);
    } else {
        setIsDialogOpen(true);
    }
  };

  return (
    <>
      <Card
        className={cn(
          'group relative aspect-square w-full h-full overflow-hidden rounded-lg transition-all duration-300 ease-in-out',
          'flex flex-col items-center justify-center bg-accent/20 border-accent/50',
          'hover:scale-105 hover:shadow-2xl hover:shadow-accent/40 focus-within:scale-105 focus-within:shadow-2xl focus-within:shadow-accent/40',
          'cursor-pointer',
          className
        )}
        onClick={handleCardClick}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="relative z-10 flex flex-col items-center text-center p-4">
          <Music className="w-16 h-16 text-accent text-glow mb-4" />
          <h3 className="font-silkscreen text-lg font-medium text-white text-glow">
            Music
          </h3>
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
