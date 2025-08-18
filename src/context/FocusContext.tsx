// src/context/FocusContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type FocusArea = 'MAIN' | 'HEADER' | 'DOCK';

interface FocusContextType {
  focusArea: FocusArea;
  setFocusArea: (area: FocusArea) => void;
  headerIndex: number;
  setHeaderIndex: React.Dispatch<React.SetStateAction<number>>;
  dockIndex: number;
  setDockIndex: React.Dispatch<React.SetStateAction<number>>;
}

const FocusContext = createContext<FocusContextType | undefined>(undefined);

export const FocusProvider = ({ children }: { children: ReactNode }) => {
  const [focusArea, setFocusArea] = useState<FocusArea>('MAIN');
  const [headerIndex, setHeaderIndex] = useState(0);
  const [dockIndex, setDockIndex] = useState(0);

  return (
    <FocusContext.Provider value={{ 
      focusArea, setFocusArea, 
      headerIndex, setHeaderIndex,
      dockIndex, setDockIndex,
    }}>
      {children}
    </FocusContext.Provider>
  );
};

export const useFocus = () => {
  const context = useContext(FocusContext);
  if (context === undefined) {
    throw new Error('useFocus must be used within a FocusProvider');
  }
  return context;
};
