'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function AmbientBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate 12 serene warm amber dust motes
    const generated: Particle[] = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1.2,
      duration: Math.random() * 8 + 9,
      delay: Math.random() * 4,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Organic Candlelight Flicker Gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse 65% 55% at 50% 38%, #3A241C 0%, #1A1412 65%, #1A1412 100%)',
            'radial-gradient(ellipse 60% 50% at 50% 41%, #342018 0%, #1A1412 68%, #1A1412 100%)',
            'radial-gradient(ellipse 70% 58% at 50% 39%, #3E271F 0%, #1A1412 64%, #1A1412 100%)',
            'radial-gradient(ellipse 62% 52% at 50% 40%, #36221A 0%, #1A1412 66%, #1A1412 100%)',
            'radial-gradient(ellipse 65% 55% at 50% 38%, #3A241C 0%, #1A1412 65%, #1A1412 100%)',
          ],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating Golden Dust Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold/40 shadow-[0_0_8px_#C6A075]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          animate={{
            y: [-20, -120],
            x: [0, (p.id % 2 === 0 ? 15 : -15)],
            opacity: [0, 0.65, 0.2, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
