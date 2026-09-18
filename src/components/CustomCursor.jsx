import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for outer trailing ring
  const springConfig = { damping: 28, stiffness: 260, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only activate cursor if device supports fine hover (desktop mouse)
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasFinePointer) return;

    setIsEnabled(true);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check if hovering interactive element
      const target = e.target;
      if (target) {
        const isInteractive = Boolean(
          target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('[role="button"]') ||
          target.closest('.cursor-pointer') ||
          window.getComputedStyle(target).cursor === 'pointer'
        );
        setIsHovered(isInteractive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  if (!isEnabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] select-none overflow-hidden">
      {/* ── 1. OUTER TRAILING RING (Soft Rose Gold & Champagne) ── */}
      <motion.div
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e2a8b6]/80 pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          width: isHovered ? 42 : isClicking ? 22 : 30,
          height: isHovered ? 42 : isClicking ? 22 : 30,
          backgroundColor: isHovered ? 'rgba(226, 168, 182, 0.14)' : 'rgba(255, 230, 240, 0.04)',
          boxShadow: isHovered
            ? '0 0 16px rgba(226, 168, 182, 0.5), inset 0 0 10px rgba(223, 193, 136, 0.25)'
            : '0 0 10px rgba(226, 168, 182, 0.3)',
          transition: 'width 0.2s ease-out, height 0.2s ease-out, background-color 0.2s ease-out',
        }}
      >
        {/* Tiny sweet sparkle or petal accent on ring when hovered */}
        {isHovered && (
          <div className="absolute -top-1 right-0 w-1.5 h-1.5 rounded-full bg-[#eed7a1] shadow-[0_0_6px_#eed7a1]" />
        )}
      </motion.div>

      {/* ── 2. INNER PRECISE DOT (Gentle Pearlescent Pink) ── */}
      <motion.div
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          width: isHovered ? 5 : isClicking ? 8 : 6,
          height: isHovered ? 5 : isClicking ? 8 : 6,
          backgroundColor: isHovered ? '#eed7a1' : '#f9e8ed',
          boxShadow: '0 0 8px rgba(255, 255, 255, 0.9), 0 0 14px rgba(226, 168, 182, 0.8)',
          transition: 'width 0.15s ease-out, height 0.15s ease-out, background-color 0.15s ease-out',
        }}
      />
    </div>
  );
}
