// src/components/aura/QuickActionsBar.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Wifi, Gamepad2, BellOff, Sun, Moon } from 'lucide-react';

const actions = [
    { id: 'wifi', icon: Wifi, label: 'Wi-Fi' },
    { id: 'game-mode', icon: Gamepad2, label: 'Game Mode' },
    { id: 'dnd', icon: BellOff, label: 'Do Not Disturb' },
    { id: 'theme', icon: Moon, label: 'Toggle Theme' },
]

export function QuickActionsBar() {
  return (
    <TooltipProvider delayDuration={0}>
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30">
            <div className="flex items-center gap-2 p-2 rounded-full glass-pane">
                {actions.map(action => (
                    <Tooltip key={action.id}>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full w-12 h-12 text-muted-foreground hover:text-primary hover:bg-primary/20">
                                <action.icon className="w-6 h-6" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                            <p>{action.label}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>
        </div>
    </TooltipProvider>
  );
}
