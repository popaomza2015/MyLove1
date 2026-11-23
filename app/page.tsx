'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EnvelopeStage from '@/components/EnvelopeStage';
import LetterStage from '@/components/LetterStage';
import MemoriesStage from '@/components/MemoriesStage';
import GiftsStage from '@/components/GiftsStage';
import EndingStage from '@/components/EndingStage';
import AmbientBackground from '@/components/AmbientBackground';
import MusicPlayer from '@/components/MusicPlayer';

type Stage = 'envelope' | 'letter' | 'memories' | 'gifts' | 'ending';

const stageOrder: Stage[] = ['envelope', 'letter', 'memories', 'gifts', 'ending'];

export default function Home() {
  const [stage, setStage] = useState<Stage>('envelope');

  const goTo = useCallback((s: Stage) => setStage(s), []);

  const goBack = useCallback(() => {
    const idx = stageOrder.indexOf(stage);
    if (idx > 0) setStage(stageOrder[idx - 1]);
  }, [stage]);

  return (
    <main className="w-full min-h-dvh flex justify-center relative overflow-hidden">
      {/* Dynamic Candlelight Background & Ambient Particles */}
      <AmbientBackground />

      {/* Floating Quiet Vinyl Music Player */}
      <MusicPlayer />

      <div className="w-full max-w-app relative z-10">
        <AnimatePresence mode="wait">
          {stage === 'envelope' && (
            <PageWrapper key="envelope">
              <EnvelopeStage onComplete={() => goTo('letter')} />
            </PageWrapper>
          )}
          {stage === 'letter' && (
            <PageWrapper key="letter">
              <LetterStage
                onComplete={() => goTo('memories')}
                onBack={() => goTo('envelope')}
              />
            </PageWrapper>
          )}
          {stage === 'memories' && (
            <PageWrapper key="memories">
              <MemoriesStage
                onComplete={() => goTo('gifts')}
                onBack={() => goTo('letter')}
              />
            </PageWrapper>
          )}
          {stage === 'gifts' && (
            <PageWrapper key="gifts">
              <GiftsStage
                onComplete={() => goTo('ending')}
                onBack={() => goTo('memories')}
              />
            </PageWrapper>
          )}
          {stage === 'ending' && (
            <PageWrapper key="ending">
              <EndingStage
                onReplay={() => goTo('memories')}
                onClose={() => goTo('envelope')}
              />
            </PageWrapper>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
