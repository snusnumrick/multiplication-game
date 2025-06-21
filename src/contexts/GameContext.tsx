import React, { useState, useEffect, ReactNode } from 'react';
import { translations } from '../translations';
import { GameContext } from './game-context-def';

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
};

export function GameProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<GameSettings>(defaultSettings);
  const [progress, setProgress] = useState<GameProgress>(defaultProgress);
  const [currentScreen, setCurrentScreen] = useState('menu');

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
  const playSound = (type: 'correct' | 'incorrect' | 'success' | 'click') => {
    if (!settings.soundEnabled) return;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
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
      console.log('Sound not available');
    }
  };

  const t = translations[settings.language];

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
    }}>
      {children}
    </GameContext.Provider>
  );
}

