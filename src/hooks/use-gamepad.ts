
'use client';

import { useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useFocus } from '@/context/FocusContext';
import { usePathname, useRouter } from 'next/navigation';
import type { SettingCategory } from '@/app/settings/page';

const DEBOUNCE_DELAY = 160; // ms

// Define arrays for page-specific navigation
const libraryTabValues = ['all', 'pinned', 'recent', 'action', 'rpg'];
const settingsCategoryIds: SettingCategory[] = ['system', 'audio', 'display', 'network', 'theme', 'privacy', 'profiles', 'accessibility'];

export function useGamepad() {
  const router = useRouter();
  const pathname = usePathname();
  const context = useFocus();

  const animationFrameId = useRef<number>();
  const buttonPressState = useRef<{ [key:string]: boolean }>({});

  const handleButtonPress = (buttonName: string, callback: () => void) => {
    if (buttonPressState.current[buttonName]) {
      callback();
    }
  };

  const handleDPad = useDebouncedCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (!context) return;
    const { 
        focusArea, setFocusArea, 
        setHeaderIndex, headerItems,
        setDockIndex, dockItems,
        setSelectProfileIndex,
        homeCarouselApi,
        setLibraryTab, libraryTab,
        storeCarouselApi,
        setSettingsCategory, settingsCategory,
    } = context;

    // --- Vertical Navigation (Focus Area Switching) ---
    if (direction === 'up') {
        if (focusArea === 'MAIN') setFocusArea('HEADER');
        else if (focusArea === 'DOCK') setFocusArea('MAIN');
    }
    if (direction === 'down') {
        if (focusArea === 'MAIN') setFocusArea('DOCK');
        else if (focusArea === 'HEADER') setFocusArea('MAIN');
    }
    
    // --- Horizontal Navigation (Context-Dependent) ---
    if (direction === 'left' || direction === 'right') {
        const move = direction === 'left' ? -1 : 1;
        
        switch(focusArea) {
            case 'HEADER':
                setHeaderIndex(prev => {
                    const newIndex = prev + move;
                    return Math.max(0, Math.min(newIndex, headerItems.length - 1));
                });
                break;
            case 'DOCK':
                setDockIndex(prev => {
                    const newIndex = prev + move;
                    return Math.max(0, Math.min(newIndex, dockItems.length - 1));
                });
                break;
            case 'MAIN':
                if (pathname === '/select-profile') {
                    // This logic assumes we know the number of profiles from somewhere
                    // For now, let's just use a fixed number for demonstration. A better way
                    // would be to pass the profile count to the context.
                    setSelectProfileIndex(prev => Math.max(0, prev + move));
                } else if (pathname === '/home') {
                    if (move < 0) homeCarouselApi?.scrollPrev(); else homeCarouselApi?.scrollNext();
                } else if (pathname === '/library') {
                    setLibraryTab(prev => {
                        const currentIndex = libraryTabValues.indexOf(prev);
                        const nextIndex = (currentIndex + move + libraryTabValues.length) % libraryTabValues.length;
                        return libraryTabValues[nextIndex];
                    });
                } else if (pathname === '/store') {
                     if (move < 0) storeCarouselApi?.scrollPrev(); else storeCarouselApi?.scrollNext();
                } else if (pathname === '/settings') {
                    setSettingsCategory(prev => {
                        const currentIndex = settingsCategoryIds.indexOf(prev as SettingCategory);
                        const nextDirection = direction === 'left' ? -1 : 1; // For settings, up/down maps to left/right on dpad
                        const nextIndex = (currentIndex + nextDirection + settingsCategoryIds.length) % settingsCategoryIds.length;
                        return settingsCategoryIds[nextIndex];
                    })
                }
                break;
        }
    }

  }, DEBOUNCE_DELAY, { leading: true, trailing: false });
  
  const handleConfirm = useDebouncedCallback(() => {
    if (!context) return;
    const { focusArea, headerIndex, headerItems, dockIndex, dockItems } = context;
    if (focusArea === 'HEADER') {
        headerItems[headerIndex]?.click();
    } else if (focusArea === 'DOCK') {
        dockItems[dockIndex]?.click();
    }
  }, DEBOUNCE_DELAY, { leading: true, trailing: false });

  const handleBack = useDebouncedCallback(() => {
    if (!context) return;
    const { focusArea, setFocusArea } = context;
    if (focusArea !== 'MAIN') {
      setFocusArea('MAIN');
    } else {
      router.back();
    }
  }, DEBOUNCE_DELAY, { leading: true, trailing: false });


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

      // --- Axes (Joystick & D-Pad) ---
      const xAxis = gp.axes[0];
      const yAxis = gp.axes[1];
      const dPadLeft = gp.buttons[14]?.pressed;
      const dPadRight = gp.buttons[15]?.pressed;
      const dPadUp = gp.buttons[12]?.pressed;
      const dPadDown = gp.buttons[13]?.pressed;

      if (xAxis < -0.5 || dPadLeft) handleDPad('left');
      if (xAxis > 0.5 || dPadRight) handleDPad('right');
      if (yAxis < -0.5 || dPadUp) handleDPad('up');
      if (yAxis > 0.5 || dPadDown) handleDPad('down');

      // --- Buttons ---
      // A Button (Confirm)
      if (gp.buttons[0].pressed && !buttonPressState.current['A']) {
        handleConfirm();
      }
      buttonPressState.current['A'] = gp.buttons[0].pressed;

      // B Button (Back)
      if (gp.buttons[1].pressed && !buttonPressState.current['B']) {
        handleBack();
      }
      buttonPressState.current['B'] = gp.buttons[1].pressed;
      
      animationFrameId.current = requestAnimationFrame(pollGamepads);
    };

    pollGamepads();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  // We only list router and pathname as dependencies.
  // The context object itself is stable, and its properties are accessed inside the debounced callbacks.
  // This prevents the effect from re-running on every state change inside the context.
  }, [router, pathname, handleDPad, handleConfirm, handleBack]);
}
