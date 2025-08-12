// src/components/aura/MusicSidebar.tsx
'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { recentlyPlayed, userPlaylists, type Song } from '@/lib/mock-data';
import Image from 'next/image';
import {
  ListMusic,
  PlayCircle,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  PauseCircle,
  Mic2,
  ListVideo
} from 'lucide-react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { useState, useEffect } from 'react';
import { Progress } from '../ui/progress';

interface MusicSidebarProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function MusicSidebar({ isOpen, onOpenChange }: MusicSidebarProps) {
  const [nowPlaying, setNowPlaying] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [progress, setProgress] = useState(33);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !nowPlaying) {
        setNowPlaying(recentlyPlayed[0]);
    }
  }, [isClient, nowPlaying]);

   useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && nowPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, nowPlaying]);


  const handlePlaySong = (song: Song) => {
    setNowPlaying(song);
    setIsPlaying(true);
    setProgress(0);
  };
  
  const togglePlay = () => {
    if (nowPlaying) {
        setIsPlaying(!isPlaying);
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="glass-pane w-[380px] sm:w-[420px] p-0 flex flex-col">
        <SheetHeader className="p-6 pb-2">
          <SheetTitle className="text-2xl font-headline">Music Player</SheetTitle>
          <SheetDescription>
            Your soundtrack for the AURA experience.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 flex flex-col min-h-0">
          <Tabs defaultValue="playlists" className="flex-1 flex flex-col min-h-0">
            <TabsList className="mx-6">
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="suggestions">For You</TabsTrigger>
            </TabsList>
            <ScrollArea className="flex-1">
                <TabsContent value="playlists" className="m-0 px-2">
                    {userPlaylists.map(playlist => (
                        <div key={playlist.id} className="p-4">
                            <h3 className="text-lg font-medium mb-2">{playlist.name}</h3>
                            <div className="space-y-2">
                                {playlist.songs.map(song => (
                                    <SongItem key={song.id} song={song} onPlay={handlePlaySong} isPlaying={isPlaying && nowPlaying?.id === song.id} />
                                ))}
                            </div>
                        </div>
                    ))}
                </TabsContent>
                <TabsContent value="recent" className="m-0 px-2">
                    <div className="p-4">
                        <div className="space-y-2">
                            {recentlyPlayed.map(song => (
                                <SongItem key={song.id} song={song} onPlay={handlePlaySong} isPlaying={isPlaying && nowPlaying?.id === song.id} />
                            ))}
                        </div>
                    </div>
                </TabsContent>
                 <TabsContent value="suggestions" className="m-0 p-6 text-center">
                    <p className="text-muted-foreground">AI-powered suggestions coming soon!</p>
                </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>

        {nowPlaying && (
            <div className="p-4 border-t border-white/10 mt-auto bg-black/30">
                <div className="flex items-center gap-4">
                    <Image src={nowPlaying.coverArt} alt={nowPlaying.title} width={64} height={64} className="rounded-md" data-ai-hint="album art" />
                    <div className="flex-1">
                        <h4 className="font-medium truncate">{nowPlaying.title}</h4>
                        <p className="text-sm text-muted-foreground truncate">{nowPlaying.artist}</p>
                    </div>
                </div>
                <div className='mt-2'>
                    <Progress value={progress} className="h-1" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>1:10</span>
                        <span>{nowPlaying.duration}</span>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-4 mt-2">
                    <Button variant="ghost" size="icon"><Shuffle className="w-5 h-5" /></Button>
                    <Button variant="ghost" size="icon"><SkipBack className="w-6 h-6" /></Button>
                    <Button variant="ghost" size="icon" className="w-12 h-12" onClick={togglePlay}>
                        {isPlaying ? <PauseCircle className="w-10 h-10 text-primary" /> : <PlayCircle className="w-10 h-10 text-primary" />}
                    </Button>
                    <Button variant="ghost" size="icon"><SkipForward className="w-6 h-6" /></Button>
                    <Button variant="ghost" size="icon"><Repeat className="w-5 h-5" /></Button>
                </div>
            </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function SongItem({ song, onPlay, isPlaying }: { song: Song, onPlay: (song: Song) => void, isPlaying: boolean }) {
    return (
      <div className="flex items-center gap-3 p-2 rounded-md hover:bg-white/10 transition-colors">
        <Image
          src={song.coverArt}
          alt={song.title}
          width={40}
          height={40}
          className="rounded"
          data-ai-hint="album art"
        />
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{song.title}</p>
          <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => onPlay(song)}>
            {isPlaying ? <PauseCircle className="w-6 h-6 text-primary" /> : <PlayCircle className={cn("w-6 h-6")} />}
        </Button>
      </div>
    );
  }
