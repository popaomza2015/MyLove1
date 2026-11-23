'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { content, MemoryCard } from '@/content/surprise';
import { soundEngine } from '@/lib/audio';
import { triggerHaptic } from '@/lib/haptics';

interface Props {
  onComplete: () => void;
  onBack: () => void;
}

function ImageWithFallback({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className="w-full aspect-[4/5] rounded-photo warm-gradient-placeholder"
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      className="w-full aspect-[4/5] rounded-photo object-cover"
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}

export default function MemoriesStage({ onComplete, onBack }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cards = content.memories.cards;
  const [activeIndex, setActiveIndex] = useState(0);

  /* Track scroll position for progress indicator */
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollTop = el.scrollTop;
    const cardHeight = el.clientHeight;
    const index = Math.round(scrollTop / cardHeight);
    setActiveIndex(Math.min(index, cards.length)); // length = last-card button
  }, [cards.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const totalSlides = cards.length + 1; // +1 for the final CTA card

  return (
    <div className="relative h-dvh w-full">
      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-20 text-muted text-xs font-sans opacity-60 hover:opacity-100 transition-opacity"
      >
        ← ย้อนกลับ
      </button>

      {/* Gold progress dots */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              i === activeIndex ? 'bg-gold' : 'bg-gold/30'
            }`}
          />
        ))}
      </div>

      {/* Scroll-snap container */}
      <div
        ref={scrollRef}
        className="h-dvh overflow-y-auto snap-y-mandatory hide-scrollbar"
      >
        {cards.map((card, i) => (
          <MemorySlide key={i} card={card} index={i} />
        ))}

        {/* Final CTA card */}
        <div className="h-dvh snap-start flex flex-col items-center justify-center px-6">
          <motion.button
            onClick={() => {
              soundEngine.playPaperRustle();
              triggerHaptic('light');
              onComplete();
            }}
            className="bg-seal text-cream font-sans text-lg px-8 py-4 rounded-card shadow-quiet active:scale-95 transition-transform"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            เปิดของขวัญ 🎁
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function MemorySlide({ card, index }: { card: MemoryCard; index: number }) {
  // Alternate organic polaroid tilt: -1deg, 1.2deg, -0.8deg, 1deg
  const tiltDeg = content.memories?.polaroidStyle ? (index % 2 === 0 ? -1.2 : 1.2) : 0;

  return (
    <div className="h-dvh snap-start flex items-center justify-center px-5 py-8">
      <motion.div
        className="bg-paper rounded-card shadow-quiet p-5 w-full max-w-[380px] flex flex-col gap-4 border border-paper-edge/60"
        style={{ rotate: `${tiltDeg}deg` }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Photo */}
        <ImageWithFallback src={card.image} alt={card.title} />

        {/* Text content */}
        <div className="space-y-2 px-1">
          <h2 className="font-serif text-xl font-semibold text-ink">
            {card.title}
          </h2>
          <p className="font-sans text-sm text-ink-soft leading-relaxed line-clamp-3">
            {card.story}
          </p>
          <p className="font-sans text-xs text-gold">
            {card.date}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
