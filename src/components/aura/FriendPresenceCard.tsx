// src/components/aura/FriendPresenceCard.tsx
'use client';

import Image from 'next/image';
import { type Friend } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Gamepad2 } from 'lucide-react';

const statusGlowClasses: Record<Friend['status'], string> = {
  Online: 'presence-glow-online',
  'In-Game': 'presence-glow-ingame',
  Idle: 'presence-glow-idle',
  'Do Not Disturb': 'presence-glow-dnd',
  Offline: 'opacity-60',
};

export function FriendPresenceCard({ friend }: { friend: Friend }) {
  const glowClass = statusGlowClasses[friend.status] || '';

  return (
    <div className="flex flex-col items-center text-center group">
      <div className={cn("relative w-24 h-24 rounded-full transition-all duration-300 group-hover:scale-105", glowClass)}>
        <Image
          src={friend.avatar}
          alt={friend.name}
          width={96}
          height={96}
          className="rounded-full object-cover w-full h-full"
          data-ai-hint="avatar"
        />
        {friend.status === 'In-Game' && (
             <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Gamepad2 className="w-8 h-8 text-white" />
            </div>
        )}
      </div>
      <div className="mt-3">
        <p className="font-medium truncate">{friend.name}</p>
        <p
          className={cn(
            'text-xs text-muted-foreground truncate',
            {
              'text-green-400': friend.status === 'Online',
              'text-blue-400': friend.status === 'In-Game',
              'text-amber-400': friend.status === 'Idle',
              'text-red-400': friend.status === 'Do Not Disturb',
            }
          )}
        >
          {friend.status === 'In-Game' ? friend.gamePlaying : friend.status}
        </p>
      </div>
    </div>
  );
}
