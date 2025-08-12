import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Music, ListMusic } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';

export function MusicCard({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        'group relative aspect-square w-full h-full overflow-hidden rounded-lg transition-all duration-300 ease-in-out',
        'flex flex-col items-center justify-center bg-accent/20 border-accent/50',
        'hover:scale-105 hover:shadow-2xl hover:shadow-accent/40 focus-within:scale-105 focus-within:shadow-2xl focus-within:shadow-accent/40',
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="relative z-10 flex flex-col items-center text-center p-4">
        <Music className="w-16 h-16 text-accent text-glow mb-4" />
        <h3 className="font-headline text-lg font-medium text-white text-glow">
          Music
        </h3>
        <p className="text-xs text-white/80 mt-1 mb-4">
          Connect your favorite music service.
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="bg-transparent border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <ListMusic className='mr-2' />
              Connect
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <span>Spotify</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Apple Music</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>YouTube Music</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}
