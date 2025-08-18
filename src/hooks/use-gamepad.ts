
'use client';

import { useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface GamepadActions {
  onLeft?: () => void;
  onRight?: () => void;
  onUp?: () => void;
  onDown?: () => void;
  onButtonA?: () => void; // Usually button 0 (X on PS, A on Xbox)
  onButtonB?: () => void; // Usually button 1 (Circle on PS, B on Xbox)
}

const DEBOUNCE_DELAY = 150; // ms

export function useGamepad(actions: GamepadActions) {
  const animationFrameId = useRef<number>();
  const lastPressed = useRef<{ [key: string]: boolean }>({});

  const debouncedActions = {
    onLeft: useDebouncedCallback(actions.onLeft || (() => {}), DEBOUNCE_DELAY, { leading: true, trailing: false }),
    onRight: useDebouncedCallback(actions.onRight || (() => {}), DEBOUNCE_DELAY, { leading: true, trailing: false }),
    onUp: useDebouncedCallback(actions.onUp || (() => {}), DEBOUNCE_DELAY, { leading: true, trailing: false }),
    onDown: useDebouncedCallback(actions.onDown || (() => {}), DEBOUNCE_DELAY, { leading: true, trailing: false }),
  };

  useEffect(() => {
    const pollGamepads = () => {
      const gamepads = navigator.getGamepads().filter(g => g);
      if (gamepads.length === 0) {
        animationFrameId.current = requestAnimationFrame(pollGamepads);
        return;
      }

      const gp = gamepads[0]; // Use the first connected gamepad
      if (!gp) {
          animationFrameId.current = requestAnimationFrame(pollGamepads);
          return;
      }

      // --- Axes (Joystick) ---
      const xAxis = gp.axes[0];
      const yAxis = gp.axes[1];

      if (xAxis < -0.5) debouncedActions.onLeft();
      if (xAxis > 0.5) debouncedActions.onRight();
      if (yAxis < -0.5) debouncedActions.onUp();
      if (yAxis > 0.5) debouncedActions.onDown();

      // --- Buttons ---
      // Button A (e.g., Select/Confirm)
      if (actions.onButtonA) {
        if (gp.buttons[0].pressed && !lastPressed.current['buttonA']) {
          actions.onButtonA();
        }
        lastPressed.current['buttonA'] = gp.buttons[0].pressed;
      }

      // Button B (e.g., Back/Cancel)
      if (actions.onButtonB) {
        // PS 'X' is often button 1, but we'll use a common mapping where B is back
        if (gp.buttons[1].pressed && !lastPressed.current['buttonB']) {
          actions.onButtonB();
        }
        lastPressed.current['buttonB'] = gp.buttons[1].pressed;
      }

      animationFrameId.current = requestAnimationFrame(pollGamepads);
    };

    pollGamepads();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [actions, debouncedActions]);
}

// Add use-debounce to dependencies
// In a real project, we would run `npm install use-debounce`
// For this environment, we'll just add it to package.json
