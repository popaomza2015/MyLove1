'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '@/content/surprise';
import { usePressAndHold } from '@/hooks/usePressAndHold';
import { soundEngine } from '@/lib/audio';
import { triggerHaptic } from '@/lib/haptics';

interface Props {
  onComplete: () => void;
}

export default function EnvelopeStage({ onComplete }: Props) {
  const [hint, setHint] = useState(false);
  const [opening, setOpening] = useState(false);
  const [pressing, setPressing] = useState(false);

  const handleComplete = useCallback(() => {
    soundEngine.playWaxCrack();
    triggerHaptic('success');
    setOpening(true);
    setTimeout(onComplete, 600);
  }, [onComplete]);

  const handleShortTap = useCallback(() => {
    triggerHaptic('light');
    setHint(true);
    setTimeout(() => setHint(false), 2000);
  }, []);

  const holdHandlers = usePressAndHold({
    duration: 700,
    onComplete: handleComplete,
    onShortTap: handleShortTap,
  });

  /* Wrap to track pressing state for visual feedback */
  const handlers = {
    onMouseDown: (e: React.MouseEvent) => { setPressing(true); holdHandlers.onMouseDown(); },
    onMouseUp: (e: React.MouseEvent) => { setPressing(false); holdHandlers.onMouseUp(); },
    onMouseLeave: (e: React.MouseEvent) => { setPressing(false); holdHandlers.onMouseLeave(); },
    onTouchStart: (e: React.TouchEvent) => { setPressing(true); holdHandlers.onTouchStart(); },
    onTouchEnd: (e: React.TouchEvent) => { setPressing(false); holdHandlers.onTouchEnd(); },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-dvh px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: opening ? 0 : 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Envelope card */}
      <motion.div
        className="relative flex flex-col items-center gap-6 p-10 bg-paper rounded-card shadow-quiet select-none cursor-pointer w-full max-w-[320px]"
        whileTap={{ scale: 0.97 }}
        {...handlers}
      >
        {/* Decorative top flap */}
        <div className="absolute -top-[2px] left-0 right-0 h-3 bg-paper-edge rounded-t-card" />

        {/* Name */}
        <h1 className="font-serif text-3xl font-bold text-ink tracking-wide mt-2">
          {content.envelope.name}
        </h1>

        {/* Date */}
        <p className="text-ink-soft font-sans text-base">
          {content.envelope.date}
        </p>

        {/* Wax seal */}
        <div className="relative mt-2">
          <motion.div
            className="w-16 h-16 rounded-full bg-seal flex items-center justify-center shadow-md"
            animate={pressing ? { scale: 0.9 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-cream text-2xl">💌</span>
          </motion.div>

          {/* Press ring feedback */}
          {pressing && (
            <div className="absolute inset-0 rounded-full border-2 border-seal press-ring" />
          )}
        </div>

        {/* Decorative bottom */}
        <div className="absolute -bottom-[1px] left-4 right-4 h-[2px] bg-paper-edge rounded-full" />
      </motion.div>

      {/* Hold hint */}
      <AnimatePresence>
        {hint && (
          <motion.p
            className="mt-6 text-muted text-sm font-sans text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
          >
            {content.envelope.holdHint}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
