// src/app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingAnimation } from '@/components/aura/LoadingAnimation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/select-profile');
  }, [router]);

  return <LoadingAnimation onAnimationComplete={() => {}} />;
}
