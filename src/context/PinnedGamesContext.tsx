'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Game, initialUserProfile } from '@/lib/mock-data';

interface PinnedGamesContextType {
  pinnedGames: Game[];
  togglePinGame: (game: Game) => void;
}

const PinnedGamesContext = createContext<PinnedGamesContextType | undefined>(undefined);

export const PinnedGamesProvider = ({ children }: { children: ReactNode }) => {
  const [pinnedGames, setPinnedGames] = useState<Game[]>(initialUserProfile.pinnedGames);

  const togglePinGame = (game: Game) => {
    setPinnedGames((prevPinnedGames) => {
      const isPinned = prevPinnedGames.some((p) => p.id === game.id);
      if (isPinned) {
        return prevPinnedGames.filter((p) => p.id !== game.id);
      } else {
        return [...prevPinnedGames, game];
      }
    });
  };

  return (
    <PinnedGamesContext.Provider value={{ pinnedGames, togglePinGame }}>
      {children}
    </PinnedGamesContext.Provider>
  );
};

export const usePinnedGames = () => {
  const context = useContext(PinnedGamesContext);
  if (context === undefined) {
    throw new Error('usePinnedGames must be used within a PinnedGamesProvider');
  }
  return context;
};
