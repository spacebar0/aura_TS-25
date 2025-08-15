// src/components/aura/FriendsList.tsx
'use client';

import Image from 'next/image';
import { userProfile, type Friend } from '@/lib/mock-data';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

function FriendItem({ friend }: { friend: Friend }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="relative">
        <Image
          src={friend.avatar}
          alt={friend.name}
          width={40}
          height={40}
          className="rounded-full"
          data-ai-hint="avatar"
        />
        <span
          className={cn(
            'absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-background',
            {
              'bg-green-500': friend.status !== 'Offline',
              'bg-gray-500': friend.status === 'Offline',
            }
          )}
        />
      </div>
      <div className="flex-1">
        <p className="font-medium">{friend.name}</p>
        <p
          className={cn('text-sm', {
            'text-green-400': friend.status === 'In Game',
            'text-muted-foreground': friend.status !== 'In Game',
          })}
        >
          {friend.status === 'In Game' ? friend.gamePlaying : friend.status}
        </p>
      </div>
    </div>
  );
}

export function FriendsList() {
  const friends = userProfile.friends;

  return (
    <Card className="glass-pane border-primary/50 h-full">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="space-y-2 flex-1">
          {friends.slice(0, 5).map((friend) => (
            <FriendItem key={friend.id} friend={friend} />
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">View All Friends</Button>
      </CardContent>
    </Card>
  );
}
