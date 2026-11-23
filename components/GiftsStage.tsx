'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content, GiftItem } from '@/content/surprise';
import { soundEngine } from '@/lib/audio';
import { triggerHaptic } from '@/lib/haptics';
import VoiceNotePlayer from '@/components/VoiceNotePlayer';

const STORAGE_KEY = 'opened-gifts';

interface Props {
  onComplete: () => void;
  onBack: () => void;
}

function getOpenedGifts(): boolean[] {
  if (typeof window === 'undefined') return content.gifts.items.map(() => false);
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return content.gifts.items.map(() => false);
}

function saveOpenedGifts(opened: boolean[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(opened));
  } catch {}
}

const kindEmoji: Record<string, string> = {
  thing: '🎁',
  letter: '💌',
  promise: '🤞',
  voice: '🎙️',
};

export default function GiftsStage({ onComplete, onBack }: Props) {
  const [opened, setOpened] = useState<boolean[]>(() => getOpenedGifts());
  const items = content.gifts.items;
  const allOpened = opened.every(Boolean);

  useEffect(() => {
    saveOpenedGifts(opened);
  }, [opened]);

  const toggleGift = useCallback((index: number) => {
    soundEngine.playPaperRustle();
    triggerHaptic('light');
    setOpened((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-dvh px-5 py-10 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back button */}
      <button
        onClick={onBack}
        className="self-start text-muted text-xs font-sans opacity-60 hover:opacity-100 transition-opacity"
      >
        ← ย้อนกลับ
      </button>

      <h2 className="font-serif text-2xl text-cream font-semibold">
        ของขวัญสำหรับเธอ
      </h2>

      {/* Gift boxes */}
      <div className="flex flex-col gap-4 w-full max-w-[380px]">
        {items.map((gift, i) => (
          <GiftBox
            key={i}
            gift={gift}
            isOpen={opened[i]}
            index={i}
            onOpen={() => toggleGift(i)}
          />
        ))}
      </div>

      {/* Next button — only when all opened */}
      <AnimatePresence>
        {allOpened && (
          <motion.button
            onClick={() => {
              soundEngine.playWaxCrack();
              triggerHaptic('success');
              onComplete();
            }}
            className="mt-4 bg-seal text-cream font-sans text-base px-7 py-3 rounded-card shadow-quiet active:scale-95 transition-transform"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {content.gifts.nextButton}
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Individual Gift Box ────────────────── */

function GiftBox({
  gift,
  isOpen,
  index,
  onOpen,
}: {
  gift: GiftItem;
  isOpen: boolean;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.div
      layout
      className="relative overflow-hidden rounded-card bg-paper shadow-quiet cursor-pointer select-none"
      onClick={() => !isOpen && onOpen()}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.12 }}
    >
      {/* Closed state */}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="closed"
            className="flex items-center justify-between p-5"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{kindEmoji[gift.kind]}</span>
              <span className="font-serif text-lg text-ink font-medium">
                {gift.title}
              </span>
            </div>

            {/* Ribbon */}
            <div className="flex flex-col items-center gap-0.5 ribbon-shimmer">
              <div className="w-1 h-6 bg-seal rounded-full" />
              <div className="w-4 h-4 rounded-full border-2 border-seal" />
              <div className="w-1 h-6 bg-seal rounded-full" />
            </div>
          </motion.div>
        ) : (
          /* Opened state — cream note */
          <motion.div
            key="open"
            className="p-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{kindEmoji[gift.kind]}</span>
              <span className="font-serif text-lg text-ink font-medium">
                {gift.title}
              </span>
            </div>
            {gift.kind === 'voice' ? (
              <VoiceNotePlayer audioSrc={gift.audioSrc} note={gift.note} />
            ) : (
              <p className="font-sans text-sm text-ink-soft leading-relaxed">
                {gift.note}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
