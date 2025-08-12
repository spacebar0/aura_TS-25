import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Library } from 'lucide-react';
import Link from 'next/link';

export function LibraryCard({ className }: { className?: string }) {
  return (
    <Link href="/library" className="block w-full h-full">
      <Card
        className={cn(
          'group relative aspect-square w-full h-full overflow-hidden rounded-lg transition-all duration-300 ease-in-out',
          'flex flex-col items-center justify-center bg-secondary/20 border-secondary/50',
          'hover:scale-105 hover:shadow-2xl hover:shadow-secondary/40 focus-within:scale-105 focus-within:shadow-2xl focus-within:shadow-secondary/40',
          className
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="relative z-10 flex flex-col items-center text-center p-4">
          <Library className="w-16 h-16 text-secondary text-glow mb-4" />
          <h3 className="font-headline text-lg font-medium text-white text-glow">
            Library
          </h3>
          <p className="text-xs text-white/80 mt-1">
            View all your games and apps.
          </p>
        </div>
      </Card>
    </Link>
  );
}
