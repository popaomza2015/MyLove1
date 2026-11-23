'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Props {
  audioSrc?: string;
  note: string;
}

export default function VoiceNotePlayer({ audioSrc, note }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const curr = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 1;
    setProgress((curr / dur) * 100);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration || 0);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="mt-3 p-3.5 rounded-photo bg-[#EAE0D3] border border-gold/40 flex flex-col gap-2.5">
      <audio
        ref={audioRef}
        src={audioSrc || '/audio/voice-note.mp3'}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      <div className="flex items-center gap-3">
        <motion.button
          onClick={togglePlay}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full bg-seal text-cream flex items-center justify-center shadow-sm shrink-0"
        >
          {isPlaying ? '⏸' : '▶'}
        </motion.button>
        <div className="flex-1">
          <div className="flex justify-between text-[11px] text-ink-soft mb-1 font-sans">
            <span>{isPlaying ? 'กำลังฟังข้อความเสียง...' : 'แตะเพื่อฟัง'}</span>
            <span>{duration > 0 ? formatTime(duration) : '0:30'}</span>
          </div>
          {/* Progress Wave bar */}
          <div className="w-full h-2 bg-[#D8C9B9] rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gold rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
      <p className="text-xs text-ink-soft italic font-sans">{note}</p>
    </div>
  );
}
