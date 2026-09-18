import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import FallingPetals from './FallingPetals';

/**
 * RomanticLoveAura
 * Komponen aura cinta terpadu:
 * 1. Soft pulsing love light auras (cahaya aura pink & gold bernapas lembut)
 * 2. Cahaya kecil beterbangan (floating fairy stardust / glowing motes)
 * 3. Hati-hati cinta mikro melayang lembut
 * 4. Kelopak bunga mawar berjatuhan realistis
 */
export default function RomanticLoveAura() {
  // Generate floating glowing light motes & micro hearts
  const floatingLights = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // %
      size: Math.random() * 4 + 3, // 3px to 7px
      glowSize: Math.random() * 12 + 8,
      duration: Math.random() * 7 + 7, // 7s to 14s
      delay: Math.random() * 6,
      color: i % 3 === 0 ? '#ffd280' : i % 3 === 1 ? '#ff7aa2' : '#ff4d79',
      drift: (Math.random() - 0.5) * 60, // px horizontal sway
    }));
  }, []);

  const floatingHearts = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: Math.random() * 96 + 2,
      size: Math.random() * 10 + 10, // 10px to 20px
      duration: Math.random() * 8 + 9,
      delay: Math.random() * 7,
      color: i % 2 === 0 ? '#ff527b' : '#e0267d',
      drift: (Math.random() - 0.5) * 50,
      rotateInit: Math.random() * 40 - 20,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20 select-none">
      {/* ── 1. Soft Breathing Love Aura Light Pools ── */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '-10%',
          left: '15%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 77, 121, 0.22) 0%, rgba(220, 38, 127, 0.08) 50%, transparent 70%)',
          filter: 'blur(45px)',
        }}
      />

      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '55vw',
          height: '55vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(223, 193, 136, 0.2) 0%, rgba(255, 105, 180, 0.1) 45%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* ── 2. Realistic Falling Flower Petals ── */}
      <FallingPetals count={18} />

      {/* ── 3. Floating Fairy Light Motes (Cahaya Kecil Beterbangan) ── */}
      {floatingLights.map((item) => (
        <motion.div
          key={`light-${item.id}`}
          initial={{
            y: '105vh',
            x: `${item.left}vw`,
            opacity: 0,
            scale: 0.4,
          }}
          animate={{
            y: '-10vh',
            x: [`${item.left}vw`, `calc(${item.left}vw + ${item.drift}px)`, `${item.left}vw`],
            opacity: [0, 0.85, 0.95, 0],
            scale: [0.4, 1.2, 0.9, 0.3],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            width: item.size,
            height: item.size,
            borderRadius: '50%',
            backgroundColor: item.color,
            boxShadow: `0 0 ${item.glowSize}px ${item.color}, 0 0 ${item.glowSize * 1.8}px #ff85a1`,
          }}
        />
      ))}

      {/* ── 4. Floating Micro Hearts (Aura Cinta) ── */}
      {floatingHearts.map((h) => (
        <motion.div
          key={`heart-${h.id}`}
          initial={{
            y: '108vh',
            x: `${h.left}vw`,
            opacity: 0,
            scale: 0.5,
            rotate: h.rotateInit,
          }}
          animate={{
            y: '-8vh',
            x: [`${h.left}vw`, `calc(${h.left}vw + ${h.drift}px)`, `${h.left}vw`],
            opacity: [0, 0.65, 0.75, 0],
            scale: [0.5, 1, 0.9, 0.4],
            rotate: [h.rotateInit, h.rotateInit + 25, h.rotateInit - 20],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            color: h.color,
            filter: `drop-shadow(0 0 8px ${h.color})`,
          }}
        >
          <Heart style={{ width: h.size, height: h.size }} fill={h.color} />
        </motion.div>
      ))}
    </div>
  );
}
