
'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';

const AuraBeamLoader = ({ text = "Curating Capsules..." }: { text?: string }) => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden rounded-lg bg-background/30">
      <div className="absolute inset-0 z-0 animate-pulse">
        <div
          className="absolute inset-0 bg-primary/20"
          style={{
            maskImage: 'radial-gradient(circle at center, white 10%, transparent 70%)',
          }}
        />
      </div>
      <Image src="/images/logo.PNG" alt="Aura Logo" width={64} height={64} className="z-10 animate-pulse" />
      <p className="mt-4 text-sm text-primary z-10 font-medium">{text}</p>
      <div
        className={cn(
          'absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent z-20',
          'animate-[beam_3s_ease-in-out_infinite]'
        )}
        style={{
          animationDelay: '0.5s',
        }}
      />
      <style jsx>{`
        @keyframes beam {
          0% {
            transform: translateX(-100%) skewX(-30deg);
          }
          100% {
            transform: translateX(300%) skewX(-30deg);
          }
        }
      `}</style>
    </div>
  );
};

export { AuraBeamLoader };
