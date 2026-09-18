import React, { useEffect, useRef } from 'react';

const MatrixRainCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use '2d' without willReadFrequently — we only write
    const ctx = canvas.getContext('2d', { alpha: false });
    let animFrameId;

    // Romantic personalized runes & characters
    const chars = 'TYASDIVASYAKILLATYJAWHAPPYBIRTHDAY1909✦✧❀♡·';
    const fontSize = 14;
    const colWidth = 24;      // wider columns → fewer cols → less work

    const STREAMS_PER_COL = 1;  // was 3, reduced to 1
    const TRAIL_LENGTH    = 12; // was 20, reduced to 12

    // Pre-build trail alpha LUT to avoid per-frame division
    const trailAlpha = Array.from({ length: TRAIL_LENGTH }, (_, t) =>
      Math.max(0, 1 - t / TRAIL_LENGTH) * 0.85
    );

    // Pre-build trail fillStyle strings per color to avoid template literals in hot loop
    const baseColors = [
      [242, 185, 203], // Soft blush rose
      [223, 193, 136], // Champagne gold
      [212, 138, 155], // Dusty pink
      [238, 215, 161], // Pale champagne
      [196, 112, 135], // Velvet rose
    ];

    let cols = 0;
    let drops = [];
    let speeds = [];

    // Pre-computed fillStyle cache: colorIdx → array of strings per trail step
    let colorCache = [];

    const buildColorCache = () => {
      colorCache = baseColors.map(([r, g, b]) =>
        trailAlpha.map(a => `rgba(${r},${g},${b},${a.toFixed(2)})`)
      );
    };

    const setSize = () => {
      // Draw at logical pixels only (no DPR scaling) — huge GPU relief on Retina
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.width  = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const init = () => {
      setSize();
      buildColorCache();
      cols = Math.floor(window.innerWidth / colWidth);

      drops = [];
      speeds = [];
      for (let c = 0; c < cols; c++) {
        drops[c]  = -Math.floor(Math.random() * 25);
        speeds[c] = 0.25 + Math.random() * 0.15;
      }
    };

    init();
    window.addEventListener('resize', init);
    window.addEventListener('orientationchange', init);

    // ── Frame throttle: target ~24fps instead of 60fps ──────────────────────
    const TARGET_FPS  = 24;
    const FRAME_MS    = 1000 / TARGET_FPS;
    let   lastTime    = 0;

    const draw = (timestamp) => {
      animFrameId = requestAnimationFrame(draw);

      const delta = timestamp - lastTime;
      if (delta < FRAME_MS) return; // skip frame — not enough time has passed
      lastTime = timestamp - (delta % FRAME_MS); // keep timing accurate

      const logW = window.innerWidth;
      const logH = window.innerHeight;

      // Soft fade overlay
      ctx.fillStyle = 'rgba(28, 6, 23, 0.18)';
      ctx.fillRect(0, 0, logW, logH);

      ctx.font = `500 ${fontSize}px monospace`;
      ctx.textBaseline = 'top';

      for (let c = 0; c < cols; c++) {
        const x       = c * colWidth;
        const colorIdx = c % baseColors.length;
        const headY   = drops[c];

        for (let t = 0; t < TRAIL_LENGTH; t++) {
          const py = (headY - t) * fontSize;
          if (py < -fontSize || py > logH) continue;

          // Cycle character cheaply
          const char = chars[(c * 7 + t * 3 + Math.floor(headY)) % chars.length];

          ctx.fillStyle = t === 0
            ? 'rgba(255, 248, 252, 0.95)' // bright head
            : colorCache[colorIdx][t];

          ctx.fillText(char, x, py);
        }

        drops[c] += speeds[c];
        if (drops[c] * fontSize > logH + TRAIL_LENGTH * fontSize) {
          drops[c] = -Math.random() * 10;
        }
      }
    };

    animFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', init);
      window.removeEventListener('orientationchange', init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 select-none opacity-75"
    />
  );
};

export default MatrixRainCanvas;
