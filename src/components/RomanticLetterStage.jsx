import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Play, Pause, RotateCcw, SkipBack, SkipForward, Volume1, Volume2, MoreHorizontal, Heart, ChevronDown } from 'lucide-react';
import birthdayData from '../config/birthdayData';

const USER_PHOTOS = [
  '/user-photos/photobook2.jpeg',
  '/user-photos/photobook1.jpeg',
  '/user-photos/photobook3.jpeg',
  '/user-photos/photobook4.jpeg',
  '/user-photos/photobook6.jpeg',
  '/user-photos/photobook7.jpeg',
  '/user-photos/photobook8.jpeg',
  '/user-photos/tyjaw-video-moment.jpg',
];

const PushPin = ({ idx = 0 }) => {
  const colors = ['#801c34', '#b88d48', '#5a1828'];
  const col = colors[idx % colors.length];
  const uid = `pin${idx}`;
  return (
    <div style={{ position:'absolute', top:'-13px', left:'50%', transform:'translateX(-50%)', zIndex:20, filter:'drop-shadow(0 4px 6px rgba(0,0,0,0.5))', pointerEvents:'none' }}>
      <svg width="22" height="26" viewBox="0 0 24 28" fill="none">
        <defs>
          <radialGradient id={`${uid}h`} cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ff7090" />
            <stop offset="40%" stopColor={col} />
            <stop offset="85%" stopColor="#3d0714" />
            <stop offset="100%" stopColor="#150208" />
          </radialGradient>
          <linearGradient id={`${uid}m`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b88d48" />
            <stop offset="35%" stopColor="#fff8e7" />
            <stop offset="70%" stopColor="#dfc188" />
            <stop offset="100%" stopColor="#7a5518" />
          </linearGradient>
        </defs>
        <ellipse cx="14" cy="24" rx="5" ry="2.2" fill="rgba(0,0,0,0.3)" />
        <polygon points="12,14 10,24 14,24" fill={`url(#${uid}m)`} />
        <circle cx="12" cy="9" r="7.5" fill={`url(#${uid}h)`} stroke="#dfc188" strokeWidth="0.8" />
        <ellipse cx="9.5" cy="6.5" rx="2.5" ry="1.6" fill="rgba(255,255,255,0.75)" transform="rotate(-30 9.5 6.5)" />
      </svg>
    </div>
  );
};

// ── Victorian Corner Filigree Decoration ────────────────────────
const CornerFiligree = ({ position = 'top-left' }) => {
  const isRight = position.includes('right');
  const isBottom = position.includes('bottom');
  const transform = `${isRight ? 'scaleX(-1)' : ''} ${isBottom ? 'scaleY(-1)' : ''}`.trim();

  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 48 48"
      fill="none"
      style={{
        position: 'absolute',
        top: isBottom ? 'auto' : 8,
        bottom: isBottom ? 8 : 'auto',
        left: isRight ? 'auto' : 8,
        right: isRight ? 8 : 'auto',
        transform: transform || undefined,
        pointerEvents: 'none',
        opacity: 0.55,
      }}
    >
      <path d="M4 4 Q24 4 24 24 Q24 4 44 4" stroke="#b88d48" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M4 4 Q4 24 24 24 Q4 24 4 44" stroke="#b88d48" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <circle cx="14" cy="14" r="2.5" fill="#8b152d" />
      <path d="M7 21 C12 18 18 12 21 7" stroke="#dfc188" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  );
};

// ── 3D Royal Wax Seal SVG ───────────────────────────────────────
const RoyalWaxSeal = () => (
  <div style={{ position: 'relative', width: 46, height: 46, filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))' }}>
    <svg width="46" height="46" viewBox="0 0 60 60" fill="none">
      <defs>
        <radialGradient id="waxBase" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#bf2044" />
          <stop offset="45%" stopColor="#800a22" />
          <stop offset="85%" stopColor="#4f0312" />
          <stop offset="100%" stopColor="#250007" />
        </radialGradient>
        <radialGradient id="waxInner" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#9e1130" />
          <stop offset="80%" stopColor="#560415" />
          <stop offset="100%" stopColor="#30010a" />
        </radialGradient>
        <linearGradient id="goldEmboss" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff3db" />
          <stop offset="50%" stopColor="#dfc188" />
          <stop offset="100%" stopColor="#8f6826" />
        </linearGradient>
      </defs>
      {/* Organic Melted Wax Edges */}
      <path
        d="M30 3 C36 2, 42 6, 48 10 C53 14, 58 20, 57 27 C56 34, 58 41, 53 47 C48 53, 41 57, 34 57 C27 57, 20 59, 14 55 C8 51, 3 44, 3 37 C3 30, 2 22, 7 16 C12 10, 22 4, 30 3 Z"
        fill="url(#waxBase)"
      />
      {/* Pressed Circular Rim */}
      <circle cx="30" cy="30" r="19" fill="url(#waxInner)" stroke="rgba(223,193,136,0.55)" strokeWidth="1.2" />
      <circle cx="30" cy="30" r="16" fill="none" stroke="rgba(223,193,136,0.3)" strokeWidth="0.8" strokeDasharray="2 1.5" />
      {/* Intertwined Heart / Monogram */}
      <path
        d="M30 37 L24.5 31.5 C21.5 28.5 21.5 24.5 24.5 22 C27.5 19.5 30 22 30 22 C30 22 32.5 19.5 35.5 22 C38.5 24.5 38.5 28.5 35.5 31.5 Z"
        fill="url(#goldEmboss)"
        stroke="#560415"
        strokeWidth="0.5"
      />
      <circle cx="30" cy="26" r="1.5" fill="#fff" opacity="0.8" />
    </svg>
  </div>
);

// ── Vintage Postage Stamp ───────────────────────────────────────
const VintageAirmailStamp = () => (
  <div
    style={{
      position: 'relative',
      padding: '4px',
      background: '#fffaf2',
      border: '1px dashed #b88d48',
      boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
      transform: 'rotate(2.5deg)',
      width: '46px',
      boxSizing: 'border-box',
    }}
  >
    <div style={{ width: '100%', height: '38px', background: '#1f0910', borderRadius: '1px', overflow: 'hidden', position: 'relative' }}>
      <img
        src="/user-photos/photobook2.jpeg"
        alt="Foto Tyjaw"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%', filter: 'sepia(0.15) contrast(1.05)' }}
      />
      <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(223,193,136,0.4)' }} />
    </div>
    <div style={{ textAlign: 'center', marginTop: '2px' }}>
      <span style={{ fontSize: '5px', fontFamily: 'monospace', color: '#7a1828', letterSpacing: '0.08em', fontWeight: 700 }}>
        19.09 • POST
      </span>
    </div>
  </div>
);

// ── Floating mini hearts that burst when letter completes ─────
const LetterCompleteBurst = () => {
  const hearts = useMemo(() => Array.from({ length: 14 }).map((_, i) => ({
    id: i,
    angle: (i / 14) * 360,
    dist: Math.random() * 60 + 40,
    size: Math.random() * 8 + 8,
    delay: Math.random() * 0.3,
    color: i % 2 === 0 ? '#ff527b' : '#ffc2d4',
  })), []);

  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', pointerEvents: 'none', zIndex: 30 }}>
      {hearts.map(h => {
        const rad = (h.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * h.dist;
        const ty = Math.sin(rad) * h.dist;
        return (
          <motion.div
            key={h.id}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{ x: tx, y: ty, scale: [0, 1.2, 0.8, 0], opacity: [1, 1, 0.5, 0] }}
            transition={{ duration: 1.2, delay: h.delay, ease: 'easeOut' }}
            style={{ position: 'absolute', color: h.color, filter: `drop-shadow(0 0 6px ${h.color})` }}
          >
            <Heart style={{ width: h.size, height: h.size }} fill={h.color} />
          </motion.div>
        );
      })}
    </div>
  );
};

// ── 1. CUSTOM ROYAL LETTER — no typing sound, swipe-to-reveal after done ───
const CustomRoyalLetter = ({ onComplete }) => {
  const letterBody = birthdayData.letter?.longBody || birthdayData.letter?.body || '';
  const [displayedCount, setDisplayedCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isLetterReady, setIsLetterReady] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const scrollRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !hasStarted) setHasStarted(true); },
      { threshold: 0.15 }
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [hasStarted]);

  // Surat muncul dari memudar hingga utuh dulu (1.6s), baru setelah itu teks mulai diketik
  useEffect(() => {
    if (!hasStarted) return;
    const readyTimer = setTimeout(() => {
      setIsLetterReady(true);
    }, 1600);
    return () => clearTimeout(readyTimer);
  }, [hasStarted]);

  // Efek mengetik: berjalan slow & santai (42ms) HANYA setelah kertas surat utuh
  useEffect(() => {
    if (!isLetterReady || isComplete) return;
    let idx = 0;
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        idx++;
        setDisplayedCount(idx);
        if (idx >= letterBody.length) {
          clearInterval(interval);
          setIsComplete(true);
          setShowBurst(true);
          setTimeout(() => setShowBurst(false), 1600);
          if (onComplete) onComplete();
        }
      }, 42); // Diperlambat agar terbaca hangat & romantis
      return () => clearInterval(interval);
    }, 350);
    return () => clearTimeout(delay);
  }, [isLetterReady, letterBody, isComplete, onComplete]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [displayedCount]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'relative', width: '100%', userSelect: 'none', padding: '0 12px', boxSizing: 'border-box' }}
    >
      {/* Background Soft Glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 90% 70% at 50% 35%, rgba(120,20,50,0.35) 0%, transparent 72%)' }} />

      {/* Main Luxury Parchment Sheet */}
      <div
        style={{
          position: 'relative',
          maxWidth: '430px',
          margin: '0 auto',
          background: 'linear-gradient(172deg, #fdfaf4 0%, #f7f0e3 45%, #eee3ce 100%)',
          borderRadius: '16px',
          padding: '24px 22px 20px',
          boxShadow: '0 25px 65px rgba(0,0,0,0.75), 0 6px 20px rgba(90,12,32,0.3), inset 0 0 55px rgba(180,140,95,0.16), inset 0 1px 0 rgba(255,255,255,0.9)',
          border: '1.5px solid rgba(212,175,55,0.45)',
          boxSizing: 'border-box',
        }}
      >
        {/* Inner Gold Foil Dashed Border */}
        <div style={{ position: 'absolute', inset: '8px', border: '1px dashed rgba(184,141,72,0.38)', borderRadius: '10px', pointerEvents: 'none' }} />

        {/* Completion Burst */}
        {showBurst && <LetterCompleteBurst />}

        {/* 4 Victorian Ornate Corners */}
        <CornerFiligree position="top-left" />
        <CornerFiligree position="top-right" />
        <CornerFiligree position="bottom-left" />
        <CornerFiligree position="bottom-right" />

        {/* Top Header Deck: Wax Seal + Title + Stamp */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid rgba(184,141,72,0.22)', paddingBottom: '12px' }}>
          <RoyalWaxSeal />
          <div style={{ textAlign: 'center', flex: 1, padding: '0 8px' }}>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '15px', fontWeight: 700, color: '#4a0e1c', letterSpacing: '0.02em', display: 'block' }}>
              {birthdayData.letter?.title || 'Happy Birthday Sayang!'}
            </span>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '8.5px', color: '#8f6826', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>
              Untuk Tyas Diva Syaqilla • 19 September
            </span>
          </div>
          <VintageAirmailStamp />
        </div>

        {/* Letter Typewriter Text Area */}
        <div
          ref={scrollRef}
          style={{
            position: 'relative',
            zIndex: 2,
            maxHeight: '260px',
            minHeight: '190px',
            overflowY: 'auto',
            paddingRight: '4px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(11.5px, 3.2vw, 13px)',
              lineHeight: 1.82,
              letterSpacing: '0.015em',
              color: '#2a0914',
              whiteSpace: 'pre-wrap',
              margin: 0,
            }}
          >
            {letterBody.slice(0, displayedCount)}
            {isLetterReady && !isComplete && (
              <span style={{ display: 'inline-block', width: '2px', height: '1em', background: '#9e1130', verticalAlign: 'middle', marginLeft: '2px', animation: 'blink 1.1s step-end infinite' }} />
            )}
          </p>
        </div>

        {/* Bottom Sign-off Footer */}
        <div style={{ position: 'relative', zIndex: 2, marginTop: '16px', paddingTop: '10px', borderTop: '1px solid rgba(184,141,72,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <div>
            <span style={{ display: 'block', fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '10.5px', color: 'rgba(74,14,28,0.7)' }}>
              Dengan segenap cinta,
            </span>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: '18px', color: '#680c21', fontWeight: 700 }}>
              Cielskie ❤️
            </span>
          </div>
        </div>
      </div>

      {/* ── Swipe hint pill — shown after letter finishes ── */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: [0, 6, 0] }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.5 }, y: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              marginTop: '18px',
            }}
          >
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(255,210,220,0.65)', textTransform: 'uppercase' }}>
              Scroll untuk lanjut
            </span>
            <ChevronDown style={{ width: 18, height: 18, color: 'rgba(255,150,180,0.7)' }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ── Apple AirPlay Audio Icon ────────────────────────────────────
const AppleAirPlayAudioIcon = ({ size = 13, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5.5 13.5 A9 9 0 0 1 18.5 13.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M8.5 15.8 A5 5 0 0 1 15.5 15.8" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <polygon points="12 10.5 16.5 18 7.5 18" fill={color} />
  </svg>
);

const VIDEO_CANDIDATES = [
  '/user-photos/video.mp4',
  '/video.mp4',
  '/user-photos/VIDEO.MOV',
  '/user-photos/video.mov',
  '/video.mov',
  '/video.m4v',
  '/user-photos/video.m4v',
  '/user-photos/tyjaw.mp4',
  '/user-photos/tyjaw.mov',
  '/tyjaw.mp4',
  '/tyjaw.mov',
];

// ── 2. IOS SPOTIFY / LOCK SCREEN MEDIA PLAYER + ALIGNED PHOTOBOX ─
const IOSMediaPlayerAndPhotoboxSection = ({ isPlayingAudio, onTogglePlayAudio }) => {
  const songTitle = 'Moments Tyjaw';
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(26); // durasi video ~26s
  const [volume, setVolume] = useState(0.85);
  const [videoIndex, setVideoIndex] = useState(0);
  const [hasVideo, setHasVideo] = useState(true);
  const videoRef = useRef(null);

  // Sync video play/pause with player audio state
  // Video selalu muted agar tidak bentrok dengan AudioPlayer background
  useEffect(() => {
    if (!videoRef.current || !hasVideo) return;
    videoRef.current.muted = true; // Pastikan selalu muted
    if (isPlayingAudio) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isPlayingAudio, hasVideo]);

  // Track progress & duration: HANYA dengarkan audio jika video TIDAK aktif agar tidak tabrakan
  useEffect(() => {
    if (hasVideo) return; // Video mengurus progressnya sendiri secara linear dari 0 ke akhir!

    const audio = document.querySelector('audio');
    if (!audio) return;
    const updateProgress = () => {
      if (audio.currentTime !== undefined) setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration) && audio.duration > 0) setDuration(audio.duration);
    };
    audio.addEventListener('timeupdate', updateProgress);
    return () => audio.removeEventListener('timeupdate', updateProgress);
  }, [hasVideo]);

  // Handle Scrub / Seek
  const handleScrub = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = pct * duration;
    setCurrentTime(newTime);
    if (videoRef.current && hasVideo) {
      videoRef.current.currentTime = newTime;
    } else {
      const audio = document.querySelector('audio');
      if (audio) audio.currentTime = newTime;
    }
  };

  // Handle Volume Change
  const handleVolumeChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newVol = Math.max(0, Math.min(1, clickX / rect.width));
    setVolume(newVol);
    const audio = document.querySelector('audio');
    if (audio) audio.volume = newVol;
    if (videoRef.current && hasVideo) videoRef.current.volume = newVol;
  };

  // Rewind & Fast Forward media by 5 seconds
  const handlePrev = () => {
    if (videoRef.current && hasVideo) {
      const t = Math.max(0, videoRef.current.currentTime - 5);
      videoRef.current.currentTime = t;
      setCurrentTime(t);
    } else {
      const audio = document.querySelector('audio');
      if (audio) {
        const t = Math.max(0, audio.currentTime - 5);
        audio.currentTime = t;
        setCurrentTime(t);
      }
    }
  };

  const handleNext = () => {
    if (videoRef.current && hasVideo) {
      const t = Math.min(duration, videoRef.current.currentTime + 5);
      videoRef.current.currentTime = t;
      setCurrentTime(t);
    } else {
      const audio = document.querySelector('audio');
      if (audio) {
        const t = Math.min(duration, audio.currentTime + 5);
        audio.currentTime = t;
        setCurrentTime(t);
      }
    }
  };

  const handleVideoError = () => {
    if (videoIndex < VIDEO_CANDIDATES.length - 1) {
      setVideoIndex((prev) => prev + 1);
    } else {
      setHasVideo(false);
    }
  };

  const formatTime = (secs) => {
    const s = Math.floor(secs || 0);
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m}:${rem < 10 ? '0' : ''}${rem}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const remainingTime = Math.max(0, duration - currentTime);

  const photoboxImages = [
    '/user-photos/photobox1.jpeg',
    '/user-photos/photobox2.jpeg',
    '/user-photos/photobox3.jpeg',
  ];

  const FilmPerf = () => (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '1px 2px' }}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} style={{ width: 5, height: 3, background: 'rgba(255,255,255,0.25)', borderRadius: '1px' }} />
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'relative', width: '100%', userSelect: 'none', padding: '0 12px', boxSizing: 'border-box' }}
    >
      {/* Background soft ambient radial glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 90% 70% at 50% 45%, rgba(85,14,38,0.4) 0%, transparent 72%)' }} />

      {/* ── ROW: IOS MEDIA PLAYER CARD (~67%) & PHOTOBOX STRIP (~30%) BERDAMPINGAN SEJAJAR ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          width: '100%',
          gap: '12px',
          boxSizing: 'border-box',
        }}
      >
        {/* ── KIRI: IOS NOW PLAYING FROSTED GLASS MEDIA CARD (~67%) ── */}
        <div
          style={{
            flex: '1 1 67%',
            minWidth: 0,
            boxSizing: 'border-box',
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.05) 100%)',
            backdropFilter: 'blur(26px) saturate(180%)',
            WebkitBackdropFilter: 'blur(26px) saturate(180%)',
            borderRadius: '26px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 48px rgba(0, 0, 0, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.28)',
            padding: '12px 14px 10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Top: Video Media Window (Dedicated to user's video/media with full duration) */}
          <div
            onClick={onTogglePlayAudio}
            style={{
              width: '100%',
              aspectRatio: '1 / 1',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              background: '#090909',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 6px 18px rgba(0,0,0,0.55)',
              cursor: 'pointer',
            }}
          >
            {/* Real Video Element if video file is present */}
            {hasVideo && (
              <video
                ref={videoRef}
                src={VIDEO_CANDIDATES[videoIndex]}
                poster="/user-photos/tyjaw-video-moment.jpg"
                playsInline
                preload="metadata"
                loop
                muted={true}
                onError={handleVideoError}
                onLoadedMetadata={(e) => {
                  if (e.target.duration && !isNaN(e.target.duration) && e.target.duration > 0) {
                    setDuration(e.target.duration);
                  }
                }}
                onTimeUpdate={(e) => {
                  if (e.target.currentTime !== undefined) {
                    setCurrentTime(e.target.currentTime);
                  }
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 32%',
                  display: 'block',
                }}
              />
            )}

            {/* Video Fallback Image (The media moment sent by user) */}
            {!hasVideo && (
              <motion.img
                src="/user-photos/tyjaw-video-moment.jpg"
                alt="Video Moment Tyjaw & Cielskie"
                animate={isPlayingAudio ? { scale: [1, 1.05, 1], filter: ['brightness(1)', 'brightness(1.04)', 'brightness(1)'] } : { scale: 1 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 32%',
                }}
              />
            )}

            {/* Live Indicator Pill */}
            <div
              style={{
                position: 'absolute',
                top: 6,
                left: 7,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(6px)',
                padding: '2px 7px',
                borderRadius: '999px',
                border: '0.5px solid rgba(255,255,255,0.18)',
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: isPlayingAudio ? '#4ade80' : '#f87171',
                  boxShadow: isPlayingAudio ? '0 0 6px #4ade80' : 'none',
                  animation: isPlayingAudio ? 'blink 1.2s step-end infinite' : 'none',
                }}
              />
              <span style={{ fontSize: '7.5px', fontFamily: 'monospace', color: '#fff', fontWeight: 600, letterSpacing: '0.04em' }}>
                {isPlayingAudio ? 'PLAYING' : 'PAUSED'}
              </span>
            </div>
          </div>

          {/* Track Info Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '9px', marginBottom: '6px' }}>
            <div style={{ minWidth: 0, flex: 1, paddingRight: '8px' }}>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#ffffff',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  letterSpacing: '0.01em',
                }}
              >
                {songTitle}
              </div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '9.5px',
                  color: 'rgba(255, 255, 255, 0.65)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Tyas Diva Syaqilla ❤️
              </div>
            </div>

            {/* iOS Three Dots Menu Button */}
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.14)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.85)',
                flexShrink: 0,
                cursor: 'pointer',
              }}
              title="Menu Opsi"
            >
              <MoreHorizontal style={{ width: 12, height: 12 }} />
            </div>
          </div>

          {/* Scrubber Progress Bar & Timestamps */}
          <div style={{ width: '100%', marginBottom: '8px' }}>
            <div
              onClick={handleScrub}
              style={{
                width: '100%',
                height: '4px',
                background: 'rgba(255, 255, 255, 0.24)',
                borderRadius: '999px',
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  background: '#ffffff',
                  borderRadius: '999px',
                  transition: 'width 0.15s linear',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3px' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '8px', color: 'rgba(255,255,255,0.5)' }}>
                {formatTime(currentTime)}
              </span>
              <span style={{ fontFamily: 'monospace', fontSize: '8px', color: 'rgba(255,255,255,0.5)' }}>
                -{formatTime(remainingTime)}
              </span>
            </div>
          </div>

          {/* Main Media Controls: SkipBack, Play/Pause, SkipForward */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '22px', marginBottom: '8px' }}>
            <button
              type="button"
              onClick={handlePrev}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.9)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.1s',
              }}
              aria-label="Previous"
            >
              <SkipBack style={{ width: 18, height: 18, fill: 'currentColor' }} />
            </button>

            <button
              type="button"
              onClick={onTogglePlayAudio}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.15s',
              }}
              aria-label={isPlayingAudio ? 'Pause' : 'Play'}
            >
              {isPlayingAudio ? (
                <Pause style={{ width: 28, height: 28, fill: '#ffffff' }} />
              ) : (
                <Play style={{ width: 28, height: 28, fill: '#ffffff' }} />
              )}
            </button>

            <button
              type="button"
              onClick={handleNext}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.9)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.1s',
              }}
              aria-label="Next"
            >
              <SkipForward style={{ width: 18, height: 18, fill: 'currentColor' }} />
            </button>
          </div>

          {/* Volume Slider Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', padding: '0 4px' }}>
            <Volume1 style={{ width: 11, height: 11, color: 'rgba(255,255,255,0.5)' }} />
            <div
              onClick={handleVolumeChange}
              style={{
                flex: 1,
                height: '3.5px',
                background: 'rgba(255, 255, 255, 0.22)',
                borderRadius: '999px',
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${volume * 100}%`,
                  height: '100%',
                  background: 'rgba(255,255,255,0.9)',
                  borderRadius: '999px',
                }}
              />
            </div>
            <Volume2 style={{ width: 11, height: 11, color: 'rgba(255,255,255,0.5)' }} />
          </div>

          {/* Bottom AirPlay Pill */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'rgba(255, 255, 255, 0.13)',
                padding: '3px 12px',
                borderRadius: '999px',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                cursor: 'pointer',
              }}
            >
              <AppleAirPlayAudioIcon size={11} color="#ffffff" />
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '9px', color: 'rgba(255,255,255,0.95)', fontWeight: 500 }}>
                AirPlay
              </span>
            </div>
          </div>
        </div>

        {/* ── KANAN: PHOTOBOX STRIP (~30%) — SELARAS DENGAN CARD MEDIA SEBELAHNYA ── */}
        <div
          style={{
            flex: '0 0 30%',
            width: '30%',
            maxWidth: '30%',
            minWidth: 0,
            boxSizing: 'border-box',
            display: 'flex',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.05) 100%)',
              backdropFilter: 'blur(26px) saturate(180%)',
              WebkitBackdropFilter: 'blur(26px) saturate(180%)',
              borderRadius: '26px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 20px 48px rgba(0, 0, 0, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.28)',
              padding: '10px 7px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
            }}
          >
            {/* Top Film Perforations */}
            <FilmPerf />

            {/* Vertical Stack of 3 Photobox Photos (flex: 1 evenly distributed to fit exact height) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, margin: '6px 0', minHeight: 0 }}>
              {photoboxImages.map((url, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    minHeight: 0,
                    width: '100%',
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                  }}
                >
                  <img
                    src={url}
                    alt={`Photobox ${i + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'contrast(1.05) brightness(1.02)',
                    }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Bottom Photobox Label */}
            <div style={{ textAlign: 'center', padding: '2px 0' }}>
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '6.5px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 700,
                  display: 'block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                19.09 • PHOTOBOX
              </span>
            </div>

            {/* Bottom Film Perforations */}
            <FilmPerf />
          </div>
        </div>
      </div>

      {/* Quote under section */}
      <p style={{ textAlign: 'center', marginTop: '14px', fontFamily: "'Playfair Display', serif", fontSize: '11px', fontStyle: 'italic', color: 'rgba(253,235,240,0.52)', letterSpacing: '0.01em', lineHeight: 1.4 }}>
        "Setiap nada dan bingkai kenangan ini didedikasikan untukmu, Sayang."
      </p>
    </motion.div>
  );
};

const PolaroidWall = () => {
  const rotations = [-3.2, 2.6, -2.0, 3.4, -1.8, 2.2];
  const polaroids = [
    { url: '/user-photos/photobook2.jpeg', caption: 'forever & always', pos: 'center 38%' },
    { url: '/user-photos/photobook1.jpeg', caption: 'senjamu, surgaku', pos: 'center 25%' },
    { url: '/user-photos/photobook3.jpeg', caption: 'berdua segalanya', pos: 'center 22%' },
    { url: '/user-photos/photobook4.jpeg', caption: 'cinta tanpa akhir', pos: 'center 20%' },
    { url: '/user-photos/photobook6.jpeg', caption: 'my everything', pos: 'center 35%' },
    { url: '/user-photos/photobook7.jpeg', caption: 'tyjaw & cielskie', pos: 'center 22%' },
  ];

  return (
    <div style={{ position: 'relative', width: '100%', userSelect: 'none' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(85,14,38,0.32) 0%, transparent 70%)' }} />
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1 }}
        style={{ textAlign: 'center', marginBottom: '24px', fontFamily: "'Playfair Display', serif", fontSize: '13.5px', fontStyle: 'italic', color: 'rgba(253,235,240,0.48)', letterSpacing: '0.01em', padding: '0 24px' }}
      >
        "Setiap foto menyimpan satu alasan aku jatuh cinta padamu..."
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '0 16px', position: 'relative', zIndex: 1 }}>
        {polaroids.map((item, i) => {
          const rot = rotations[i % rotations.length];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.75, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Bingkai foto berayun alami seperti digantung di push pin */}
              <motion.div
                animate={{
                  rotate: [rot - 2.2, rot + 2.2, rot - 2.2],
                  y: [0, -5, 0],
                }}
                transition={{
                  rotate: {
                    duration: 3.6 + (i % 3) * 0.7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: (i * 0.35) % 1.5,
                  },
                  y: {
                    duration: 3.0 + (i % 2) * 0.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: (i * 0.25) % 1.2,
                  },
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0,
                  y: -8,
                  boxShadow: '0 24px 44px rgba(0,0,0,0.65), 0 6px 14px rgba(0,0,0,0.4)',
                  transition: { duration: 0.25 },
                }}
                whileTap={{ scale: 0.97 }}
                style={{
                  position: 'relative',
                  transformOrigin: '50% 0%', // Titik tumpu ayunan tepat di push pin atas
                  background: '#faf5ec',
                  padding: '8px 8px 30px',
                  borderRadius: '2px',
                  boxShadow: '0 16px 32px rgba(0,0,0,0.58), 0 3px 8px rgba(0,0,0,0.35)',
                  cursor: 'pointer',
                  willChange: 'transform',
                }}
              >
                <PushPin idx={i} />
                <div style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden', background: '#1a0a10' }}>
                  <img
                    src={item.url}
                    alt={item.caption}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: item.pos,
                    }}
                    loading="lazy"
                  />
                </div>
                <p style={{ textAlign: 'center', marginTop: '8px', fontFamily: "'Caveat', cursive", fontSize: '13.5px', color: '#3b0816', lineHeight: 1.2 }}>
                  {item.caption}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const ClosingBouquet = ({ onBack }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });
  const [activeFlower, setActiveFlower] = useState(null);
  const [sparkleKey, setSparkleKey] = useState(0);

  const petals = [
    { id: 1, left: '10%', delay: 0, dur: 7.2, size: 18 },
    { id: 2, left: '26%', delay: 1.8, dur: 8.8, size: 21 },
    { id: 3, left: '50%', delay: 0.8, dur: 7.5, size: 17 },
    { id: 4, left: '72%', delay: 2.5, dur: 9.2, size: 20 },
    { id: 5, left: '88%', delay: 0.4, dur: 8.0, size: 22 },
  ];

  // 8 Batang Tangkai Panjang dengan Bunga Unik di Pucuknya
  const stemConfigs = [
    // 1. Anggrek Ungu (Kiri Luar)
    {
      id: 'orchid',
      name: 'Bunga Anggrek Ungu',
      emoji: '💜',
      meaning: 'Pesona anggunmu yang selalu membuatku terpikat di setiap detik.',
      endX: -160,
      endY: -255,
      stemPath: 'M0,0 C-40,-70 -115,-155 -160,-255',
      leaves: [{ x: -60, y: -95, r: -50 }, { x: -120, y: -180, r: -35 }],
      strokeWidth: 4,
      rot: -1.5,
      sway: 3.4,
      dur: 4.8,
      delay: 0.1,
      renderFlower: () => (
        <g>
          <circle cx="0" cy="0" r="32" fill="rgba(171,71,188,0.22)" filter="blur(4px)" />
          {[0, 120, 240].map((deg, i) => (
            <path key={i} d="M0,0 C-7,-15 -9,-30 0,-34 C9,-30 7,-15 0,0 Z" fill="url(#orchidSepal)" stroke="#4a148c" strokeWidth="0.5" transform={`rotate(${deg})`} />
          ))}
          {[-55, 55].map((deg, i) => (
            <path key={i} d="M0,0 C-14,-13 -16,-26 0,-29 C16,-26 14,-13 0,0 Z" fill="url(#orchidPetal)" stroke="#6a1b9a" strokeWidth="0.5" transform={`rotate(${deg})`} />
          ))}
          <path d="M0,0 C-11,8 -13,20 0,24 C13,20 11,8 0,0 Z" fill="#aa00ff" stroke="#4a148c" strokeWidth="0.6" />
          <circle cx="0" cy="4" r="4" fill="#ffd600" stroke="#ff6d00" strokeWidth="0.6" />
          <circle cx="0" cy="4" r="1.5" fill="#d500f9" />
        </g>
      ),
    },
    // 2. Melati Putih (Kiri Tengah)
    {
      id: 'jasmine',
      name: 'Bunga Melati Putih',
      emoji: '🤍',
      meaning: 'Ketulusan dan kemurnian hatimu yang begitu suci dan menenangkan.',
      endX: -115,
      endY: -315,
      stemPath: 'M0,0 C-30,-90 -80,-195 -115,-315',
      leaves: [{ x: -45, y: -110, r: -45 }, { x: -85, y: -225, r: 25 }],
      strokeWidth: 4.2,
      rot: 1.0,
      sway: 2.8,
      dur: 4.2,
      delay: 0.35,
      renderFlower: () => (
        <g>
          <circle cx="0" cy="0" r="28" fill="rgba(255,255,255,0.25)" filter="blur(4px)" />
          {Array.from({ length: 8 }).map((_, i) => (
            <path key={i} d="M0,0 C-7,-11 -9,-22 0,-26 C9,-22 7,-11 0,0 Z" fill="url(#jasminePetal)" stroke="rgba(200,230,201,0.6)" strokeWidth="0.6" transform={`rotate(${i * 45})`} />
          ))}
          <circle cx="0" cy="0" r="5.5" fill="#f0f4c3" stroke="#c5e1a5" strokeWidth="0.7" />
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <circle key={i} cx="0" cy="-3.5" r="1.2" fill="#fbc02d" transform={`rotate(${deg})`} />
          ))}
          <circle cx="0" cy="0" r="2" fill="#7cb342" />
        </g>
      ),
    },
    // 3. Mawar Merah (Kiri Dalam)
    {
      id: 'redRose',
      name: 'Bunga Mawar Merah',
      emoji: '🌹',
      meaning: 'Cinta sejati dan rinduku yang membara tiada henti untukmu.',
      endX: -65,
      endY: -360,
      stemPath: 'M0,0 C-20,-100 -48,-235 -65,-360',
      leaves: [{ x: -28, y: -125, r: -35 }, { x: -50, y: -250, r: -25 }],
      strokeWidth: 4.8,
      rot: -1.0,
      sway: 2.4,
      dur: 3.8,
      delay: 0.55,
      renderFlower: () => (
        <g>
          <circle cx="0" cy="0" r="34" fill="rgba(229,57,53,0.22)" filter="blur(4px)" />
          {[0, 72, 144, 216, 288].map((deg, i) => (
            <path key={i} d="M0,0 C-17,-17 -20,-34 0,-36 C20,-34 17,-17 0,0 Z" fill="url(#redRoseOuter)" stroke="#3e0712" strokeWidth="0.5" transform={`rotate(${deg})`} />
          ))}
          {[36, 108, 180, 252, 324].map((deg, i) => (
            <path key={i} d="M0,0 C-13,-13 -15,-26 0,-28 C15,-26 13,-13 0,0 Z" fill="url(#redRoseMid)" stroke="#5b0a1a" strokeWidth="0.5" transform={`rotate(${deg})`} />
          ))}
          {[18, 90, 162, 234, 306].map((deg, i) => (
            <path key={i} d="M0,0 C-8,-8 -9,-17 0,-19 C9,-17 8,-8 0,0 Z" fill="#ff1744" transform={`rotate(${deg})`} />
          ))}
          <circle cx="0" cy="0" r="7.5" fill="#4a0410" stroke="#ff5252" strokeWidth="0.8" />
          <circle cx="-1" cy="-1" r="3" fill="#ff7997" opacity="0.9" />
        </g>
      ),
    },
    // 4. Bunga Matahari (Pusat Kiri - Paling Tinggi & Megah)
    {
      id: 'sunflower',
      name: 'Bunga Matahari',
      emoji: '🌻',
      meaning: 'Senyum ceriamu yang selalu menjadi mentari penerang dalam hidupku.',
      endX: -20,
      endY: -385,
      stemPath: 'M0,0 C-8,-115 -14,-255 -20,-385',
      leaves: [{ x: -9, y: -145, r: -30 }, { x: -16, y: -275, r: 35 }],
      strokeWidth: 5.2,
      rot: 1.2,
      sway: 2.0,
      dur: 3.5,
      delay: 0.2,
      renderFlower: () => (
        <g>
          <circle cx="0" cy="0" r="42" fill="rgba(255,193,7,0.22)" filter="blur(5px)" />
          {Array.from({ length: 16 }).map((_, i) => (
            <path key={i} d="M0,-11 C-5,-22 -6,-34 0,-39 C6,-34 5,-22 0,-11 Z" fill="url(#sunflowerPetal)" stroke="#e65100" strokeWidth="0.4" transform={`rotate(${i * 22.5})`} />
          ))}
          {Array.from({ length: 16 }).map((_, i) => (
            <path key={`in-${i}`} d="M0,-9 C-4,-18 -4,-28 0,-32 C4,-28 4,-18 0,-9 Z" fill="#ffb300" transform={`rotate(${i * 22.5 + 11.25})`} opacity="0.92" />
          ))}
          <circle cx="0" cy="0" r="15" fill="url(#sunflowerCenter)" stroke="#ffb300" strokeWidth="1" />
          <circle cx="0" cy="0" r="11" fill="none" stroke="#6d4c41" strokeWidth="1" strokeDasharray="2,2" />
          <circle cx="0" cy="0" r="6.5" fill="#2d1500" />
          <circle cx="0" cy="0" r="2.8" fill="#ffca28" opacity="0.85" />
        </g>
      ),
    },
    // 5. Bunga Teratai / Lotus Pink (Pusat Kanan - Tinggi & Indah)
    {
      id: 'lotus',
      name: 'Bunga Teratai',
      emoji: '🪷',
      meaning: 'Keanggunan dan keteduhan hatimu yang selalu membuatku merasa damai.',
      endX: 20,
      endY: -385,
      stemPath: 'M0,0 C8,-115 14,-255 20,-385',
      leaves: [{ x: 9, y: -145, r: 30 }, { x: 16, y: -275, r: -35 }],
      strokeWidth: 5.2,
      rot: -1.2,
      sway: 2.0,
      dur: 3.6,
      delay: 0.3,
      renderFlower: () => (
        <g>
          <circle cx="0" cy="0" r="38" fill="rgba(255,64,129,0.22)" filter="blur(4px)" />
          {Array.from({ length: 10 }).map((_, i) => (
            <path key={i} d="M0,0 C-9,-13 -12,-26 0,-32 C12,-26 9,-13 0,0 Z" fill="url(#lotusPetal)" stroke="#880e4f" strokeWidth="0.5" transform={`rotate(${i * 36})`} />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <path key={`in-${i}`} d="M0,0 C-6,-10 -8,-20 0,-24 C8,-20 6,-10 0,0 Z" fill="#ff80ab" transform={`rotate(${i * 36 + 18})`} opacity="0.9" />
          ))}
          <circle cx="0" cy="0" r="8.5" fill="#fbc02d" stroke="#e65100" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="4.5" fill="#fff59d" />
        </g>
      ),
    },
    // 6. Mawar Pink Pastel (Kanan Dalam)
    {
      id: 'pinkRose',
      name: 'Bunga Mawar Pink',
      emoji: '🌸',
      meaning: 'Kelembutan dan kasih sayangmu yang selalu menghangatkan hatiku.',
      endX: 65,
      endY: -360,
      stemPath: 'M0,0 C20,-100 48,-235 65,-360',
      leaves: [{ x: 28, y: -125, r: 35 }, { x: 50, y: -250, r: 25 }],
      strokeWidth: 4.8,
      rot: 1.0,
      sway: 2.4,
      dur: 3.9,
      delay: 0.6,
      renderFlower: () => (
        <g>
          <circle cx="0" cy="0" r="34" fill="rgba(244,143,177,0.22)" filter="blur(4px)" />
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <path key={i} d="M0,0 C-15,-15 -17,-30 0,-32 C17,-30 15,-15 0,0 Z" fill="url(#pinkRoseOuter)" stroke="#880e4f" strokeWidth="0.4" transform={`rotate(${deg})`} />
          ))}
          {[30, 90, 150, 210, 270, 330].map((deg, i) => (
            <path key={i} d="M0,0 C-11,-11 -13,-22 0,-24 C13,-22 11,-11 0,0 Z" fill="url(#pinkRoseInner)" stroke="#ad1457" strokeWidth="0.4" transform={`rotate(${deg})`} />
          ))}
          <circle cx="0" cy="0" r="7" fill="#ad1457" stroke="#ff80ab" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="3.5" fill="#ffebee" />
        </g>
      ),
    },
    // 7. Bunga Daisy / Aster (Kanan Tengah)
    {
      id: 'daisy',
      name: 'Bunga Daisy',
      emoji: '🌼',
      meaning: 'Keceriaan dan tawa bahagiamu yang membuat setiap hari begitu indah.',
      endX: 115,
      endY: -315,
      stemPath: 'M0,0 C30,-90 80,-195 115,-315',
      leaves: [{ x: 45, y: -110, r: 45 }, { x: 85, y: -225, r: -25 }],
      strokeWidth: 4.2,
      rot: -1.0,
      sway: 2.8,
      dur: 4.3,
      delay: 0.45,
      renderFlower: () => (
        <g>
          <circle cx="0" cy="0" r="30" fill="rgba(255,255,255,0.22)" filter="blur(3px)" />
          {Array.from({ length: 14 }).map((_, i) => (
            <path key={i} d="M0,-7 C-4,-17 -4,-27 0,-30 C4,-27 4,-17 0,-7 Z" fill="#ffffff" stroke="rgba(224,224,224,0.7)" strokeWidth="0.4" transform={`rotate(${i * (360 / 14)})`} />
          ))}
          <circle cx="0" cy="0" r="10.5" fill="url(#daisyCenter)" stroke="#f57f17" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="6.5" fill="#ffb300" stroke="#ff6f00" strokeWidth="0.5" strokeDasharray="1.5,1.5" />
          <circle cx="-1" cy="-1" r="2.5" fill="#fff9c4" opacity="0.9" />
        </g>
      ),
    },
    // 8. Bunga Marigold Emas (Kanan Luar)
    {
      id: 'marigold',
      name: 'Bunga Marigold Emas',
      emoji: '🏵️',
      meaning: 'Harapan manis dan masa depan penuh keberkahan serta kebahagiaan kita.',
      endX: 160,
      endY: -255,
      stemPath: 'M0,0 C40,-70 115,-155 160,-255',
      leaves: [{ x: 60, y: -95, r: 50 }, { x: 120, y: -180, r: 35 }],
      strokeWidth: 4,
      rot: 1.5,
      sway: 3.4,
      dur: 4.7,
      delay: 0.15,
      renderFlower: () => (
        <g>
          <circle cx="0" cy="0" r="32" fill="rgba(255,160,0,0.22)" filter="blur(3px)" />
          {Array.from({ length: 12 }).map((_, i) => (
            <path key={i} d="M0,0 C-9,-11 -11,-22 0,-26 C11,-22 9,-11 0,0 Z" fill="url(#marigoldPetal1)" stroke="#bf360c" strokeWidth="0.4" transform={`rotate(${i * 30})`} />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <path key={`t2-${i}`} d="M0,0 C-7,-8 -8,-16 0,-19 C8,-16 7,-8 0,0 Z" fill="url(#marigoldPetal2)" transform={`rotate(${i * 30 + 15})`} />
          ))}
          <circle cx="0" cy="0" r="7.5" fill="#e65100" stroke="#ffd54f" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="3" fill="#ffeb3b" />
        </g>
      ),
    },
  ];

  const handleFlowerTouch = (stem) => {
    setActiveFlower(stem);
    setSparkleKey(prev => prev + 1);
  };

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: '100%', paddingBottom: '60px', overflow: 'hidden', userSelect: 'none' }}
    >
      {/* Floating Petals in Background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20, overflow: 'hidden' }}>
        {petals.map(p => (
          <motion.div
            key={p.id}
            initial={{ y: '-8%', x: p.left, opacity: 0, rotate: 0 }}
            animate={{ y: '108%', x: `calc(${p.left} + 22px)`, opacity: [0, 0.8, 0.8, 0], rotate: 350 }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', width: p.size, height: p.size * 1.3 }}
          >
            <svg viewBox="0 0 40 52" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}>
              <path d="M20 3 C30 3, 38 13, 38 26 C38 38, 24 48, 20 49 C16 48, 2 38, 2 26 C2 13, 10 3, 20 3 Z" fill={p.id % 2 === 0 ? '#b0304f' : '#fce8f0'} stroke="#620f28" strokeWidth="0.5" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* 8-STEM BOUQUET WITH GROWING STEMS, BLOOMING SEQUENCE & WIND SWAY */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <svg
          viewBox="0 0 500 500"
          style={{
            width: '100%',
            maxWidth: '440px',
            height: 'auto',
            filter: 'drop-shadow(0 18px 40px rgba(0,0,0,0.65))',
            overflow: 'visible',
          }}
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="stemGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#0d280e" />
              <stop offset="45%" stopColor="#2e7d32" />
              <stop offset="100%" stopColor="#558b2f" />
            </linearGradient>
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#66bb6a" />
              <stop offset="60%" stopColor="#2e7d32" />
              <stop offset="100%" stopColor="#1b5e20" />
            </linearGradient>

            {/* Sunflower */}
            <linearGradient id="sunflowerPetal" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#f57f17" />
              <stop offset="50%" stopColor="#fbc02d" />
              <stop offset="100%" stopColor="#fff59d" />
            </linearGradient>
            <radialGradient id="sunflowerCenter" cx="45%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#4e342e" />
              <stop offset="60%" stopColor="#2e1a14" />
              <stop offset="100%" stopColor="#1a0a06" />
            </radialGradient>

            {/* Red Rose */}
            <radialGradient id="redRoseOuter" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#ff5252" />
              <stop offset="45%" stopColor="#c62828" />
              <stop offset="100%" stopColor="#3e0712" />
            </radialGradient>
            <radialGradient id="redRoseMid" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ff7997" />
              <stop offset="55%" stopColor="#d50000" />
              <stop offset="100%" stopColor="#5b0a1a" />
            </radialGradient>

            {/* Jasmine (Melati) */}
            <radialGradient id="jasminePetal" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="65%" stopColor="#fffde7" />
              <stop offset="100%" stopColor="#f1f8e9" />
            </radialGradient>

            {/* Pink Rose */}
            <radialGradient id="pinkRoseOuter" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#ff80ab" />
              <stop offset="55%" stopColor="#ec407a" />
              <stop offset="100%" stopColor="#880e4f" />
            </radialGradient>
            <radialGradient id="pinkRoseInner" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fce4ec" />
              <stop offset="60%" stopColor="#f06292" />
              <stop offset="100%" stopColor="#ad1457" />
            </radialGradient>

            {/* Orchid */}
            <radialGradient id="orchidSepal" cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#f3e5f5" />
              <stop offset="60%" stopColor="#ba68c8" />
              <stop offset="100%" stopColor="#4a148c" />
            </radialGradient>
            <radialGradient id="orchidPetal" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#e1bee7" />
              <stop offset="100%" stopColor="#7b1fa2" />
            </radialGradient>

            {/* Daisy */}
            <radialGradient id="daisyCenter" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#fffde7" />
              <stop offset="45%" stopColor="#fbc02d" />
              <stop offset="100%" stopColor="#e65100" />
            </radialGradient>

            {/* Lotus */}
            <linearGradient id="lotusPetal" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f48fb1" />
              <stop offset="100%" stopColor="#c2185b" />
            </linearGradient>

            {/* Marigold */}
            <radialGradient id="marigoldPetal1" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#fff59d" />
              <stop offset="50%" stopColor="#fbc02d" />
              <stop offset="100%" stopColor="#bf360c" />
            </radialGradient>
            <radialGradient id="marigoldPetal2" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffeb3b" />
              <stop offset="55%" stopColor="#ffa000" />
              <stop offset="100%" stopColor="#d84315" />
            </radialGradient>

            {/* Gold Ribbon */}
            <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff9c4" />
              <stop offset="35%" stopColor="#ffd54f" />
              <stop offset="70%" stopColor="#ff8f00" />
              <stop offset="100%" stopColor="#795548" />
            </linearGradient>
            <linearGradient id="goldRibbonDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b26a00" />
              <stop offset="100%" stopColor="#4e342e" />
            </linearGradient>
          </defs>

          {/* Ambient Glow behind bouquet */}
          <circle cx="250" cy="220" r="190" fill="radial-gradient(circle, rgba(255,105,180,0.12) 0%, transparent 70%)" />

          {/* THE 8 SWAYING & GROWING STEMS WITH BLOOMING FLOWERS */}
          {stemConfigs.map((stem, i) => {
            const isSelected = activeFlower?.id === stem.id;
            return (
              <g key={stem.id} transform="translate(250, 455)">
                {/* Tangkai yang mengayun alami ditiup angin */}
                <motion.g
                  animate={isInView ? {
                    rotate: isSelected
                      ? [stem.rot - stem.sway * 2.5, stem.rot + stem.sway * 2.5, stem.rot]
                      : [stem.rot - stem.sway, stem.rot + stem.sway, stem.rot - stem.sway],
                  } : { rotate: stem.rot }}
                  transition={{
                    duration: isSelected ? 0.9 : stem.dur,
                    repeat: isSelected ? 1 : Infinity,
                    ease: 'easeInOut',
                    delay: isInView ? stem.delay : 0,
                  }}
                  onClick={() => handleFlowerTouch(stem)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Tangkai yang tumbuh perlahan ke atas (pathLength animation) */}
                  <motion.path
                    d={stem.stemPath}
                    stroke="url(#stemGrad)"
                    strokeWidth={isSelected ? stem.strokeWidth + 1.2 : stem.strokeWidth}
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={{
                      pathLength: { duration: 1.3, delay: stem.delay, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.3, delay: stem.delay },
                    }}
                  />

                  {/* Daun-daun yang ikut mekar di tangkai */}
                  {stem.leaves.map((lf, li) => (
                    <motion.g
                      key={li}
                      transform={`translate(${lf.x}, ${lf.y}) rotate(${lf.r})`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: stem.delay + 0.4 + li * 0.25,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                    >
                      <path
                        d="M0,0 C-7,-10 -9,-22 0,-26 C9,-22 7,-10 0,0 Z"
                        fill="url(#leafGrad)"
                        stroke="#0e3512"
                        strokeWidth="0.6"
                      />
                      <path d="M0,0 L0,-24" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
                    </motion.g>
                  ))}

                  {/* BUNGA DI PUCUK TANGKAI: MEKAR DARI KECIL HINGGA BESAR & BISA DISENTUH */}
                  <motion.g
                    transform={`translate(${stem.endX}, ${stem.endY})`}
                    initial={{ scale: 0, opacity: 0, rotate: -35 }}
                    animate={isInView ? {
                      scale: isSelected
                        ? [1.1, 1.35, 1.18]
                        : [0, 0.15, 1.25, 0.95, 1],
                      opacity: 1,
                      rotate: isSelected
                        ? [0, -18, 18, -8, 8, 0]
                        : [-35, -15, 14, -4, 0],
                    } : { scale: 0, opacity: 0 }}
                    transition={{
                      duration: isSelected ? 0.75 : 1.7,
                      delay: isSelected ? 0 : stem.delay + 0.85,
                      ease: [0.34, 1.56, 0.64, 1], // Kurva mekar elastis dramatis
                    }}
                    whileHover={{
                      scale: 1.25,
                      filter: 'drop-shadow(0 0 16px rgba(255,215,0,0.95))',
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.92 }}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Area sentuh ekstra lebar agar responsif di HP */}
                    <circle cx="0" cy="0" r="42" fill="transparent" />

                    {/* Partikel kilau saat bunga disentuh */}
                    {isSelected && (
                      <g key={`burst-${sparkleKey}`}>
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, sIdx) => {
                          const rad = (deg * Math.PI) / 180;
                          return (
                            <motion.circle
                              key={sIdx}
                              cx={0}
                              cy={0}
                              r={3}
                              fill="#ffd54f"
                              initial={{ cx: 0, cy: 0, opacity: 1, scale: 1 }}
                              animate={{
                                cx: Math.cos(rad) * 48,
                                cy: Math.sin(rad) * 48,
                                opacity: 0,
                                scale: 0.2,
                              }}
                              transition={{ duration: 0.85, ease: 'easeOut' }}
                            />
                          );
                        })}
                      </g>
                    )}

                    {/* Render visual kelopak bunga */}
                    {stem.renderFlower()}
                  </motion.g>
                </motion.g>
              </g>
            );
          })}

          {/* PITA EMAS ROYAL PENGISI DASAR BUKET (Tied at Base) */}
          <motion.g
            transform="translate(250, 455)"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Ribbon Tails */}
            <path d="M-6,8 C-16,28 -32,46 -42,52 C-30,46 -15,30 -2,12 Z" fill="url(#goldRibbon)" stroke="#795548" strokeWidth="0.5" />
            <path d="M6,8 C16,28 32,46 42,52 C30,46 15,30 2,12 Z" fill="url(#goldRibbon)" stroke="#795548" strokeWidth="0.5" />

            {/* Ribbon Loops */}
            <path d="M0,0 C-42,-20 -58,0 -32,15 C-14,23 -4,10 0,0 Z" fill="url(#goldRibbon)" stroke="#b26a00" strokeWidth="0.7" />
            <path d="M0,0 C42,-20 58,0 32,15 C14,23 4,10 0,0 Z" fill="url(#goldRibbon)" stroke="#b26a00" strokeWidth="0.7" />

            {/* Loop inner folds */}
            <path d="M-5,1 C-26,-10 -36,2 -20,10 Z" fill="url(#goldRibbonDark)" opacity="0.65" />
            <path d="M5,1 C26,-10 36,2 20,10 Z" fill="url(#goldRibbonDark)" opacity="0.65" />

            {/* Center Knot & Sparkling Jewel */}
            <circle cx="0" cy="0" r="10" fill="url(#goldRibbon)" stroke="#795548" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="5" fill="#d50000" stroke="#ffd700" strokeWidth="0.8" />
            <circle cx="-1.5" cy="-1.5" r="1.8" fill="#ffffff" opacity="0.85" />
          </motion.g>
        </svg>
      </motion.div>

      {/* KARTU PESAN RAHASIA SAAT BUNGA DISENTUH */}
      <div style={{ marginTop: '14px', padding: '0 20px', minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          {activeFlower ? (
            <motion.div
              key={activeFlower.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{
                width: '100%',
                maxWidth: '380px',
                padding: '14px 20px',
                background: 'linear-gradient(135deg, rgba(122,16,32,0.92), rgba(46,9,24,0.95))',
                border: '1px solid rgba(223,193,136,0.6)',
                borderRadius: '16px',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 14px 35px rgba(0,0,0,0.65), 0 0 25px rgba(223,193,136,0.25)',
                textAlign: 'center',
              }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                <span style={{ fontSize: '20px' }}>{activeFlower.emoji}</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '15.5px', fontWeight: 600, color: '#fdebf0', letterSpacing: '0.02em' }}>
                  {activeFlower.name}
                </span>
              </div>
              <p style={{ fontFamily: "'Caveat', cursive", fontSize: '18px', color: '#ffd54f', margin: 0, lineHeight: 1.35 }}>
                "{activeFlower.meaning}"
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ textAlign: 'center' }}
            >
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11.5px', color: 'rgba(253,235,240,0.6)', letterSpacing: '0.08em', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span>✨</span> Sentuh setiap bunganya untuk melihat pesan cinta <span>✨</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Birthday Closing Message */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.95, delay: 0.4 }}
        style={{ textAlign: 'center', marginTop: '10px', padding: '0 20px' }}
      >
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '15.5px', fontStyle: 'italic', color: '#fdebf0', letterSpacing: '0.015em', lineHeight: 1.55, marginBottom: '10px' }}>
          "Rimbun cintaku akan selalu mekar indah untukmu di setiap detik waktu."
        </p>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', color: 'rgba(223,193,136,0.85)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '28px' }}>
          Happy 21st Birthday — Tyas Diva Syaqilla
        </p>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '11px 26px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg,#7a1020,#45090f)',
              border: '1px solid rgba(223,193,136,0.35)',
              color: '#fdebf0',
              fontSize: '11.5px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            }}
          >
            <RotateCcw style={{ width: 12, height: 12 }} />
            Ulangi dari Awal
          </button>
        )}
      </motion.div>
    </div>
  );
};

// ── Scroll-entrance wrapper ───────────────────────────────────────────
const RevealOnScroll = ({ children, delay = 0, y = 40 }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.08 }}
    transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export default function RomanticLetterStage({ isPlayingAudio = false, onTogglePlayAudio, onBack }) {
  // Gate: sections below the letter are hidden until letter finishes
  const [letterDone, setLetterDone] = useState(false);

  return (
    <div style={{ position:'relative', minHeight:'100vh', width:'100%', color:'white', overflowY:'auto', overflowX:'hidden', background:'radial-gradient(ellipse 140% 70% at 50% 15%, #2e0918 0%, #1c050e 45%, #0c0106 100%)' }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
      <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:'480px', margin:'0 auto', padding:'40px 0 40px', display:'flex', flexDirection:'column', gap:'52px' }}>
        {/* LETTER — always shown */}
        <CustomRoyalLetter onComplete={() => setLetterDone(true)} />

        {/* SECTIONS BELOW — only visible after letter finishes */}
        <AnimatePresence>
          {letterDone && (
            <motion.div
              key="post-letter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '52px' }}
            >
              <RevealOnScroll delay={0.1}>
                <IOSMediaPlayerAndPhotoboxSection isPlayingAudio={isPlayingAudio} onTogglePlayAudio={onTogglePlayAudio} />
              </RevealOnScroll>
              <RevealOnScroll delay={0.05} y={30}>
                <PolaroidWall />
              </RevealOnScroll>
              <RevealOnScroll delay={0.05} y={30}>
                <ClosingBouquet onBack={onBack} />
              </RevealOnScroll>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


