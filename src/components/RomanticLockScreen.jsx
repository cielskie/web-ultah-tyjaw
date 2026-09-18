import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Delete } from 'lucide-react';
import birthdayData from '../config/birthdayData';
import LuxurySilkBackground from './LuxurySilkBackground';
import FallingPetals from './FallingPetals';

// ── Web Audio API sound synthesizers ────────────────────────────────────────
const playSpinSound = (audioCtxRef) => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = audioCtxRef.current || new AudioCtx();
    audioCtxRef.current = ctx;
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    const duration = 2.0;

    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(840, now + duration);

    oscGain.gain.setValueAtTime(0.01, now);
    oscGain.gain.linearRampToValueAtTime(0.18, now + 0.4);
    oscGain.gain.exponentialRampToValueAtTime(0.3, now + duration);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.exponentialRampToValueAtTime(2600, now + duration);

    osc.connect(filter);
    filter.connect(oscGain);
    oscGain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  } catch (err) {
    console.warn('Audio spin error:', err);
  }
};

const playExplosionSound = (audioCtxRef) => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = audioCtxRef.current || new AudioCtx();
    audioCtxRef.current = ctx;
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;

    // Sub-bass impact
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(140, now);
    subOsc.frequency.exponentialRampToValueAtTime(28, now + 0.9);

    subGain.gain.setValueAtTime(0.7, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 1.1);

    // Warm chord shimmer
    [1046.5, 1318.5, 1567.98, 2093.0].forEach((freq, i) => {
      const chime = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chime.type = 'sine';
      chime.frequency.setValueAtTime(freq, now + 0.02 + i * 0.03);
      chimeGain.gain.setValueAtTime(0.001, now);
      chimeGain.gain.setValueAtTime(0.12, now + 0.02 + i * 0.03);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.0 + i * 0.1);

      chime.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chime.start(now + 0.02 + i * 0.03);
      chime.stop(now + 1.1 + i * 0.1);
    });
  } catch (err) {
    console.warn('Explosion sound error:', err);
  }
};

const playKeyClickSound = (audioCtxRef) => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = audioCtxRef.current || new AudioCtx();
    audioCtxRef.current = ctx;
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.06);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  } catch (e) {}
};

// ── Elegant Luxury Gift Box SVG (Deep Maroon & Champagne Rose Silk) ─────────
const MinimalGiftBox = ({ onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center cursor-pointer group select-none"
    >
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
        {/* Soft candlelit warm ambient halo behind gift box */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#dfc188]/20 via-[#c47087]/20 to-[#631224]/10 filter blur-2xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

        <svg viewBox="0 0 120 120" className="w-full h-full relative z-10 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)]">
          <defs>
            {/* Box Body: Deep royal maroon / plum velvet */}
            <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2c0920" />
              <stop offset="45%" stopColor="#1e0516" />
              <stop offset="100%" stopColor="#12020d" />
            </linearGradient>
            {/* Box Lid */}
            <linearGradient id="boxLidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3d0e2c" />
              <stop offset="50%" stopColor="#29071e" />
              <stop offset="100%" stopColor="#180312" />
            </linearGradient>
            {/* Ribbon: Muted Champagne Gold to Dusty Rose Gold Silk */}
            <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f3e5c8" />
              <stop offset="35%" stopColor="#dfc188" />
              <stop offset="70%" stopColor="#c47087" />
              <stop offset="100%" stopColor="#8c334d" />
            </linearGradient>
            <linearGradient id="goldTrim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dfc188" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#c47087" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Box Base Body */}
          <rect
            x="24"
            y="48"
            width="72"
            height="56"
            rx="5"
            fill="url(#boxGrad)"
            stroke="url(#goldTrim)"
            strokeWidth="1.2"
          />

          {/* Vertical Ribbon on Box Body */}
          <rect x="54" y="48" width="12" height="56" fill="url(#ribbonGrad)" />
          {/* Subtle Ribbon Highlight */}
          <line x1="56" y1="48" x2="56" y2="104" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />

          {/* Horizontal Ribbon on Box Body */}
          <rect x="24" y="70" width="72" height="10" fill="url(#ribbonGrad)" opacity="0.95" />
          <line x1="24" y1="71" x2="96" y2="71" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />

          {/* Box Lid */}
          <rect
            x="18"
            y="36"
            width="84"
            height="16"
            rx="3.5"
            fill="url(#boxLidGrad)"
            stroke="url(#goldTrim)"
            strokeWidth="1.2"
          />
          {/* Vertical Ribbon on Lid */}
          <rect x="54" y="36" width="12" height="16" fill="url(#ribbonGrad)" />

          {/* Ribbon Bow on Top */}
          <g transform="translate(60, 36)">
            {/* Left Bow Loop */}
            <path
              d="M0,0 C-18,-18 -32,-4 -12,2 Z"
              fill="url(#ribbonGrad)"
              stroke="rgba(255,245,230,0.5)"
              strokeWidth="0.8"
            />
            {/* Right Bow Loop */}
            <path
              d="M0,0 C18,-18 32,-4 12,2 Z"
              fill="url(#ribbonGrad)"
              stroke="rgba(255,245,230,0.5)"
              strokeWidth="0.8"
            />
            {/* Ribbon Center Knot */}
            <circle cx="0" cy="1" r="5" fill="#dfc188" stroke="#fbf2dd" strokeWidth="0.8" />
          </g>
        </svg>
      </div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1.2, ease: 'easeOut' }}
        className="mt-3.5 text-[11px] tracking-[0.25em] uppercase text-[#dfc188]/80 font-light transition-colors duration-300 group-hover:text-[#f5f0e8]"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        sentuh untuk membuka
      </motion.span>
    </motion.div>
  );
};

// ── Aesthetic Minimal Line-Art Heart SVG ────────────────────────────────────
const OutlineHeartIcon = ({ size = 44, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ── Flower Loading Spinner (6-petal outline flower, spinning) ─────────────
const FlowerLoader = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '18px',
      zIndex: 10,
    }}
  >
    {/* Spinning 6-petal outline flower (peaceful slow rotation) */}
    <div
      style={{
        animation: 'flowerSpin 3.6s linear infinite',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(0 0 12px rgba(223,193,136,0.45))',
      }}
    >
      <svg
        width="52"
        height="52"
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 6 petals as ellipses rotated around center */}
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <ellipse
            key={angle}
            cx="26"
            cy="26"
            rx="5.5"
            ry="10"
            stroke="#dfc188"
            strokeWidth="1.3"
            fill="none"
            strokeLinecap="round"
            opacity="0.85"
            transform={`rotate(${angle} 26 26) translate(0 -13)`}
          />
        ))}
        {/* Center dot */}
        <circle cx="26" cy="26" r="3.5" stroke="#c47087" strokeWidth="1.2" fill="none" />
        <circle cx="26" cy="26" r="1.2" fill="#dfc188" />
      </svg>
    </div>

    {/* Loading text (calm breathing pulse) */}
    <p
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '11px',
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: 'rgba(223,193,136,0.70)',
        fontWeight: 300,
        animation: 'flowerTextPulse 3.0s ease-in-out infinite',
        margin: 0,
      }}
    >
      loading for ur birthday...
    </p>
  </div>
);

// Inject flower spinner keyframes once
const FLOWER_KF_ID = '__flower_spinner_kf__';
const injectFlowerKeyframes = () => {
  if (typeof document === 'undefined' || document.getElementById(FLOWER_KF_ID)) return;
  const s = document.createElement('style');
  s.id = FLOWER_KF_ID;
  s.textContent = `
    @keyframes flowerSpin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes flowerTextPulse {
      0%, 100% { opacity: 0.45; }
      50%       { opacity: 0.90; }
    }
  `;
  document.head.appendChild(s);
};

// ── Main RomanticLockScreen Component ───────────────────────────────────────
export default function RomanticLockScreen({ onUnlockSuccess }) {
  // Phases: 'timer' | 'loading' | 'gift' | 'pin' | 'spinning' | 'bloom' | 'exiting'
  const [phase, setPhase] = useState('timer');
  const [timerSeconds, setTimerSeconds] = useState(5);
  const [pinInput, setPinInput] = useState('');
  const [isError, setIsError] = useState(false);
  const audioCtxRef = useRef(null);

  // Inject flower keyframes on mount
  useEffect(() => { injectFlowerKeyframes(); }, []);

  const targetPin = String(birthdayData.pin || '1909');

  // 5-second initial countdown when web is loaded (relaxed, steady 1250ms cadence)
  useEffect(() => {
    if (phase !== 'timer') return;

    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Timer reaches 0 -> hold gracefully for 1.4s, then dissolve into loading
          setTimeout(() => {
            setPhase('loading');
          }, 1400);
          return 0;
        }
        return prev - 1;
      });
    }, 1250);

    return () => clearInterval(interval);
  }, [phase]);

  // Loading phase: show flower spinner for ~3.0s then reveal gift box gracefully
  useEffect(() => {
    if (phase !== 'loading') return;
    const t = setTimeout(() => setPhase('gift'), 3000);
    return () => clearTimeout(t);
  }, [phase]);

  // Keyboard listener for desktop typing
  useEffect(() => {
    if (phase !== 'pin') return;

    const handleKeyDown = (e) => {
      if (/^[0-9]$/.test(e.key)) {
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, pinInput]);

  const handleOpenGift = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        if (!window.__globalAudioCtx) window.__globalAudioCtx = new AudioCtx();
        if (window.__globalAudioCtx.state === 'suspended') window.__globalAudioCtx.resume();
        audioCtxRef.current = window.__globalAudioCtx;
      }
    } catch (e) {}

    playKeyClickSound(audioCtxRef);
    setPhase('pin');
  };

  const handleDigit = (digit) => {
    if (pinInput.length >= 4) return;
    playKeyClickSound(audioCtxRef);

    const nextPin = pinInput + digit;
    setPinInput(nextPin);

    if (nextPin.length === 4) {
      // Validate PIN: matches target or '1909' or recipient date
      if (nextPin === targetPin || nextPin === '1909') {
        triggerSuccessSequence();
      } else {
        setIsError(true);
        setTimeout(() => {
          setPinInput('');
          setIsError(false);
        }, 500);
      }
    }
  };

  const handleDelete = () => {
    if (pinInput.length > 0) {
      playKeyClickSound(audioCtxRef);
      setPinInput((p) => p.slice(0, -1));
    }
  };

  const triggerSuccessSequence = () => {
    // PIN Benar -> Transisi halus langsung ke tahap berikutnya (tanpa love berputar)
    playKeyClickSound(audioCtxRef);
    setPhase('exiting');
    setTimeout(() => {
      if (onUnlockSuccess) onUnlockSuccess();
    }, 600);
  };

  return (
    <AnimatePresence>
      {phase !== 'exiting' && (
        <motion.div
          key="lockscreen-backdrop"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* Luxury Silk Fabric Background */}
          <LuxurySilkBackground />

          {/* Realistic Snowfall Rose Petals floating right inside Lock Screen (Timer, Gift & PIN) */}
          <FallingPetals count={30} zIndex={5} />

          {/* ── PHASE 0: COUNTDOWN TIMER (00 ; 00 ; 00 ; 05) ── */}
          {phase === 'timer' && (
            <motion.div
              key="timer-countdown-step"
              initial={{ scale: 0.92, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center z-10 px-4 text-center select-none"
            >
              {/* Minimal Luxury Pill Tag */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#dfc188]/20 bg-[#25081c]/50 backdrop-blur-md mb-4 shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#dfc188] animate-pulse" />
                <span
                  className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[#dfc188]/90 font-light"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  special moment awaits
                </span>
              </motion.div>

              {/* Minimalist Fence Dividers & Prominent Digits (Tanpa Grade / Box) */}
              <div className="relative flex items-center justify-center border-y border-[#dfc188]/25 py-6 sm:py-8 px-2 sm:px-6 w-full max-w-2xl mx-auto my-2">
                {/* Soft ambient center warmth */}
                <div className="absolute inset-0 bg-radial from-[#dfc188]/10 via-transparent to-transparent pointer-events-none" />

                {/* DAYS */}
                <div className="flex flex-col items-center flex-1 px-1 sm:px-3">
                  <span
                    className="font-light text-3xl sm:text-5xl md:text-6xl text-[#dfc188]/70 tracking-wider"
                    style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
                  >
                    00
                  </span>
                  <span
                    className="text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-[#c47087]/75 font-light mt-1.5"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    DAYS
                  </span>
                </div>

                {/* Vertical Fence Divider Line 1 */}
                <div className="w-[1px] h-10 sm:h-16 bg-gradient-to-b from-transparent via-[#dfc188]/35 to-transparent flex-shrink-0" />

                {/* HOURS */}
                <div className="flex flex-col items-center flex-1 px-1 sm:px-3">
                  <span
                    className="font-light text-3xl sm:text-5xl md:text-6xl text-[#dfc188]/70 tracking-wider"
                    style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
                  >
                    00
                  </span>
                  <span
                    className="text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-[#c47087]/75 font-light mt-1.5"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    HOURS
                  </span>
                </div>

                {/* Vertical Fence Divider Line 2 */}
                <div className="w-[1px] h-10 sm:h-16 bg-gradient-to-b from-transparent via-[#dfc188]/35 to-transparent flex-shrink-0" />

                {/* MINS */}
                <div className="flex flex-col items-center flex-1 px-1 sm:px-3">
                  <span
                    className="font-light text-3xl sm:text-5xl md:text-6xl text-[#dfc188]/70 tracking-wider"
                    style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
                  >
                    00
                  </span>
                  <span
                    className="text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-[#c47087]/75 font-light mt-1.5"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    MINS
                  </span>
                </div>

                {/* Vertical Fence Divider Line 3 */}
                <div className="w-[1px] h-10 sm:h-16 bg-gradient-to-b from-transparent via-[#dfc188]/35 to-transparent flex-shrink-0" />

                {/* SECONDS (Lebih besar sedikit, prominent!) */}
                <div className="flex flex-col items-center flex-1 px-1 sm:px-3">
                  <motion.span
                    key={`sec-${timerSeconds}`}
                    initial={{ y: -8, opacity: 0.3 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="font-normal text-4xl sm:text-6xl md:text-7xl text-[#fdfaf5] tracking-wider drop-shadow-[0_0_24px_rgba(223,193,136,0.6)]"
                    style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
                  >
                    0{timerSeconds}
                  </motion.span>
                  <span
                    className="text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-[#dfc188] font-medium mt-1.5"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    SECS
                  </span>
                </div>
              </div>

              {/* Minimalist romantic subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="mt-4 text-[10.5px] sm:text-[11.5px] text-pink-200/55 font-light tracking-[0.24em] uppercase"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                sebuah kejutan manis sedang disiapkan...
              </motion.p>
            </motion.div>
          )}

          {/* ── PHASE LOADING: FLOWER SPINNER TRANSISI ── */}
          {phase === 'loading' && (
            <motion.div
              key="loading-flower-step"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="flex items-center justify-center z-10"
            >
              <FlowerLoader />
            </motion.div>
          )}

          {/* ── PHASE 1: KOTAK KADO TURUN DARI ATAS DENGAN CAHAYA (SLOW & SERENE) ── */}
          {phase === 'gift' && (
            <motion.div
              key="gift-box-step"
              initial={{ y: -520, opacity: 0, scale: 0.72 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ scale: 0.85, opacity: 0, y: -25 }}
              transition={{
                y: { duration: 3.2, ease: [0.18, 0.88, 0.28, 1] },
                opacity: { duration: 1.6, ease: 'easeOut' },
                scale: { duration: 3.2, ease: [0.18, 0.88, 0.28, 1] },
              }}
              className="relative flex flex-col items-center justify-center z-10"
            >
              {/* Ambient Heavenly/Warm Light Blooming Behind the Descending Gift */}
              <motion.div
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{
                  opacity: [0, 0.9, 0.65],
                  scale: [0.25, 1.45, 1.18],
                }}
                transition={{
                  duration: 4.2,
                  ease: [0.18, 0.88, 0.28, 1],
                }}
                className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(223,193,136,0.4) 0%, rgba(196,112,135,0.24) 40%, rgba(99,18,36,0.06) 65%, transparent 75%)',
                  filter: 'blur(36px)',
                }}
              />

              {/* Soft vertical luminous shimmer descending with the gift */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: [0, 0.65, 0.15],
                  height: ['0px', '460px', '220px'],
                }}
                transition={{ duration: 3.6, ease: 'easeOut' }}
                className="absolute -top-32 w-28 sm:w-44 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to bottom, transparent, rgba(223,193,136,0.32) 50%, transparent 100%)',
                  filter: 'blur(24px)',
                }}
              />

              {/* Gentle floating bob after landing */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 5.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 3.2,
                }}
                className="relative z-10"
              >
                <MinimalGiftBox onClick={handleOpenGift} />
              </motion.div>
            </motion.div>
          )}

          {/* ── PHASE 2: PIN 4 ANGKA MINIMALIS ELEGAN ── */}
          {phase === 'pin' && (
            <motion.div
              key="pin-input-step"
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="flex flex-col items-center justify-center z-10 px-4 max-w-xs w-full"
            >
              {/* Minimal Line-Art Heart in Muted Champagne Gold */}
              <div className="text-[#dfc188] mb-3.5 flex items-center justify-center filter drop-shadow-[0_2px_8px_rgba(223,193,136,0.3)]">
                <OutlineHeartIcon size={34} />
              </div>

              {/* Title in Solid Ivory Editorial Serif */}
              <h2
                className="text-lg sm:text-xl text-[#f5f0e8] font-normal tracking-[0.24em] uppercase mb-2 select-none text-center"
                style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
              >
                Enter the secret code
              </h2>

              {/* Clue: Date of Birth */}
              <div className="flex items-center justify-center px-4 py-1 rounded-full bg-[#dfc188]/10 border border-[#dfc188]/25 mb-6 shadow-[0_2px_10px_rgba(223,193,136,0.1)]">
                <span
                  className="text-[11px] sm:text-xs text-[#fbf2dd]/85 font-light tracking-[0.22em] uppercase select-none"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Date of birth
                </span>
              </div>

              {/* 4-Digit Indicator Dots with Error Shake */}
              <motion.div
                animate={isError ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-4 mb-8"
              >
                {[0, 1, 2, 3].map((i) => {
                  const filled = pinInput.length > i;
                  return (
                    <div
                      key={i}
                      className={`w-3.5 h-3.5 rounded-full border transition-all duration-200 ${
                        filled
                          ? 'bg-[#dfc188] border-[#fbf2dd] shadow-[0_0_12px_rgba(223,193,136,0.65)] scale-110'
                          : 'border-[#dfc188]/25 bg-white/[0.03]'
                      }`}
                    />
                  );
                })}
              </motion.div>

              {/* Minimal Clean Number Pad with Muted Champagne Borders */}
              <div className="grid grid-cols-3 gap-3.5 w-full max-w-[240px]">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleDigit(num)}
                    className="w-16 h-16 mx-auto rounded-full bg-white/[0.03] hover:bg-[#dfc188]/10 active:bg-[#c47087]/25 border border-[#dfc188]/15 hover:border-[#dfc188]/35 text-[#f5f0e8] text-xl font-light tracking-wider flex items-center justify-center transition-all cursor-pointer select-none active:scale-95 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {num}
                  </button>
                ))}

                {/* Empty cell */}
                <div />

                {/* Digit 0 */}
                <button
                  type="button"
                  onClick={() => handleDigit('0')}
                  className="w-16 h-16 mx-auto rounded-full bg-white/[0.03] hover:bg-[#dfc188]/10 active:bg-[#c47087]/25 border border-[#dfc188]/15 hover:border-[#dfc188]/35 text-[#f5f0e8] text-xl font-light tracking-wider flex items-center justify-center transition-all cursor-pointer select-none active:scale-95 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  0
                </button>

                {/* Backspace Button */}
                <button
                  type="button"
                  onClick={handleDelete}
                  className="w-16 h-16 mx-auto rounded-full bg-white/[0.02] hover:bg-white/[0.07] active:bg-white/[0.12] border border-[#dfc188]/15 text-[#dfc188]/70 hover:text-[#f5f0e8] flex items-center justify-center transition-all cursor-pointer select-none active:scale-95"
                  title="Hapus"
                >
                  <Delete className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
