import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * AudioPlayer component for easy custom music setup.
 *
 * CARA MENGGUNAKAN SOUND:
 * 1. Simpan file MP3 Anda di dalam folder `public/`, contoh: `public/music.mp3`
 * 2. Masukkan nama filenya ke prop `audioSrc="/music.mp3"`
 * 3. Musik akan otomatis berputar saat tombol PLAY ditekan!
 */
const AudioPlayer = ({ audioSrc = '/music.mp3', isPlaying = false, onTogglePlay }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.log('Audio autoplay blocked or file not found:', err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="fixed top-4 right-4 z-[100] flex items-center gap-2 pointer-events-auto">
      {/* Audio element pointing to user's custom file in public directory */}
      <audio ref={audioRef} src={audioSrc} loop preload="auto" />

      <button
        type="button"
        onClick={onTogglePlay}
        className={`relative flex items-center justify-center p-2.5 rounded-full border transition-all duration-300 cursor-pointer pointer-events-auto hover:scale-110 active:scale-95 ${
          isPlaying
            ? 'bg-[#ff4d8d]/30 border-[#ff4d8d] shadow-[0_0_20px_rgba(255,77,141,0.8)] text-[#ff4d8d]'
            : 'bg-[#160a2c]/90 border-pink-500/40 text-gray-300 hover:text-white shadow-[0_0_12px_rgba(0,0,0,0.5)]'
        }`}
        title={isPlaying ? 'Matikan Musik' : 'Putar Musik'}
      >
        {isPlaying ? (
          <>
            <div className="absolute -inset-1 rounded-full border border-dashed border-[#ff4d8d]/60 pointer-events-none animate-spin" />
            <Volume2 className="w-5 h-5 animate-pulse" />
          </>
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;
