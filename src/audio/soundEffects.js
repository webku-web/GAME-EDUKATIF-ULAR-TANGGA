/**
 * Web Audio API Sound Synthesizer & BGM Manager
 * Solusi 100% andal tanpa dependensi aset audio eksternal / tanpa risiko 404
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.bgmVolume = 0.45;
    this.sfxVolume = 0.5;
    this.bgmPlaying = false;
    this.bgmTimer = null;
    this.bgmGainNode = null;
    this.sfxGainNode = null;
    this.melodyStep = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.bgmGainNode = this.ctx.createGain();
        this.sfxGainNode = this.ctx.createGain();

        this.bgmGainNode.gain.setValueAtTime(this.isMuted ? 0 : this.bgmVolume, this.ctx.currentTime);
        this.sfxGainNode.gain.setValueAtTime(this.isMuted ? 0 : this.sfxVolume, this.ctx.currentTime);

        this.bgmGainNode.connect(this.ctx.destination);
        this.sfxGainNode.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.bgmGainNode && this.ctx) {
      this.bgmGainNode.gain.setValueAtTime(this.isMuted ? 0 : this.bgmVolume, this.ctx.currentTime);
    }
    if (this.sfxGainNode && this.ctx) {
      this.sfxGainNode.gain.setValueAtTime(this.isMuted ? 0 : this.sfxVolume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  setVolume(vol) {
    this.bgmVolume = Math.max(0, Math.min(1, vol));
    this.sfxVolume = Math.max(0, Math.min(1, vol * 1.4));
    if (this.bgmGainNode && this.ctx && !this.isMuted) {
      this.bgmGainNode.gain.setValueAtTime(this.bgmVolume, this.ctx.currentTime);
    }
    if (this.sfxGainNode && this.ctx && !this.isMuted) {
      this.sfxGainNode.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime);
    }
  }

  // --- BACKGROUND MUSIC GENERATOR (Harmonis & Edukatif) ---
  startBGM() {
    this.init();
    if (this.bgmGainNode && this.ctx && !this.isMuted) {
      this.bgmGainNode.gain.setValueAtTime(this.bgmVolume, this.ctx.currentTime);
    }
    if (this.bgmPlaying) return;
    this.bgmPlaying = true;
    this.melodyStep = 0;

    // Nada melodi santai bernuansa timur tengah / pentatonis damai (D, E, F, A, Bb, C, D)
    const scale = [293.66, 329.63, 349.23, 440.00, 466.16, 523.25, 587.33];
    const bass = [146.83, 174.61, 220.00, 196.00];

    const playLoop = () => {
      if (!this.bgmPlaying || !this.ctx || this.isMuted) {
        this.bgmTimer = setTimeout(playLoop, 350);
        return;
      }

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Pilih pola nada utama (lebih jelas & hangat)
      const noteFreq = scale[this.melodyStep % scale.length];
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(noteFreq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.28, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      osc.connect(gain);
      gain.connect(this.bgmGainNode);

      osc.start(now);
      osc.stop(now + 0.35);

      // Tambahkan ketukan bass hangat setiap 4 ketukan
      if (this.melodyStep % 4 === 0) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'sine';
        bassOsc.frequency.setValueAtTime(bass[(this.melodyStep / 4) % bass.length], now);

        bassGain.gain.setValueAtTime(0.32, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.52);

        bassOsc.connect(bassGain);
        bassGain.connect(this.bgmGainNode);
        bassOsc.start(now);
        bassOsc.stop(now + 0.55);
      }

      this.melodyStep = (this.melodyStep + 1) % 16;
      this.bgmTimer = setTimeout(playLoop, 320);
    };

    playLoop();
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  // --- SOUND EFFECTS (SFX) ---

  // Kocokan Dadu
  playDiceRoll() {
    this.init();
    if (this.isMuted || !this.ctx) return;

    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(150 + Math.random() * 250, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

        osc.connect(gain);
        gain.connect(this.sfxGainNode);
        osc.start(now);
        osc.stop(now + 0.09);
      }, i * 140);
    }
  }

  // Jawaban Benar (Chime Arpeggio Mayor)
  playCorrect() {
    this.init();
    if (this.isMuted || !this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc.connect(gain);
        gain.connect(this.sfxGainNode);
        osc.start(now);
        osc.stop(now + 0.45);
      }, idx * 100);
    });
  }

  // Jawaban Salah (Buzzer Rendah)
  playWrong() {
    this.init();
    if (this.isMuted || !this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(110, now + 0.35);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);
    osc.start(now);
    osc.stop(now + 0.45);
  }

  // Waktu Habis (Alarm Peringatan)
  playTimeout() {
    this.init();
    if (this.isMuted || !this.ctx) return;

    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.linearRampToValueAtTime(440, now + 0.15);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);

        osc.connect(gain);
        gain.connect(this.sfxGainNode);
        osc.start(now);
        osc.stop(now + 0.18);
      }, i * 160);
    }
  }

  // Menaiki Tangga (Tangga nada menanjak gembira)
  playLadder() {
    this.init();
    if (this.isMuted || !this.ctx) return;

    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

        osc.connect(gain);
        gain.connect(this.sfxGainNode);
        osc.start(now);
        osc.stop(now + 0.28);
      }, idx * 70);
    });
  }

  // Turun Ular (Slide whistle meluncur turun)
  playSnake() {
    this.init();
    if (this.isMuted || !this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(700, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.6);

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.65);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);
    osc.start(now);
    osc.stop(now + 0.7);
  }

  // Kemenangan Juara (Fanfare Meriah)
  playVictory() {
    this.init();
    if (this.isMuted || !this.ctx) return;

    const notes = [
      { f: 523.25, d: 0.15 },
      { f: 523.25, d: 0.15 },
      { f: 523.25, d: 0.15 },
      { f: 659.25, d: 0.4 },
      { f: 783.99, d: 0.2 },
      { f: 1046.50, d: 0.8 },
    ];

    let delay = 0;
    notes.forEach((item) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.f, now);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + item.d);

        osc.connect(gain);
        gain.connect(this.sfxGainNode);
        osc.start(now);
        osc.stop(now + item.d + 0.05);
      }, delay * 1000);
      delay += item.d + 0.04;
    });
  }

  // Tombol Click
  playClick() {
    this.init();
    if (this.isMuted || !this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);
    osc.start(now);
    osc.stop(now + 0.05);
  }
}

export const soundEngine = new SoundEngine();
