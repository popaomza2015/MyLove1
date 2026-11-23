'use client';

import { motion } from 'framer-motion';
import { content } from '@/content/surprise';

interface Props {
  onReplay: () => void;
  onClose: () => void;
}

export default function EndingStage({ onReplay, onClose }: Props) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-dvh px-6 text-center gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* Main message */}
      <motion.p
        className="font-serif text-2xl text-cream leading-relaxed max-w-[320px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {content.ending.message}
      </motion.p>

      {/* Decorative line */}
      <motion.div
        className="w-16 h-[1px] bg-gold/40"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      />

      {/* Action links */}
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <button
          onClick={onReplay}
          className="text-gold font-sans text-sm underline underline-offset-4 decoration-gold/40 hover:decoration-gold transition-colors"
        >
          {content.ending.replayText}
        </button>
        <button
          onClick={onClose}
          className="text-muted font-sans text-xs opacity-60 hover:opacity-100 transition-opacity"
        >
          {content.ending.closeText}
        </button>
      </motion.div>
    </motion.div>
  );
}
