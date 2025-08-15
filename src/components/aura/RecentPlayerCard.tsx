// src/components/aura/RecentPlayerCard.tsx
'use client';

import Image from 'next/image';
import type { RecentPlayer } from '@/lib/mock-data';
import { Button } from '../ui/button';
import { UserPlus, MessageSquare, Gamepad2 } from 'lucide-react';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';

interface RecentPlayerCardProps {
  player: RecentPlayer;
}

export function RecentPlayerCard({ player }: RecentPlayerCardProps) {
  return (
    <Card className="group relative overflow-hidden rounded-lg bg-card border-none flex flex-col items-center p-4 transition-all duration-300 h-full">
      <div className="relative w-24 h-24 mb-3">
        <Image
          src={player.avatar}
          alt={player.name}
          width={96}
          height={96}
          className="rounded-full object-cover"
          data-ai-hint="avatar"
        />
      </div>
      <div className="text-center">
        <p className="font-medium truncate">{player.name}</p>
        <p className="text-xs text-muted-foreground truncate">
          via {player.game}
        </p>
        <p className="text-xs text-muted-foreground/70 truncate">
          {player.lastPlayed}
        </p>
      </div>

      {/* Hover actions */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button variant="outline" size="sm" className="w-3/4">
          <UserPlus className="mr-2 h-4 w-4" /> Add Friend
        </Button>
        <Button variant="outline" size="sm" className="w-3/4">
          <Gamepad2 className="mr-2 h-4 w-4" /> Invite
        </Button>
         <Button variant="outline" size="sm" className="w-3/4">
          <MessageSquare className="mr-2 h-4 w-4" /> Message
        </Button>
      </div>
    </Card>
  );
}
