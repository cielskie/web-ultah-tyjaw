// Realistic Paper Flip / Rustle Sound Synthesizer
// Uses Web Audio API filtered pink/white noise + subtle friction impulses
// 100% self-contained without needing external audio files

export const playPaperTurnSound = () => {
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
    const duration = 0.28 + Math.random() * 0.06;

    // Create noise buffer for paper friction
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      // Pinkish noise curve for soft organic paper feel
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.04 * white) / 1.04;
      lastOut = output[i];
      output[i] *= 3.5; // boost gain
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    // Bandpass filter to sculpt the whoosh of turning paper
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(900 + Math.random() * 300, now);
    filter.frequency.exponentialRampToValueAtTime(1600, now + duration * 0.4);
    filter.frequency.exponentialRampToValueAtTime(600, now + duration);
    filter.Q.value = 1.8;

    // Gain envelope (rise fast, then flutter and gently decay)
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.24, now + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.08, now + 0.14);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + duration);
  } catch (e) {
    // Non-blocking fallback
  }
};
