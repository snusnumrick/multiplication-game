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
  foxyEnabled: boolean; // Added for Foxy visibility
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

  // Foxy specific
  foxyMessage: string | null;
  setFoxyMessage: (message: string | null) => void; // Retain for direct control if needed
  isFoxyVisible: boolean;
  setIsFoxyVisible: (visible: boolean) => void; // Retain for direct control if needed
  showFoxyMessage: (messageKey: keyof Translation, duration?: number) => void;
  foxyAnimationState: FoxyAnimationState;
  setFoxyAnimationState: (state: FoxyAnimationState) => void;
}

export type FoxyAnimationState = 'idle' | 'talking' | 'happy';

export const GameContext = createContext<GameContextType | undefined>(undefined);

