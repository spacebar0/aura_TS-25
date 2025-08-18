// src/components/aura/Dock.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Library, Store, Settings2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/library', label: 'Library', icon: Library },
];

const navItemsRight = [
    { href: '/store', label: 'Store', icon: Store },
    { href: '/settings', label: 'Settings', icon: Settings2 },
]

export function Dock() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <nav className="mx-auto mb-4 w-full max-w-lg rounded-full border-t glass-pane p-2 shadow-2xl shadow-black/50 pointer-events-auto">
        <TooltipProvider delayDuration={0}>
          <div className="flex items-center justify-around">
            
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link href={item.href} className="relative p-2">
                      <item.icon
                        className={cn(
                          'h-7 w-7 transition-all duration-300',
                          isActive
                            ? 'text-primary text-glow'
                            : 'text-muted-foreground hover:text-white'
                        )}
                      />
                       {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary text-glow"></span>}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}

            <Link href="/home" className="-mt-2 hover:scale-110 transition-transform duration-300">
                <Image src="/images/logo.PNG" alt="AURA Logo" width={48} height={48} className="invert" />
            </Link>

            {navItemsRight.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link href={item.href} className="relative p-2">
                      <item.icon
                        className={cn(
                          'h-7 w-7 transition-all duration-300',
                          isActive
                            ? 'text-primary text-glow'
                            : 'text-muted-foreground hover:text-white'
                        )}
                      />
                       {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary text-glow"></span>}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>
      </nav>
    </footer>
  );
}
