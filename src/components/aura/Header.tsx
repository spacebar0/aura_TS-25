// src/components/aura/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Users, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useUserProfile } from '@/context/UserProfileContext';
import { useActiveProfile } from '@/context/ActiveProfileContext';
import { useRouter } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

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
       const onlineCount = userProfile.friends.filter(f => f.status !== 'Offline').length;
      setActiveFriends(onlineCount);
    }
  }, [isClient, userProfile.friends]);

  const handleSignOut = () => {
    setActiveProfile(null);
    router.push('/select-profile');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-4">
      <div className="container mx-auto flex justify-end items-center">
        <TooltipProvider>
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleSignOut} variant="ghost" size="icon" className="text-white/80 hover:text-primary hover:bg-transparent">
                  <LogOut className="h-6 w-6"/>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Switch Profile</p>
              </TooltipContent>
            </Tooltip>

            {isClient ? (
              <Button asChild variant="ghost" className="relative text-white/80 hover:text-primary hover:bg-transparent transition-colors duration-300 group">
                <Link href="/friends">
                  <Users className="h-6 w-6 transition-colors duration-300 group-hover:text-glow" />
                  <span className="ml-2 font-bold transition-colors duration-300 group-hover:text-glow">{activeFriends}</span>
                  <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-green-500 ring-2 ring-background" />
                </Link>
              </Button>
            ) : (
              <div className="h-10 w-20 bg-muted/20 rounded-md animate-pulse" />
            )}
            <Link href="/profile">
              <Image
                src={userProfile.avatar}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full border-2 border-primary hover:scale-110 transition-transform duration-300"
                data-ai-hint="futuristic avatar"
              />
            </Link>
          </div>
        </TooltipProvider>
      </div>
    </header>
  );
}
