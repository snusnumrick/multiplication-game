import React, {useState, useEffect, ReactNode, useCallback, useRef} from 'react';
import {Translation, translations} from '../translations';
import { GameContext, FoxyAnimationState, GameProgress } from './game-context-def';

interface GameSettings {
  language: 'de' | 'ru';
  difficulty: 'easy' | 'medium' | 'hard';
  soundEnabled: boolean;
  foxyEnabled: boolean; // Added for Foxy visibility
  legendEnabled: boolean;
}

const defaultProgress: GameProgress = {
  tablesLearned: [],
  totalStars: 0,
  achievements: [],
  practiceProgress: {},
  quizHighScores: {},
  adventureLevels: {},
  strategySuccess: {},
  learningStyleSuccess: {},
};

const defaultSettings: GameSettings = {
  language: 'de',
  difficulty: 'medium',
  soundEnabled: true,
  foxyEnabled: true, // Default Foxy to be enabled
  legendEnabled: true,
};

export function GameProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<GameSettings>(() => {
    const savedSettings = localStorage.getItem('multiplicationGame_settings');
    if (savedSettings) {
      return { ...defaultSettings, ...JSON.parse(savedSettings) };
    }
    // No saved settings, determine defaults based on device
    const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;
    return {
      ...defaultSettings,
      foxyEnabled: !isMobileDevice,
      legendEnabled: !isMobileDevice,
    };
  });
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

  const recordStrategySuccess = (strategyName: string) => {
    setProgress(prev => {
      const currentSuccess = prev.strategySuccess[strategyName] || 0;
      return {
        ...prev,
        strategySuccess: {
          ...prev.strategySuccess,
          [strategyName]: currentSuccess + 1,
        },
      };
    });
  };

  const recordLearningStyleSuccess = (learningStyle: string) => {
    setProgress(prev => {
      const currentSuccess = prev.learningStyleSuccess[learningStyle] || 0;
      return {
        ...prev,
        learningStyleSuccess: {
          ...prev.learningStyleSuccess,
          [learningStyle]: currentSuccess + 1,
        },
      };
    });
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
    if (!settings.soundEnabled || !foxyAudioRef.current || !hasUserInteracted) {
      if (!hasUserInteracted) {
        console.log(`User has not interacted yet, not playing audio for: ${String(messageKey)}`);
      } else {
        console.log(`Sound disabled or audio element not ready, not playing audio for: ${String(messageKey)}`);
      }
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
      // Ignore abort errors, which are expected when audio is interrupted
      if (audio.error?.code === MediaError.MEDIA_ERR_ABORTED) {
        console.log(`[GameContext] Audio playback for "${String(messageKey)}" was aborted. This is expected.`);
        return;
      }
      console.error(`[GameContext] Error event for Foxy audio "${String(messageKey)}" (${audioFile}):`, e);
      setFoxyAnimationStateWithHappyLogic('idle');
    };
    
    audio.play().catch(error => {
      // AbortError is expected when audio is interrupted, so we can ignore it
      if (error.name === 'AbortError') {
        console.log(`[GameContext] Audio playback for "${String(messageKey)}" was interrupted. This is expected.`);
        return;
      }
      console.error(`[GameContext] Error calling play() for Foxy audio "${String(messageKey)}" (${audioFile}):`, error);
      // If play() itself fails, ensure Foxy is idle.
      setFoxyAnimationStateWithHappyLogic('idle');
    });

  }, [settings.soundEnabled, settings.language, setFoxyAnimationStateWithHappyLogic, hasUserInteracted]);

  // Update showFoxyMessage to also trigger audio playback
  const showFoxyMessageAndUpdate = useCallback((
    messageKey: keyof Translation,
    duration?: number,
    options: { isInitialGreeting?: boolean } = {}
  ) => {
    if (foxyTimeoutRef.current) {
      clearTimeout(foxyTimeoutRef.current);
    }

    const messageText = t[messageKey] as string;
    if (messageText) {
      setFoxyMessage(messageText);
      setCurrentFoxyMessageKey(messageKey);
      if (settings.foxyEnabled) {
        setIsFoxyVisible(true);
      }

      let shouldPlayAudio = true;
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
  }, [t, setIsFoxyVisible, setFoxyMessage, playFoxyAudio, foxyInitialGreetingPlayed, setFoxyInitialGreetingPlayed, setCurrentFoxyMessageKey, settings.foxyEnabled]);


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
    // Stop audio if there's no message, OR if Foxy is enabled but not visible.
    // This allows audio to play when Foxy is disabled but sound is on.
    if (!foxyMessage || (settings.foxyEnabled && !isFoxyVisible)) {
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
  }, [foxyMessage, isFoxyVisible, settings.foxyEnabled, setFoxyAnimationStateWithHappyLogic]);

  const prevScreenRef = useRef<string | null>(null);

  // Effect to stop Foxy and clear her state when navigating away from a screen where she was active
  useEffect(() => {
    const previousScreen = prevScreenRef.current;
    prevScreenRef.current = currentScreen; // Update for the next render cycle

    if (previousScreen && previousScreen !== currentScreen) {
      // Navigation has occurred from previousScreen to currentScreen.
      // If Foxy was visible and had a message (potentially from previousScreen),
      // clean up her state.
      if (isFoxyVisible && foxyMessage) {
        // Stop audio if playing
        if (foxyAudioRef.current && !foxyAudioRef.current.paused) {
          foxyAudioRef.current.pause();
          foxyAudioRef.current.currentTime = 0;
        }
        // Always reset src to abort any loading/pending play
        if (foxyAudioRef.current) {
          foxyAudioRef.current.src = '';
        }
        
        setFoxyAnimationStateWithHappyLogic('idle');
        
        // Clear message, key, and hide Foxy
        setFoxyMessage(null);
        setCurrentFoxyMessageKey(null);
        setIsFoxyVisible(false);

        // Clear any pending timeout for message duration
        if (foxyTimeoutRef.current) {
          clearTimeout(foxyTimeoutRef.current);
          foxyTimeoutRef.current = null;
        }
      }
    }
  }, [currentScreen, isFoxyVisible, foxyMessage, setFoxyAnimationStateWithHappyLogic, setFoxyMessage, setCurrentFoxyMessageKey, setIsFoxyVisible]);

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
      recordStrategySuccess, // Expose recordStrategySuccess
      recordLearningStyleSuccess,
      // foxyInitialGreetingPlayed, // Not strictly needed by consumers if showFoxyMessage handles it
      // setFoxyInitialGreetingPlayed, // Not strictly needed by consumers
    }}>
      {children}
    </GameContext.Provider>
  );
}

