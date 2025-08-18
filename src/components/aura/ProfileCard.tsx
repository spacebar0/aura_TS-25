// src/components/aura/ProfileCard.tsx
'use client';

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { UserProfile } from "@/lib/mock-data";

interface ProfileCardProps {
  profile: Partial<UserProfile>; // Use partial as we might not have all data
  onSelect: () => void;
  children?: React.ReactNode;
  isFocused?: boolean;
}

export function ProfileCard({ profile, onSelect, children, isFocused = false }: ProfileCardProps) {
  return (
    <div className="relative group">
      <button
        onClick={onSelect}
        className={cn(
          "w-48 h-64 rounded-2xl p-4 flex flex-col items-center justify-end text-center transition-all duration-300 ease-in-out",
          "bg-card border-2",
          isFocused ? "border-primary shadow-2xl shadow-primary/30 scale-105" : "border-transparent",
          "hover:border-primary hover:shadow-2xl hover:shadow-primary/30 hover:scale-105",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        )}
      >
        <div className="relative w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-background group-hover:border-primary/50 transition-colors duration-300">
          <Image
            src={profile.avatar || '/images/preset1.png'}
            alt={profile.name || 'User'}
            fill
            className="object-cover"
            data-ai-hint="avatar"
          />
        </div>
        <h3 className="font-poppins text-xl font-medium text-foreground">
          {profile.name}
        </h3>
        <p className="text-sm text-muted-foreground font-silkscreen">
          Level 99
        </p>
      </button>
      {children}
    </div>
  );
}
