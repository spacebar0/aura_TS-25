// src/components/aura/MusicLoginDialog.tsx
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ListMusic } from 'lucide-react';

type MusicService = 'Spotify' | 'Apple Music' | 'YouTube Music';

interface MusicLoginDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConnect: (service: MusicService) => void;
}

const services: MusicService[] = ['Spotify', 'Apple Music', 'YouTube Music'];

export function MusicLoginDialog({ isOpen, onOpenChange, onConnect }: MusicLoginDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="glass-pane">
        <DialogHeader>
          <DialogTitle>Connect a Music Service</DialogTitle>
          <DialogDescription>
            Sign in to your favorite music service to listen to your playlists in the background.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 pt-4">
          {services.map((service) => (
            <Button
              key={service}
              variant="outline"
              className="justify-start text-lg py-6 border-accent text-accent-foreground hover:bg-accent/80 hover:text-accent-foreground"
              onClick={() => {
                onConnect(service);
                onOpenChange(false);
              }}
            >
              <ListMusic className="mr-4 h-5 w-5" />
              <span>Connect with {service}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
