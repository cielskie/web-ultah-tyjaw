import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function LuxurySilkBackground({ particleCount = 20 }) {
  // Delicate warm champagne & rose particle sparkles
  const sparkles = useMemo(() => {
    return Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 94 + 3,
      top: Math.random() * 90 + 5,
      size: Math.random() * 2.5 + 1.2, // 1.2px - 3.7px
      duration: Math.random() * 6 + 7, // 7s - 13s
      delay: (i * 0.35) % 5,
      driftX: (i % 2 === 0 ? 1 : -1) * (Math.random() * 24 + 10),
      driftY: (i % 3 === 0 ? -1 : 1) * (Math.random() * 20 + 8),
      maxOpacity: Math.random() * 0.45 + 0.3,
    }));
  }, [particleCount]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#0e020c]">
      {/* ── Base Soft Light Dark Pink / Velvet Rose Gradient ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, #2a0b22 0%, #1c0617 55%, #0e020c 100%)',
        }}
      />

      {/* ── Soft Ambient Radial Color Blooms ── */}
      <div
        className="absolute top-1/4 left-1/4 w-[480px] h-[480px] rounded-full pointer-events-none filter blur-[100px] opacity-30"
        style={{
          background: 'radial-gradient(circle, #7a2046 0%, #3a0b1f 60%, transparent 80%)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] rounded-full pointer-events-none filter blur-[90px] opacity-25"
        style={{
          background: 'radial-gradient(circle, #611634 0%, #240514 60%, transparent 80%)',
        }}
      />

      {/* ── Subtle Floating Stardust Sparkles ── */}
      <div className="absolute inset-0">
        {sparkles.map((sp) => (
          <motion.div
            key={sp.id}
            initial={{
              opacity: 0,
              scale: 0.3,
              x: 0,
              y: 0,
            }}
            animate={{
              opacity: [0, sp.maxOpacity, sp.maxOpacity * 0.4, sp.maxOpacity * 0.85, 0],
              scale: [0.3, 1.2, 0.8, 1.1, 0.3],
              x: [0, sp.driftX, 0],
              y: [0, sp.driftY, 0],
            }}
            transition={{
              duration: sp.duration,
              repeat: Infinity,
              delay: sp.delay,
              ease: 'easeInOut',
            }}
            style={{
              top: `${sp.top}%`,
              left: `${sp.left}%`,
              width: `${sp.size}px`,
              height: `${sp.size}px`,
            }}
            className="absolute rounded-full bg-[#fff0f5] shadow-[0_0_8px_rgba(255,200,225,0.8)]"
          />
        ))}
      </div>
    </div>
  );
}
