// Enhanced practice mode with smart explanations AND Foxy integration
export interface ExplanationContent {
  visual?: string;
  steps: string[];
  concept: string;
  realWorld?: string;
  pattern?: string;
  mnemonics?: string;
  strategy: string;
}

export interface UserProgress {
  level: number;
  strugglingWith: number[];
  preferredStrategy: string;
  mistakePatterns: string[];
  consecutiveCorrect: number;
}
