// src/context/UserProfileContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { initialUserProfile, UserProfile } from '@/lib/mock-data';

interface UserProfileContextType {
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
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
