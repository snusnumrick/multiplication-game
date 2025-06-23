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
  // TODO: Later, this will hold an AudioContext or HTMLAudioElement instance for Foxy's voice
  // const foxyAudioRef = useRef<any>(null); 

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
    if (!settings.soundEnabled) {
      // console.log(`Sound disabled, not playing audio for: ${String(messageKey)}`);
      return;
    }
    // TODO: Implement actual audio playback
    // For now, just log that we would play the audio.
    // The messageKey will be used to determine the audio file path later.
    // e.g., const audioFile = `/audio/foxy/${settings.language}/${String(messageKey)}.mp3`;
    console.log(`[GameContext] Would play audio for messageKey: ${String(messageKey)}`);

    // Placeholder for future logic:
    // - Load and play audio file associated with messageKey
    // - On audio start: setFoxyAnimationState('talking'); (if not already handled by message visibility)
    // - On audio end: if (!foxyMessageRef.current) setFoxyAnimationState('idle');
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

