// src/app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { LoadingAnimation } from '@/components/aura/LoadingAnimation';

export default function RootPage() {
  const router = useRouter();

  const handleAnimationComplete = () => {
    router.replace('/select-profile');
  };

  return <LoadingAnimation onAnimationComplete={handleAnimationComplete} />;
}
