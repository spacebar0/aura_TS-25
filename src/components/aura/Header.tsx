
// src/components/aura/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Users, LogOut, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useUserProfile } from '@/context/UserProfileContext';
import { useActiveProfile } from '@/context/ActiveProfileContext';
import { useRouter } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useFocus } from '@/context/FocusContext';
import { cn } from '@/lib/utils';

export function Header() {
  const { userProfile } = useUserProfile();
  const { setActiveProfile } = useActiveProfile();
  const router = useRouter();
  const { focusArea, headerIndex, setHeaderItems } = useFocus();

  const [activeFriends, setActiveFriends] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  const itemRefs = useRef<(HTMLButtonElement | HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, 2); // We have 2 items: Friends, Profile
    setHeaderItems(itemRefs.current);
  }, [setHeaderItems]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const onlineCount = userProfile.friends.filter(
        (f) => f.status !== 'Offline'
      ).length;
      setActiveFriends(onlineCount);
    }
  }, [isClient, userProfile.friends]);

  const handleSignOut = () => {
    setActiveProfile(null);
    router.push('/select-profile');
  };

  const isFriendsFocused = focusArea === 'HEADER' && headerIndex === 0;
  const isProfileFocused = focusArea === 'HEADER' && headerIndex === 1;

  return (
    <header className="fixed top-4 right-4 z-40">
      <TooltipProvider>
        <div className="flex items-center gap-2 p-2 rounded-full glass-pane">
          {isClient ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/friends"
                  ref={el => itemRefs.current[0] = el}
                  className={cn(
                      "relative rounded-full text-white/80 hover:text-primary hover:bg-primary/20 h-10 w-10 inline-flex items-center justify-center",
                      isFriendsFocused && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  )}
                >
                    <Users className="h-5 w-5" />
                    <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{activeFriends} friends online</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <div className="h-10 w-10 bg-muted/20 rounded-full animate-pulse" />
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button ref={el => itemRefs.current[1] = el as HTMLButtonElement} className={cn(
                  "rounded-full focus:outline-none transition-all",
                  isProfileFocused && "ring-2 ring-primary ring-offset-2 ring-offset-background"
              )}>
                <Image
                  src={userProfile.avatar}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-primary/50 hover:border-primary transition-all duration-300"
                  data-ai-hint="futuristic avatar"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="bottom"
              align="end"
              className="glass-pane w-48"
            >
              <DropdownMenuLabel>{userProfile.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>View Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Switch Profile</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TooltipProvider>
    </header>
  );
}
