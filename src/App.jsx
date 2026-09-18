import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Play, RotateCcw } from 'lucide-react';
import MatrixRainCanvas from './components/MatrixRainCanvas';
import StarryBackground from './components/StarryBackground';
import BirthdayCakeStage from './components/BirthdayCakeStage';
import FloatingParticles from './components/FloatingParticles';
import FallingPetals from './components/FallingPetals';
import AudioPlayer from './components/AudioPlayer';
import RomanticLockScreen from './components/RomanticLockScreen';
import ScrapbookStage from './components/ScrapbookStage';
import RomanticLetterStage from './components/RomanticLetterStage';
import RomanticAmbientBackground from './components/RomanticAmbientBackground';
import RomanticLoveAura from './components/RomanticLoveAura';
import CustomCursor from './components/CustomCursor';
import birthdayData from './config/birthdayData';
import { preloadKeyboardSounds } from './utils/keyboardSound';

// ─── Stage Flow ────────────────────────────────────────────
// 0 : Timer 5 detik (kelopak mawar bertaburan) → Kotak Kado Turun Lembut → PIN 4 angka
// 1 : Stardust Rain Canvas Mawar Lembut — 3 detik
// 2 : Countdown 3 → 2 → 1 (Editorial Serif Mewah)
// 3 : Words dari config: HAPPY → BIRTHDAY → [NAMA] → Glowing Rose Heart
// 4 : Kue Ulang Tahun Bertingkat ("Happy Birthday Sayang", Tap untuk Matikan Lilin, Meredup Santai)
// 5 : Scrapbook 3D Album Foto (Buku Foto Kenangan)
// 6 : Surat Romantis (Typewriter Letter, Buket Mawar, Vinyl Musik & Frame Emas)

const WORDS = birthdayData.flow.countdownWords;

export default function App() {
  const [stage, setStage] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(false);
  const [started, setStarted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [lockKey, setLockKey] = useState(0); // increments on repeat to force RomanticLockScreen remount

  // ── Global Audio Context Unlocker on User Gesture ───────
  useEffect(() => {
    preloadKeyboardSounds();

    const unlockAudio = () => {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        if (!window.__globalAudioCtx) {
          window.__globalAudioCtx = new AudioCtx();
        }
        if (window.__globalAudioCtx.state === 'suspended') {
          window.__globalAudioCtx.resume();
        }
        preloadKeyboardSounds();
      } catch (e) { }
    };

    window.addEventListener('click', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
  }, []);

  // ── Start / Play button handler ──────────────────────────
  const handleBegin = useCallback(() => {
    if (started) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        if (!window.__globalAudioCtx) {
          window.__globalAudioCtx = new AudioCtx();
        }
        if (window.__globalAudioCtx.state === 'suspended') {
          window.__globalAudioCtx.resume();
        }
      }
    } catch (e) { }

    setStarted(true);
    setIsPlayingAudio(true);
    setStage(1);
  }, [started]);

  // ── Stage 1: Matrix rain 3s ────────────────────────────
  useEffect(() => {
    if (stage !== 1) return;
    const t = setTimeout(() => { setCountdown(3); setStage(2); }, 3000);
    return () => clearTimeout(t);
  }, [stage]);

  // ── Stage 2: Countdown digit ──────────────────────────
  useEffect(() => {
    if (stage !== 2) return;
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(c => c - 1), 1300);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setWordIndex(0);
        setWordVisible(false);
        setStage(3);
      }, 800);
      return () => clearTimeout(t);
    }
  }, [stage, countdown]);

  // ── Stage 3: Show word/heart → hide ───────────────────
  useEffect(() => {
    if (stage !== 3) return;
    const t = setTimeout(() => {
      setWordVisible(true);
    }, 200);
    return () => clearTimeout(t);
  }, [stage, wordIndex]);

  useEffect(() => {
    if (stage !== 3 || !wordVisible) return;
    const t = setTimeout(() => setWordVisible(false), 950);
    return () => clearTimeout(t);
  }, [stage, wordVisible, wordIndex]);

  const handleWordExited = () => {
    if (wordIndex < WORDS.length - 1) {
      setWordIndex((i) => i + 1);
    } else {
      setTimeout(() => {
        setStage(4);
      }, 1000);
    }
  };

  const handleResetToStart = () => {
    setStage(0);
    setStarted(false);
    setCountdown(3);
    setWordIndex(0);
    setWordVisible(false);
    setIsPlayingAudio(false);
    setLockKey((k) => k + 1);
  };

  return (
    <div className="relative min-h-screen min-h-[100dvh] w-full bg-[#0e020c] text-white overflow-y-auto overflow-x-hidden flex flex-col selection:bg-[#c47087]/50 selection:text-white">
      {/* Custom Animated Soft Rose Gold Cursor */}
      <CustomCursor />

      {/* Unified Soft Light Dark Pink Romantic Ambient Background */}
      <RomanticAmbientBackground />

      {/* Optional Audio Player */}
      {stage >= 1 && (
        <AudioPlayer
          audioSrc={birthdayData.audio.src}
          isPlaying={isPlayingAudio}
          onTogglePlay={() => setIsPlayingAudio(!isPlayingAudio)}
        />
      )}

      {/* Repeat Button — visible on Stage 5 & 6 */}
      {stage >= 5 && (
        <button
          type="button"
          onClick={handleResetToStart}
          className="fixed top-4 right-16 z-[100] p-2.5 rounded-full bg-white/10 border border-[#dfc188]/30 text-[#f5f0e8] shadow-[0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-md hover:bg-white/20 transition-all duration-200 cursor-pointer pointer-events-auto hover:scale-110 active:scale-95"
          title="Ulangi dari Awal"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      )}

      {/* Realistic Falling Flower Petals — Active on Stage 0 (Timer & Gift Box) */}
      <AnimatePresence>
        {stage === 0 && <FallingPetals count={32} />}
      </AnimatePresence>

      {/* Romantic Love Aura, Floating Fairy Lights & Petals — Active on Stage 4, 5, 6 */}
      <AnimatePresence>
        {stage >= 4 && <RomanticLoveAura />}
      </AnimatePresence>

      {/* Background Stage 1-3: Recolored Romantic Stardust Rain Canvas */}
      <AnimatePresence>
        {stage >= 1 && stage <= 3 && (
          <motion.div
            key="matrix-layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="fixed inset-0 pointer-events-none z-0"
          >
            <MatrixRainCanvas />
          </motion.div>
        )}
      </AnimatePresence>


      {/* ══ STAGE 0: Romantic Lock & Key + Timer Screen ═════════ */}
      {stage === 0 && (
        <RomanticLockScreen
          key={lockKey}
          onUnlockSuccess={handleBegin}
        />
      )}

      {/* ══ STAGE 2: Countdown (Refined Luxury Editorial Serif) ══════ */}
      {stage === 2 && (
        <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            {countdown > 0 && (
              <motion.span
                key={`d-${countdown}`}
                initial={{ opacity: 0, scale: 0.7, filter: 'blur(16px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.4, filter: 'blur(12px)' }}
                transition={{
                  enter: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  exit: { duration: 0.35, ease: 'easeInOut' },
                }}
                className="font-light leading-none select-none text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#f7d6e0] to-[#dfc188] drop-shadow-[0_4px_35px_rgba(223,193,136,0.45)]"
                style={{
                  fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
                  fontSize: 'clamp(120px, 32vw, 240px)',
                }}
              >
                {countdown}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ══ STAGE 3: Words (HAPPY → BIRTHDAY → TYJAW → SVG Heart) ══ */}
      {stage === 3 && (
        <div className="fixed inset-0 z-40 flex items-center justify-center px-4 pointer-events-none">
          <AnimatePresence mode="wait" onExitComplete={handleWordExited}>
            {wordVisible && (
              <motion.div
                key={`w-${wordIndex}`}
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(14px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.25, filter: 'blur(10px)' }}
                transition={{
                  enter: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                  exit: { duration: 0.35, ease: 'easeInOut' },
                }}
                className="select-none text-center"
              >
                {WORDS[wordIndex] === '❤️' ? (
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                      filter: [
                        'drop-shadow(0 0 20px rgba(223,193,136,0.6))',
                        'drop-shadow(0 0 45px rgba(226,168,182,0.8))',
                        'drop-shadow(0 0 20px rgba(223,193,136,0.6))',
                      ],
                    }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex items-center justify-center text-[#dfc188]"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-28 h-28 sm:w-36 sm:h-36">
                      <defs>
                        <radialGradient id="roseHeartGrad" cx="50%" cy="38%" r="62%">
                          <stop offset="0%" stopColor="#feeaf0" />
                          <stop offset="40%" stopColor="#e27893" />
                          <stop offset="85%" stopColor="#8a1f3c" />
                          <stop offset="100%" stopColor="#550e20" />
                        </radialGradient>
                      </defs>
                      <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        fill="url(#roseHeartGrad)"
                        stroke="#fbe4ec"
                        strokeWidth="0.8"
                      />
                    </svg>
                  </motion.div>
                ) : (
                  <h1
                    className="font-normal tracking-[0.14em] uppercase leading-none select-none text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#f7d6e0] to-[#dfc188] drop-shadow-[0_4px_30px_rgba(223,193,136,0.4)]"
                    style={{
                      fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
                      fontSize: 'clamp(46px, 14vw, 130px)',
                    }}
                  >
                    {WORDS[wordIndex]}
                  </h1>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ══ STAGE 4, 5, 6: Smooth Cinematic Transitions ═════════════════════════ */}
      <AnimatePresence mode="wait">
        {/* ══ STAGE 4: Kue Ulang Tahun ("Happy Birthday Sayang", Tap to Extinguish) ═══ */}
        {stage === 4 && (
          <motion.div
            key="cake-stage-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0, delay: 0 } }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-30"
          >
            <BirthdayCakeStage
              onComplete={() => setStage(5)}
            />
          </motion.div>
        )}

        {/* ══ STAGE 5: Scrapbook 3D Photo Book (Habis Kue Ulang Tahun) ════════════════ */}
        {stage === 5 && (
          <motion.div
            key="scrapbook-stage-wrapper"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-20"
          >
            <RomanticAmbientBackground />
            <ScrapbookStage
              onComplete={() => setStage(6)}
              onBack={handleResetToStart}
            />
          </motion.div>
        )}

        {/* ══ STAGE 6: Surat Romantis (Part Terakhir: Typewriter & Mawar) ════════════ */}
        {stage === 6 && (
          <motion.div
            key="romantic-letter-stage-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="relative w-full"
          >
            <RomanticLetterStage
              isPlayingAudio={isPlayingAudio}
              onTogglePlayAudio={() => setIsPlayingAudio(!isPlayingAudio)}
              onBack={handleResetToStart}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
