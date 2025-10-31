// Audio generator for creating click sounds using Web Audio API
class AudioGenerator {
  constructor() {
    this.audioContext = null;
  }

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  createClickSound() {
    this.init();
    const duration = 0.05;
    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
    const data = buffer.getChannelData(0);

    // Create a subtle click sound
    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate;
      // Envelope
      const envelope = Math.exp(-35 * t);
      // Frequency sweep
      const frequency = 800 * Math.exp(-10 * t);
      // Waveform
      data[i] = envelope * Math.sin(2 * Math.PI * frequency * t) * 0.3;
    }

    return buffer;
  }

  createOpenSound() {
    this.init();
    const duration = 0.15;
    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
    const data = buffer.getChannelData(0);

    // Create a subtle open sound
    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate;
      // Envelope
      const envelope = Math.exp(-3 * t);
      // Frequency sweep from low to high
      const frequency = 400 + 400 * (1 - Math.exp(-8 * t));
      // Waveform
      data[i] = envelope * Math.sin(2 * Math.PI * frequency * t) * 0.2;
    }

    return buffer;
  }

  createCloseSound() {
    this.init();
    const duration = 0.1;
    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
    const data = buffer.getChannelData(0);

    // Create a subtle close sound
    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate;
      // Envelope
      const envelope = Math.exp(-5 * t);
      // Frequency sweep from high to low
      const frequency = 600 - 200 * (1 - Math.exp(-6 * t));
      // Waveform
      data[i] = envelope * Math.sin(2 * Math.PI * frequency * t) * 0.25;
    }

    return buffer;
  }

  createSuccessSound() {
    this.init();
    const duration = 0.2;
    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
    const data = buffer.getChannelData(0);

    // Create a subtle success sound
    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate;
      // Envelope
      const envelope = Math.exp(-2 * t);
      // Chord-like sound with multiple frequencies
      const freq1 = 523.25; // C5
      const freq2 = 659.25; // E5
      const freq3 = 783.99; // G5
      data[i] = envelope * (
        Math.sin(2 * Math.PI * freq1 * t) * 0.1 +
        Math.sin(2 * Math.PI * freq2 * t) * 0.08 +
        Math.sin(2 * Math.PI * freq3 * t) * 0.06
      );
    }

    return buffer;
  }

  createErrorSound() {
    this.init();
    const duration = 0.15;
    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
    const data = buffer.getChannelData(0);

    // Create a subtle error sound
    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate;
      // Envelope
      const envelope = Math.exp(-4 * t);
      // Dissonant sound
      const freq1 = 300;
      const freq2 = 246.94; // B3 (dissonant with C4)
      data[i] = envelope * (
        Math.sin(2 * Math.PI * freq1 * t) * 0.15 +
        Math.sin(2 * Math.PI * freq2 * t) * 0.1
      );
    }

    return buffer;
  }

  playBuffer(buffer, volume = 0.3) {
    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();
    
    source.buffer = buffer;
    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    gainNode.gain.value = volume;
    
    source.start(0);
  }
}

// Create global instance
const audioGenerator = new AudioGenerator();