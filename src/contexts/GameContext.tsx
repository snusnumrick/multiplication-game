import React, {useState, useEffect, ReactNode, useCallback, useRef} from 'react';
import {Translation, translations} from '../translations';
import { GameContext, FoxyAnimationState } from './game-context-def';

interface GameProgress {
  tablesLearned: number[];
  totalStars: number;
  achievements: string[];
  practiceProgress: Record<number, number>; // table -> score
  quizHighScores: Record<string, number>; // difficulty -> score
  adventureLevels: Record<number, { completed: boolean; stars: number }>;
}

interface GameSettings {
  language: 'de' | 'ru';
  difficulty: 'easy' | 'medium' | 'hard';
  soundEnabled: boolean;
  foxyEnabled: boolean; // Added for Foxy visibility
}

const defaultProgress: GameProgress = {
  tablesLearned: [],
  totalStars: 0,
  achievements: [],
  practiceProgress: {},
  quizHighScores: {},
  adventureLevels: {},
};

const defaultSettings: GameSettings = {
  language: 'de',
  difficulty: 'medium',
  soundEnabled: true,
  foxyEnabled: true, // Default Foxy to be enabled
};

export function GameProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<GameSettings>(defaultSettings);
  const [progress, setProgress] = useState<GameProgress>(defaultProgress);
  const [currentScreen, setCurrentScreen] = useState('menu');
  const [foxyMessage, setFoxyMessage] = useState<string | null>(null);
  const [isFoxyVisible, setIsFoxyVisible] = useState<boolean>(false);
  const [foxyAnimationState, setFoxyAnimationState] = useState<FoxyAnimationState>('idle');
  const foxyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const happyAnimationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const foxyMessageRef = useRef<string | null>(null);
  const foxyAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Foxy's audio element
  useEffect(() => {
    foxyAudioRef.current = new Audio();
    // Cleanup audio element if component unmounts
    return () => {
      if (foxyAudioRef.current) {
        foxyAudioRef.current.pause();
        foxyAudioRef.current.src = '';
      }
    };
  }, []);

  // Keep foxyMessageRef updated
  useEffect(() => {
    foxyMessageRef.current = foxyMessage;
  }, [foxyMessage]);

  // Load saved data on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('multiplicationGame_settings');
    const savedProgress = localStorage.getItem('multiplicationGame_progress');
    
    if (savedSettings) {
      setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
    }
    
    if (savedProgress) {
      setProgress({ ...defaultProgress, ...JSON.parse(savedProgress) });
    }
  }, []);

  // Save settings when they change
  useEffect(() => {
    localStorage.setItem('multiplicationGame_settings', JSON.stringify(settings));
  }, [settings]);

  // Save progress when it changes
  useEffect(() => {
    localStorage.setItem('multiplicationGame_progress', JSON.stringify(progress));
  }, [progress]);

  const updateSettings = (newSettings: Partial<GameSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateProgress = (newProgress: Partial<GameProgress>) => {
    setProgress(prev => ({ ...prev, ...newProgress }));
  };

  const addStars = (count: number) => {
    setProgress(prev => ({
      ...prev,
      totalStars: prev.totalStars + count,
    }));
  };

  const completeTable = (table: number) => {
    setProgress(prev => ({
      ...prev,
      tablesLearned: [...new Set([...prev.tablesLearned, table])],
    }));
  };

  // Simple sound effects using Web Audio API
  const playSound = useCallback((type: 'correct' | 'incorrect' | 'success' | 'click') => {
    if (!settings.soundEnabled) return;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (!audioContext) {
        console.log('Web Audio API not supported');
        return;
      }
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      const frequencies = {
        correct: [523.25, 659.25, 783.99], // C-E-G major chord
        incorrect: [220, 196], // A-G (sad sound)
        success: [523.25, 659.25, 783.99, 1046.5], // C-E-G-C celebration
        click: [800], // Simple click
      };

      const freqs = frequencies[type];
      freqs.forEach((freq, index) => {
        setTimeout(() => {
          const osc = audioContext.createOscillator();
          const gain = audioContext.createGain();
          
          osc.connect(gain);
          gain.connect(audioContext.destination);
          
          osc.frequency.setValueAtTime(freq, audioContext.currentTime);
          osc.type = 'sine';
          
          gain.gain.setValueAtTime(0, audioContext.currentTime);
          gain.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
          
          osc.start(audioContext.currentTime);
          osc.stop(audioContext.currentTime + 0.3);
        }, index * 100);
      });
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  }, [settings.soundEnabled]);

  const t = translations[settings.language];

  const showFoxyMessage = useCallback((messageKey: keyof Translation, duration?: number) => {
    if (foxyTimeoutRef.current) {
      clearTimeout(foxyTimeoutRef.current);
      foxyTimeoutRef.current = null;
    }

    const messageText = t[messageKey] as string; // Type assertion
    if (messageText) {
      setFoxyMessage(messageText);
      setIsFoxyVisible(true);

      if (duration) {
        foxyTimeoutRef.current = setTimeout(() => {
          setIsFoxyVisible(false);
          setFoxyMessage(null);
          foxyTimeoutRef.current = null;
        }, duration * 1000); // duration in seconds
      }
    } else {
      console.warn(`Foxy message key "${String(messageKey)}" not found in translations.`);
      setIsFoxyVisible(false);
      setFoxyMessage(null);
    }
  }, [t, setIsFoxyVisible, setFoxyMessage]);

  const playFoxyAudio = useCallback((messageKey: keyof Translation) => {
    if (!settings.soundEnabled || !foxyAudioRef.current) {
      // console.log(`Sound disabled or audio element not ready, not playing audio for: ${String(messageKey)}`);
      return;
    }

    const audio = foxyAudioRef.current;

    // Stop any currently playing audio from this element and clear previous listeners
    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0; // Reset time to start
    }
    audio.onended = null; // Clear previous onended listener
    audio.onerror = null; // Clear previous onerror listener

    const audioFile = `/audio/foxy/${settings.language}/${String(messageKey)}.mp3`;
    audio.src = audioFile;
    
    audio.play().catch(error => {
      console.error(`[GameContext] Error playing Foxy audio for "${String(messageKey)}" (${audioFile}):`, error);
      // Note: Errors like 404 for the audio file might trigger the <audio> element's error event,
      // rather than rejecting the play() promise. We can add an onerror handler if needed.
    });

    // Placeholder for future logic (Task 4 - Animation Sync):
    // - On audio start: setFoxyAnimationState('talking');
    // - On audio end: if (!foxyMessageRef.current) setFoxyAnimationState('idle');
    //   (This will involve adding audio.onplay and audio.onended event handlers here)
  }, [settings.soundEnabled, settings.language]);

  // Update showFoxyMessage to also trigger audio playback
  const showFoxyMessageAndUpdate = useCallback((messageKey: keyof Translation, duration?: number) => {
    if (foxyTimeoutRef.current) {
      clearTimeout(foxyTimeoutRef.current);
      foxyTimeoutRef.current = null;
    }

    const messageText = t[messageKey] as string;
    if (messageText) {
      setFoxyMessage(messageText);
      setIsFoxyVisible(true);
      playFoxyAudio(messageKey); // Call to play audio

      if (duration) {
        foxyTimeoutRef.current = setTimeout(() => {
          setIsFoxyVisible(false);
          setFoxyMessage(null);
          foxyTimeoutRef.current = null;
          // Note: Animation state will be handled by the useEffect below based on isFoxyVisible/foxyMessage
        }, duration * 1000);
      }
    } else {
      console.warn(`Foxy message key "${String(messageKey)}" not found in translations.`);
      setIsFoxyVisible(false);
      setFoxyMessage(null);
    }
  }, [t, setIsFoxyVisible, setFoxyMessage, playFoxyAudio]);


  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      if (foxyTimeoutRef.current) {
        clearTimeout(foxyTimeoutRef.current);
      }
      if (happyAnimationTimeoutRef.current) {
        clearTimeout(happyAnimationTimeoutRef.current);
      }
    };
  }, []);

  const setFoxyAnimationStateWithHappyLogic = useCallback((newState: FoxyAnimationState) => {
    // Clear any existing happy animation timeout before setting a new state or a new timeout
    if (happyAnimationTimeoutRef.current) {
      clearTimeout(happyAnimationTimeoutRef.current);
      happyAnimationTimeoutRef.current = null;
    }

    setFoxyAnimationState(newState);

    if (newState === 'happy') {
      happyAnimationTimeoutRef.current = setTimeout(() => {
        // After happy animation, revert based on message presence (using the ref for current message)
        if (foxyMessageRef.current) {
          setFoxyAnimationState('talking');
        } else {
          setFoxyAnimationState('idle');
        }
        happyAnimationTimeoutRef.current = null;
      }, 2500); // Duration for happy animation (e.g., 2.5 seconds)
    }
  }, [setFoxyAnimationState]); // setFoxyAnimationState from useState is stable

  useEffect(() => {
    // Do not interfere if Foxy is in a temporary state like 'happy'
    if (foxyAnimationState === 'happy') {
      return;
    }

    if (isFoxyVisible && foxyMessage) {
      // If Foxy is visible and has a message, she should be 'talking'
      // unless she's in a specific non-idle state like 'happy'.
      if (foxyAnimationState === 'idle') {
        setFoxyAnimationState('talking');
      }
    } else {
      // If not visible or no message, she should be 'idle'.
      if (foxyAnimationState !== 'idle') {
        setFoxyAnimationState('idle');
      }
    }
  }, [isFoxyVisible, foxyMessage, foxyAnimationState, setFoxyAnimationState]);

  return (
    <GameContext.Provider value={{
      settings,
      updateSettings,
      t,
      progress,
      updateProgress,
      addStars,
      completeTable,
      currentScreen,
      setCurrentScreen,
      playSound,
      foxyMessage,
      setFoxyMessage, // Keep for direct control if needed
      isFoxyVisible,
      setIsFoxyVisible, // Keep for direct control if needed
      showFoxyMessage: showFoxyMessageAndUpdate, // Use the updated function
      foxyAnimationState,
      setFoxyAnimationState: setFoxyAnimationStateWithHappyLogic,
      // playFoxyAudio, // Expose if direct audio control is needed elsewhere, for now it's internal to showFoxyMessage
    }}>
      {children}
    </GameContext.Provider>
  );
}

