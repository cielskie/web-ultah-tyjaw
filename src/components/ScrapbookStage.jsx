import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HTMLFlipBook from 'react-pageflip';
import birthdayData from '../config/birthdayData';
import { playPaperTurnSound } from '../utils/paperSound';

// ── 1. FRONT COVER ─────────────────────────────────────────────────────────
const CoverPage = React.forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      data-density="hard"
      className="page page-cover relative w-full h-full bg-white overflow-hidden shadow-2xl select-none rounded-xl border border-white/60 cursor-pointer"
      {...props}
    >
      <img
        src="/cover.svg"
        alt="Cover Bubu & Dudu"
        className="w-full h-full object-cover object-center pointer-events-none select-none"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
    </div>
  );
});
CoverPage.displayName = 'CoverPage';

// ── 2. INTERIOR PHOTO PAGE ──────────────────────────────────────────────────
const PhotoPage = React.forwardRef(({ photo, isLeft = false, pageNumber }, ref) => {
  return (
    <div
      ref={ref}
      className={`page relative w-full h-full overflow-hidden bg-[#0a030d] select-none ${
        isLeft
          ? 'border-y border-l border-white/50 border-r border-white/20'
          : 'border-y border-r border-white/50 border-l border-white/10'
      }`}
    >
      <img
        src={photo?.url}
        alt={photo?.title || `Memory ${pageNumber}`}
        className="w-full h-full object-cover object-center pointer-events-none select-none"
        draggable={false}
        onError={(e) => {
          e.currentTarget.src =
            'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80';
        }}
      />
      {isLeft ? (
        <div className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none z-10 bg-gradient-to-l from-black/40 via-black/10 to-transparent" />
      ) : (
        <div className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none z-10 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
      )}
      <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-black/10 via-transparent to-black/25" />
    </div>
  );
});
PhotoPage.displayName = 'PhotoPage';

// ── 3. BACK COVER ───────────────────────────────────────────────────────────
const BackCoverPage = React.forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      data-density="hard"
      className="page page-cover relative w-full h-full bg-[#140612] overflow-hidden shadow-2xl flex flex-col justify-center items-center p-6 text-center select-none rounded-xl border border-white/60"
      {...props}
    >
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-12 h-12 flex items-center justify-center mb-3"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-rose-400 drop-shadow-[0_0_12px_rgba(244,63,94,0.6)]">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </motion.div>
      <p
        className="text-xs text-pink-200/70 font-light tracking-[0.2em] uppercase"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Tyjaw's Birthday Book
      </p>
    </div>
  );
});
BackCoverPage.displayName = 'BackCoverPage';

// ── 4. TYPEWRITER TEXT ─────────────────────────────────────────────────────
const TypewriterText = ({ text }) => {
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    setDisplayed('');
    setTyping(true);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(iv);
        setTyping(false);
      }
    }, 44);
    return () => clearInterval(iv);
  }, [text]);

  return (
    <span
      style={{
        fontFamily: "'Caveat', 'Dancing Script', cursive",
        fontSize: 'clamp(18px, 3.8vw, 26px)',
        fontWeight: 500,
        color: '#703645',
        letterSpacing: '0.01em',
        lineHeight: 1.3,
      }}
    >
      {displayed}
      {typing && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.55, repeat: Infinity }}
          className="inline-block ml-[2px] w-[2px] h-[0.85em] bg-[#9a4a5e] align-middle"
        />
      )}
    </span>
  );
};

// ── 5. TOP QUOTE CARD
// Uses a FIXED-HEIGHT reserved slot in the flex column so the book
// NEVER shifts position regardless of whether the card is visible or text changes.
const TopQuoteCard = ({ text, bookWidth, visible }) => (
  <div
    style={{ width: bookWidth, height: 72, maxWidth: '92vw' }}
    className="flex-shrink-0 flex items-center justify-center mb-3 sm:mb-4"
  >
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="card"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%' }}
          className="relative overflow-hidden bg-gradient-to-b from-white via-[#fdfcfb] to-[#fbf6f6]
                     rounded-2xl border border-[#ede3df]
                     shadow-[0_8px_28px_rgba(0,0,0,0.38)]
                     px-5 py-2.5 sm:px-7
                     text-center flex items-center justify-center
                     pointer-events-none select-none"
        >
          {/* Translucent watermark hearts */}
          <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none select-none opacity-[0.06]">
            <svg viewBox="0 0 24 24" fill="#703645" className="w-8 h-8">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <svg viewBox="0 0 24 24" fill="#703645" className="w-8 h-8">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <div className="relative z-10">
            <TypewriterText text={text} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// ── 6. HEART BELOW BOOK ────────────────────────────────────────────────────
const HeartBelow = ({ visible }) => (
  <div style={{ height: 32 }} className="flex-shrink-0 flex items-center justify-center mt-3">
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: [1, 1.2, 1] }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.5 },
            scale: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="text-red-500 text-sm drop-shadow-[0_0_10px_rgba(239,68,68,0.8)] pointer-events-none select-none"
        >
          ❤️
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// ── 7. MAIN SCRAPBOOK COMPONENT ─────────────────────────────────────────────
export default function ScrapbookStage({ onComplete }) {
  const bookPhotos = (birthdayData.gallery || []).slice(0, 8);
  const quotes = birthdayData.photoBookQuotes || [
    "Happy birthday to my favorite person in the world.",
    "Every single day with you is my favorite memory.",
    "Your smile has always been the warmest place to be.",
    "Thank you for being you, and for choosing me.",
    "I love you more than words could ever explain.",
  ];

  const bookRef = useRef(null);
  const hasTriggeredRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 800
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmallMobile = windowWidth < 380;
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth < 1024;

  const pageWidth = isSmallMobile ? 128 : isMobile ? 148 : isTablet ? 192 : 222;
  const pageHeight = isSmallMobile ? 190 : isMobile ? 220 : isTablet ? 285 : 325;
  const bookTotalWidth = pageWidth * 2;

  const getSpreadIndex = (pageIdx) => {
    if (pageIdx <= 0) return 0;
    if (pageIdx >= 9) return quotes.length - 1;
    return Math.min(Math.floor((pageIdx - 1) / 2), quotes.length - 1);
  };

  const currentQuote = quotes[getSpreadIndex(currentPage)] || quotes[0];

  const handleFlip = useCallback((e) => {
    playPaperTurnSound();
    try {
      const pageIndex = e?.data;
      if (pageIndex !== undefined) {
        setCurrentPage(pageIndex);
        setIsOpen(pageIndex > 0);

        if (pageIndex >= 8 && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          setTimeout(() => setIsExiting(true), 2600);
          setTimeout(() => { if (onComplete) onComplete(); }, 4800);
        }
      }
    } catch (err) {
      console.warn('Flip error:', err);
    }
  }, [onComplete]);

  // Layout strategy:
  // ┌──────────────────────────────────────────┐
  // │  TopQuoteCard  (fixed 72px height slot)  │  ← always reserves space
  // │  BookContainer (fixed pageHeight)         │  ← never moves
  // │  HeartBelow    (fixed 32px height slot)   │  ← always reserves space
  // └──────────────────────────────────────────┘

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center px-2 sm:px-8 overflow-hidden pointer-events-auto select-none">
      {/* ── JEDA GELAP (Blackout pause) sebelum buku turun dari atas layar ── */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.8, delay: 1.1, ease: 'easeInOut' }}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 50, background: '#0a0208' }}
      />

      {/* ── BUKU DENGAN CAHAYA BERPENDAR TURUN PERLAHAN DARI ATAS LAYAR KE TENGAH ── */}
      <motion.div
        initial={{ y: '-90vh', opacity: 0, scale: 0.88 }}
        animate={
          isExiting
            ? { y: 35, opacity: 0, scale: 0.94, filter: 'blur(14px)' }
            : { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }
        }
        transition={{
          duration: isExiting ? 1.8 : 3.4,
          delay: isExiting ? 0 : 1.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative flex flex-col items-center pointer-events-auto"
        style={{ width: bookTotalWidth, maxWidth: '92vw' }}
      >
        {/* Cahaya berpendar lembut & hangat di belakang buku yang ikut turun perlahan */}
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.7, 0.95, 0.7],
          }}
          transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '180%',
            height: '180%',
            top: '-40%',
            left: '-40%',
            background: 'radial-gradient(ellipse 65% 60% at 50% 50%, rgba(255, 230, 195, 0.48) 0%, rgba(244, 150, 185, 0.3) 38%, rgba(180, 45, 90, 0.12) 65%, transparent 80%)',
            filter: 'blur(35px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Row 1: Quote card — fixed height, always in layout */}
        <TopQuoteCard
          text={currentQuote}
          bookWidth={bookTotalWidth}
          visible={isOpen}
        />

        {/* Row 2: The book itself — fixed size, never moves */}
        <div
          style={{ width: bookTotalWidth, height: pageHeight }}
          className="flex-shrink-0 flex items-center justify-center"
        >
          <HTMLFlipBook
            ref={bookRef}
            width={pageWidth}
            height={pageHeight}
            size="fixed"
            minWidth={pageWidth}
            maxWidth={pageWidth}
            minHeight={pageHeight}
            maxHeight={pageHeight}
            maxShadowOpacity={0.28}
            showCover={true}
            mobileScrollSupport={true}
            useMouseEvents={true}
            drawShadow={true}
            flippingTime={1100}
            usePortrait={false}
            startPage={0}
            onFlip={handleFlip}
            className="mx-auto"
          >
            <CoverPage />
            {bookPhotos.map((photo, index) => (
              <PhotoPage
                key={photo.id || index}
                photo={photo}
                pageNumber={index + 1}
                isLeft={index % 2 === 0}
              />
            ))}
            <BackCoverPage />
          </HTMLFlipBook>
        </div>

        {/* Row 3: Heart — fixed height slot, always in layout */}
        <HeartBelow visible={isOpen} />
      </motion.div>
    </div>
  );
}
