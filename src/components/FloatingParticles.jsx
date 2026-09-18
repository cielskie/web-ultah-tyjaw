import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const FloatingParticles = () => {
  // Generate a list of randomized particles
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage x-position
      size: Math.random() * 16 + 10, // 10px to 26px
      duration: Math.random() * 8 + 8, // 8s to 16s
      delay: Math.random() * 6,
      opacity: Math.random() * 0.5 + 0.3,
      isSparkle: i % 4 === 0,
      color: i % 2 === 0 ? '#ff4d8d' : '#e0267d',
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            y: '105vh',
            x: `${p.x}vw`,
            opacity: 0,
            scale: 0.5,
            rotate: 0,
          }}
          animate={{
            y: '-10vh',
            x: [`${p.x}vw`, `${p.x + (p.id % 2 === 0 ? 4 : -4)}vw`, `${p.x}vw`],
            opacity: [0, p.opacity, p.opacity, 0],
            scale: [0.5, 1, 1, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
          className="absolute"
          style={{
            color: p.color,
            filter: `drop-shadow(0 0 8px ${p.color})`,
          }}
        >
          {p.isSparkle ? (
            <Sparkles style={{ width: p.size, height: p.size }} />
          ) : (
            <Heart style={{ width: p.size, height: p.size }} fill={p.color} />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingParticles;
