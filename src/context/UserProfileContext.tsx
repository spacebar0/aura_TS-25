// src/context/UserProfileContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { initialUserProfile, UserProfile, Friend } from '@/lib/mock-data';

interface UserProfileContextType {
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  toggleFriendInvite: (friendId: number) => void;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);

  const toggleFriendInvite = (friendId: number) => {
    setUserProfile(currentProfile => {
        const updatedFriends = currentProfile.friends.map(friend => {
            if (friend.id === friendId) {
                return { ...friend, invited: !friend.invited };
            }
            return friend;
        });

        // Set a timer to revert the invited status after a few seconds
        setTimeout(() => {
            setUserProfile(p => ({
                ...p,
                friends: p.friends.map(f => f.id === friendId ? { ...f, invited: false } : f)
            }));
        }, 3000);

        return { ...currentProfile, friends: updatedFriends };
    });
  };

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile, toggleFriendInvite }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};
