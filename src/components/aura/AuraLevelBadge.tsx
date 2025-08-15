// src/components/aura/AuraLevelBadge.tsx
'use client';

import { useUserProfile } from "@/context/UserProfileContext";
import { cn } from "@/lib/utils";

export function AuraLevelBadge() {
    const { userProfile } = useUserProfile();

    return (
        <div className="flex flex-col items-center text-center aura-level-pulse">
            <div className="relative w-16 h-16 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="absolute inset-0">
                    <circle 
                        cx="50" cy="50" r="45" 
                        className="stroke-primary/30" 
                        strokeWidth="4" 
                        fill="none" 
                    />
                    <circle 
                        cx="50" cy="50" r="45" 
                        className="stroke-primary" 
                        strokeWidth="4" 
                        fill="none"
                        strokeDasharray="283"
                        strokeDashoffset="70" // 283 * (1 - 0.75)
                        transform="rotate(-90 50 50)"
                    />
                </svg>
                <span className="text-3xl font-bold text-glow z-10">99</span>
            </div>
            <p className="text-xs font-silkscreen text-primary/80 mt-1">AURA Level</p>
        </div>
    )
}
