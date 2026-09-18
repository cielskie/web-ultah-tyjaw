import React, { useEffect, useRef } from 'react';

const MatrixRainCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrameId;

    // Romantic personalized runes & characters
    const chars = 'TYASDIVASYAKILLATYJAWHAPPYBIRTHDAY1909✦✧❀♡·';
    const fontSize = 14;
    const colWidth = 18;

    const STREAMS_PER_COL = 3;
    const TRAIL_LENGTH = 20;

    let cols, drops, dpr;

    const setSize = () => {
      dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };

    const init = () => {
      setSize();
      cols = Math.floor(window.innerWidth / colWidth);

      drops = [];
      for (let c = 0; c < cols; c++) {
        drops[c] = [];
        for (let s = 0; s < STREAMS_PER_COL; s++) {
          drops[c][s] = -Math.floor(Math.random() * 25) - (s * 16);
        }
      }
    };

    init();
    window.addEventListener('resize', init);
    window.addEventListener('orientationchange', init);

    // Harmonious Soft Light Dark Pink & Champagne Palette
    const baseColors = [
      [242, 185, 203], // Soft blush rose
      [223, 193, 136], // Champagne gold
      [212, 138, 155], // Dusty pink
      [238, 215, 161], // Pale champagne
      [196, 112, 135], // Velvet rose
    ];

    const getSpeed = () => 0.20 + Math.random() * 0.10;
    const speeds = Array.from({ length: cols }, () =>
      Array.from({ length: STREAMS_PER_COL }, getSpeed)
    );

    const draw = () => {
      animFrameId = requestAnimationFrame(draw);
      const logW = window.innerWidth;
      const logH = window.innerHeight;

      // Soft light dark pink trail fade (matches base palette #1c0617)
      ctx.fillStyle = 'rgba(28, 6, 23, 0.16)';
      ctx.fillRect(0, 0, logW, logH);

      ctx.font = `500 ${fontSize}px "Plus Jakarta Sans", sans-serif`;
      ctx.textBaseline = 'top';

      for (let c = 0; c < cols; c++) {
        const x = c * colWidth;
        const [r, g, b] = baseColors[c % baseColors.length];

        for (let s = 0; s < STREAMS_PER_COL; s++) {
          const headY = drops[c][s];

          for (let t = 0; t < TRAIL_LENGTH; t++) {
            const rowY = headY - t;
            const py = rowY * fontSize;

            if (py < -fontSize || py > logH) continue;

            const char = chars[Math.floor(Math.random() * chars.length)];

            if (t === 0) {
              // Warm ivory head
              ctx.fillStyle = 'rgba(255, 248, 252, 0.95)';
            } else {
              // Trail fades as it gets further from head
              const alpha = Math.max(0, 1 - t / TRAIL_LENGTH) * 0.85;
              ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
            }

            ctx.fillText(char, x, py);
          }

          drops[c][s] += speeds[c][s];

          if (drops[c][s] * fontSize > logH + TRAIL_LENGTH * fontSize) {
            drops[c][s] = -Math.random() * 10;
          }
        }
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', init);
      window.removeEventListener('orientationchange', init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 select-none opacity-80"
    />
  );
};

export default MatrixRainCanvas;
