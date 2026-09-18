import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RomanticAmbientBackground from './RomanticAmbientBackground';
import StarryBackground from './StarryBackground';

// ─── GENTLE BLOW SOUND SYNTHESIZER (Web Audio API) ──────────────────────────
const playCandleBlowSound = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!window.__globalAudioCtx) {
      window.__globalAudioCtx = new AudioCtx();
    }
    const ctx = window.__globalAudioCtx;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    const duration = 0.55;

    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.03 * white) / 1.03;
      lastOut = output[i];
      output[i] *= 2.2;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, now);
    filter.frequency.exponentialRampToValueAtTime(220, now + duration);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.18, now + 0.06);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + duration);
  } catch (e) {}
};

// ─── ELEGANT FLOATING ROSE PETALS ────────────────────────────────────────────
const ElegantFloatingPetals = ({ active = true, count = 16 }) => {
  const petals = useMemo(() => Array.from({ length: count }).map((_, i) => ({
    id: i,
    startX: Math.random() * 100,
    duration: 9 + Math.random() * 7,
    delay: Math.random() * 2,
    size: 14 + Math.random() * 10,
    swayX: (Math.random() * 50 + 20) * (i % 2 === 0 ? 1 : -1),
    rot: Math.random() * 360,
    rotEnd: Math.random() * 360 + 180,
    opacity: 0.55 + Math.random() * 0.3,
    color: i % 4 === 0 ? '#f7c8d7' : i % 4 === 1 ? '#dfc188' : i % 4 === 2 ? '#e47b97' : '#f9dce5',
  })), [count]);

  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 18 }}>
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: '-5vh', x: `${p.startX}vw`, opacity: 0, rotate: p.rot, scale: 0.5 }}
          animate={{
            y: '112vh',
            x: [`${p.startX}vw`, `calc(${p.startX}vw + ${p.swayX}px)`, `calc(${p.startX}vw - ${p.swayX * 0.4}px)`, `${p.startX}vw`],
            opacity: [0, p.opacity, p.opacity, 0.3, 0],
            rotate: p.rotEnd,
            scale: [0.5, 1, 0.9, 0.7],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
            x: { duration: p.duration, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute will-change-transform"
          style={{ width: p.size, height: p.size * 1.3, originX: 0.5, originY: 0.5 }}
        >
          <svg viewBox="0 0 40 52" className="w-full h-full">
            <defs>
              <radialGradient id={`cakePetal-${p.id}`} cx="45%" cy="30%" r="72%">
                <stop offset="0%" stopColor="#feeef4" stopOpacity="0.95" />
                <stop offset="45%" stopColor={p.color} />
                <stop offset="100%" stopColor="#7a1235" stopOpacity="0.8" />
              </radialGradient>
            </defs>
            <path d="M20 3 C30 3, 38 13, 38 26 C38 38, 24 48, 20 49 C16 48, 2 38, 2 26 C2 13, 10 3, 20 3 Z" fill={`url(#cakePetal-${p.id})`} />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

// ─── ARTISAN 2D BIRTHDAY CAKE WITH 21st EMBLEM ──────────────────────────────
const Artisan2DCake = ({ isExtinguishing, isFocused }) => {
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: 'clamp(270px, 44vw, 370px)', height: 'clamp(290px, 46vw, 390px)' }}
    >
      {/* Warm candle halo - intensifies when zoomed in against dark background */}
      <motion.div
        animate={
          isExtinguishing
            ? { opacity: 0, scale: 0.2 }
            : isFocused
              ? { opacity: [0.6, 0.95, 0.6], scale: [1, 1.22, 1] }
              : { opacity: 0.35, scale: 0.9 }
        }
        transition={{
          duration: isExtinguishing ? 0.7 : 2.2,
          repeat: isExtinguishing ? 0 : Infinity,
          ease: 'easeInOut',
        }}
        className="absolute pointer-events-none rounded-full"
        style={{
          top: '-4%', left: '16%',
          width: '68%', paddingTop: '68%',
          background: 'radial-gradient(circle, rgba(255, 215, 120, 0.58) 0%, rgba(255, 155, 60, 0.3) 35%, rgba(196, 112, 135, 0.12) 62%, transparent 82%)',
          filter: 'blur(26px)',
        }}
      />

      <svg viewBox="0 0 360 370" className="w-full h-full" style={{ filter: 'drop-shadow(0 20px 45px rgba(0,0,0,0.65))' }}>
        <defs>
          <filter id="flameGlow" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur" />
            <feColorMatrix in="blur" type="matrix"
              values="1 0.5 0 0 0.2
                      0 0.5 0.1 0 0
                      0 0 0 0 0
                      0 0 0 16 -6" result="cb" />
            <feMerge><feMergeNode in="cb" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          <linearGradient id="standGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fdf8f0" /><stop offset="40%" stopColor="#ecd8be" /><stop offset="100%" stopColor="#bfa17c" />
          </linearGradient>
          <linearGradient id="goldPlateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff8e7" />
            <stop offset="35%" stopColor="#dfc188" />
            <stop offset="70%" stopColor="#b88d48" />
            <stop offset="100%" stopColor="#f7e1b5" />
          </linearGradient>
          <linearGradient id="tier1Body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fdebf2" /><stop offset="35%" stopColor="#f4c0d4" /><stop offset="85%" stopColor="#d37798" /><stop offset="100%" stopColor="#9a3a5f" />
          </linearGradient>
          <linearGradient id="tier2Body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff2f7" /><stop offset="40%" stopColor="#f7cade" /><stop offset="85%" stopColor="#da84a5" /><stop offset="100%" stopColor="#a3436a" />
          </linearGradient>
          <linearGradient id="creamDrip" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" /><stop offset="65%" stopColor="#fff0f5" /><stop offset="100%" stopColor="#fbd3e2" />
          </linearGradient>
          <linearGradient id="creamShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b7557b" stopOpacity="0.45" /><stop offset="100%" stopColor="#b7557b" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="candleBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffaf5" /><stop offset="50%" stopColor="#fce4ec" /><stop offset="100%" stopColor="#e898b3" />
          </linearGradient>
          <radialGradient id="candleFlame" cx="50%" cy="68%" r="62%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="18%" stopColor="#fff9c4" />
            <stop offset="45%" stopColor="#ffa726" />
            <stop offset="78%" stopColor="#e64a19" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#b71c1c" stopOpacity="0.85" />
          </radialGradient>
          <radialGradient id="flameInner" cx="50%" cy="72%" r="55%">
            <stop offset="0%" stopColor="#ffffff" /><stop offset="50%" stopColor="#fffde7" /><stop offset="100%" stopColor="#fff9c4" opacity="0.5" />
          </radialGradient>
          <radialGradient id="flameCorona" cx="50%" cy="60%" r="75%">
            <stop offset="0%" stopColor="#fffde7" stopOpacity="0.65" /><stop offset="60%" stopColor="#ff6d00" stopOpacity="0.3" /><stop offset="100%" stopColor="#e64a19" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── STAND ── */}
        <ellipse cx="180" cy="330" rx="148" ry="14" fill="#000000" opacity="0.28" />
        <ellipse cx="180" cy="322" rx="140" ry="14" fill="url(#standGrad)" stroke="#dfc188" strokeWidth="1.2" />
        <ellipse cx="180" cy="320" rx="136" ry="11" fill="#fffdfa" />
        <path d="M154,322 Q180,328 206,322 L198,342 Q180,346 162,342 Z" fill="url(#standGrad)" opacity="0.9" />
        <ellipse cx="180" cy="342" rx="22" ry="5" fill="url(#standGrad)" stroke="#dfc188" strokeWidth="0.8" />

        {/* ── BOTTOM TIER ── */}
        <path d="M58,232 C58,216 302,216 302,232 L302,300 C302,316 58,316 58,300 Z" fill="url(#tier1Body)" stroke="#dfc188" strokeWidth="1" />
        {[68,86,104,122,140,158,176,194,212,230,248,266,284].map((cx,i)=>(
          <circle key={i} cx={cx} cy={306} r="3.5" fill="#dfc188" stroke="#ffffff" strokeWidth="0.6" />
        ))}
        <path d="M58,236 Q72,264 88,244 Q104,274 120,246 Q136,268 152,244 Q168,278 184,248 Q200,270 216,246 Q232,276 248,244 Q264,268 302,238 L302,232 L58,232 Z" fill="url(#creamShadow)" />
        <path d="M58,230 Q72,258 88,240 Q104,268 120,242 Q136,262 152,240 Q168,272 184,244 Q200,264 216,242 Q232,270 248,240 Q264,262 302,232 L302,226 C302,212 58,212 58,226 Z" fill="url(#creamDrip)" stroke="#ffffff" strokeWidth="1.2" />
        <path d="M68,237 Q76,252 83,244" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M100,241 Q108,258 115,248" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M160,242 Q168,262 175,250" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M218,240 Q226,258 232,247" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.6" strokeLinecap="round" />

        {/* ── TOP TIER ── */}
        <path d="M100,148 C100,136 260,136 260,148 L260,216 C260,228 100,228 100,216 Z" fill="url(#tier2Body)" stroke="#dfc188" strokeWidth="0.9" />
        {[114,132,150,168,186,204,222,240].map((cx,i)=>(
          <circle key={i} cx={cx} cy={220} r="2.8" fill="#dfc188" stroke="#ffffff" strokeWidth="0.5" />
        ))}
        <path d="M100,152 Q114,176 128,160 Q142,184 156,162 Q170,184 184,162 Q198,186 212,162 Q226,182 240,160 Q252,178 260,154 L260,148 L100,148 Z" fill="url(#creamShadow)" />
        <path d="M100,148 Q114,170 128,156 Q142,178 156,158 Q170,176 184,156 Q198,180 212,158 Q226,174 240,156 Q252,172 260,150 L260,144 C260,134 100,134 100,144 Z" fill="url(#creamDrip)" stroke="#ffffff" strokeWidth="1.2" />
        <path d="M110,155 Q118,168 123,161" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M138,158 Q146,174 151,163" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M194,158 Q202,174 207,163" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.4" strokeLinecap="round" />
        {[122,148,174,200,228].map((cx,i)=>(
          <g key={i} transform={`translate(${cx}, 140)`}>
            <ellipse cx="0" cy="0" rx="8" ry="5" fill="#ffffff" />
            <path d="M-4.5,-2 C-2,-7 2,-7 4.5,-2 C5.5,1 -5.5,1 -4.5,-2 Z" fill="#fff0f5" stroke="#dfc188" strokeWidth="0.5" />
          </g>
        ))}

        {/* ── 21st BIRTHDAY GOLDEN EMBLEM MEDALLION ON BOTTOM TIER ── */}
        <g transform="translate(180, 268)">
          <ellipse cx="0" cy="0" rx="34" ry="22" fill="#000000" opacity="0.4" filter="blur(3px)" />
          <ellipse cx="0" cy="0" rx="32" ry="20" fill="url(#goldPlateGrad)" stroke="#ffffff" strokeWidth="0.8" />
          <ellipse cx="0" cy="0" rx="28" ry="16" fill="#380816" stroke="#dfc188" strokeWidth="0.9" />
          <text
            x="0"
            y="6"
            textAnchor="middle"
            fill="url(#goldPlateGrad)"
            fontSize="18"
            fontWeight="bold"
            letterSpacing="1.5"
            style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
              filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.8))',
            }}
          >
            21
          </text>
          <circle cx="-22" cy="0" r="1.6" fill="#dfc188" />
          <circle cx="22" cy="0" r="1.6" fill="#dfc188" />
        </g>

        {/* ── CANDLE ── */}
        <rect x="174" y="88" width="12" height="50" rx="3" fill="url(#candleBody)" stroke="#dfc188" strokeWidth="0.8" />
        <path d="M174,100 L186,106" stroke="#e08da7" strokeWidth="1.5" />
        <path d="M174,116 L186,122" stroke="#e08da7" strokeWidth="1.5" />
        <path d="M174,132 L186,138" stroke="#e08da7" strokeWidth="1.5" />
        <line x1="180" y1="88" x2="180" y2="76" stroke="#4a3036" strokeWidth="1.6" strokeLinecap="round" />

        {/* ── FLAME ── */}
        {!isExtinguishing ? (
          <>
            <motion.ellipse cx="180" cy="60" rx="20" ry="24"
              fill="url(#flameCorona)"
              animate={{ ry: [24,28,24], opacity:[0.65,1,0.65], cy:[60,58,60] }}
              transition={{ duration: 1.6, repeat: Infinity, ease:'easeInOut' }}
            />
            <motion.g
              animate={{ scale:[1,1.12,0.97,1.15,1], y:[0,-2,0.8,-1.5,0], rotate:[-2,2.5,-2.5,1.8,-2] }}
              transition={{ duration:1.1, repeat:Infinity, ease:'easeInOut' }}
              style={{ transformOrigin:'180px 82px', filter:'url(#flameGlow)' }}
            >
              <path d="M180,52 C188,64 193,75 189,82 C186,88 174,88 171,82 C167,75 172,64 180,52 Z" fill="url(#candleFlame)" />
              <path d="M180,64 C183,72 184,78 182,82 C181,85 179,85 178,82 C176,78 177,72 180,64 Z" fill="url(#flameInner)" opacity="0.9" />
              <ellipse cx="180" cy="58" rx="3" ry="4" fill="#ffffff" opacity="0.92" />
            </motion.g>
          </>
        ) : (
          <g>
            <motion.g
              initial={{ scale:1, opacity:1 }}
              animate={{ scale:[1,0.5,0.1,0], opacity:[1,0.5,0.1,0], y:[0,-2,-5,-8] }}
              transition={{ duration:0.75, ease:'easeOut' }}
              style={{ transformOrigin:'180px 82px' }}
            >
              <path d="M180,52 C188,64 193,75 189,82 C186,88 174,88 171,82 C167,75 172,64 180,52 Z" fill="url(#candleFlame)" />
              <path d="M180,64 C183,72 184,78 182,82 C181,85 179,85 178,82 C176,78 177,72 180,64 Z" fill="url(#flameInner)" />
            </motion.g>
            <motion.path
              d="M180,82 Q175,66 184,50 T178,30"
              fill="none" stroke="rgba(240,225,235,0.65)" strokeWidth="2.4" strokeLinecap="round"
              initial={{ pathLength:0, opacity:0, y:0 }}
              animate={{ pathLength:[0,1,1], opacity:[0,0.85,0], y:[0,-16,-34] }}
              transition={{ duration:2.0, ease:'easeOut' }}
            />
            <motion.circle cx="180" cy="82" r="2.2" fill="#ff6b35"
              initial={{ opacity:1 }}
              animate={{ opacity:[1,0.5,0] }}
              transition={{ duration:1.2, ease:'easeOut' }}
            />
          </g>
        )}
      </svg>
    </div>
  );
};

// ─── MAIN CAKE STAGE COMPONENT ───────────────────────────────────────────────
export default function BirthdayCakeStage({ onComplete }) {
  // cakeStep:
  // 1. 'initial': Baru muncul di posisi awal dengan background awal normal
  // 2. 'zoomed': Zoom-in membesar ke tengah layar + background jadi gelap & bintang muncul
  // 3. 'blown_resetting': Api padam, kue zoom-out perlahan kembali ke posisi awal + background kembali normal
  // 4. 'fading_to_next': Transisi memudar gelap perlahan sebelum pindah stage ke album buku
  const [cakeStep, setCakeStep] = useState('initial');

  // Step 1 -> Step 2:
  // Tampilkan cake di posisi awal dengan background awal selama 900ms,
  // lalu mulai zoom-in membesar ke tengah layar dengan background gelap & bintang
  useEffect(() => {
    const timer = setTimeout(() => {
      setCakeStep('zoomed');
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  // Step 3 -> Step 4:
  // Lilin ditiup:
  // - Api padam
  // - Kue zoom out perlahan kembali ke posisi awalnya
  // - Background kembali ke semula secara ultra smooth
  // - Tunggu jeda tenang, baru transisi memudar gelap dan lanjut ke stage album buku
  const handleExtinguish = useCallback(() => {
    if (cakeStep !== 'zoomed') return;
    setCakeStep('blown_resetting');
    playCandleBlowSound();

    // Setelah kue selesai zoom-out dan background kembali semula,
    // langsung panggil onComplete — blackout diurus oleh ScrapbookStage
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2800);

    return () => {
      clearTimeout(completeTimer);
    };
  }, [cakeStep, onComplete]);

  const isZoomed = cakeStep === 'zoomed';
  const isBlown = cakeStep === 'blown_resetting' || cakeStep === 'fading_to_next';

  return (
    <div
      onClick={handleExtinguish}
      className="fixed inset-0 z-30 flex flex-col items-center justify-center p-4 overflow-hidden select-none cursor-pointer"
    >
      {/* ── BASE: Background Awal Normal (Romantic Velvet Ambient) ── */}
      <RomanticAmbientBackground />

      {/* ── LAYER 1: Deep Dark Spotlight Overlay (Hanya aktif saat Zoom-In, memudar kembali saat lilin ditiup) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isZoomed ? 0.94 : 0 }}
        transition={{
          duration: isBlown ? 2.2 : 2.0,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 10,
          background: 'radial-gradient(ellipse at 50% 55%, #13020f 0%, #070107 55%, #020003 100%)',
        }}
      />

      {/* ── LAYER 2: Bintang Cahaya Berkelap-kelip (Muncul perlahan saat Zoom-In, memudar kembali saat lilin ditiup) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isZoomed ? 1 : 0 }}
        transition={{
          duration: isBlown ? 1.8 : 2.2,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 12 }}
      >
        <StarryBackground />
      </motion.div>

      {/* ── LAYER 3: Kelopak Mawar Halus Melayang ── */}
      <ElegantFloatingPetals active={true} count={16} />

      {/* ── LAYER 4: KONTEN KUE, JUDUL & PETUNJUK ── */}
      <div className="relative flex flex-col items-center justify-center max-w-lg w-full text-center" style={{ zIndex: 25 }}>
        {/* Title — Muncul anggun saat kue ter-zoom in di tengah layar */}
        <motion.h1
          initial={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
          animate={
            isZoomed
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: -12, filter: 'blur(8px)' }
          }
          transition={{
            duration: isBlown ? 0.6 : 1.1,
            delay: isZoomed ? 0.9 : 0,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-3xl sm:text-5xl font-normal tracking-[0.14em] text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#f7d6e0] to-[#dfc188] drop-shadow-[0_2px_25px_rgba(223,193,136,0.45)] mb-2 select-none"
          style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
        >
          Happy Birthday Sayang
        </motion.h1>

        {/* Cake:
            - Awal: di posisi awal normal (scale: 1.0) dengan background awal
            - Zoom-in: membesar ke tengah layar (scale: 1.25) dengan background gelap & bintang
            - Setelah ditiup: apinya mati, lalu zoom out perlahan kembali ke posisi awal (scale: 1.0)
        */}
        <motion.div
          initial={{ scale: 1.0, opacity: 0, y: 15 }}
          animate={{
            scale: isZoomed ? 1.24 : 1.0,
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          }}
          transition={{
            scale: {
              duration: isZoomed ? 2.2 : 2.0,
              ease: isZoomed ? [0.16, 1, 0.3, 1] : [0.25, 0.1, 0.25, 1],
            },
            opacity: { duration: 0.8, ease: 'easeOut' },
          }}
          className="relative flex items-center justify-center my-1"
        >
          <Artisan2DCake isExtinguishing={isBlown} isFocused={isZoomed} />
        </motion.div>

        {/* Petunjuk Romantis — Mengajak menyentuh kue untuk meniup lilin */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={
            isZoomed
              ? { opacity: 0.85, y: 0 }
              : { opacity: 0, y: 8 }
          }
          transition={{
            duration: isBlown ? 0.4 : 0.9,
            delay: isZoomed ? 1.4 : 0,
            ease: 'easeOut',
          }}
          className="text-xs sm:text-sm tracking-[0.2em] uppercase text-[#dfc188]/80 font-light select-none mt-1 flex items-center gap-1.5"
          style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
        >
          <span>Ketuk kue untuk meniup lilin</span>
          <span className="text-[#f7d6e0] animate-pulse">✨</span>
        </motion.p>
      </div>

      {/* Blackout internal dihapus — ScrapbookStage menangani jeda gelap satu kali */}
    </div>
  );
}
