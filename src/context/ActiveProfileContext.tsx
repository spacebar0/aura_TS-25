// src/context/ActiveProfileContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserProfile, initialUserProfile } from '@/lib/mock-data';

interface ActiveProfileContextType {
  activeProfile: UserProfile | null;
  setActiveProfile: (profile: UserProfile | null) => void;
}

const ActiveProfileContext = createContext<ActiveProfileContextType | undefined>(undefined);

export const ActiveProfileProvider = ({ children }: { children: ReactNode }) => {
  const [activeProfile, setActiveProfileState] = useState<UserProfile | null>(null);

  useEffect(() => {
    // On mount, try to load the active profile from localStorage
    try {
      const storedProfile = localStorage.getItem('active-aura-profile');
      if (storedProfile) {
        setActiveProfileState(JSON.parse(storedProfile));
      }
    } catch (error) {
      console.error("Failed to parse active profile from localStorage", error);
      localStorage.removeItem('active-aura-profile');
    }
  }, []);

  const setActiveProfile = (profile: UserProfile | null) => {
    setActiveProfileState(profile);
    if (profile) {
      localStorage.setItem('active-aura-profile', JSON.stringify(profile));
    } else {
      localStorage.removeItem('active-aura-profile');
    }
  };

  return (
    <ActiveProfileContext.Provider value={{ activeProfile, setActiveProfile }}>
      {children}
    </ActiveProfileContext.Provider>
  );
};

export const useActiveProfile = () => {
  const context = useContext(ActiveProfileContext);
  if (context === undefined) {
    throw new Error('useActiveProfile must be used within an ActiveProfileProvider');
  }
  return context;
};
