'use client';

import { useState, useMemo } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { content } from '@/content/surprise';
import { soundEngine } from '@/lib/audio';
import { triggerHaptic } from '@/lib/haptics';

interface Props {
  onComplete: () => void;
  onBack: () => void;
}

export default function LetterStage({ onComplete, onBack }: Props) {
  const [swiped, setSwiped] = useState(false);
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, -120], [1, 0]);

  // Calculate days together
  const daysTogether = useMemo(() => {
    if (!content.counter?.enabled || !content.counter.startDate) return null;
    try {
      const start = new Date(content.counter.startDate).getTime();
      const now = new Date().getTime();
      const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
      return Math.max(1, diff);
    } catch {
      return null;
    }
  }, []);

  const triggerNext = () => {
    soundEngine.playPaperRustle();
    triggerHaptic('light');
    setSwiped(true);
    setTimeout(onComplete, 400);
  };

  const handleDragEnd = (_: any, info: { offset: { y: number }; velocity: { y: number } }) => {
    if (info.offset.y < -50 || info.velocity.y < -200) {
      triggerNext();
    }
  };

  const lines = content.letter.body.split('\n');

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-dvh px-5 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-5 text-muted text-xs font-sans opacity-60 hover:opacity-100 transition-opacity"
      >
        ← ย้อนกลับ
      </button>

      {/* Letter card */}
      <motion.div
        className="bg-paper rounded-card shadow-quiet p-8 w-full max-w-[380px] relative"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.4}
        onDragEnd={handleDragEnd}
        style={{ y, opacity: swiped ? 0 : opacity }}
        animate={swiped ? { y: -300, opacity: 0 } : {}}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Decorative top line */}
        <div className="w-12 h-[2px] bg-paper-edge mx-auto mb-4 rounded-full" />

        {/* Optional Days Together Counter Badge */}
        {daysTogether && (
          <motion.div
            className="mb-5 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-[#EAE0D3] text-gold text-xs font-serif border border-gold/30">
              {content.counter.prefix} {daysTogether.toLocaleString()} {content.counter.suffix}
            </span>
          </motion.div>
        )}

        {/* Letter body */}
        <div className="space-y-1">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              className={`font-sans text-base leading-relaxed ${
                line.trim() === '' ? 'h-4' : 'text-ink'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Decorative bottom line */}
        <div className="w-12 h-[2px] bg-paper-edge mx-auto mt-6 rounded-full" />
      </motion.div>

      {/* Swipe hint */}
      {!swiped && (
        <motion.button
          onClick={triggerNext}
          className="mt-8 text-muted text-sm font-sans text-center cursor-pointer select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7, y: [0, -4, 0] }}
          transition={{
            opacity: { duration: 0.5, delay: 1.5 },
            y: { duration: 1.5, repeat: Infinity, delay: 2 },
          }}
        >
          ↑ {content.letter.swipeHint}
        </motion.button>
      )}
    </motion.div>
  );
}
