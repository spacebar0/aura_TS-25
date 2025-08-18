
// src/components/aura/Dock.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Library, Store, Settings2, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useFocus } from '@/context/FocusContext';
import { useEffect, useRef } from 'react';

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/library', label: 'Library', icon: Library },
  { href: '/home', label: 'Logo', icon: null }, // Placeholder for the logo
  { href: '/store', label: 'Store', icon: Store },
  { href: '/contact', label: 'Contact', icon: MessageSquare },
  { href: '/settings', label: 'Settings', icon: Settings2 },
];

export function Dock() {
  const pathname = usePathname();
  const { focusArea, dockIndex, setDockItems } = useFocus();
  
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, navItems.length);
    // Pass the refs to the context so the global gamepad hook can use them
    setDockItems(itemRefs.current);
  }, [setDockItems]);


  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <nav className="mx-auto mb-4 w-full max-w-xl rounded-full border-t glass-pane p-2 shadow-2xl shadow-black/50 pointer-events-auto">
        <TooltipProvider delayDuration={0}>
          <div className="flex items-center justify-around">
            {navItems.map((item, index) => {
              if (item.label === 'Logo') {
                return (
                  <Link
                    key={item.label}
                    href="/home"
                    className={cn(
                        "-mt-2 hover:scale-110 transition-transform duration-300 rounded-full",
                        focusArea === 'DOCK' && dockIndex === index && 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                    )}
                    ref={el => itemRefs.current[index] = el}
                  >
                    <Image src="/images/logo.PNG" alt="AURA Logo" width={48} height={48} className="invert" />
                  </Link>
                );
              }

              const isActive = pathname === item.href;
              const isFocused = focusArea === 'DOCK' && dockIndex === index;
              
              return (
                <Tooltip key={item.label}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                          "relative p-2 rounded-full",
                          isFocused && 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                      )}
                      ref={el => itemRefs.current[index] = el}
                    >
                      {item.icon && (
                        <item.icon
                            className={cn(
                            'h-7 w-7 transition-all duration-300',
                            isActive || isFocused
                                ? 'text-primary text-glow'
                                : 'text-muted-foreground hover:text-white'
                            )}
                        />
                      )}
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
