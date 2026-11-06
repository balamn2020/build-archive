// Minimal zero-dependency Web Audio synthesiser for futuristic tactile feedback
let audioCtx: AudioContext | null = null;
let soundEnabled = false;

export function toggleAudio(enable?: boolean): boolean {
  if (typeof window === 'undefined') return false;
  soundEnabled = enable !== undefined ? enable : !soundEnabled;
  if (soundEnabled && !audioCtx) {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtx = new AudioContextClass();
    } catch {
      soundEnabled = false;
    }
  }
  return soundEnabled;
}

export function isAudioEnabled(): boolean {
  return soundEnabled;
}

export function playBeep(frequency = 600, duration = 0.04, type: OscillatorType = 'sine'): void {
  if (!soundEnabled || !audioCtx) return;
  try {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch {
    // Graceful fallback if audio is blocked
  }
}

export function playGlitch(): void {
  if (!soundEnabled || !audioCtx) return;
  playBeep(880, 0.03, 'sawtooth');
  setTimeout(() => playBeep(440, 0.04, 'square'), 40);
}

