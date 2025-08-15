// src/app/friends/page.tsx
'use client';

import { FriendPresenceCard } from '@/components/aura/FriendPresenceCard';
import { useUserProfile } from '@/context/UserProfileContext';

export default function FriendsPage() {
  const { userProfile } = useUserProfile();

  const onlineFriends = userProfile.friends.filter(f => f.status !== 'Offline');
  const offlineFriends = userProfile.friends.filter(f => f.status === 'Offline');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500 w-full">
      <header className="mb-8">
        <h1 className="text-5xl font-poppins font-medium text-glow">
          Party & Friends
        </h1>
        <p className="text-muted-foreground mt-2 font-silkscreen">
          Connect with your crew.
        </p>
      </header>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-headline mb-4">Online ({onlineFriends.length})</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10">
            {onlineFriends.map((friend) => (
              <FriendPresenceCard key={friend.id} friend={friend} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-headline mb-4">Offline ({offlineFriends.length})</h2>
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10">
            {offlineFriends.map((friend) => (
              <FriendPresenceCard key={friend.id} friend={friend} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}