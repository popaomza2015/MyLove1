'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { content } from '@/content/surprise';
import { soundEngine } from '@/lib/audio';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicConfig = content.ambient.music;

  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      soundEngine.stopSyntheticBgm();
      setIsPlaying(false);
    } else {
      // Try HTML5 audio if src exists
      if (audioRef.current && musicConfig.src) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Fallback to synthetic peaceful piano chime chords!
            soundEngine.startSyntheticBgm();
            setIsPlaying(true);
          });
      } else {
        soundEngine.startSyntheticBgm();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    return () => {
      soundEngine.stopSyntheticBgm();
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 select-none">
      <audio
        ref={audioRef}
        src={musicConfig.src}
        loop
        preload="none"
        onError={() => {
          // If mp3 is not found, fallback handles it
        }}
      />
      <motion.button
        onClick={togglePlay}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-paper/10 border border-gold/30 backdrop-blur-md shadow-quiet text-cream text-xs font-sans hover:bg-paper/20 transition-all active:scale-95"
        whileTap={{ scale: 0.92 }}
        title={isPlaying ? 'ปิดเพลง' : 'เปิดเพลงคลอเบาๆ'}
      >
        {/* Animated Vinyl Disk */}
        <motion.div
          className="w-4 h-4 rounded-full border border-gold flex items-center justify-center bg-bg relative"
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-seal" />
        </motion.div>
        <span className="opacity-80 text-[11px]">
          {isPlaying ? 'กำลังเล่นเพลง' : 'เปิดเพลง'}
        </span>
      </motion.button>
    </div>
  );
}
