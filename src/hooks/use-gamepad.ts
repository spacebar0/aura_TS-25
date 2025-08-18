
'use client';

import { useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useFocus } from '@/context/FocusContext';

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
  const focusContext = useFocus(); // Can be null if not in provider, handle gracefully

  const debouncedActions = {
    onLeft: useDebouncedCallback(actions.onLeft || (() => {}), DEBOUNCE_DELAY, { leading: true, trailing: false }),
    onRight: useDebouncedCallback(actions.onRight || (() => {}), DEBOUNCE_DELAY, { leading: true, trailing: false }),
    onUp: useDebouncedCallback(actions.onUp || (() => {}), DEBOUNCE_DELAY, { leading: true, trailing: false }),
    onDown: useDebouncedCallback(actions.onDown || (() => {}), DEBOUNCE_DELAY, { leading: true, trailing: false }),
    onButtonA: useDebouncedCallback(actions.onButtonA || (() => {}), DEBOUNCE_DELAY, { leading: true, trailing: false }),
    onButtonB: useDebouncedCallback(actions.onButtonB || (() => {}), DEBOUNCE_DELAY, { leading: true, trailing: false }),
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

      const isMainContentFocused = focusContext ? focusContext.focusArea === 'MAIN' : true;
      const handleAction = (action?: () => void) => {
        if(isMainContentFocused && action) {
          action();
        }
      }

      // --- Axes (Joystick & D-Pad) ---
      const xAxis = gp.axes[0];
      const yAxis = gp.axes[1];

      // D-Pad buttons
      const dPadLeft = gp.buttons[14]?.pressed;
      const dPadRight = gp.buttons[15]?.pressed;
      const dPadUp = gp.buttons[12]?.pressed;
      const dPadDown = gp.buttons[13]?.pressed;

      if (xAxis < -0.5 || dPadLeft) handleAction(debouncedActions.onLeft);
      if (xAxis > 0.5 || dPadRight) handleAction(debouncedActions.onRight);
      if (yAxis < -0.5 || dPadUp) handleAction(debouncedActions.onUp);
      if (yAxis > 0.5 || dPadDown) handleAction(debouncedActions.onDown);


      // --- Buttons ---
      // Button A (e.g., Select/Confirm)
      if (actions.onButtonA) {
        if (gp.buttons[0].pressed && !lastPressed.current['buttonA']) {
          handleAction(actions.onButtonA);
        }
        lastPressed.current['buttonA'] = gp.buttons[0].pressed;
      }

      // Button B (e.g., Back/Cancel)
       if (actions.onButtonB) {
        if (gp.buttons[1].pressed && !lastPressed.current['buttonB']) {
          actions.onButtonB(); // Global actions like 'back' should always fire
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
  }, [actions, debouncedActions, focusContext]);
}
