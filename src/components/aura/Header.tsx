// src/components/aura/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { userProfile } from '@/lib/mock-data';
import { Button } from '../ui/button';
import { Users } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Header() {
  const [activeFriends, setActiveFriends] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (isClient) {
      setActiveFriends(Math.floor(Math.random() * 20));
    }
  }, [isClient]);


  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-4">
      <div className="container mx-auto flex justify-end items-center">
        <div className="flex items-center gap-4">
          {isClient ? (
            <Button variant="ghost" className="relative">
              <Users className="h-6 w-6 text-white" />
              <span className="ml-2 text-white font-bold">{activeFriends}</span>
              <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-green-500 ring-2 ring-background" />
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
      </div>
    </header>
  );
}
