export interface Translation {
  // Main Menu
  title: string;
  subtitle: string;
  practiceMode: string;
  quizMode: string;
  adventureMode: string;
  memoryGame: string;
  settings: string;
  progress: string;
  
  // Practice Mode
  practiceTitle: string;
  selectTable: string;
  showHints: string;
  backToMenu: string;
  
  // Quiz Mode
  quizTitle: string;
  score: string;
  timeLeft: string;
  question: string;
  correct: string;
  incorrect: string;
  tryAgain: string;
  wellDone: string;
  excellent: string;
  fantastic: string;
  yourResult: string;
  
  // Adventure Mode
  adventureTitle: string;
  level: string;
  stars: string;
  complete: string;
  nextLevel: string;
  
  // Memory Game
  memoryTitle: string;
  findPairs: string;
  moves: string;
  
  // Settings
  settingsTitle: string;
  language: string;
  difficulty: string;
  sound: string;
  on: string;
  off: string;
  easy: string;
  medium: string;
  hard: string;
  
  // Progress
  progressTitle: string;
  tablesLearned: string;
  totalStars: string;
  achievements: string;
  
  // Common
  welcomeMessage: string;
  start: string;
  play: string;
  pause: string;
  continue: string;
  restart: string;
  finish: string;
  next: string;
  previous: string;
  check: string;
  hint: string;
  answer: string;
  
  // Menu descriptions
  practiceModeDesc: string;
  quizModeDesc: string;
  adventureModeDesc: string;
  memoryGameDesc: string;
  
  // Quiz specific
  chooseDifficulty: string;
  tables1to5: string;
  tables1to10: string;
  tables1to12: string;
  seconds90: string;
  seconds60: string;
  seconds45: string;
  questions10: string;
  questionOf: string;
  points: string;
  correctAnswer: string;
  quizFinished: string;
  
  // Settings specific
  soundEnabled: string;
  soundDisabled: string;
  aboutGame: string;
  gameDescription: string;
  versionInfo: string;
  
  // Adventure mode specific
  chooseAdventure: string;
  tables: string;
  questions: string;
  time: string;
  required: string;
  completeLevel: string;
  
  // Level titles and descriptions
  level1Title: string;
  level1Desc: string;
  level2Title: string;
  level2Desc: string;
  level3Title: string;
  level3Desc: string;
  level4Title: string;
  level4Desc: string;
  level5Title: string;
  level5Desc: string;
  level6Title: string;
  level6Desc: string;
  level7Title: string;
  level7Desc: string;
  level8Title: string;
  level8Desc: string;
  level9Title: string;
  level9Desc: string;
  level10Title: string;
  level10Desc: string;
  
  // Memory game specific
  pairs: string;
  memoryComplete: string;
  reward: string;
  playAgain: string;
  
  // Real-world math
  realWorldMath: string;
  fantasyMath: string;
  realWorldDesc: string;
  fantasyDesc: string;
  
  // Progress/Achievement specific
  tablesProgress: string;
  mathChampion: string;
  allTablesMastered: string;
  tablesToMaster: string;
  requiredLabel: string;
  fantasticsProgress: string;
  greatKeepGoing: string;
  
  // Achievement titles
  firstStarTitle: string;
  starCollectorTitle: string;
  firstTableTitle: string;
  tableMasterTitle: string;
  hardWorkerTitle: string;
  mathChampionTitle: string;
  
  // Achievement descriptions
  firstStarDesc: string;
  starCollectorDesc: string;
  firstTableDesc: string;
  tableMasterDesc: string;
  hardWorkerDesc: string;
  mathChampionDesc: string;

  // AdventureMode specific
  levelCompleted: string;
  levelNotCompleted: string;
  correctAnswersLabel: string;
  accuracyLabel: string;
  starsEarnedLabel: string;
  repeatLevel: string;
  selectLevel: string;

  // FantasyMath specific
  magicProblemTitle: string;
  startMagicButton: string;
  magicExpressionQuestion: string;
  magicAnswerQuestion: string;
  checkMagicButton: string;
  magicCorrectResult: string;
  magicIncorrectResult: string;
  correctSpellLabel: string;
  magicStarMessage: string;
  moreMagicButton: string;
  otherAdventuresButtonFantasy: string;
  magicCalculationLabel: string;

  // MemoryGame specific
  resetButtonLabel: string;
  newDifficultyButton: string;
  changeDifficultyButton: string;

  // PracticeMode specific
  tableSeriesLabel: string; // e.g., "{tableNumber}er Reihe"
  correctAnswersSuffix: string;
  percentageCorrectSuffix: string;
  thinkHintPrefix: string;
  oneStarEarned: string;
  correctAnswerIs: string;
  newProblemButton: string;
  selectOtherTableButton: string;
  practiceAreasTitle: string;
  practiceAreasMessage: string;


  // Smart Strategy Legend
  smartStrategiesTitle: string;
  visualStrategyLabel: string;
  patternStrategyLabel: string;
  countingStrategyLabel: string;
  breakdownStrategyLabel: string;


  // Encouragement Messages
  keepTryingMessage: string;
  newStrategyLabel: string;
  consecutiveCorrectMessage: string;

  // Progress specific
  achievedStatus: string;

  // RealWorldMath specific
  problemLabel: string;
  startSolutionButton: string;
  expressionQuestion: string;
  answerQuestion: string;
  evaFantasticResult: string;
  tryAgainEva: string;
  correctSolutionLabel: string;
  foxyProudMessage: string;
  otherProblemsButton: string;
  calculationLabel: string;

  // Settings specific
  germanLanguage: string;
  russianLanguage: string;

  // Scenario Data (RealWorldMath & FantasyMath)
  realWorldScenarioData: ScenarioText[];
  fantasyScenarioData: ScenarioText[];

  // MemoryGame specific
  easyDetails: string; // e.g., "6 Paare • 1-5 Reihen"
  mediumDetails: string; // e.g., "8 Paare • 1-8 Reihen"
  hardDetails: string; // e.g., "10 Paare • 1-10 Reihen"
  puzzleEmoji: string;

  // PracticeMode specific
  tableButtonSuffix: string; // e.g., "x"
  mathSymbolsAlt: string;

  // Progress specific
  tableProgressSuffix: string; // e.g., "x"

  // AdventureMode specific
  timeSecondsSuffix: string; // e.g., "s"
  accuracyPercentSuffix: string; // e.g., "%"
  levelDefaultTitle: string; // e.g., "Level {id}"
  levelDefaultDesc: string; // e.g., "Description for level {id}"
  completeLevelRequirement: string; // e.g., "Complete Level {id}"

  // Settings specific
  difficultyEasyPrefix: string;
  difficultyMediumPrefix: string;
  difficultyHardPrefix: string;

  // Foxy specific
  foxyMascotAltText: string;
  foxyWelcomeMainMenu: string;
  foxyVisibilityTitle: string;
  foxyShow: string;
  foxyHide: string;
  foxyVisibilityDescriptionShow: string;
  foxyVisibilityDescriptionHide: string;

  // Foxy contextual messages
  foxyIntroPracticeMode: string;
  foxyIntroQuizMode: string;
  foxyIntroAdventureMode: string;
  foxyIntroMemoryGame: string;
  foxyIntroRealWorldMath: string;
  foxyIntroFantasyMath: string;

  foxyEncouragement1: string;
  foxyEncouragement2: string;
  foxyEncouragement3: string;

  foxyCongrats1: string;
  foxyCongrats2: string;
  foxyCongrats3: string;
  foxyCongratsAdventureLevel: string; // Added
  foxyCongratsQuiz: string; // Added
  foxyCongratsQuizHigh: string;
  foxyCongratsQuizMid: string;
  foxyCongratsQuizLow: string;

  foxyAdventureCorrectAnswer: string; // Added
  foxyQuizCorrectAnswer: string; // Added

  // Adventure Mode specific Foxy messages
  foxyAdventureIncorrect: string;
  foxyAdventureTimeLow: string;
  foxyAdventurePass1Star: string;
  foxyAdventurePass2Stars: string;
  foxyAdventurePass3Stars: string;
  foxyAdventureFail: string;

  // Memory Game specific Foxy messages
  foxyMemoryMatchFound: string;
  foxyMemoryNoMatch: string;
  foxyMemoryFewPairsLeft: string;
  foxyMemoryGameComplete: string;

  // RealWorldMath specific Foxy messages
  foxyRealWorldProblem: string;
  foxyRealWorldExpression: string;
  foxyRealWorldAnswer: string;
  foxyRealWorldCorrect: string;
  foxyRealWorldIncorrect: string;

  // FantasyMath specific Foxy messages
  foxyFantasyProblem: string;
  foxyFantasyExpression: string;
  foxyFantasyAnswer: string;
  foxyFantasyCorrect: string;
  foxyFantasyIncorrect: string;

  foxyEncouragementStreak3: string;
  foxyEncouragementStreak5: string;
  foxyEncouragementTryAgain: string;
  foxyEncouragementQuizKeepTrying: string;

  foxyTimeRunningOutQuiz: string;

  foxyHintMessage: string;
  foxyGeneralCorrectMessage: string; // Added for general correct answer feedback

  // PracticeMode Smart Explanations
  visualDotsResult?: string;
  skipCountingStep1?: string;
  skipCountingStep2?: string;
  skipCountingStep3?: string;
  decompositionStep1?: string;
  decompositionStep2?: string;
  decompositionStep3?: string;
  decompositionFallback?: string;
  ninesPatternConcept?: string;
  ninesStep1?: string;
  ninesStep2?: string;
  ninesStep3?: string;
  ninesStep4?: string;
  ninesPattern?: string;
  ninesMnemonic?: string;
  elevensPatternConcept?: string;
  elevensStep1?: string;
  elevensStep2?: string;
  elevensStep3?: string;
  elevensPattern?: string;
  elevensMnemonic?: string;
  visualArrayConcept?: string;
  visualStep1?: string;
  visualStep2?: string;
  visualStep3?: string;
  visualRealWorld?: string;
  skipCountingConcept?: string;
  skipCountingPattern?: string;
  skipCountingMnemonic?: string;
  decompositionConcept?: string;
  decompositionPattern?: string;
  strategyLabel?: string;
  strategyLabelSuffix?: string;
  keyConceptLabel?: string;
  visualLabel?: string;
  stepsLabel?: string;
  patternLabel?: string;
  memoryTrickLabel?: string;
  realWorldLabel?: string;

  // Strategy Names
  strategyVisualArray?: string;
  strategyPatternRecognition?: string;
  strategySkipCounting?: string;
  strategyDecomposition?: string;

  closeHintButton?: string;
}

export interface ScenarioText {
  title: string;
  description: string;
  problem: string;
}

import { germanTranslations } from './translations/de.js';
import { russianTranslations } from './translations/ru.js';

export const translations: Record<string, Translation> = {
  de: germanTranslations,
  ru: russianTranslations,
};
