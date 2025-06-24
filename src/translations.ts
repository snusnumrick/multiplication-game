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
}

export interface ScenarioText {
  title: string;
  description: string;
  problem: string;
}

export const translations: Record<string, Translation> = {
  de: {
    // Main Menu
    title: "Evas Einmaleins Spiel",
    subtitle: "Lerne mit Foxy das Einmaleins!",
    practiceMode: "Üben",
    quizMode: "Quiz",
    adventureMode: "Abenteuer",
    memoryGame: "Memory",
    settings: "Einstellungen",
    progress: "Fortschritt",
    
    // Practice Mode
    practiceTitle: "Einmaleins Üben",
    selectTable: "Wähle eine Reihe:",
    showHints: "Tipps anzeigen",
    backToMenu: "Zurück zum Menü",
    smartStrategiesTitle: "Schlaue Strategien:",
    visualStrategyLabel: "Sehen: Punkte zählen",
    patternStrategyLabel: "Muster: Spezielle Tricks",
    countingStrategyLabel: "Schritte: In Schritten zählen",
    breakdownStrategyLabel: "Aufteilen: Große Zahlen teilen",
    practiceAreasTitle: "Übungsbereiche:",
    practiceAreasMessage: "Du übst gerade mit der {tables} Reihe. Das wird bestimmt super - die schlauen Tipps helfen dir dabei! 💪",
    keepTryingMessage: "Gib nicht auf! Probiere den schlauen Tipp für einen anderen Lösungsweg.",
    newStrategyLabel: "Neue Strategie",
    consecutiveCorrectMessage: "{count} hintereinander! Du bist super!",
    
    // Quiz Mode
    quizTitle: "Einmaleins Quiz",
    score: "Punkte",
    timeLeft: "Zeit übrig",
    question: "Frage",
    correct: "Super, Eva!",
    incorrect: "Fast richtig, Eva!",
    tryAgain: "Du schaffst das, Eva! Foxy glaubt an dich!",
    wellDone: "Toll gemacht, Eva!",
    excellent: "Ausgezeichnet, Eva! Foxy ist stolz auf dich!",
    fantastic: "Fantastisch, Eva! Du bist ein Mathe-Star!",
    yourResult: "Ihr Ergebnis:",

    // Adventure Mode
    adventureTitle: "Mathe Abenteuer",
    level: "Level",
    stars: "Sterne",
    complete: "Abgeschlossen",
    nextLevel: "Nächstes Level",
    
    // Memory Game
    memoryTitle: "Einmaleins Memory",
    findPairs: "Finde die Paare",
    moves: "Züge",
    
    // Settings
    settingsTitle: "Einstellungen",
    language: "Sprache",
    difficulty: "Schwierigkeit",
    sound: "Ton",
    on: "An",
    off: "Aus",
    easy: "Leicht",
    medium: "Mittel",
    hard: "Schwer",
    
    // Progress
    progressTitle: "Evas Fortschritt",
    tablesLearned: "Evas gelernte Reihen",
    totalStars: "Evas Sterne",
    achievements: "Evas Erfolge",
    
    // Common
    welcomeMessage: "Willkommen zurück, Eva! Foxy freut sich, mit dir zu lernen! 🦊✨",
    start: "Start",
    play: "Spielen",
    pause: "Pause",
    continue: "Weiter",
    restart: "Neu starten",
    finish: "Fertig",
    next: "Weiter",
    previous: "Zurück",
    check: "Prüfen",
    hint: "Tipp",
    answer: "Antwort",
    
    // Menu descriptions
    practiceModeDesc: "Übe mit Foxy in deinem eigenen Tempo",
    quizModeDesc: "Zeige Foxy dein Wissen!",
    adventureModeDesc: "Gehe mit Foxy auf ein Mathe-Abenteuer!",
    memoryGameDesc: "Hilf Foxy, die passenden Paare zu finden!",
    
    // Quiz specific
    chooseDifficulty: "Wähle deine Schwierigkeit:",
    tables1to5: "1-5 Reihen",
    tables1to10: "1-10 Reihen",
    tables1to12: "1-12 Reihen",
    seconds90: "90 Sekunden",
    seconds60: "60 Sekunden",
    seconds45: "45 Sekunden",
    questions10: "10 Fragen",
    questionOf: "Frage",
    points: "Punkte",
    correctAnswer: "Richtige Antwort",
    quizFinished: "Quiz beendet!",
    
    // Settings specific
    soundEnabled: "Töne und Effekte sind aktiviert",
    soundDisabled: "Töne und Effekte sind deaktiviert",
    aboutGame: "Über das Spiel",
    gameDescription: "Hallo Eva! Dieses Spiel hilft dir und Foxy dabei, das Einmaleins spielerisch zu lernen. Wähle zwischen verschiedenen Spielmodi und sammle Sterne für richtige Antworten!",
    versionInfo: "Version 2.0 • Speziell für iPad optimiert",
    
    // Adventure mode specific
    chooseAdventure: "Wähle dein Abenteuer!",
    tables: "Reihen:",
    questions: "Fragen",
    time: "Zeit",
    required: "benötigt",
    completeLevel: "Schließe Level",
    
    // Level titles and descriptions
    level1Title: "Kleine Schritte",
    level1Desc: "Lerne die 1er und 2er Reihe",
    level2Title: "Dreifacher Spaß",
    level2Desc: "Meistere die 3er Reihe",
    level3Title: "Viereckige Zahlen",
    level3Desc: "Entdecke die 4er Reihe",
    level4Title: "Fünf Sterne",
    level4Desc: "Die 5er Reihe wartet auf dich!",
    level5Title: "Sechser Zauber",
    level5Desc: "Bezaubere mit der 6er Reihe",
    level6Title: "Glückszahl Sieben",
    level6Desc: "Die 7er Reihe bringt Glück!",
    level7Title: "Acht Achterbahn",
    level7Desc: "Fahre mit der 8er Reihe Achterbahn",
    level8Title: "Neun Leben",
    level8Desc: "Die 9er Reihe hat neun Leben",
    level9Title: "Perfekte Zehn",
    level9Desc: "Erreiche die Perfektion mit der 10er Reihe",
    level10Title: "Großer Champion",
    level10Desc: "Meistere alle Reihen zusammen!",
    
    // Memory game specific
    pairs: "Paare",
    memoryComplete: "Du hast alle Paare in {moves} Zügen gefunden!",
    reward: "Belohnung:",
    playAgain: "Nochmal",
    
    // Real-world math
    realWorldMath: "Mathe im Alltag",
    fantasyMath: "Zauberhafte Mathematik",
    realWorldDesc: "Entdecke Foxy, wo Einmaleins im echten Leben vorkommt!",
    fantasyDesc: "Tauche mit Foxy in magische Welten ein und lerne mit Zauberwesen!",
    
    // Progress/Achievement specific
    tablesProgress: "Einmaleins-Reihen Fortschritt",
    mathChampion: "Du bist ein echter Mathe-Champion! 🏆",
    allTablesMastered: "Du hast alle Einmaleins-Reihen gemeistert!",
    tablesToMaster: "Noch {count} Reihen bis zum Einmaleins-Meister!",
    fantasticsProgress: "Fantastisch! Du machst tolle Fortschritte! ⭐",
    greatKeepGoing: "Großartig! Weiter so! 🌟",
    requiredLabel: "Benötigt:",
    
    // Achievement titles
    firstStarTitle: "Erster Stern",
    starCollectorTitle: "Sternensammler",
    firstTableTitle: "Erste Reihe gemeistert",
    tableMasterTitle: "Einmaleins-Meister",
    hardWorkerTitle: "Fleißbienchen",
    mathChampionTitle: "Mathe-Champion",
    
    // Achievement descriptions
    firstStarDesc: "Sammle deinen ersten Stern",
    starCollectorDesc: "Sammle 50 Sterne",
    firstTableDesc: "Lerne deine erste Einmaleins-Reihe",
    tableMasterDesc: "Lerne alle 10 Einmaleins-Reihen",
    hardWorkerDesc: "Sammle 100 Sterne",
    mathChampionDesc: "Sammle 200 Sterne",

    // AdventureMode specific
    levelCompleted: "Level geschafft!",
    levelNotCompleted: "Noch nicht geschafft",
    correctAnswersLabel: "Richtige Antworten:",
    accuracyLabel: "Genauigkeit:",
    starsEarnedLabel: "Sterne erhalten:",
    repeatLevel: "Wiederholen",
    selectLevel: "Level wählen",

    // FantasyMath specific
    magicProblemTitle: "Magische Aufgabe:",
    startMagicButton: "Magie beginnen",
    magicExpressionQuestion: "Welcher Zauber löst diese Aufgabe?",
    magicAnswerQuestion: "Welches magische Ergebnis?",
    checkMagicButton: "Magie prüfen",
    magicCorrectResult: "Fantastisch, Eva! Die Magie hat geklappt!",
    magicIncorrectResult: "Versuche deine Magie nochmal!",
    correctSpellLabel: "Richtiger Zauber:",
    magicStarMessage: "Foxy bewundert deine Magie!",
    moreMagicButton: "Mehr Magie",
    otherAdventuresButtonFantasy: "Andere Abenteuer",
    magicCalculationLabel: "Magische Rechnung:",

    // MemoryGame specific
    resetButtonLabel: "Neu",
    newDifficultyButton: "Neue Schwierigkeit",
    changeDifficultyButton: "Schwierigkeit ändern",

    // PracticeMode specific
    tableSeriesLabel: "{tableNumber}er Reihe",
    correctAnswersSuffix: "richtig",
    percentageCorrectSuffix: "% richtig",
    thinkHintPrefix: "Denke an:",
    oneStarEarned: "+1 Stern erhalten!",
    correctAnswerIs: "Die richtige Antwort ist",
    newProblemButton: "Neue Aufgabe",
    selectOtherTableButton: "Andere Reihe wählen",

    // Progress specific
    achievedStatus: "Erreicht!",

    // RealWorldMath specific
    problemLabel: "Aufgabe:",
    startSolutionButton: "Lösung beginnen",
    expressionQuestion: "Welcher Ausdruck löst diese Aufgabe?",
    answerQuestion: "Wie lautet die Antwort?",
    evaFantasticResult: "Fantastisch, Eva!",
    tryAgainEva: "Versuche es nochmal!",
    correctSolutionLabel: "Richtige Lösung:",
    foxyProudMessage: "Foxy ist stolz auf dich!",
    otherProblemsButton: "Andere Aufgaben",
    calculationLabel: "Rechnung:",

    // Settings specific
    germanLanguage: "Deutsch",
    russianLanguage: "Русский",

    // Scenario Data (RealWorldMath)
    realWorldScenarioData: [
      {
        title: "Einkaufen im Laden",
        description: "Eva kauft Geschenke für Freunde",
        problem: "Eva möchte 4 Packungen Aufkleber kaufen. Jede Packung hat 6 Aufkleber. Wie viele Aufkleber wird sie insgesamt haben?",
      },
      {
        title: "Bauen mit Blöcken",
        description: "Eva baut ein Schloss aus Bauklötzen",
        problem: "Eva baut ein Schloss. Jede Etage hat 7 Blöcke und es gibt 3 Etagen. Wie viele Blöcke braucht sie für das ganze Schloss?",
      },
      {
        title: "Busfahrt zum Zoo",
        description: "Ausflug in den Zoo",
        problem: "Der Bus hat 8 Sitzreihen. In jeder Reihe können 4 Personen sitzen. Wie viele Menschen passen in den Bus?",
      },
      {
        title: "Pizza für die Party",
        description: "Eva bestellt Pizza für ihren Geburtstag",
        problem: "Eva hat 3 Pizzen bestellt. Jede Pizza wurde in 8 Stücke geschnitten. Wie viele Pizzastücke gibt es insgesamt?",
      },
      {
        title: "Brettspiel",
        description: "Spiel mit Foxy und Freunden",
        problem: "Eva spielt ein Brettspiel. Jeder der 5 Spieler hat 6 Karten. Wie viele Karten sind insgesamt im Spiel?",
      },
      {
        title: "Blumengarten",
        description: "Eva pflanzt Blumen im Garten",
        problem: "Eva hat Blumen in 4 Reihen gepflanzt. In jeder Reihe sind 9 Blumen. Wie viele Blumen hat Eva insgesamt gepflanzt?",
      },
    ],

    // Scenario Data (FantasyMath)
    fantasyScenarioData: [
      {
        title: "Drachenschätze",
        description: "Eva hilft einem freundlichen Drachen",
        problem: "Drache Fira bewacht 3 Schatzhöhlen. In jeder Höhle sind 7 Goldmünzen. Wie viele Goldmünzen hat der Drache insgesamt?",
      },
      {
        title: "Einhorn im Wald",
        description: "Eva trifft ein magisches Einhorn",
        problem: "Einhorn Starlight hat 4 Regenbogen erschaffen. Jeder Regenbogen hat 6 bunte Streifen. Wie viele Farbstreifen hat das Einhorn insgesamt gemacht?",
      },
      {
        title: "Meerjungfrau Schloss",
        description: "Eva taucht zu einer Meerjungfrau ins Unterwasserreich",
        problem: "Meerjungfrau Marina schmückt ihr Schloss. Sie hat Perlen in 5 Reihen mit je 8 Perlen gelegt. Wie viele Perlen sind das insgesamt?",
      },
      {
        title: "Blütenfee",
        description: "Eva hilft der Blumenfee",
        problem: "Fee Bloom pflanzt Zauberblumen. Sie hat 6 Beete angelegt, auf jedem Beet sind 9 Blumen. Wie viele Zauberblumen hat die Fee insgesamt gepflanzt?",
      },
      {
        title: "Phönix und Flammen",
        description: "Eva beobachtet den Feuervogel",
        problem: "Phönix Flame erschafft Feuerfedern. Er hat 7 Gruppen mit je 5 Federn pro Gruppe gemacht. Wie viele Feuerfedern sind das insgesamt?",
      },
      {
        title: "Zauberer Foxy",
        description: "Foxy lernt Magie zusammen mit Eva",
        problem: "Zauberer Foxy braut Zaubertränke. Er hat 8 Kessel, in jedem Kessel sind 4 magische Zutaten. Wie viele Zutaten sind das insgesamt?",
      },
    ],

    // MemoryGame specific
    easyDetails: "6 Paare • 1-5 Reihen",
    mediumDetails: "8 Paare • 1-8 Reihen",
    hardDetails: "10 Paare • 1-10 Reihen",
    puzzleEmoji: "🧩",

    // PracticeMode specific
    tableButtonSuffix: "x",
    mathSymbolsAlt: "Mathe Symbole",


    // Progress specific
    tableProgressSuffix: "x",

    // AdventureMode specific
    timeSecondsSuffix: "s",
    accuracyPercentSuffix: "%",
    levelDefaultTitle: "Level {id}",
    levelDefaultDesc: "Beschreibung für Level {id}",
    completeLevelRequirement: "Schließe Level {id} ab",

    // Settings specific
    difficultyEasyPrefix: "🌟",
    difficultyMediumPrefix: "⭐⭐",
    difficultyHardPrefix: "⭐⭐⭐",

    // Foxy specific
    foxyMascotAltText: "Foxy das Maskottchen",
    foxyWelcomeMainMenu: "Hallo Eva! Ich bin Foxy! Lass uns zusammen das Einmaleins entdecken. Wähle ein Spiel, um zu starten!",
    foxyVisibilityTitle: "Foxy Sichtbarkeit",
    foxyShow: "Anzeigen",
    foxyHide: "Verstecken",
    foxyVisibilityDescriptionShow: "Foxy ist sichtbar und hilft dir.",
    foxyVisibilityDescriptionHide: "Foxy ist versteckt.",

    // Foxy contextual messages
    foxyIntroPracticeMode: "Hallo Eva! Im Übungsmodus kannst du ganz in Ruhe die Einmaleinsreihen trainieren. Foxy ist da, um dir zu helfen!",
    foxyIntroQuizMode: "Zeit für ein Quiz, Eva! Zeig Foxy, was du gelernt hast. Viel Erfolg!",
    foxyIntroAdventureMode: "Auf ins Abenteuer, Eva! Foxy begleitet dich auf dieser spannenden Reise durch die Welt der Zahlen.",
    foxyIntroMemoryGame: "Finde die passenden Karten, Eva! Foxy drückt dir die Daumen für dieses knifflige Memory.",
    foxyIntroRealWorldMath: "Schau mal, Eva! Hier zeigt dir Foxy, wo Mathe im Alltag überall steckt. Spannend, oder?",
    foxyIntroFantasyMath: "Willkommen in der Zauberwelt, Eva! Foxy und magische Wesen warten darauf, mit dir Mathe zu entdecken.",

    foxyEncouragement1: "Du machst das super, Eva! Foxy ist stolz auf dich. Weiter so!",
    foxyEncouragement2: "Foxy weiß, dass du das schaffst! Gib nicht auf!",
    foxyEncouragement3: "Genau so! Übung macht den Meister, Eva!",

    foxyCongrats1: "Wow, Eva! Foxy ist total beeindruckt von dir!",
    foxyCongrats2: "Spitze! Du bist ein richtiges Mathe-Genie, Eva!",
    foxyCongrats3: "Juhu, geschafft! Foxy feiert mit dir diesen Erfolg!",
    foxyCongratsAdventureLevel: "Super, Eva! Level geschafft! Foxy ist stolz auf deine Abenteuerlust!",
    foxyCongratsQuiz: "Klasse Leistung im Quiz, Eva! Foxy wusste, dass du es rockst!",
    foxyCongratsQuizHigh: "Unglaubliche Punktzahl, Eva! Foxy jubelt über deine Mathe-Künste!",
    foxyCongratsQuizMid: "Tolle Arbeit, Eva! Foxy sieht einen Mathe-Star heranwachsen!",
    foxyCongratsQuizLow: "Gut gemacht, Eva! Übe weiter, und Foxy weiß, du wirst noch besser!",

    foxyAdventureCorrectAnswer: "Richtig so, Abenteurerin Eva! Foxy feuert dich an!",
    foxyQuizCorrectAnswer: "Genau richtig, Quiz-Champion Eva! Foxy ist begeistert!",

    // Adventure Mode specific Foxy messages
    foxyAdventureIncorrect: "Das war nicht ganz richtig. Schau genau hin und versuch es nochmal!",
    foxyAdventureTimeLow: "Vorsicht, die Zeit wird knapp!",
    foxyAdventurePass1Star: "Super, Level geschafft und 1 Stern für dich!",
    foxyAdventurePass2Stars: "Ausgezeichnet! Level gemeistert und 2 Sterne verdient!",
    foxyAdventurePass3Stars: "Wow! Fantastisch! 3 Sterne für dich in diesem Level!",
    foxyAdventureFail: "Schade, diesmal nicht bestanden. Gib nicht auf, versuch es nochmal!",

    // Memory Game specific Foxy messages
    foxyMemoryMatchFound: "Super Fund, Eva! Das ist ein Paar!",
    foxyMemoryNoMatch: "Nicht ganz ein Paar. Such weiter, Foxy weiß, du findest sie!",
    foxyMemoryFewPairsLeft: "Fast geschafft, Eva! Nur noch ein paar Paare!",
    foxyMemoryGameComplete: "Juhu! Du hast alle Paare gefunden, Eva! Foxy ist mega stolz!",

    // RealWorldMath specific Foxy messages
    foxyRealWorldProblem: "Hier ist eine Alltagsaufgabe, Eva! Überlege, wie Multiplizieren helfen kann.",
    foxyRealWorldExpression: "Welche Rechnung passt zur Geschichte, Eva? Foxy ist gespannt!",
    foxyRealWorldAnswer: "Super! Und was ist die Lösung? Foxy weiß, du kannst das ausrechnen!",
    foxyRealWorldCorrect: "Genau! Das hast du wie ein Profi gelöst, Eva! Foxy ist super beeindruckt!",
    foxyRealWorldIncorrect: "Hmm, das stimmt nicht ganz. Schauen wir uns die Lösung gemeinsam an und lernen daraus, Eva!",

    // FantasyMath specific Foxy messages
    foxyFantasyProblem: "Eine magische Herausforderung erwartet dich, Eva! Welcher Zauber wird sie lösen?",
    foxyFantasyExpression: "Wähle deine Zauberformel weise, Eva! Foxy glaubt an deine Kraft!",
    foxyFantasyAnswer: "Der Zauber ist fast fertig! Was ist die letzte magische Zahl, Eva?",
    foxyFantasyCorrect: "Abrakadabra! Du hast die Magie gemeistert, Eva! Foxy ist erstaunt über deine Fähigkeiten!",
    foxyFantasyIncorrect: "Oh je, der Zauber ist etwas verpufft. Schauen wir uns die richtige Magie an und versuchen es nochmal, Eva!",

    foxyEncouragementStreak3: "Wow, 3 in Folge! Du hast einen Lauf!",
    foxyEncouragementStreak5: "Wahnsinn, 5 richtig! Foxy ist super beeindruckt!",
    foxyEncouragementTryAgain: "Hoppla, nicht ganz! Foxy weiß, du schaffst die nächste!",
    foxyEncouragementQuizKeepTrying: "Guter Versuch, Eva! Foxy sagt: Nicht aufgeben, Übung macht den Meister!",

    foxyTimeRunningOutQuiz: "Die Zeit wird knapp, Eva! Konzentrier dich und gib nochmal alles!",

    foxyHintMessage: "Hmm, brauchst du einen kleinen Tipp von Foxy?",
  },
  
  ru: {
    // Main Menu
    title: "Игра Евы: Таблица Умножения",
    subtitle: "Изучай с Фокси таблицу умножения!",
    practiceMode: "Практика",
    quizMode: "Викторина",
    adventureMode: "Приключение",
    memoryGame: "Мемори",
    settings: "Настройки",
    progress: "Прогресс",
    
    // Practice Mode
    practiceTitle: "Практика Умножения",
    selectTable: "Выбери таблицу:",
    showHints: "Показать подсказки",
    backToMenu: "В главное меню",
    smartStrategiesTitle: "Умные стратегии:",
    visualStrategyLabel: "Видеть: Считать точки",
    patternStrategyLabel: "Шаблон: Особые трюки",
    countingStrategyLabel: "Шаги: Считать по шагам",
    breakdownStrategyLabel: "Разбивать: Делить большие числа",
    practiceAreasTitle: "Области практики:",
    practiceAreasMessage: "Ты практикуешь таблицу на {tables}. Это будет отлично - умные подсказки помогут тебе! 💪",
    keepTryingMessage: "Не сдавайся! Попробуй умную подсказку для помощи.",
    newStrategyLabel: "Новая стратегия",
    consecutiveCorrectMessage: "{count} подряд! Потрясающе!",


    // Quiz Mode
    quizTitle: "Викторина Умножения",
    score: "Счёт",
    timeLeft: "Время",
    question: "Вопрос",
    correct: "Отлично, Ева!",
    incorrect: "Почти правильно, Ева!",
    tryAgain: "У тебя получится, Ева! Фокси верит в тебя!",
    wellDone: "Молодец, Ева!",
    excellent: "Превосходно, Ева! Фокси гордится тобой!",
    fantastic: "Фантастика, Ева! Ты звезда математики!",
    yourResult: "Твой результат:",

    
    // Adventure Mode
    adventureTitle: "Математическое Приключение",
    level: "Уровень",
    stars: "Звёзды",
    complete: "Завершено",
    nextLevel: "Следующий уровень",
    
    // Memory Game
    memoryTitle: "Мемори Умножения",
    findPairs: "Найди пары",
    moves: "Ходы",
    
    // Settings
    settingsTitle: "Настройки",
    language: "Язык",
    difficulty: "Сложность",
    sound: "Звук",
    on: "Вкл",
    off: "Выкл",
    easy: "Легко",
    medium: "Средне",
    hard: "Сложно",
    
    // Progress
    progressTitle: "Прогресс Евы",
    tablesLearned: "Таблицы Евы",
    totalStars: "Звёзды Евы",
    achievements: "Достижения Евы",
    
    // Common
    welcomeMessage: "Добро пожаловать, Ева! Фокси рада учиться вместе с тобой! 🦊✨",
    start: "Старт",
    play: "Играть",
    pause: "Пауза",
    continue: "Продолжить",
    restart: "Начать заново",
    finish: "Финиш",
    next: "Далее",
    previous: "Назад",
    check: "Проверить",
    hint: "Подсказка",
    answer: "Ответ",
    
    // Menu descriptions
    practiceModeDesc: "Тренируйся с Фокси в своём темпе",
    quizModeDesc: "Покажи Фокси свои знания!",
    adventureModeDesc: "Отправляйся с Фокси в математическое приключение!",
    memoryGameDesc: "Помоги Фокси найти подходящие пары!",
    
    // Quiz specific
    chooseDifficulty: "Выбери сложность:",
    tables1to5: "Таблицы 1-5",
    tables1to10: "Таблицы 1-10",
    tables1to12: "Таблицы 1-12",
    seconds90: "90 секунд",
    seconds60: "60 секунд",
    seconds45: "45 секунд",
    questions10: "10 вопросов",
    questionOf: "Вопрос",
    points: "очков",
    correctAnswer: "Правильный ответ",
    quizFinished: "Викторина закончена!",
    
    // Settings specific
    soundEnabled: "Звуки и эффекты включены",
    soundDisabled: "Звуки и эффекты выключены",
    aboutGame: "Об игре",
    gameDescription: "Привет, Ева! Эта игра поможет тебе и Фокси выучить таблицу умножения, играя. Выбирай между разными режимами игры и собирай звёзды за правильные ответы!",
    versionInfo: "Версия 2.0 • Специально оптимизировано для iPad",
    
    // Adventure mode specific
    chooseAdventure: "Выбери своё приключение!",
    tables: "Таблицы:",
    questions: "вопросов",
    time: "времени",
    required: "нужно",
    completeLevel: "Пройди уровень",
    
    // Level titles and descriptions
    level1Title: "Первые шаги",
    level1Desc: "Изучи таблицы 1 и 2",
    level2Title: "Тройной веселье",
    level2Desc: "Освой таблицу на 3",
    level3Title: "Квадратные числа",
    level3Desc: "Открой таблицу на 4",
    level4Title: "Пять звёзд",
    level4Desc: "Таблица на 5 ждёт тебя!",
    level5Title: "Магия шестёрки",
    level5Desc: "Очаруй таблицей на 6",
    level6Title: "Счастливая семёрка",
    level6Desc: "Таблица на 7 приносит удачу!",
    level7Title: "Восьмёрка-горка",
    level7Desc: "Прокатись с таблицей на 8",
    level8Title: "Девять жизней",
    level8Desc: "У таблицы на 9 девять жизней",
    level9Title: "Идеальная десятка",
    level9Desc: "Достигни совершенства с таблицей на 10",
    level10Title: "Великий чемпион",
    level10Desc: "Освой все таблицы вместе!",
    
    // Memory game specific
    pairs: "пар",
    memoryComplete: "Ты нашла все пары за {moves} ходов!",
    reward: "Награда:",
    playAgain: "Ещё раз",
    
    // Real-world math
    realWorldMath: "Математика в жизни",
    fantasyMath: "Волшебная математика",
    realWorldDesc: "Открой с Фокси, где умножение встречается в реальной жизни!",
    fantasyDesc: "Погрузись с Фокси в волшебные миры и изучай умножение с магическими существами!",
    
    // Progress/Achievement specific
    tablesProgress: "Прогресс изучения таблиц",
    mathChampion: "Ты настоящий чемпион математики! 🏆",
    allTablesMastered: "Ты освоила все таблицы умножения!",
    tablesToMaster: "Ещё {count} таблиц до звания мастера умножения!",
    fantasticsProgress: "Фантастика! Ты делаешь отличные успехи! ⭐",
    greatKeepGoing: "Прекрасно! Так держать! 🌟",
    requiredLabel: "Нужно:",
    
    // Achievement titles
    firstStarTitle: "Первая звезда",
    starCollectorTitle: "Коллекционер звёзд",
    firstTableTitle: "Первая таблица",
    tableMasterTitle: "Мастер умножения",
    hardWorkerTitle: "Трудолюбивая пчёлка",
    mathChampionTitle: "Чемпион математики",
    
    // Achievement descriptions
    firstStarDesc: "Собери свою первую звезду",
    starCollectorDesc: "Собери 50 звёзд",
    firstTableDesc: "Выучи свою первую таблицу умножения",
    tableMasterDesc: "Выучи все 10 таблиц умножения",
    hardWorkerDesc: "Собери 100 звёзд",
    mathChampionDesc: "Собери 200 звёзд",

    // AdventureMode specific
    levelCompleted: "Уровень пройден!",
    levelNotCompleted: "Ещё не пройдено",
    correctAnswersLabel: "Правильные ответы:",
    accuracyLabel: "Точность:",
    starsEarnedLabel: "Получено звёзд:",
    repeatLevel: "Повторить",
    selectLevel: "Выбрать уровень",

    // FantasyMath specific
    magicProblemTitle: "Волшебная задача:",
    startMagicButton: "Начать магию",
    magicExpressionQuestion: "Какое заклинание решает эту задачу?",
    magicAnswerQuestion: "Какой магический результат?",
    checkMagicButton: "Проверить магию",
    magicCorrectResult: "Потрясающе, Ева! Магия удалась!",
    magicIncorrectResult: "Попробуй свою магию ещё раз!",
    correctSpellLabel: "Правильное заклинание:",
    magicStarMessage: "Фокси восхищается твоей магией!",
    moreMagicButton: "Ещё магии",
    otherAdventuresButtonFantasy: "Другие приключения",
    magicCalculationLabel: "Магическое умножение:",

    // MemoryGame specific
    resetButtonLabel: "Заново",
    newDifficultyButton: "Новая сложность",
    changeDifficultyButton: "Изменить сложность",

    // PracticeMode specific
    tableSeriesLabel: "Таблица на {tableNumber}",
    correctAnswersSuffix: "правильно",
    percentageCorrectSuffix: "% правильно",
    thinkHintPrefix: "Подумай:",
    oneStarEarned: "+1 звезда получена!",
    correctAnswerIs: "Правильный ответ",
    newProblemButton: "Новое задание",
    selectOtherTableButton: "Выбрать другую таблицу",

    // Progress specific
    achievedStatus: "Достигнуто!",

    // RealWorldMath specific
    problemLabel: "Задача:",
    startSolutionButton: "Начать решение",
    expressionQuestion: "Какое выражение решает эту задачу?",
    answerQuestion: "Какой ответ?",
    evaFantasticResult: "Отлично, Ева!",
    tryAgainEva: "Попробуй ещё раз!",
    correctSolutionLabel: "Правильное решение:",
    foxyProudMessage: "Фокси гордится тобой!",
    otherProblemsButton: "Другие задачи",
    calculationLabel: "Умножение:",

    // Settings specific
    germanLanguage: "Немецкий",
    russianLanguage: "Русский",

    // Scenario Data (RealWorldMath)
    realWorldScenarioData: [
      {
        title: "Покупки в магазине",
        description: "Ева покупает подарки для друзей",
        problem: "Ева хочет купить 4 упаковки наклеек. В каждой упаковке 6 наклеек. Сколько всего наклеек у неё будет?",
      },
      {
        title: "Строительство с блоками",
        description: "Ева строит замок из кубиков",
        problem: "Ева строит замок. На каждом этаже 7 кубиков, а этажей 3. Сколько кубиков нужно для всего замка?",
      },
      {
        title: "Путешествие на автобусе",
        description: "Поездка в зоопарк",
        problem: "В автобусе 8 рядов сидений. В каждом ряду помещается 4 человека. Сколько людей поместится в автобусе?",
      },
      {
        title: "Пицца для вечеринки",
        description: "Ева заказывает пиццу на день рождения",
        problem: "Ева заказала 3 пиццы. Каждую пиццу разрезали на 8 кусочков. Сколько всего кусочков пиццы?",
      },
      {
        title: "Настольная игра",
        description: "Игра с Фокси и друзьями",
        problem: "Ева играет в настольную игру. У каждого из 5 игроков по 6 карт. Сколько всего карт в игре?",
      },
      {
        title: "Сад с цветами",
        description: "Ева сажает цветы в саду",
        problem: "Ева посадила цветы в 4 ряда. В каждом ряду 9 цветков. Сколько всего цветков посадила Ева?",
      },
    ],

    // Scenario Data (FantasyMath)
    fantasyScenarioData: [
      {
        title: "Драконьи сокровища",
        description: "Ева помогает дружелюбному дракону",
        problem: "Дракон Фира охраняет 3 пещеры с сокровищами. В каждой пещере 7 золотых монет. Сколько всего золотых монет у дракона?",
      },
      {
        title: "Единорог в лесу",
        description: "Ева встречает волшебного единорога",
        problem: "Единорог Старлайт создал 4 радуги. На каждой радуге 6 разноцветных полос. Сколько всего цветных полос создал единорог?",
      },
      {
        title: "Русалочий замок",
        description: "Ева ныряет к русалке в подводное царство",
        problem: "Русалка Марина украшает свой замок. Она разложила жемчужины в 5 рядов по 8 жемчужин в каждом. Сколько всего жемчужин?",
      },
      {
        title: "Фея цветов",
        description: "Ева помогает цветочной фее",
        problem: "Фея Блум садит волшебные цветы. Она посадила 6 клумб, на каждой клумбе 9 цветков. Сколько всего волшебных цветков посадила фея?",
      },
      {
        title: "Феникс и пламя",
        description: "Ева наблюдает за огненной птицей",
        problem: "Феникс Флэйм создаёт огненные перья. Он создал 7 групп перьев по 5 перьев в каждой группе. Сколько всего огненных перьев?",
      },
      {
        title: "Волшебник Фокси",
        description: "Фокси изучает магию вместе с Евой",
        problem: "Волшебник Фокси варит зелья. У него есть 8 котлов, в каждом котле по 4 волшебных ингредиента. Сколько всего ингредиентов?",
      },
    ],

    // MemoryGame specific
    easyDetails: "6 пар • Таблицы 1-5",
    mediumDetails: "8 пар • Таблицы 1-8",
    hardDetails: "10 пар • Таблицы 1-10",
    puzzleEmoji: "🧩",

    // PracticeMode specific
    tableButtonSuffix: "x",
    mathSymbolsAlt: "Математические символы",

    // Progress specific
    tableProgressSuffix: "x",

    // AdventureMode specific
    timeSecondsSuffix: "с",
    accuracyPercentSuffix: "%",
    levelDefaultTitle: "Уровень {id}",
    levelDefaultDesc: "Описание для уровня {id}",
    completeLevelRequirement: "Пройди уровень {id}",

    // Settings specific
    difficultyEasyPrefix: "🌟",
    difficultyMediumPrefix: "⭐⭐",
    difficultyHardPrefix: "⭐⭐⭐",

    // Foxy specific
    foxyMascotAltText: "Талисман Фокси",
    foxyWelcomeMainMenu: "Привет, Ева! Я Фокси! Давай вместе откроем мир таблицы умножения. Выбери игру, чтобы начать!",
    foxyVisibilityTitle: "Видимость Фокси",
    foxyShow: "Показывать",
    foxyHide: "Скрыть",
    foxyVisibilityDescriptionShow: "Фокси видна и помогает тебе.",
    foxyVisibilityDescriptionHide: "Фокси скрыта.",

    // Foxy contextual messages
    foxyIntroPracticeMode: "Привет, Ева! В режиме практики ты можешь спокойно тренировать таблицы умножения. Фокси здесь, чтобы помочь!",
    foxyIntroQuizMode: "Время для викторины, Ева! Покажи Фокси, что ты выучила. Удачи!",
    foxyIntroAdventureMode: "Вперёд, в приключение, Ева! Фокси будет сопровождать тебя в этом увлекательном путешествии по миру чисел.",
    foxyIntroMemoryGame: "Найди подходящие карточки, Ева! Фокси держит за тебя кулачки в этой хитрой игре мемори.",
    foxyIntroRealWorldMath: "Смотри, Ева! Здесь Фокси покажет тебе, где математика встречается в повседневной жизни. Интересно, правда?",
    foxyIntroFantasyMath: "Добро пожаловать в волшебный мир, Ева! Фокси и магические существа ждут, чтобы вместе с тобой открывать математику.",

    foxyEncouragement1: "Ты отлично справляешься, Ева! Фокси гордится тобой. Продолжай в том же духе!",
    foxyEncouragement2: "Фокси знает, что у тебя всё получится! Не сдавайся!",
    foxyEncouragement3: "Именно так! Практика ведёт к мастерству, Ева!",

    foxyCongrats1: "Ух ты, Ева! Фокси просто в восторге от тебя!",
    foxyCongrats2: "Великолепно! Ты настоящий математический гений, Ева!",
    foxyCongrats3: "Ура, получилось! Фокси празднует этот успех вместе с тобой!",
    foxyCongratsAdventureLevel: "Супер, Ева! Уровень пройден! Фокси гордится твоей жаждой приключений!",
    foxyCongratsQuiz: "Отличный результат в викторине, Ева! Фокси знала, что ты справишься!",
    foxyCongratsQuizHigh: "Невероятный результат, Ева! Фокси в восторге от твоих математических способностей!",
    foxyCongratsQuizMid: "Отличная работа, Ева! Фокси видит, как растёт звезда математики!",
    foxyCongratsQuizLow: "Молодец, Ева! Продолжай тренироваться, и Фокси знает, ты станешь ещё лучше!",

    foxyAdventureCorrectAnswer: "Правильно, искательница приключений Ева! Фокси болеет за тебя!",
    foxyQuizCorrectAnswer: "Точно в цель, чемпион викторины Ева! Фокси в восторге!",

    // Adventure Mode specific Foxy messages
    foxyAdventureIncorrect: "Это не совсем правильно. Посмотри внимательно и попробуй еще раз!",
    foxyAdventureTimeLow: "Осторожно, время на исходе!",
    foxyAdventurePass1Star: "Отлично, уровень пройден, и 1 звезда для тебя!",
    foxyAdventurePass2Stars: "Превосходно! Уровень освоен, и 2 звезды заработаны!",
    foxyAdventurePass3Stars: "Ух ты! Фантастика! 3 звезды для тебя на этом уровне!",
    foxyAdventureFail: "Жаль, в этот раз не получилось. Не сдавайся, попробуй еще раз!",

    // Memory Game specific Foxy messages
    foxyMemoryMatchFound: "Отличная находка, Ева! Это пара!",
    foxyMemoryNoMatch: "Не совсем пара. Ищи дальше, Фокси знает, ты их найдешь!",
    foxyMemoryFewPairsLeft: "Почти готово, Ева! Осталось всего несколько пар!",
    foxyMemoryGameComplete: "Ура! Ты нашла все пары, Ева! Фокси очень гордится тобой!",

    // RealWorldMath specific Foxy messages
    foxyRealWorldProblem: "Вот задачка из реальной жизни, Ева! Подумай, как умножение поможет её решить.",
    foxyRealWorldExpression: "Какое вычисление подходит к этой истории, Ева? Фокси очень интересно!",
    foxyRealWorldAnswer: "Отлично! А какой ответ? Фокси знает, ты сможешь это вычислить!",
    foxyRealWorldCorrect: "Точно! Ты решила это как профи, Ева! Фокси очень впечатлена!",
    foxyRealWorldIncorrect: "Хм, это не совсем так. Давай вместе посмотрим на решение и поучимся, Ева!",

    // FantasyMath specific Foxy messages
    foxyFantasyProblem: "Тебя ждёт волшебное испытание, Ева! Какое заклинание его решит?",
    foxyFantasyExpression: "Выбирай свою волшебную формулу с умом, Ева! Фокси верит в твою силу!",
    foxyFantasyAnswer: "Заклинание почти готово! Какое последнее волшебное число, Ева?",
    foxyFantasyCorrect: "Абракадабра! Ты овладела магией, Ева! Фокси поражена твоими способностями!",
    foxyFantasyIncorrect: "Ох, заклинание немного не сработало. Давай посмотрим на правильную магию и попробуем снова, Ева!",

    foxyEncouragementStreak3: "Ого, 3 подряд! Ты на волне успеха!",
    foxyEncouragementStreak5: "Потрясающе, 5 правильных! Фокси очень впечатлена!",
    foxyEncouragementTryAgain: "Ой, не совсем! Фокси знает, что следующая задача тебе по силам!",
    foxyEncouragementQuizKeepTrying: "Хорошая попытка, Ева! Фокси говорит: не сдавайся, практика ведёт к совершенству!",

    foxyTimeRunningOutQuiz: "Время на исходе, Ева! Сконцентрируйся и покажи лучший результат!",

    foxyHintMessage: "Хмм, нужна небольшая подсказка от Фокси?",
  }
};
