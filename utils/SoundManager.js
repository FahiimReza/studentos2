class SoundManager {
  constructor() {
    this.enabled = true;
    this.volume = 0.3;
    this.initialized = false;
    this.audioGenerator = null;
  }

  init() {
    if (this.initialized) return;
    
    // Initialize audio generator
    if (typeof audioGenerator !== 'undefined') {
      this.audioGenerator = audioGenerator;
      this.audioGenerator.init();
    }
    
    // Load settings from localStorage
    this.loadSettings();
    
    this.initialized = true;
  }

  play(soundName) {
    if (!this.enabled || !this.audioGenerator) return;
    
    try {
      let buffer;
      switch(soundName) {
        case 'click':
          buffer = this.audioGenerator.createClickSound();
          break;
        case 'open':
          buffer = this.audioGenerator.createOpenSound();
          break;
        case 'close':
          buffer = this.audioGenerator.createCloseSound();
          break;
        case 'success':
          buffer = this.audioGenerator.createSuccessSound();
          break;
        case 'error':
          buffer = this.audioGenerator.createErrorSound();
          break;
        default:
          return;
      }
      this.audioGenerator.playBuffer(buffer, this.volume);
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    this.saveSettings();
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.saveSettings();
  }

  loadSettings() {
    try {
      const settings = localStorage.getItem('studentos-sound-settings');
      if (settings) {
        const parsed = JSON.parse(settings);
        this.enabled = parsed.enabled !== false;
        this.volume = parsed.volume || 0.3;
      }
    } catch (e) {
      console.log('Failed to load sound settings:', e);
    }
  }

  saveSettings() {
    try {
      localStorage.setItem('studentos-sound-settings', JSON.stringify({
        enabled: this.enabled,
        volume: this.volume
      }));
    } catch (e) {
      console.log('Failed to save sound settings:', e);
    }
  }
}

// Create global instance
const soundManager = new SoundManager();