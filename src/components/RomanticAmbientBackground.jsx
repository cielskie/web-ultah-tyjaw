import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function RomanticAmbientBackground() {
  // 1. Delicate pinpoint stardust / warm lights that emerge gently
  const pinpointStars = useMemo(() => {
    return Array.from({ length: 42 }).map((_, i) => ({
      id: i,
      top: 3 + (i * 19) % 94,
      left: 3 + (i * 23) % 94,
      size: i % 4 === 0 ? 2.4 : i % 2 === 0 ? 1.7 : 1.1,
      delay: 0.1 + (i * 0.08),
      duration: 2.8 + (i % 5) * 0.5,
    }));
  }, []);

  // 2. Soft glowing ambient light orbs drifting upward
  const floatingOrbs = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: Math.random() * 92 + 4,
      size: Math.random() * 7 + 4, // 4px to 11px soft orbs
      duration: Math.random() * 10 + 16, // 16s to 26s slow gentle drift
      delay: Math.random() * 8,
      opacity: Math.random() * 0.25 + 0.15,
      isBlush: i % 2 === 0,
      swayX: (i % 2 === 0 ? 1 : -1) * (Math.random() * 25 + 15),
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* ── Base Soft Light Dark Pink / Velvet Rose Gradient ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, #2a0b22 0%, #1c0617 55%, #0e020c 100%)',
        }}
      />

      {/* ── Soft Ambient Warm Rose & Dusty Pink Radial Color Blooms ── */}
      <div
        className="absolute top-1/4 left-1/4 w-[520px] h-[520px] rounded-full pointer-events-none filter blur-[110px] opacity-30"
        style={{
          background: 'radial-gradient(circle, #7a2046 0%, #420d24 60%, transparent 80%)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[460px] h-[460px] rounded-full pointer-events-none filter blur-[95px] opacity-25"
        style={{
          background: 'radial-gradient(circle, #631735 0%, #2b0716 60%, transparent 80%)',
        }}
      />
      {/* Warm Champagne Gold Ambient Halo in Center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none filter blur-[130px] opacity-15"
        style={{
          background: 'radial-gradient(circle, #dfc188 0%, #c47087 50%, transparent 75%)',
        }}
      />

      {/* ── Twinkling Stardust Lights ── */}
      <div className="absolute inset-0">
        {pinpointStars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{
              opacity: [0, 0.85, 0.3, 0.95, 0.5],
              scale: [0.2, 1.2, 0.9, 1.1, 1],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            className="absolute rounded-full bg-[#fff4f8] shadow-[0_0_6px_#ffffff,0_0_10px_rgba(255,190,215,0.7)]"
          />
        ))}
      </div>

      {/* ── Drifting Warm Rose Orbs ── */}
      <div className="absolute inset-0">
        {floatingOrbs.map((orb) => (
          <motion.div
            key={orb.id}
            initial={{
              y: '105vh',
              x: `${orb.left}vw`,
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              y: '-10vh',
              x: [`${orb.left}vw`, `${orb.left + orb.swayX * 0.04}vw`, `${orb.left}vw`],
              opacity: [0, orb.opacity, orb.opacity * 0.8, 0],
              scale: [0.5, 1, 0.9, 0.6],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              delay: orb.delay,
              ease: 'easeInOut',
            }}
            className="absolute flex items-center justify-center pointer-events-none"
          >
            <div
              style={{
                width: orb.size,
                height: orb.size,
                background: orb.isBlush
                  ? 'radial-gradient(circle, rgba(255,215,230,0.7) 0%, rgba(226,168,182,0.3) 60%, transparent 100%)'
                  : 'radial-gradient(circle, rgba(255,245,225,0.7) 0%, rgba(223,193,136,0.3) 60%, transparent 100%)',
                boxShadow: orb.isBlush
                  ? '0 0 10px rgba(226,168,182,0.5)'
                  : '0 0 10px rgba(223,193,136,0.4)',
              }}
              className="rounded-full"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
