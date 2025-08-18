
'use client';

import { Header } from "@/components/aura/Header";
import { Dock } from "@/components/aura/Dock";
import { LoadingAnimation } from "@/components/aura/LoadingAnimation";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useActiveProfile } from "@/context/ActiveProfileContext";
import { useRouter } from "next/navigation";

export function AppLifecycle({ children }: { children: React.ReactNode }) {
  const { activeProfile } = useActiveProfile();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If no profile is selected, redirect to the selection screen
    if (!activeProfile) {
      router.replace('/select-profile');
    }
  }, [activeProfile, router]);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Reduced loading time as profile selection is now the entry

    return () => clearTimeout(timer);
  }, []);

  const handleAnimationComplete = () => {
    setIsLoading(false);
  }

  // If no profile is active yet, don't render the main UI
  if (!activeProfile) {
    return null; // Or a global loader
  }

  // A different loading sequence for when the app itself is loading
  if (isLoading) {
    return <LoadingAnimation onAnimationComplete={handleAnimationComplete} />
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
