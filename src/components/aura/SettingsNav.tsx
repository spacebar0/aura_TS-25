// src/components/aura/SettingsNav.tsx
'use client';

import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { SettingCategory } from '@/app/settings/page';
import type { LucideIcon } from 'lucide-react';

interface Category {
  id: SettingCategory;
  label: string;
  icon: LucideIcon;
  color: string;
}

interface SettingsNavProps {
  categories: Category[];
  activeCategory: SettingCategory;
  setActiveCategory: (category: SettingCategory) => void;
}

export function SettingsNav({ categories, activeCategory, setActiveCategory }: SettingsNavProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <nav className="flex flex-col items-center p-4 space-y-4 glass-pane rounded-lg h-fit">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <Tooltip key={category.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    'p-3 rounded-lg transition-all duration-300',
                    'text-muted-foreground hover:text-white',
                    isActive && 'settings-glow'
                  )}
                  style={{ '--glow-color': category.color } as React.CSSProperties}
                  aria-label={category.label}
                >
                  <category.icon className="w-7 h-7" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{category.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>
    </TooltipProvider>
  );
}
