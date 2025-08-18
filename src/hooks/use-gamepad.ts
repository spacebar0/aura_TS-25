
// src/hooks/use-gamepad.ts
'use client';

import { useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useFocus } from '@/context/FocusContext';
import { usePathname, useRouter } from 'next/navigation';
import type { SettingCategory } from '@/app/settings/page';

const DEBOUNCE_DELAY = 150; // ms

const libraryTabValues = ['all', 'pinned', 'recent', 'action', 'rpg'];
const settingsCategoryIds: SettingCategory[] = ['system', 'audio', 'display', 'network', 'theme', 'privacy', 'profiles', 'accessibility'];

export function useGamepad() {
  const router = useRouter();
  const pathname = usePathname();
  const context = useFocus();

  const animationFrameId = useRef<number>();
  const buttonPressState = useRef<{ [key:string]: boolean }>({});

  const handleLeft = useDebouncedCallback(() => {
    const { focusArea, setHeaderIndex, headerItems, setDockIndex, dockItems, setSelectProfileIndex, selectProfileItems, homeCarouselApi, setLibraryTab, libraryTab, storeCarouselApi } = context;
    const move = -1;
    switch(focusArea) {
      case 'HEADER':
        setHeaderIndex(prev => Math.max(0, Math.min(prev + move, headerItems.length - 1)));
        break;
      case 'DOCK':
        setDockIndex(prev => (prev + move + dockItems.length) % dockItems.length);
        break;
      case 'MAIN':
        if (pathname === '/select-profile') setSelectProfileIndex(prev => Math.max(0, Math.min(prev + move, selectProfileItems.length - 1)));
        if (pathname === '/home') homeCarouselApi?.scrollPrev();
        if (pathname === '/library') {
          const currentIndex = libraryTabValues.indexOf(libraryTab);
          const nextIndex = (currentIndex + move + libraryTabValues.length) % libraryTabValues.length;
          setLibraryTab(libraryTabValues[nextIndex]);
        }
        if (pathname === '/store') storeCarouselApi?.scrollPrev();
        break;
    }
  }, DEBOUNCE_DELAY);

  const handleRight = useDebouncedCallback(() => {
    const { focusArea, setHeaderIndex, headerItems, setDockIndex, dockItems, setSelectProfileIndex, selectProfileItems, homeCarouselApi, setLibraryTab, libraryTab, storeCarouselApi } = context;
    const move = 1;
    switch(focusArea) {
      case 'HEADER':
        setHeaderIndex(prev => Math.max(0, Math.min(prev + move, headerItems.length - 1)));
        break;
      case 'DOCK':
        setDockIndex(prev => (prev + move + dockItems.length) % dockItems.length);
        break;
      case 'MAIN':
        if (pathname === '/select-profile') setSelectProfileIndex(prev => Math.max(0, Math.min(prev + move, selectProfileItems.length - 1)));
        if (pathname === '/home') homeCarouselApi?.scrollNext();
        if (pathname === '/library') {
          const currentIndex = libraryTabValues.indexOf(libraryTab);
          const nextIndex = (currentIndex + move + libraryTabValues.length) % libraryTabValues.length;
          setLibraryTab(libraryTabValues[nextIndex]);
        }
        if (pathname === '/store') storeCarouselApi?.scrollNext();
        break;
    }
  }, DEBOUNCE_DELAY);

  const handleUp = useDebouncedCallback(() => {
    const { focusArea, setFocusArea, setSettingsCategory, settingsCategory } = context;
    if (focusArea === 'MAIN') setFocusArea('HEADER');
    else if (focusArea === 'DOCK') setFocusArea('MAIN');
    else if (focusArea === 'MAIN' && pathname === '/settings') {
      const currentIndex = settingsCategoryIds.indexOf(settingsCategory);
      const nextIndex = (currentIndex - 1 + settingsCategoryIds.length) % settingsCategoryIds.length;
      setSettingsCategory(settingsCategoryIds[nextIndex]);
    }
  }, DEBOUNCE_DELAY);

  const handleDown = useDebouncedCallback(() => {
    const { focusArea, setFocusArea, setSettingsCategory, settingsCategory } = context;
    if (focusArea === 'HEADER') setFocusArea('MAIN');
    else if (focusArea === 'MAIN') setFocusArea('DOCK');
    else if (focusArea === 'MAIN' && pathname === '/settings') {
      const currentIndex = settingsCategoryIds.indexOf(settingsCategory);
      const nextIndex = (currentIndex + 1) % settingsCategoryIds.length;
      setSettingsCategory(settingsCategoryIds[nextIndex]);
    }
  }, DEBOUNCE_DELAY);

  const handleConfirm = useDebouncedCallback(() => {
    const { focusArea, headerIndex, headerItems, dockIndex, dockItems, selectProfileIndex, selectProfileItems } = context;
    if (focusArea === 'HEADER') headerItems[headerIndex]?.click();
    else if (focusArea === 'DOCK') dockItems[dockIndex]?.click();
    else if (focusArea === 'MAIN' && pathname === '/select-profile') selectProfileItems[selectProfileIndex]?.click();
  }, DEBOUNCE_DELAY);

  const handleBack = useDebouncedCallback(() => {
    const { focusArea, setFocusArea } = context;
    if (focusArea !== 'MAIN') {
      setFocusArea('MAIN');
    } else {
      if (pathname !== '/home' && pathname !== '/select-profile' && pathname !== '/') {
        router.back();
      }
    }
  }, DEBOUNCE_DELAY);

  useEffect(() => {
    const pollGamepads = () => {
      const gamepads = navigator.getGamepads().filter(g => g);
      if (gamepads.length === 0) {
        animationFrameId.current = requestAnimationFrame(pollGamepads);
        return;
      }
      const gp = gamepads[0];
      if (!gp) {
        animationFrameId.current = requestAnimationFrame(pollGamepads);
        return;
      }

      const deadZone = 0.5;
      const xAxis = gp.axes[0];
      const yAxis = gp.axes[1];
      const dPadUp = gp.buttons[12]?.pressed;
      const dPadDown = gp.buttons[13]?.pressed;
      const dPadLeft = gp.buttons[14]?.pressed;
      const dPadRight = gp.buttons[15]?.pressed;

      if (xAxis < -deadZone || dPadLeft) handleLeft();
      if (xAxis > deadZone || dPadRight) handleRight();
      if (yAxis < -deadZone || dPadUp) handleUp();
      if (yAxis > deadZone || dPadDown) handleDown();

      // 'A' button on Xbox, 'X' on Playstation
      if (gp.buttons[0].pressed) handleConfirm();
      // 'B' button on Xbox, 'O' on Playstation
      if (gp.buttons[1].pressed) handleBack();

      animationFrameId.current = requestAnimationFrame(pollGamepads);
    };

    pollGamepads();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [pathname, context, handleLeft, handleRight, handleUp, handleDown, handleConfirm, handleBack]);
}
