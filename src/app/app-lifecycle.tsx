
'use client';

import { Header } from "@/components/aura/Header";
import { Dock } from "@/components/aura/Dock";
import { useEffect } from "react";
import { useActiveProfile } from "@/context/ActiveProfileContext";
import { useRouter } from "next/navigation";
import { useGamepad } from "@/hooks/use-gamepad";
import { useFocus } from "@/context/FocusContext";

export function AppLifecycle({ children }: { children: React.ReactNode }) {
  const { activeProfile } = useActiveProfile();
  const { focusArea, setFocusArea, setHeaderIndex, setDockIndex } = useFocus();
  const router = useRouter();

  // Global gamepad listener for the 'back' button and focus switching
  useGamepad({
    onButtonB: () => {
      // If focus is on header/dock, return to main. Otherwise, go back.
      if (focusArea !== 'MAIN') {
        setFocusArea('MAIN');
      } else {
        router.back();
      }
    },
    onUp: () => {
      if (focusArea === 'MAIN') {
        setHeaderIndex(0); // Focus on the first item in the header
        setFocusArea('HEADER');
      } else if (focusArea === 'DOCK') {
        setFocusArea('MAIN');
      }
    },
    onDown: () => {
      if (focusArea === 'MAIN') {
        setDockIndex(0); // Focus on the first item in the dock
        setFocusArea('DOCK');
      } else if (focusArea === 'HEADER') {
        setFocusArea('MAIN');
      }
    }
  });

  useEffect(() => {
    // If no profile is selected, redirect to the selection screen
    if (!activeProfile) {
      router.replace('/select-profile');
    }
  }, [activeProfile, router]);
  
  // If no profile is active yet, don't render the main UI
  if (!activeProfile) {
    return null; // Or a global loader
  }

  return (
    <>
      <Header />
      <div className="relative z-10 flex flex-col h-full">
        <main className="flex-1 flex pt-16 pb-24 overflow-y-auto">{children}</main>
      </div>
      <Dock />
    </>
  );
}
