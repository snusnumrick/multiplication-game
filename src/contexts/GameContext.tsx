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
  const [currentFoxyMessageKey, setCurrentFoxyMessageKey] = useState<keyof Translation | null>(null);
  const [foxyInitialGreetingPlayed, setFoxyInitialGreetingPlayed] = useState<boolean>(false);
  const [foxyAnimationState, _setInternalFoxyAnimationState] = useState<FoxyAnimationState>('idle'); // Renamed raw setter
  const foxyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const happyAnimationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const foxyMessageRef = useRef<string | null>(null);
  const foxyAudioRef = useRef<HTMLAudioElement | null>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // Effect to detect first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasUserInteracted(true);
    };

    const eventTypes: (keyof DocumentEventMap)[] = ['click', 'keydown', 'touchstart'];
    
    if (!hasUserInteracted) {
      eventTypes.forEach(eventType => {
        // Listen once for any of these events
        document.addEventListener(eventType, handleFirstInteraction, { once: true });
      });
    }

    // Cleanup: remove event listeners if the component unmounts before interaction
    return () => {
      eventTypes.forEach(eventType => {
        document.removeEventListener(eventType, handleFirstInteraction);
      });
    };
  }, [hasUserInteracted]); // Rerun if hasUserInteracted changes, though {once: true} handles most cases.

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
    const savedFoxyGreetingPlayed = localStorage.getItem('multiplicationGame_foxyGreetingPlayed');
    
    if (savedSettings) {
      setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
    }
    
    if (savedProgress) {
      setProgress({ ...defaultProgress, ...JSON.parse(savedProgress) });
    }

    if (savedFoxyGreetingPlayed) {
      setFoxyInitialGreetingPlayed(JSON.parse(savedFoxyGreetingPlayed));
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

  // Save foxyInitialGreetingPlayed when it changes
  useEffect(() => {
    localStorage.setItem('multiplicationGame_foxyGreetingPlayed', JSON.stringify(foxyInitialGreetingPlayed));
  }, [foxyInitialGreetingPlayed]);

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

  // showFoxyMessage is replaced by showFoxyMessageAndUpdate later, this block removes the old one.
  // The new showFoxyMessageAndUpdate will be inserted further down.
  // This SEARCH block is intentionally targeting the old showFoxyMessage.
  // If showFoxyMessage was already removed or renamed, this block might not match.
  // Assuming it's present as per the provided file content.

  // const showFoxyMessage = useCallback((messageKey: keyof Translation, duration?: number) => {
  // ... this function is removed by the next change which replaces showFoxyMessageAndUpdate
  // ... we'll ensure this section is clear for the new function.
  // For safety, this block is minimal and might need adjustment if the surrounding code changed.
  // The goal is to prepare for the insertion of the new showFoxyMessageAndUpdate.
  // If showFoxyMessage is not found, the next SEARCH/REPLACE for showFoxyMessageAndUpdate will handle it.
  // This is a placeholder to ensure the old definition is handled if it exists.
  // If it was already showFoxyMessageAndUpdate, then the next block is the primary one.
  // To be safe, let's make this block a no-op if showFoxyMessage doesn't exist as defined.
  // The critical change is to showFoxyMessageAndUpdate.

  // The following SEARCH/REPLACE block for showFoxyMessageAndUpdate will handle the actual logic update.
  // This block is primarily to ensure no old showFoxyMessage definition conflicts.
  // If showFoxyMessage is not exactly as in SEARCH, this block will not apply, which is fine.
  // The important part is the update to showFoxyMessageAndUpdate.

  // This function is exposed via context as `setFoxyAnimationState`
  const setFoxyAnimationStateWithHappyLogic = useCallback((newState: FoxyAnimationState) => {
    if (happyAnimationTimeoutRef.current) {
      clearTimeout(happyAnimationTimeoutRef.current);
      happyAnimationTimeoutRef.current = null;
    }

    _setInternalFoxyAnimationState(newState); // Use the internal setter

    if (newState === 'happy') {
      happyAnimationTimeoutRef.current = setTimeout(() => {
        // After happy animation, revert to 'idle'.
        // If a message is still meant to be active, and audio should play,
        // it's assumed the audio system (or calling component) will set 'talking' again if needed.
        _setInternalFoxyAnimationState('idle');
        happyAnimationTimeoutRef.current = null;
      }, 2500); // Duration for happy animation
    }
  }, [_setInternalFoxyAnimationState]); // Dependency is the internal setter

  const playFoxyAudio = useCallback((messageKey: keyof Translation) => {
    if (!settings.soundEnabled || !settings.foxyEnabled || !foxyAudioRef.current || !hasUserInteracted) {
      if (!hasUserInteracted) {
        // console.log(`User has not interacted yet, not playing audio for: ${String(messageKey)}`);
      }
      // console.log(`Sound or Foxy disabled, audio element not ready, or no user interaction, not playing audio for: ${String(messageKey)}`);
      return;
    }

    const audio = foxyAudioRef.current;

    // Stop any currently playing audio from this element
    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }

    // Clear previous listeners to avoid multiple triggers if playFoxyAudio is called rapidly
    audio.onplaying = null;
    audio.onended = null;
    audio.onerror = null;

    const audioFile = `/audio/foxy/${settings.language}/${String(messageKey)}.mp3`;
    audio.src = audioFile;

    audio.onplaying = () => {
      // When audio starts playing, set Foxy to 'talking'.
      // This uses the context's setFoxyAnimationState, which handles 'happy' state interruption.
      setFoxyAnimationStateWithHappyLogic('talking');
    };

    audio.onended = () => {
      // When audio finishes, set Foxy to 'idle'.
      setFoxyAnimationStateWithHappyLogic('idle');
    };

    audio.onerror = (e) => {
      console.error(`[GameContext] Error event for Foxy audio "${String(messageKey)}" (${audioFile}):`, e);
      setFoxyAnimationStateWithHappyLogic('idle');
    };
    
    audio.play().catch(error => {
      console.error(`[GameContext] Error calling play() for Foxy audio "${String(messageKey)}" (${audioFile}):`, error);
      // If play() itself fails, ensure Foxy is idle.
      setFoxyAnimationStateWithHappyLogic('idle');
    });

  }, [settings.soundEnabled, settings.foxyEnabled, settings.language, setFoxyAnimationStateWithHappyLogic, hasUserInteracted]);

  // Update showFoxyMessage to also trigger audio playback
  const showFoxyMessageAndUpdate = useCallback((
    messageKey: keyof Translation,
    duration?: number,
    options: { isInitialGreeting?: boolean } = {}
  ) => {
    if (foxyTimeoutRef.current) {
      clearTimeout(foxyTimeoutRef.current);
      foxyTimeoutRef.current = null;
    }

    const messageText = t[messageKey] as string;
    if (messageText) {
      setFoxyMessage(messageText);
      setCurrentFoxyMessageKey(messageKey);
      setIsFoxyVisible(true);

      let shouldPlayAudio = true;
      console.log(options.isInitialGreeting, foxyInitialGreetingPlayed);
      if (options.isInitialGreeting) {
        if (foxyInitialGreetingPlayed) {
          shouldPlayAudio = false;
        } else {
          setFoxyInitialGreetingPlayed(true);
        }
      }

      if (shouldPlayAudio) {
        playFoxyAudio(messageKey);
      }

      if (duration) {
        foxyTimeoutRef.current = setTimeout(() => {
          setIsFoxyVisible(false);
          setFoxyMessage(null);
          setCurrentFoxyMessageKey(null);
          foxyTimeoutRef.current = null;
        }, duration * 1000);
      }
    } else {
      console.warn(`Foxy message key "${String(messageKey)}" not found in translations.`);
      setIsFoxyVisible(false);
      setFoxyMessage(null);
      setCurrentFoxyMessageKey(null);
    }
  }, [t, setIsFoxyVisible, setFoxyMessage, playFoxyAudio, foxyInitialGreetingPlayed, setFoxyInitialGreetingPlayed, setCurrentFoxyMessageKey]);


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

  // useEffect to handle cleanup when Foxy is hidden or message is cleared
  useEffect(() => {
    if (!isFoxyVisible || !foxyMessage) {
      // Foxy is hidden or message is cleared, ensure she is idle and audio is stopped.
      if (foxyAudioRef.current) { // Check if audio ref exists
        if (!foxyAudioRef.current.paused) { // If playing, pause it
          foxyAudioRef.current.pause();
          foxyAudioRef.current.currentTime = 0;
        }
        foxyAudioRef.current.src = ''; // Always reset src to abort loading/pending play
      }
      // Use the public setter to ensure 'happy' timeout is also cleared.
      setFoxyAnimationStateWithHappyLogic('idle');
    }
    // Note: Transitions like 'talking' -> 'idle' (on audio end) or 'idle' -> 'talking' (on audio start)
    // are now handled by audio event listeners in playFoxyAudio.
    // The 'happy' state is managed by setFoxyAnimationStateWithHappyLogic.
  }, [isFoxyVisible, foxyMessage, setFoxyAnimationStateWithHappyLogic]);

  // Effect to clear Foxy's message and related state when 'menu' screen is activated
  useEffect(() => {
    if (currentScreen === 'menu') {
      // Clear any pending timeout that might hide Foxy (e.g., from a message with a duration)
      if (foxyTimeoutRef.current) {
        clearTimeout(foxyTimeoutRef.current);
        foxyTimeoutRef.current = null;
      }
      // Clear Foxy's message content. 
      // Foxy's visibility on the MainMenu is now primarily managed by the MainMenu component itself
      // (showing on mount, hiding on unmount).
      setFoxyMessage(null);
      setCurrentFoxyMessageKey(null);
      // With persistence, foxyInitialGreetingPlayed is not reset here.
      // The useEffect dependent on isFoxyVisible/foxyMessage will handle stopping audio 
      // and setting Foxy's animation to idle if her message is cleared or if she is hidden by other logic.
    }
  }, [currentScreen, setFoxyMessage, setCurrentFoxyMessageKey]);


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
      playFoxyAudio, 
      currentFoxyMessageKey,
      // foxyInitialGreetingPlayed, // Not strictly needed by consumers if showFoxyMessage handles it
      // setFoxyInitialGreetingPlayed, // Not strictly needed by consumers
    }}>
      {children}
    </GameContext.Provider>
  );
}

