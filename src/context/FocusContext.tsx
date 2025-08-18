
// src/context/FocusContext.tsx
'use client';

import type { SettingCategory } from '@/app/settings/page';
import type { CarouselApi } from '@/components/ui/carousel';
import React, { createContext, useContext, useState, ReactNode, RefObject } from 'react';

type FocusArea = 'MAIN' | 'HEADER' | 'DOCK';

type NavItem = HTMLAnchorElement | HTMLButtonElement | null;

interface FocusContextType {
  // Global Focus
  focusArea: FocusArea;
  setFocusArea: (area: FocusArea) => void;

  // Header
  headerIndex: number;
  setHeaderIndex: React.Dispatch<React.SetStateAction<number>>;
  headerItems: NavItem[];
  setHeaderItems: (items: NavItem[]) => void;
  
  // Dock
  dockIndex: number;
  setDockIndex: React.Dispatch<React.SetStateAction<number>>;
  dockItems: NavItem[];
  setDockItems: (items: NavItem[]) => void;

  // Page specific state for gamepad control
  // Select Profile Page
  selectProfileIndex: number;
  setSelectProfileIndex: React.Dispatch<React.SetStateAction<number>>;
  selectProfileItems: NavItem[];
  setSelectProfileItems: (items: NavItem[]) => void;
  
  // Home Page
  homeCarouselApi: CarouselApi | undefined;
  setHomeCarouselApi: (api: CarouselApi | undefined) => void;

  // Library Page
  libraryTab: string;
  setLibraryTab: React.Dispatch<React.SetStateAction<string>>;
  
  // Store Page
  storeCarouselApi: CarouselApi | undefined;
  setStoreCarouselApi: (api: CarouselApi | undefined) => void;

  // Settings Page
  settingsCategory: SettingCategory;
  setSettingsCategory: React.Dispatch<React.SetStateAction<SettingCategory>>;
}

const FocusContext = createContext<FocusContextType | undefined>(undefined);

export const FocusProvider = ({ children }: { children: ReactNode }) => {
  const [focusArea, setFocusArea] = useState<FocusArea>('MAIN');

  // Header state
  const [headerIndex, setHeaderIndex] = useState(0);
  const [headerItems, setHeaderItems] = useState<NavItem[]>([]);

  // Dock state
  const [dockIndex, setDockIndex] = useState(2); // Start on logo
  const [dockItems, setDockItems] = useState<NavItem[]>([]);

  // Page specific states
  const [selectProfileIndex, setSelectProfileIndex] = useState(0);
  const [selectProfileItems, setSelectProfileItems] = useState<NavItem[]>([]);
  const [homeCarouselApi, setHomeCarouselApi] = useState<CarouselApi>();
  const [libraryTab, setLibraryTab] = useState('all');
  const [storeCarouselApi, setStoreCarouselApi] = useState<CarouselApi>();
  const [settingsCategory, setSettingsCategory] = useState<SettingCategory>('system');


  return (
    <FocusContext.Provider value={{ 
      focusArea, setFocusArea, 
      headerIndex, setHeaderIndex, headerItems, setHeaderItems,
      dockIndex, setDockIndex, dockItems, setDockItems,
      selectProfileIndex, setSelectProfileIndex, selectProfileItems, setSelectProfileItems,
      homeCarouselApi, setHomeCarouselApi,
      libraryTab, setLibraryTab,
      storeCarouselApi, setStoreCarouselApi,
      settingsCategory, setSettingsCategory,
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
