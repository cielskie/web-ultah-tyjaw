import React, { useMemo, useEffect } from 'react';

// ── Inject global CSS keyframes once ────────────────────────────────────────
const KEYFRAMES_ID = '__petal_kf_injected__';
const injectKeyframes = () => {
  if (typeof document === 'undefined' || document.getElementById(KEYFRAMES_ID)) return;
  const style = document.createElement('style');
  style.id = KEYFRAMES_ID;
  style.textContent = `
    @keyframes petalFall {
      0%   { transform: translateY(var(--py-start)) translateX(0px)            rotateZ(var(--rz-s)) rotateX(0deg)    rotateY(0deg); }
      20%  { transform: translateY(var(--py-20))    translateX(var(--sx-a))    rotateZ(var(--rz-2)) rotateX(18deg)   rotateY(26deg); }
      40%  { transform: translateY(var(--py-40))    translateX(var(--sx-b))    rotateZ(var(--rz-4)) rotateX(-14deg)  rotateY(-20deg); }
      60%  { transform: translateY(var(--py-60))    translateX(var(--sx-c))    rotateZ(var(--rz-6)) rotateX(20deg)   rotateY(32deg); }
      80%  { transform: translateY(var(--py-80))    translateX(var(--sx-d))    rotateZ(var(--rz-8)) rotateX(-10deg)  rotateY(-14deg); }
      100% { transform: translateY(var(--py-end))   translateX(0px)            rotateZ(var(--rz-e)) rotateX(0deg)    rotateY(0deg); }
    }
    @keyframes petalBreathe {
      0%, 100% { opacity: var(--op-lo); }
      15%       { opacity: var(--op-hi); }
      50%       { opacity: var(--op-md); }
      85%       { opacity: var(--op-hi); }
    }
  `;
  document.head.appendChild(style);
};

// ── Petal SVG shapes ─────────────────────────────────────────────────────────
const PetalA = ({ gid }) => (
  <svg viewBox="0 0 40 46" style={{ width: '100%', height: '100%', display: 'block', filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.28))' }}>
    <defs>
      <radialGradient id={`${gid}-a`} cx="44%" cy="28%" r="74%">
        <stop offset="0%" stopColor="#fce8f0" stopOpacity="0.97" />
        <stop offset="28%" stopColor="#e87a9a" />
        <stop offset="65%" stopColor="#b0304f" />
        <stop offset="100%" stopColor="#620f28" />
      </radialGradient>
      <linearGradient id={`${gid}-al`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffe8f4" stopOpacity="0.80" />
        <stop offset="100%" stopColor="#b0304f" stopOpacity="0.06" />
      </linearGradient>
    </defs>
    <path d="M20 3 C29 3, 38 12, 38 25 C38 37, 24 43, 20 44 C16 43, 2 37, 2 25 C2 12, 11 3, 20 3 Z" fill={`url(#${gid}-a)`} />
    <path d="M8 15 C14 7, 26 7, 32 15 C26 11, 14 11, 8 15 Z" fill={`url(#${gid}-al)`} />
    <path d="M20 8 Q20 22 20 42" stroke="rgba(255,255,255,0.17)" strokeWidth="0.9" strokeLinecap="round" fill="none"/>
  </svg>
);

const PetalB = ({ gid }) => (
  <svg viewBox="0 0 36 50" style={{ width: '100%', height: '100%', display: 'block', filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.25))' }}>
    <defs>
      <linearGradient id={`${gid}-b`} x1="15%" y1="0%" x2="85%" y2="100%">
        <stop offset="0%" stopColor="#f9d0e0" />
        <stop offset="30%" stopColor="#e47fa0" />
        <stop offset="70%" stopColor="#a0254a" />
        <stop offset="100%" stopColor="#580f20" />
      </linearGradient>
    </defs>
    <path d="M18 2 C29 5, 35 16, 34 29 C33 40, 22 47, 18 48 C13 46, 2 38, 2 26 C2 13, 10 3, 18 2 Z" fill={`url(#${gid}-b)`} />
    <path d="M5 12 C11 6, 25 6, 31 12" stroke="rgba(255,255,255,0.22)" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
    <path d="M18 5 Q19 24 18 45" stroke="rgba(255,255,255,0.13)" strokeWidth="0.8" fill="none"/>
  </svg>
);

const PetalC = ({ gid }) => (
  <svg viewBox="0 0 32 44" style={{ width: '100%', height: '100%', display: 'block', filter: 'drop-shadow(0 3px 7px rgba(0,0,0,0.22))' }}>
    <defs>
      <linearGradient id={`${gid}-c`} x1="0%" y1="18%" x2="100%" y2="82%">
        <stop offset="0%" stopColor="#fcd8e6" />
        <stop offset="40%" stopColor="#d86585" />
        <stop offset="88%" stopColor="#851b35" />
      </linearGradient>
    </defs>
    <path d="M16 2 C25 6, 30 17, 29 29 C28 39, 18 44, 16 44 C12 42, 3 34, 3 23 C3 11, 9 3, 16 2 Z" fill={`url(#${gid}-c)`} />
    <path d="M16 6 Q17 22 16 41" stroke="rgba(255,255,255,0.14)" strokeWidth="0.8" fill="none"/>
  </svg>
);

const PetalD = ({ gid }) => (
  <svg viewBox="0 0 38 48" style={{ width: '100%', height: '100%', display: 'block', filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.22))' }}>
    <defs>
      <radialGradient id={`${gid}-d`} cx="42%" cy="32%" r="70%">
        <stop offset="0%" stopColor="#fef3d8" stopOpacity="0.98" />
        <stop offset="35%" stopColor="#e8c97a" />
        <stop offset="75%" stopColor="#b88a30" />
        <stop offset="100%" stopColor="#7a5510" />
      </radialGradient>
    </defs>
    <path d="M19 3 C28 4, 36 13, 36 26 C36 37, 23 45, 19 46 C15 45, 2 37, 2 26 C2 13, 10 3, 19 3 Z" fill={`url(#${gid}-d)`} />
    <path d="M7 14 C13 7, 25 7, 31 14 C25 11, 13 11, 7 14 Z" fill="rgba(255,255,255,0.26)" />
  </svg>
);

// ── Main FallingPetals component ─────────────────────────────────────────────
export default function FallingPetals({ count = 15, zIndex = 30 }) {
  useEffect(() => { injectKeyframes(); }, []);

  const petals = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const layer = i % 6 === 0 ? 3 : i % 3 === 0 ? 2 : i % 2 === 0 ? 1 : 0;

      const size =
        layer === 3 ? 30 + Math.random() * 14
        : layer === 2 ? 20 + Math.random() * 10
        : layer === 1 ? 14 + Math.random() * 8
        :               10 + Math.random() * 6;

      // Longer durations = much more floaty, organic feel
      const duration =
        layer === 3 ? 10 + Math.random() * 6
        : layer === 2 ? 13 + Math.random() * 7
        : layer === 1 ? 15 + Math.random() * 8
        :               18 + Math.random() * 10;

      const startX = -5 + (i / count) * 110 + (Math.random() * 6 - 3);
      // Distribute petals across the entire height so they appear already mid-fall on mount
      const startYvh = -20 + (i / count) * 135;

      const swayPx = 20 + Math.random() * 60;
      const swayDir = i % 2 === 0 ? 1 : -1;

      const rzStart = Math.random() * 360;
      const rzDelta = (80 + Math.random() * 200) * (i % 2 === 0 ? 1 : -1);

      const opHi  = layer === 3 ? 0.90 : layer === 2 ? 0.80 : layer === 1 ? 0.68 : 0.50;
      const opLo  = opHi * 0.52;
      const opMd  = opHi * 0.76;

      const blurPx = layer === 3 ? 1.5 : layer === 2 ? 0.5 : 0;

      // Negative delay seeds petal mid-cycle so it's already visible on mount
      const delay = -(duration * Math.random());

      return {
        id: i,
        size,
        duration,
        startX,
        startYvh,
        swayPx,
        swayDir,
        rzStart,
        rzDelta,
        opHi,
        opLo,
        opMd,
        blurPx,
        delay,
        shapeType: i % 4,
        breathDuration: duration * 0.58,
      };
    });
  }, [count]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0,
        pointerEvents: 'none', overflow: 'hidden',
        userSelect: 'none', zIndex,
      }}
    >
      {petals.map((p) => {
        const fallRange = 120;
        const sx  = p.swayPx * p.swayDir;

        const cssVars = {
          '--py-start': `${p.startYvh}vh`,
          '--py-20':    `${p.startYvh + fallRange * 0.20}vh`,
          '--py-40':    `${p.startYvh + fallRange * 0.40}vh`,
          '--py-60':    `${p.startYvh + fallRange * 0.60}vh`,
          '--py-80':    `${p.startYvh + fallRange * 0.80}vh`,
          '--py-end':   `${p.startYvh + fallRange}vh`,
          '--sx-a': `${sx}px`,
          '--sx-b': `${-sx * 0.60}px`,
          '--sx-c': `${sx * 0.80}px`,
          '--sx-d': `${-sx * 0.38}px`,
          '--rz-s': `${p.rzStart}deg`,
          '--rz-2': `${p.rzStart + p.rzDelta * 0.22}deg`,
          '--rz-4': `${p.rzStart + p.rzDelta * 0.45}deg`,
          '--rz-6': `${p.rzStart + p.rzDelta * 0.66}deg`,
          '--rz-8': `${p.rzStart + p.rzDelta * 0.83}deg`,
          '--rz-e': `${p.rzStart + p.rzDelta}deg`,
          '--op-hi': p.opHi,
          '--op-lo': p.opLo,
          '--op-md': p.opMd,
        };

        return (
          <div
            key={p.id}
            style={{
              ...cssVars,
              position: 'absolute',
              left: `${p.startX}vw`,
              top: 0,
              width: p.size,
              height: p.size * 1.28,
              transformOrigin: '50% 50%',
              willChange: 'transform, opacity',
              filter: p.blurPx > 0 ? `blur(${p.blurPx}px)` : undefined,
              animation: [
                `petalFall ${p.duration}s ${p.delay}s linear infinite`,
                `petalBreathe ${p.breathDuration}s ${p.delay}s ease-in-out infinite`,
              ].join(', '),
            }}
          >
            {p.shapeType === 0 && <PetalA gid={`pA${p.id}`} />}
            {p.shapeType === 1 && <PetalB gid={`pB${p.id}`} />}
            {p.shapeType === 2 && <PetalC gid={`pC${p.id}`} />}
            {p.shapeType === 3 && <PetalD gid={`pD${p.id}`} />}
          </div>
        );
      })}
    </div>
  );
}

