// Web Audio API Synthesizer for Retro Effects

let audioContext: AudioContext | null = null;
let gainNode: GainNode | null = null;

const initAudio = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);
    gainNode.gain.value = 0.1; // Low volume global master
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
};

const createOscillator = (type: OscillatorType, freq: number, duration: number) => {
  if (!audioContext || !gainNode) return;
  
  const osc = audioContext.createOscillator();
  const envelope = audioContext.createGain();
  
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioContext.currentTime);
  
  // Connect graph
  osc.connect(envelope);
  envelope.connect(gainNode);
  
  // Envelope shape (Attack/Decay)
  envelope.gain.setValueAtTime(0, audioContext.currentTime);
  envelope.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.01);
  envelope.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  osc.start();
  osc.stop(audioContext.currentTime + duration);
};

export const playHover = () => {
  initAudio();
  // High pitched short blip
  createOscillator('square', 800, 0.05);
};

export const playClick = () => {
  initAudio();
  // Lower pitched confirmation beep
  createOscillator('sawtooth', 300, 0.1);
};

export const playTyping = () => {
    if (Math.random() > 0.7) { // Don't play on every keystroke, too annoying
        initAudio();
        createOscillator('square', 600 + Math.random() * 200, 0.03);
    }
}

export const playSubmitProcess = () => {
  initAudio();
  if (!audioContext) return;

  // Simulate modem/processing noise
  let time = audioContext.currentTime;
  for (let i = 0; i < 10; i++) {
    const osc = audioContext.createOscillator();
    const env = audioContext.createGain();
    osc.type = 'square';
    osc.frequency.value = 200 + Math.random() * 1000;
    
    osc.connect(env);
    env.connect(gainNode!);
    
    env.gain.setValueAtTime(0.1, time);
    env.gain.linearRampToValueAtTime(0, time + 0.1);
    
    osc.start(time);
    osc.stop(time + 0.1);
    time += 0.08;
  }
};

export const playSuccess = () => {
    initAudio();
    if (!audioContext) return;
    
    // Success arpeggio
    const notes = [440, 554, 659, 880]; // A Major
    let time = audioContext.currentTime;
    
    notes.forEach(note => {
        createOscillator('square', note, 0.2);
        const osc = audioContext!.createOscillator();
        const env = audioContext!.createGain();
        osc.type = 'square';
        osc.frequency.value = note;
        osc.connect(env);
        env.connect(gainNode!);
        env.gain.setValueAtTime(0, time);
        env.gain.linearRampToValueAtTime(0.2, time + 0.05);
        env.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
        osc.start(time);
        osc.stop(time + 0.3);
        time += 0.1;
    });
};

// Initialize on first interaction to unlock AudioContext
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    initAudio();
    window.removeEventListener('click', unlockAudio);
    window.removeEventListener('keydown', unlockAudio);
  };
  window.addEventListener('click', unlockAudio);
  window.addEventListener('keydown', unlockAudio);
}
