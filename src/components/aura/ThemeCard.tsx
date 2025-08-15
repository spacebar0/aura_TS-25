// src/components/aura/ThemeCard.tsx
'use client';

import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

export interface Theme {
  name: string;
  colors: Record<string, string>;
}

interface ThemeCardProps {
  theme: Theme;
  isActive: boolean;
  onSelect: (theme: Theme) => void;
}

export function ThemeCard({ theme, isActive, onSelect }: ThemeCardProps) {
  return (
    <button
      onClick={() => onSelect(theme)}
      className={cn(
        "relative p-4 rounded-lg border-2 transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
        isActive
          ? "border-primary ring-primary"
          : "border-muted/50 hover:border-muted-foreground"
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex -space-x-2">
          <div
            className="w-8 h-8 rounded-full border-2 border-card"
            style={{ backgroundColor: `hsl(${theme.colors['--background']})` }}
          />
          <div
            className="w-8 h-8 rounded-full border-2 border-card"
            style={{ backgroundColor: `hsl(${theme.colors['--primary']})` }}
          />
          <div
            className="w-8 h-8 rounded-full border-2 border-card"
            style={{ backgroundColor: `hsl(${theme.colors['--accent']})` }}
          />
        </div>
        <span className="font-medium">{theme.name}</span>
      </div>
      {isActive && (
        <div className="absolute top-2 right-2 text-primary">
          <CheckCircle className="w-5 h-5" />
        </div>
      )}
    </button>
  );
}
