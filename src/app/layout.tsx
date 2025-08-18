import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { PinnedGamesProvider } from '@/context/PinnedGamesContext';
import { UserProfileProvider } from '@/context/UserProfileContext';
import { ActiveProfileProvider } from '@/context/ActiveProfileContext';

export const metadata: Metadata = {
  title: 'AURA Console UI',
  description: 'A high-end, immersive console UI experience.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;400;500;700&family=Poppins:wght@400;500&family=Silkscreen&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          'h-full font-body antialiased bg-background text-foreground overflow-hidden'
        )}
        suppressHydrationWarning
      >
        <ActiveProfileProvider>
          <UserProfileProvider>
            <PinnedGamesProvider>
              {children}
            </PinnedGamesProvider>
          </UserProfileProvider>
        </ActiveProfileProvider>
        <Toaster />
      </body>
    </html>
  );
}
