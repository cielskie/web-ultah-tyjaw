// Real-World Mechanical Keyboard Sound Engine
// Uses authentic studio recordings of tactile mechanical switches (Holy Panda & Cherry MX)

const KEY_URLS = [
  '/typing/key0.mp3',
  '/typing/key1.mp3',
  '/typing/key2.mp3',
  '/typing/key3.mp3',
  '/typing/key4.mp3',
];
const SPACE_URL = '/typing/space.mp3';
const ENTER_URL = '/typing/enter.mp3';

const audioBuffers = {
  keys: [],
  space: null,
  enter: null,
};

let isPreloaded = false;
let isPreloading = false;

// Preload audio files as HTML Audio elements pool for immediate fallback
const createAudioPool = () => {
  if (typeof window === 'undefined') return { keys: [], space: [], enter: [] };
  // Keep multiple copies so overlapping rapid keystrokes play seamlessly
  const makeList = (url, count = 4) => {
    return Array.from({ length: count }, () => {
      const a = new Audio(url);
      a.preload = 'auto';
      return a;
    });
  };
  return {
    keys: KEY_URLS.map((url) => makeList(url, 3)),
    space: makeList(SPACE_URL, 3),
    enter: makeList(ENTER_URL, 3),
  };
};

const audioPool = createAudioPool();
let poolIndex = 0;

// Pre-decode into Web Audio API buffers for 0ms latency polyphonic playback
export const preloadKeyboardSounds = async () => {
  if (isPreloaded || isPreloading || typeof window === 'undefined') return;
  isPreloading = true;

  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) {
      isPreloading = false;
      return;
    }
    if (!window.__globalAudioCtx) {
      window.__globalAudioCtx = new AudioCtx();
    }
    const ctx = window.__globalAudioCtx;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const fetchAndDecode = async (url) => {
      const res = await fetch(url);
      const arrayBuf = await res.arrayBuffer();
      return await ctx.decodeAudioData(arrayBuf);
    };

    const keyPromises = KEY_URLS.map((url) => fetchAndDecode(url));
    const [spaceBuf, enterBuf, ...keyBufs] = await Promise.all([
      fetchAndDecode(SPACE_URL),
      fetchAndDecode(ENTER_URL),
      ...keyPromises,
    ]);

    audioBuffers.keys = keyBufs;
    audioBuffers.space = spaceBuf;
    audioBuffers.enter = enterBuf;
    isPreloaded = true;
  } catch (err) {
    console.warn('Keyboard sound preloading notice:', err);
  } finally {
    isPreloading = false;
  }
};

// Automatically attempt preloading on browser idle or first interaction
if (typeof window !== 'undefined') {
  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => preloadKeyboardSounds());
  } else {
    setTimeout(() => preloadKeyboardSounds(), 100);
  }
  window.addEventListener('click', () => preloadKeyboardSounds(), { once: true });
  window.addEventListener('touchstart', () => preloadKeyboardSounds(), { once: true });
}

// Play authentic real-world mechanical keystroke synchronized with typed character
export const playRealKeystroke = (char) => {
  try {
    const isSpace = char === ' ';
    const isNewline = char === '\n';

    // ── Primary Engine: Web Audio API (instant, polyphonic, zero latency) ──
    const ctx = typeof window !== 'undefined' ? window.__globalAudioCtx : null;
    if (ctx) {
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      if (isPreloaded) {
        let bufferToPlay = null;
        if (isNewline && audioBuffers.enter) {
          bufferToPlay = audioBuffers.enter;
        } else if (isSpace && audioBuffers.space) {
          bufferToPlay = audioBuffers.space;
        } else if (audioBuffers.keys.length > 0) {
          const randIdx = Math.floor(Math.random() * audioBuffers.keys.length);
          bufferToPlay = audioBuffers.keys[randIdx];
        }

        if (bufferToPlay) {
          const source = ctx.createBufferSource();
          source.buffer = bufferToPlay;

          // Subtle realistic pitch variation for organic mechanical keystrokes (0.96x - 1.04x)
          source.playbackRate.value = 0.96 + Math.random() * 0.08;

          const gainNode = ctx.createGain();
          gainNode.gain.value = isNewline ? 0.65 : isSpace ? 0.6 : 0.55;

          source.connect(gainNode);
          gainNode.connect(ctx.destination);
          source.start(0);
          return;
        }
      }
    }

    // If not yet preloaded into Web Audio, trigger preloading for upcoming keystrokes
    if (!isPreloaded && !isPreloading) {
      preloadKeyboardSounds();
    }

    // ── Secondary Engine: HTML5 Audio Pool Fallback ─────────────────────────
    let targetList = null;
    if (isNewline && audioPool.enter.length > 0) {
      targetList = audioPool.enter;
    } else if (isSpace && audioPool.space.length > 0) {
      targetList = audioPool.space;
    } else if (audioPool.keys.length > 0) {
      const randIdx = Math.floor(Math.random() * audioPool.keys.length);
      targetList = audioPool.keys[randIdx];
    }

    if (targetList && targetList.length > 0) {
      poolIndex = (poolIndex + 1) % targetList.length;
      const audioElem = targetList[poolIndex];
      audioElem.currentTime = 0;
      audioElem.volume = isNewline ? 0.65 : isSpace ? 0.6 : 0.55;
      audioElem.play().catch(() => {});
    }
  } catch (e) {
    // Non-blocking fallback
  }
};
