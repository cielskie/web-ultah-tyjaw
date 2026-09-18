import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from 'lucide-react';
import birthdayData from '../config/birthdayData';

// ── 1. SVG REALISTIC RED ROSE COMPONENT ──────────────────────────────────────
export const RealisticRedRose = ({ className = '', size = 110 }) => (
  <svg
    viewBox="0 0 160 160"
    width={size}
    height={size}
    className={`filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] ${className}`}
  >
    <defs>
      <radialGradient id="roseDark" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#4a000d" />
        <stop offset="60%" stopColor="#7a0015" />
        <stop offset="100%" stopColor="#b30024" />
      </radialGradient>
      <radialGradient id="rosePetal" cx="40%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ff2b56" />
        <stop offset="45%" stopColor="#d9002f" />
        <stop offset="85%" stopColor="#99001e" />
        <stop offset="100%" stopColor="#54000e" />
      </radialGradient>
      <radialGradient id="roseHighlight" cx="30%" cy="20%" r="60%">
        <stop offset="0%" stopColor="#ff6b8b" />
        <stop offset="50%" stopColor="#e60033" />
        <stop offset="100%" stopColor="#800018" />
      </radialGradient>
      <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2e7d32" />
        <stop offset="40%" stopColor="#1b5e20" />
        <stop offset="100%" stopColor="#0a320c" />
      </linearGradient>
      <linearGradient id="leafHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#66bb6a" />
        <stop offset="100%" stopColor="#1b5e20" />
      </linearGradient>
    </defs>

    {/* Green Leaves Background */}
    <g>
      <path
        d="M60,40 C40,25 20,40 15,65 C35,68 50,55 60,40 Z"
        fill="url(#leafGrad)"
        stroke="#0f3d12"
        strokeWidth="1"
      />
      <path d="M22,60 Q35,50 55,42" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none" />
      <path
        d="M100,120 C125,135 145,120 150,95 C130,92 115,105 100,120 Z"
        fill="url(#leafGrad)"
        stroke="#0f3d12"
        strokeWidth="1"
      />
      <path
        d="M110,45 C135,30 150,50 148,72 C130,70 120,55 110,45 Z"
        fill="url(#leafHighlight)"
        stroke="#0f3d12"
        strokeWidth="1"
      />
    </g>

    {/* Rose Petals Layering */}
    <g>
      <path
        d="M80,30 C50,25 35,55 45,85 C55,110 90,125 115,115 C135,105 140,75 125,50 C115,35 95,30 80,30 Z"
        fill="url(#roseDark)"
      />
      <path
        d="M45,65 C30,75 35,105 60,115 C85,125 110,125 125,105 C105,115 70,115 50,95 C40,85 40,75 45,65 Z"
        fill="url(#rosePetal)"
      />
      <path
        d="M125,60 C140,72 138,98 120,112 C105,125 80,128 65,122 C90,125 115,115 125,95 C132,80 130,70 125,60 Z"
        fill="url(#rosePetal)"
      />
      <path
        d="M55,50 C45,65 50,90 70,102 C90,112 112,102 120,85 C125,70 115,55 100,48 C85,42 65,45 55,50 Z"
        fill="url(#roseHighlight)"
      />
      <path
        d="M60,60 C55,75 62,95 80,100 C98,105 112,92 115,80 C110,90 92,95 75,90 C62,85 58,72 60,60 Z"
        fill="url(#rosePetal)"
      />
      <path
        d="M105,52 C115,65 112,85 98,95 C82,102 68,98 62,92 C75,98 95,95 105,82 C110,72 110,60 105,52 Z"
        fill="url(#rosePetal)"
      />
      <path
        d="M68,58 C62,70 68,85 80,88 C92,90 102,82 105,72 C105,62 98,52 88,50 C78,48 72,52 68,58 Z"
        fill="url(#roseHighlight)"
      />
      <path
        d="M72,62 C68,72 74,82 82,84 C90,85 96,78 98,72 C95,78 88,80 80,78 C74,75 72,68 72,62 Z"
        fill="url(#roseDark)"
      />
      <path
        d="M76,64 C74,70 78,76 84,77 C89,78 93,74 94,70 C92,74 86,75 81,74 C77,72 75,68 76,64 Z"
        fill="url(#roseHighlight)"
      />
      <circle cx="84" cy="69" r="4" fill="#38000a" />
      <circle cx="83" cy="68" r="2" fill="#ff4d8d" opacity="0.6" />
    </g>
  </svg>
);

// ── 2. SVG LEFT ROSE BOUQUET ───────────────────────────────────────────────
export const LeftRoseBouquet = () => (
  <div className="relative w-36 sm:w-44 h-52 sm:h-64 pointer-events-none select-none">
    {/* Rose 1 (Main Big Hero Rose) */}
    <div className="absolute top-6 left-2 sm:left-4 z-20">
      <RealisticRedRose size={95} className="sm:w-[115px] sm:h-[115px]" />
    </div>

    {/* Rose 2 (Secondary Rose Top) */}
    <div className="absolute -top-2 left-10 sm:left-12 z-10 -rotate-12">
      <RealisticRedRose size={70} className="sm:w-[82px] sm:h-[82px]" />
    </div>

    {/* Rose 3 (Third Rose Bottom) */}
    <div className="absolute bottom-4 left-0 z-20 rotate-15">
      <RealisticRedRose size={78} className="sm:w-[90px] sm:h-[90px]" />
    </div>

    {/* Stems & Leaves Branch */}
    <svg viewBox="0 0 160 220" className="absolute inset-0 w-full h-full z-0">
      <path
        d="M75,90 Q65,140 70,210"
        stroke="#1a4314"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M68,140 Q40,165 42,195"
        stroke="#1a4314"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="42" cy="195" rx="6" ry="10" fill="#800018" transform="rotate(-20 42 195)" />
      <ellipse cx="43" cy="194" rx="3.5" ry="7" fill="#d9002f" transform="rotate(-20 42 195)" />
      <polygon points="73,115 66,118 73,121" fill="#14330f" />
      <polygon points="70,165 63,170 70,173" fill="#14330f" />
    </svg>
  </div>
);

// ── 3. RETRO CLASSIC 35mm RANGEFINDER CAMERA ────────────────────────────────
export const VintageRetroCamera = ({ className = '' }) => (
  <div
    className={`relative w-32 sm:w-40 h-20 sm:h-26 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] ${className}`}
  >
    <svg viewBox="0 0 220 140" className="w-full h-full">
      <defs>
        <linearGradient id="chromeMetal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f5f5f5" />
          <stop offset="25%" stopColor="#dcdcdc" />
          <stop offset="50%" stopColor="#eeeeee" />
          <stop offset="80%" stopColor="#b0b0b0" />
          <stop offset="100%" stopColor="#888888" />
        </linearGradient>
        <linearGradient id="leatherBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#242424" />
          <stop offset="50%" stopColor="#171717" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
        <radialGradient id="lensGlass" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
          <stop offset="35%" stopColor="#1e3a8a" />
          <stop offset="70%" stopColor="#090d16" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>
        <linearGradient id="lensSheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="70%" stopColor="transparent" />
        </linearGradient>
      </defs>

      <rect x="10" y="24" width="200" height="106" rx="14" fill="#050505" />
      <rect x="12" y="118" width="196" height="12" rx="4" fill="url(#chromeMetal)" />
      <rect x="12" y="44" width="196" height="76" rx="2" fill="url(#leatherBody)" />

      {Array.from({ length: 18 }).map((_, i) => (
        <line
          key={`vg-${i}`}
          x1={20 + i * 10}
          y1="46"
          x2={20 + i * 10}
          y2="118"
          stroke="rgba(0,0,0,0.45)"
          strokeWidth="1"
        />
      ))}

      <path
        d="M12,44 L12,24 Q12,18 18,18 L90,18 L98,24 L196,24 Q208,24 208,30 L208,44 Z"
        fill="url(#chromeMetal)"
        stroke="#999"
        strokeWidth="0.8"
      />

      <rect x="22" y="11" width="22" height="7" rx="2" fill="url(#chromeMetal)" stroke="#777" strokeWidth="0.8" />
      <circle cx="33" cy="11" r="5" fill="#bbb" />
      <rect x="98" y="13" width="24" height="6" rx="1.5" fill="#444" stroke="#888" strokeWidth="0.8" />
      <rect x="146" y="10" width="20" height="8" rx="2" fill="url(#chromeMetal)" stroke="#777" strokeWidth="0.8" />
      <rect x="176" y="8" width="14" height="10" rx="2" fill="url(#chromeMetal)" stroke="#666" strokeWidth="0.8" />

      <rect x="160" y="28" width="22" height="13" rx="2.5" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
      <rect x="162" y="30" width="18" height="9" rx="1.5" fill="#38bdf8" opacity="0.4" />
      <rect x="135" y="31" width="10" height="9" rx="1.5" fill="#334155" stroke="#64748b" strokeWidth="0.8" />

      <circle cx="38" cy="34" r="3.5" fill="#dc2626" />

      {/* Lens Assembly */}
      <g transform="translate(110, 82)">
        <circle cx="0" cy="0" r="46" fill="#1e1e1e" stroke="#888888" strokeWidth="2" />
        <circle cx="0" cy="0" r="42" fill="url(#chromeMetal)" stroke="#555" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="37" fill="#171717" stroke="#333" strokeWidth="1" />
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 15 * Math.PI) / 180;
          const x1 = Math.cos(angle) * 38;
          const y1 = Math.sin(angle) * 38;
          const x2 = Math.cos(angle) * 42;
          const y2 = Math.sin(angle) * 42;
          return <line key={`r-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#777" strokeWidth="1.2" />;
        })}
        <circle cx="0" cy="0" r="34" fill="#0f0f0f" stroke="#555" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="28" fill="#1a1a1a" />
        <circle cx="0" cy="0" r="23" fill="url(#lensGlass)" />
        <ellipse cx="-6" cy="-6" rx="14" ry="9" fill="url(#lensSheen)" transform="rotate(-30 -6 -6)" />
        <circle cx="-5" cy="-5" r="3.5" fill="#ffffff" opacity="0.75" />
        <circle cx="7" cy="8" r="1.5" fill="#38bdf8" opacity="0.6" />
      </g>
    </svg>
  </div>
);

// ── 4. ORNATE ANTIQUE GOLD PICTURE FRAME ───────────────────────────────────
export const GoldPhotoFrame = ({ photoUrl = '' }) => (
  <div
    className="relative w-52 sm:w-60 md:w-64 h-60 sm:h-68 md:h-74 select-none filter drop-shadow-[0_16px_36px_rgba(0,0,0,0.65)]"
    style={{ transform: 'rotate(4.5deg)' }}
  >
    <div
      className="relative w-full h-full p-3.5 sm:p-4 rounded-sm flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, 
          #d4af37 0%, 
          #fff6c7 15%, 
          #aa7c11 32%, 
          #ffd700 50%, 
          #7d5308 72%, 
          #ffe58f 88%, 
          #996515 100%)`,
        boxShadow: `
          0 10px 30px rgba(0,0,0,0.6),
          inset 0 2px 4px rgba(255,255,255,0.8),
          inset 0 -3px 6px rgba(90,55,10,0.8),
          inset 0 0 0 3px #b8860b
        `,
      }}
    >
      <div
        className="absolute inset-1.5 border-2 border-[#fff3a8] pointer-events-none rounded-sm"
        style={{
          boxShadow: 'inset 0 0 4px rgba(100,60,10,0.6), 0 0 4px rgba(100,60,10,0.5)',
        }}
      />
      <div className="absolute inset-2.5 border border-[#7d5308]/60 pointer-events-none" />

      {/* Baroque Corner Accents */}
      <svg className="absolute top-1 left-1 w-5 h-5 text-[#fff2a3] pointer-events-none" viewBox="0 0 30 30">
        <path d="M2,2 L18,2 C12,8 8,12 2,18 Z" fill="#d4af37" stroke="#fff9d6" strokeWidth="0.8" />
      </svg>
      <svg className="absolute top-1 right-1 w-5 h-5 text-[#fff2a3] pointer-events-none" viewBox="0 0 30 30">
        <path d="M28,2 L12,2 C18,8 22,12 28,18 Z" fill="#d4af37" stroke="#fff9d6" strokeWidth="0.8" />
      </svg>
      <svg className="absolute bottom-1 left-1 w-5 h-5 text-[#fff2a3] pointer-events-none" viewBox="0 0 30 30">
        <path d="M2,28 L18,28 C12,22 8,18 2,12 Z" fill="#d4af37" stroke="#fff9d6" strokeWidth="0.8" />
      </svg>
      <svg className="absolute bottom-1 right-1 w-5 h-5 text-[#fff2a3] pointer-events-none" viewBox="0 0 30 30">
        <path d="M28,28 L12,28 C18,22 22,18 28,12 Z" fill="#d4af37" stroke="#fff9d6" strokeWidth="0.8" />
      </svg>

      {/* Recipient Photo Inside */}
      <div
        className="relative w-full h-full bg-[#1c1917] overflow-hidden rounded-xs border-2 border-[#5c3e06]"
        style={{
          boxShadow: 'inset 0 0 16px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.4)',
        }}
      >
        <img
          src={
            photoUrl ||
            birthdayData.gallery[0]?.url ||
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
          }
          alt="Foto Kenangan"
          className="w-full h-full object-cover object-center pointer-events-none select-none"
          draggable={false}
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80';
          }}
        />
        {/* Glass reflection sheen */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(125deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 35%, transparent 50%)',
          }}
        />
      </div>
    </div>

    {/* Single Red Rose on Top-Right Corner */}
    <div className="absolute -top-6 -right-6 sm:-top-7 sm:-right-7 z-30 pointer-events-none rotate-12">
      <RealisticRedRose size={78} className="sm:w-[88px] sm:h-[88px]" />
    </div>
  </div>
);

// ── 5. VINYL RECORD MUSIC PLAYER ───────────────────────────────────────────
export const VinylMusicDisc = ({ isPlaying = false, onTogglePlay }) => {
  return (
    <div className="relative flex flex-col items-center select-none pointer-events-auto">
      <div
        onClick={onTogglePlay}
        title={isPlaying ? 'Pause Musik' : 'Play Musik'}
        className="relative w-32 sm:w-38 h-32 sm:h-38 rounded-full bg-[#0a0a0a] border-[3px] border-[#222] shadow-[0_12px_30px_rgba(0,0,0,0.85)] flex items-center justify-center cursor-pointer group transition-transform active:scale-95"
      >
        <div
          className={`absolute inset-1 rounded-full overflow-hidden flex items-center justify-center ${
            isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
          }`}
          style={{
            background: `radial-gradient(circle, 
              #1c1c1c 0%, 
              #080808 30%, 
              #181818 50%, 
              #0d0d0d 70%, 
              #1c1c1c 90%, 
              #080808 100%)`,
          }}
        >
          <div className="absolute inset-2 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute inset-4 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute inset-6 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute inset-8 rounded-full border border-white/5 pointer-events-none" />

          {/* Light Sheen Specular Reflections */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none opacity-30"
            style={{
              background: `conic-gradient(
                from 45deg,
                transparent 0deg,
                rgba(255,255,255,0.18) 40deg,
                transparent 80deg,
                transparent 180deg,
                rgba(255,255,255,0.18) 220deg,
                transparent 260deg
              )`,
            }}
          />

          {/* Center Red Record Label */}
          <div className="relative w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-gradient-to-br from-[#ff2247] via-[#dc2626] to-[#991b1b] border border-[#ff7b92] shadow-inner flex flex-col items-center justify-center z-10">
            <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-white flex items-center justify-center shadow text-[#dc2626] group-hover:scale-110 transition-transform">
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-[#dc2626] stroke-none" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-[#dc2626] stroke-none ml-0.5" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Playback Controls & Caption under Vinyl */}
      <div className="flex items-center gap-2.5 mt-2 text-white/80 text-xs">
        <button
          type="button"
          onClick={onTogglePlay}
          className="hover:text-pink-300 transition-colors p-1"
          title="Shuffle"
        >
          <Shuffle className="w-3 h-3" />
        </button>
        <button
          type="button"
          onClick={onTogglePlay}
          className="hover:text-pink-300 transition-colors p-1"
          title="Previous"
        >
          <SkipBack className="w-3.5 h-3.5 fill-current" />
        </button>
        <span
          onClick={onTogglePlay}
          className="font-medium tracking-wide text-xs text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] cursor-pointer hover:text-pink-300 transition-colors"
        >
          {isPlaying ? 'Pause Musik' : 'Play Musik'}
        </span>
        <button
          type="button"
          onClick={onTogglePlay}
          className="hover:text-pink-300 transition-colors p-1"
          title="Next"
        >
          <SkipForward className="w-3.5 h-3.5 fill-current" />
        </button>
        <button
          type="button"
          onClick={onTogglePlay}
          className="hover:text-pink-300 transition-colors p-1"
          title="Repeat"
        >
          <Repeat className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

// ── 6. REALISTIC CRUMPLED PAPER LETTER (KERTAS LECEK ASLI) ─────────────────
export const CrumpledPaperLetter = ({
  typedText = '',
  isTyping = false,
  containerRef,
}) => {
  return (
    <div
      className="relative w-[300px] sm:w-[380px] md:w-[420px] select-text box-border"
      style={{ transform: 'rotate(-2.2deg)' }}
    >
      <div
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-7"
        style={{
          background: `
            linear-gradient(132deg, transparent 40%, rgba(0,0,0,0.04) 42%, rgba(255,255,255,0.7) 43%, transparent 45%),
            linear-gradient(40deg, transparent 58%, rgba(0,0,0,0.05) 59%, rgba(255,255,255,0.8) 60%, transparent 62%),
            linear-gradient(172deg, transparent 47%, rgba(0,0,0,0.04) 49%, rgba(255,255,255,0.6) 50%, transparent 52%),
            linear-gradient(108deg, transparent 28%, rgba(0,0,0,0.03) 30%, rgba(255,255,255,0.5) 31%, transparent 33%),
            radial-gradient(ellipse at 40% 30%, #ffffff 0%, #faf8f5 60%, #f4f0e6 100%)
          `,
          boxShadow: `
            0 20px 40px -8px rgba(0, 0, 0, 0.65),
            0 8px 16px -4px rgba(0, 0, 0, 0.35),
            inset 0 0 40px rgba(195, 175, 145, 0.22),
            inset 0 1px 1px rgba(255, 255, 255, 0.8),
            inset 0 -1px 2px rgba(80, 50, 20, 0.1)
          `,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-40 rounded-[inherit]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(160,130,90,0.04) 18px, rgba(160,130,90,0.04) 19px),
              repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(160,130,90,0.03) 35px, rgba(160,130,90,0.03) 36px)
            `,
          }}
        />

        <div
          ref={containerRef}
          className="relative z-10 overflow-y-auto max-h-[220px] sm:max-h-[250px] pr-1 scrollbar-thin scrollbar-thumb-stone-400/40"
          style={{
            fontFamily: 'Georgia, "Times New Roman", Cambria, serif',
            color: '#1f1b18',
            lineHeight: 1.68,
            fontSize: 'clamp(13px, 1.9vw, 15px)',
            letterSpacing: '0.015em',
            textShadow: '0 0.5px 0.5px rgba(255,255,255,0.4)',
          }}
        >
          <span className="font-serif text-lg sm:text-xl font-bold mr-0.5 text-stone-800">“</span>
          {typedText}
          <span className="font-serif text-lg sm:text-xl font-bold ml-0.5 text-stone-800">”</span>

          {isTyping && (
            <span
              className="inline-block w-[2.5px] h-[1em] ml-1 bg-stone-800 animate-pulse align-middle rounded-xs"
              style={{ boxShadow: '0 0 6px rgba(40,30,20,0.6)' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// ── 7. MAIN COMPLETE ROMANTIC LETTER COLLAGE STAGE ───────────────────────────
export default function RomanticLetterCollage({
  typedText = '',
  isTyping = false,
  isPlayingAudio = false,
  onToggleAudio,
  recipientName = '',
  photoUrl = '',
  containerRef,
}) {
  const displayName = recipientName || birthdayData.recipient.fullName || 'Freya Anindya';

  return (
    <div className="relative w-full max-w-4xl mx-auto px-3 sm:px-6 my-auto flex flex-col items-center justify-center z-40 select-none">
      {/* ── TOP: Recipient Name in Calligraphy Font ── */}
      <div className="w-full flex items-center justify-start mb-3 sm:mb-4 px-4 sm:px-6 z-40">
        <motion.div
          initial={{ y: -100, x: -60, opacity: 0 }}
          animate={{ y: 0, x: 0, opacity: 1 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="text-3xl sm:text-5xl text-white font-normal tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {displayName}
          </h2>
        </motion.div>
      </div>

      {/* ── COHESIVE BALANCED MOODBOARD COLLAGE ── */}
      <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10 pb-8 sm:pb-12">
        {/* ── LEFT: Rose Bouquet + Crumpled Paper Letter + Vinyl Disc ── */}
        <div className="relative flex flex-col items-center">
          {/* Rose Bouquet hugging Left edge of Letter (Slides in from LEFT) */}
          {/* Rose Bouquet — shifted far left so it does NOT overlap letter text */}
          <motion.div
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -left-20 sm:-left-24 -top-4 sm:-top-6 z-10 pointer-events-none"
          >
            <LeftRoseBouquet />
          </motion.div>

          {/* Crumpled Paper Letter (Slides in from TOP) */}
          {/* Crumpled Paper Letter (Slides in from TOP) — extra left padding so text starts after rose area */}
          <motion.div
            initial={{ y: -280, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 pl-10 sm:pl-12"
          >
            <CrumpledPaperLetter
              typedText={typedText}
              isTyping={isTyping}
              containerRef={containerRef}
            />
          </motion.div>

          {/* Vinyl Record Music Disc under Letter (Slides in from BOTTOM) */}
          <motion.div
            initial={{ y: 240, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="relative -mt-8 sm:-mt-10 z-10"
          >
            <VinylMusicDisc
              isPlaying={isPlayingAudio}
              onTogglePlay={onToggleAudio}
            />
          </motion.div>
        </div>

        {/* ── RIGHT: Gold Photo Frame + Vintage Camera ── */}
        <div className="relative flex flex-col items-center md:items-start mt-2 md:mt-0">
          {/* Gold Photo Frame (Slides in from RIGHT) */}
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20"
          >
            <GoldPhotoFrame photoUrl={photoUrl} />
          </motion.div>

          {/* Vintage 35mm Camera (Slides in from BOTTOM-RIGHT) */}
          <motion.div
            initial={{ y: 240, x: 140, opacity: 0 }}
            animate={{ y: 0, x: 0, opacity: 1 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-4 sm:-bottom-8 -left-8 sm:-left-12 z-30 pointer-events-none"
            style={{ transform: 'rotate(-4deg)' }}
          >
            <VintageRetroCamera />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
