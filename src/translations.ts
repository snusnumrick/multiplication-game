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
    versionInfo: "Version 1.0 • Speziell für iPad optimiert",
    
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
    versionInfo: "Версия 1.0 • Специально оптимизировано для iPad",
    
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
  }
};
