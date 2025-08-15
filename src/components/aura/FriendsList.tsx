// src/components/aura/FriendsList.tsx
'use client';

import Image from 'next/image';
import { type Friend } from '@/lib/mock-data';
import { Card, CardContent, CardHeader } from '../ui/card';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useUserProfile } from '@/context/UserProfileContext';

function FriendItem({ friend }: { friend: Friend }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={friend.avatar}
            alt={friend.name}
            fill
            className="object-cover rounded-full"
            data-ai-hint="avatar"
          />
        </div>
        <span
          className={cn(
            'absolute bottom-0 right-0 block h-2 w-2.5 rounded-full ring-2 ring-background',
            {
              'bg-green-500': friend.status !== 'Offline' && friend.status !== 'Do Not Disturb' && friend.status !== 'Idle',
              'bg-blue-500': friend.status === 'In-Game',
              'bg-amber-500': friend.status === 'Idle',
              'bg-red-500': friend.status === 'Do Not Disturb',
              'bg-gray-500': friend.status === 'Offline',
            }
          )}
        />
      </div>
      <div className="flex-1">
        <p className="font-medium">{friend.name}</p>
        <p
          className={cn('text-sm flex items-center', {
            'text-green-400': friend.status === 'Online',
            'text-blue-400': friend.status === 'In-Game',
            'text-amber-400': friend.status === 'Idle',
            'text-red-400': friend.status === 'Do Not Disturb',
            'text-muted-foreground': friend.status === 'Offline',
          })}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current mr-1.5"></span>
          {friend.status === 'In-Game' ? friend.gamePlaying : friend.status}
        </p>
      </div>
      <Button variant="outline" size="sm" className="rounded-full px-4 text-xs">Chat</Button>
    </div>
  );
}

export function FriendsList() {
  const { userProfile } = useUserProfile();
  const friends = userProfile.friends;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-poppins flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            Friends Lists
        </h2>
        <Link href="/friends" className="text-sm text-muted-foreground hover:text-primary">
            See more &gt;
        </Link>
      </div>
      <Card className="glass-pane border-primary/50 h-full">
        <CardContent className="p-6 h-full flex flex-col">
          <div className="space-y-2 flex-1">
            {friends.slice(0, 4).map((friend) => (
              <FriendItem key={friend.id} friend={friend} />
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
