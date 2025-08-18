// src/components/aura/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Users, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';
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

export function Header() {
  const { userProfile } = useUserProfile();
  const { setActiveProfile } = useActiveProfile();
  const router = useRouter();
  const [activeFriends, setActiveFriends] = useState(0);
  const [isClient, setIsClient] = useState(false);

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

  return (
    <header className="fixed top-4 right-4 z-40">
      <TooltipProvider>
        <div className="flex items-center gap-2 p-2 rounded-full glass-pane">
          {isClient ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="relative rounded-full text-white/80 hover:text-primary hover:bg-primary/20"
                >
                  <Link href="/friends">
                    <Users className="h-5 w-5" />
                    <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />
                  </Link>
                </Button>
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
              <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all">
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
