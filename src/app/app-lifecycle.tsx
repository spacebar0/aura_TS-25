
'use client';

import { Header } from "@/components/aura/Header";
import { Dock } from "@/components/aura/Dock";
import { useEffect } from "react";
import { useActiveProfile } from "@/context/ActiveProfileContext";
import { useRouter } from "next/navigation";
import { useGamepad } from "@/hooks/use-gamepad";

export function AppLifecycle({ children }: { children: React.ReactNode }) {
  const { activeProfile } = useActiveProfile();
  const router = useRouter();

  // Global gamepad listener for the 'back' button
  useGamepad({
    onButtonB: () => {
      router.back();
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
