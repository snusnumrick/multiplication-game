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
  kinestheticStrategyLabel: string;
  auditoryStrategyLabel: string;


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
  foxyLetsPracticeNewTable?: string; // Added for PracticeMode table selection
  foxyAlternativeHintMessage?: string; // Added for when "Explain Differently" is used
  foxyNoMoreHintsMessage?: string; // Added for when no more alternative hints are available

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
  tensConcept?: string;
  tensStep1?: string;
  tensStep2?: string;
  tensStep3?: string;
  tensStep4?: string;
  tensPattern?: string;
  tensMnemonic?: string;
  twosConcept?: string;
  twosStep1?: string;
  twosStep2?: string;
  twosStep3?: string;
  twosPattern?: string;
  twosMnemonic?: string;
  fivesHalfOfTenConcept?: string;
  fivesHalfOfTenStep1?: string;
  fivesHalfOfTenStep2?: string;
  fivesHalfOfTenStep3?: string;
  fivesHalfOfTenPattern?: string;
  fivesHalfOfTenMnemonic?: string;
  fivesNickelCountingConcept?: string;
  fivesNickelCountingStep1?: string;
  fivesNickelCountingStep2?: string;
  fivesNickelCountingStep3?: string;
  fivesNickelCountingStep4?: string;
  fivesNickelCountingStep5?: string;
  fivesNickelCountingPattern?: string;
  fivesNickelCountingMnemonic?: string;
  fivesConcept?: string;
  fivesStep1?: string;
  fivesStep2?: string;
  fivesStep3?: string;
  fivesPattern?: string;
  fivesMnemonic?: string;
  pureDoublesConcept?: string;
  pureDoublesStep1?: string;
  pureDoublesStep2?: string;
  pureDoublesStep3?: string;
  pureDoublesStep4?: string;
  pureDoublesStep5?: string;
  pureDoublesPattern?: string;
  pureDoublesMnemonic?: string;
  squaresConcept?: string;
  squaresStep1?: string;
  squaresStep2?: string;
  squaresPattern?: string;
  squaresMnemonic?: string;
  advElevensConcept?: string;
  advElevensStep1?: string;
  advElevensStep2?: string;
  advElevensStep3?: string;
  advElevensStep4?: string;
  advElevensStep5?: string;
  advElevensStep6?: string;
  advElevensPattern?: string;
  advElevensMnemonic?: string;
  nearDoublesConcept?: string;
  nearDoublesStep1?: string;
  nearDoublesStep2?: string;
  nearDoublesStep3?: string;
  nearDoublesPattern?: string;
  nearDoublesMnemonic?: string;
  memoryTrickConcept?: string;
  memory_trick_6x8?: string;
  memory_trick_3x9?: string;
  ninesDigitSumConcept?: string;
  ninesDigitSumStep1?: string;
  ninesDigitSumStep2?: string;
  ninesDigitSumStep3?: string;
  ninesDigitSumStep4?: string;
  ninesDigitSumStep5?: string;
  ninesDigitSumPattern?: string;
  ninesDigitSumMnemonic?: string;
  ninesFingerTrickConcept?: string;
  ninesFingerTrickStep1?: string;
  ninesFingerTrickStep2?: string;
  ninesFingerTrickStep3?: string;
  ninesFingerTrickStep4?: string;
  ninesFingerTrickStep5?: string;
  ninesFingerTrickPattern?: string;
  ninesFingerTrickMnemonic?: string;
  benchmarkConcept?: string;
  benchmarkStep1?: string;
  benchmarkStep2?: string;
  benchmarkStep3?: string;
  benchmarkStep4?: string;
  benchmarkStep5?: string;
  benchmarkPattern?: string;
  benchmarkMnemonic?: string;
  roundingAndAdjustingConcept?: string;
  roundingAndAdjustingStep1?: string;
  roundingAndAdjustingStep2?: string;
  roundingAndAdjustingStep3?: string;
  roundingAndAdjustingStep4?: string;
  roundingAndAdjustingStep5?: string;
  roundingAndAdjustingPattern?: string;
  roundingAndAdjustingMnemonic?: string;
  leftToRightConcept?: string;
  leftToRightStep1?: string;
  leftToRightStep2?: string;
  leftToRightStep3?: string;
  leftToRightStep4?: string;
  leftToRightPattern?: string;
  leftToRightMnemonic?: string;
  bfkfConcept?: string;
  bfkfStep1?: string;
  bfkf3sStep2?: string;
  bfkf3sStep3?: string;
  bfkf3sStep4?: string;
  bfkf3sStep5?: string;
  bfkf3sPattern?: string;
  bfkf4sStep2?: string;
  bfkf4sStep3?: string;
  bfkf4sStep4?: string;
  bfkf4sStep5?: string;
  bfkf4sPattern?: string;
  bfkf6sStep2?: string;
  bfkf6sStep3?: string;
  bfkf6sStep4?: string;
  bfkf6sStep5?: string;
  bfkf6sPattern?: string;
  bfkf7sStep2?: string;
  bfkf7sStep3?: string;
  bfkf7sStep4?: string;
  bfkf7sStep5?: string;
  bfkf7sPattern?: string;
  bfkf8sStep2?: string;
  bfkf8sStep3?: string;
  bfkf8sStep4?: string;
  bfkf8sStep5?: string;
  bfkf8sPattern?: string;
  bfkfMnemonic?: string;
  onesConcept?: string;
  onesStep1?: string;
  onesStep2?: string;
  onesStep3?: string;
  onesPattern?: string;
  onesMnemonic?: string;
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
  strategyDoubles?: string;
  strategyPureDoubles?: string;
  strategyFivesHalfOfTen?: string;
  strategyFivesNickelCounting?: string;
  strategySquares?: string;
  strategyNearDoubles?: string; // Added for Near Doubles strategy name
  strategyBuildingKnownFacts?: string;
  strategyOnes?: string;
  strategyTens?: string;
  strategyNines?: string;
  strategyNinesDigitSum?: string;
  strategyNinesFingerTrick?: string;
  strategyElevens?: string;
  strategyAdvancedElevens?: string;
  strategyMemoryTrick?: string;
  strategyBenchmark?: string;
  strategyRoundingAndAdjusting?: string;
  strategyLeftToRight?: string;

  closeHintButton?: string;
  explainDifferentlyButton?: string;
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
