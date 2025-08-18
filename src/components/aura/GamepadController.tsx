// src/components/aura/GamepadController.tsx
'use client';

import { useGamepad } from "@/hooks/use-gamepad";

/**
 * A client component that activates the global gamepad controller hook.
 * It doesn't render any UI, it's just here to safely call the hook.
 */
export function GamepadController() {
  useGamepad();
  return null;
}
