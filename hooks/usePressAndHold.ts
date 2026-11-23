'use client';

import { useRef, useCallback, useEffect } from 'react';

interface UsePressAndHoldOptions {
  duration?: number;      // ms to hold — default 700
  onComplete: () => void;
  onShortTap?: () => void;
}

export function usePressAndHold({
  duration = 700,
  onComplete,
  onShortTap,
}: UsePressAndHoldOptions) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completedRef = useRef(false);
  const startTimeRef = useRef(0);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const onStart = useCallback(() => {
    completedRef.current = false;
    startTimeRef.current = Date.now();
    clear();
    timerRef.current = setTimeout(() => {
      completedRef.current = true;
      onComplete();
    }, duration);
  }, [duration, onComplete, clear]);

  const onEnd = useCallback(() => {
    clear();
    if (!completedRef.current) {
      const elapsed = Date.now() - startTimeRef.current;
      if (elapsed < 300 && onShortTap) {
        onShortTap();
      }
    }
  }, [clear, onShortTap]);

  /* cleanup on unmount */
  useEffect(() => clear, [clear]);

  return {
    onMouseDown: onStart,
    onMouseUp: onEnd,
    onMouseLeave: onEnd,
    onTouchStart: onStart,
    onTouchEnd: onEnd,
  };
}
