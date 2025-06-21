import { createContext } from 'react';
import { Translation } from '../translations';

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

export interface GameContextType {
  // Settings
  settings: GameSettings;
  updateSettings: (newSettings: Partial<GameSettings>) => void;
  t: Translation;
  
  // Progress
  progress: GameProgress;
  updateProgress: (newProgress: Partial<GameProgress>) => void;
  addStars: (count: number) => void;
  completeTable: (table: number) => void;
  
  // Game State
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  
  // Sound Effects
  playSound: (type: 'correct' | 'incorrect' | 'success' | 'click') => void;
}

export const GameContext = createContext<GameContextType | undefined>(undefined);

