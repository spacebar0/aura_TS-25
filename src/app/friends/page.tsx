// src/app/friends/page.tsx
'use client';

import { useState } from 'react';
import { FriendPresenceCard } from '@/components/aura/FriendPresenceCard';
import { RecentSquadsCarousel } from '@/components/aura/RecentSquadsCarousel';
import { useUserProfile } from '@/context/UserProfileContext';
import { type Friend, type RecentPlayer } from '@/lib/mock-data';
import { ChatSidebar } from '@/components/aura/ChatSidebar';
import { useToast } from '@/hooks/use-toast';

// Helper to convert a RecentPlayer to a Friend for the chat sidebar
const recentPlayerToFriend = (player: RecentPlayer): Friend => ({
  id: player.id,
  name: player.name,
  avatar: player.avatar,
  status: 'Online', // Assume they are online for chat purposes
  gamePlaying: player.game,
  invited: false,
});

export default function FriendsPage() {
  const { userProfile, toggleFriendInvite } = useUserProfile();
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const { toast } = useToast();

  const onlineFriends = userProfile.friends.filter(f => f.status !== 'Offline');
  const offlineFriends = userProfile.friends.filter(f => f.status === 'Offline');

  const handleMessage = (friend: Friend) => {
    setSelectedFriend(friend);
  };
  
  const handleMessageRecentPlayer = (player: RecentPlayer) => {
    const friend = recentPlayerToFriend(player);
    setSelectedFriend(friend);
  };

  const handleInvite = (friend: Friend) => {
    if (friend.invited) return;

    toggleFriendInvite(friend.id);
    toast({
      title: "Invite Sent!",
      description: `Your invite has been sent to ${friend.name}.`,
    });
  };

  const handleInviteRecentPlayer = (player: RecentPlayer) => {
    toast({
      title: "Invite Sent!",
      description: `Your invite has been sent to ${player.name}.`,
    });
  };

  const handleAddFriend = (player: RecentPlayer) => {
    toast({
      title: "Friend Request Sent!",
      description: `You sent a friend request to ${player.name}.`,
    });
  };


  return (
    <>
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
            <h2 className="text-2xl font-headline mb-4">Recent Squads</h2>
            <RecentSquadsCarousel 
              onAdd={handleAddFriend}
              onInvite={handleInviteRecentPlayer}
              onMessage={handleMessageRecentPlayer}
            />
          </section>

          <section>
            <h2 className="text-2xl font-headline mb-4">Online ({onlineFriends.length})</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10">
              {onlineFriends.map((friend) => (
                <FriendPresenceCard key={friend.id} friend={friend} onMessage={handleMessage} onInvite={handleInvite} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-headline mb-4">Offline ({offlineFriends.length})</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10">
              {offlineFriends.map((friend) => (
                <FriendPresenceCard key={friend.id} friend={friend} onMessage={handleMessage} onInvite={handleInvite} />
              ))}
            </div>
          </section>
        </div>
      </div>
      <ChatSidebar 
        friend={selectedFriend}
        isOpen={!!selectedFriend}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedFriend(null);
          }
        }}
      />
    </>
  );
}
