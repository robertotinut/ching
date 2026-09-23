// Background audio manager with fallback ambient synth & interactive sound effects (SFX)

class SoundController {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.listeners = new Set();
    this.audioContext = null;
    this.synthInterval = null;
  }

  getAudioContext() {
    if (typeof window === "undefined") return null;
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    }
    if (this.audioContext && this.audioContext.state === "suspended") {
      this.audioContext.resume().catch(() => {});
    }
    return this.audioContext;
  }

  init(url) {
    if (typeof window === "undefined") return;

    if (!this.audio && url) {
      this.audio = new Audio(url);
      this.audio.loop = true;
      this.audio.volume = 0.45;

      this.audio.addEventListener("play", () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener("pause", () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener("error", () => {
        console.warn("Audio file failed to load, switching to ambient synth fallback.");
        this.startSynthAmbient();
      });
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying));
  }

  async play() {
    if (!this.audio) return;
    try {
      await this.audio.play();
      this.isPlaying = true;
      this.notify();
    } catch {
      this.startSynthAmbient();
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
    }
    this.stopSynthAmbient();
    this.isPlaying = false;
    this.notify();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  // --- INTERACTIVE SOUND EFFECTS (Web Audio API) ---

  // Soft sparkle chime when clicking buttons or opening cards
  playChime() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.07 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.07);
        osc.stop(ctx.currentTime + idx * 0.07 + 0.7);
      });
    } catch (e) {
      console.warn("Chime SFX error:", e);
    }
  }

  // Celebratory harp glissando when unwrapping the gift
  playUnwrapSparkle() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const freqs = [392.0, 523.25, 659.25, 783.99, 987.77, 1046.5, 1318.5];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.05);

        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.05);
        gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + i * 0.05 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.05 + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + i * 0.05);
        osc.stop(ctx.currentTime + i * 0.05 + 0.9);
      });
    } catch (e) {
      console.warn("Unwrap SFX error:", e);
    }
  }

  // Blowing candle wisp sound + twinkle
  playCandleBlow() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      // Soft breathy noise simulation using bandpass filtered white noise
      const bufferSize = ctx.sampleRate * 0.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(600, ctx.currentTime);
      filter.Q.setValueAtTime(3, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.stop(ctx.currentTime + 0.5);

      // Follow up with a tiny bell chime
      setTimeout(() => this.playChime(), 250);
    } catch (e) {
      console.warn("Candle SFX error:", e);
    }
  }

  // Wish ascending magic sound
  playWishMagic() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const notes = [440, 554.37, 659.25, 830.61, 880, 1108.73, 1318.51, 1661.22];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + idx * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 1.3);
      });
    } catch (e) {
      console.warn("Wish SFX error:", e);
    }
  }

  // Fallback: creates a soothing ambient pentatonic chime chord progression
  startSynthAmbient() {
    if (this.synthInterval || typeof window === "undefined") return;

    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const chords = [
        [261.63, 329.63, 392.0, 523.25], // C maj
        [220.0, 261.63, 329.63, 440.0],  // A min
        [174.61, 220.0, 261.63, 349.23], // F maj
        [196.0, 246.94, 293.66, 392.0],  // G maj
      ];
      let chordIndex = 0;

      const playChord = () => {
        const currentCtx = this.getAudioContext();
        if (!currentCtx || !this.isPlaying) return;

        const chord = chords[chordIndex % chords.length];
        chordIndex++;

        chord.forEach((freq, i) => {
          setTimeout(() => {
            if (!this.isPlaying) return;
            const cCtx = this.getAudioContext();
            if (!cCtx) return;
            const osc = cCtx.createOscillator();
            const gain = cCtx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, cCtx.currentTime);

            gain.gain.setValueAtTime(0, cCtx.currentTime);
            gain.gain.linearRampToValueAtTime(0.04, cCtx.currentTime + 1.2);
            gain.gain.exponentialRampToValueAtTime(0.0001, cCtx.currentTime + 4.5);

            osc.connect(gain);
            gain.connect(cCtx.destination);

            osc.start();
            osc.stop(cCtx.currentTime + 5);
          }, i * 280);
        });
      };

      this.isPlaying = true;
      this.notify();
      playChord();
      this.synthInterval = setInterval(playChord, 5500);
    } catch (e) {
      console.warn("Web Audio ambient error:", e);
    }
  }

  stopSynthAmbient() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }
}

export const soundManager = new SoundController();
