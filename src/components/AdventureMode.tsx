import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import { ArrowLeft, Star, Lock, Play, CheckCircle, Trophy, Crown } from 'lucide-react';

interface Level {
  id: number;
  title: string;
  description: string;
  tables: number[];
  questionsCount: number;
  timeLimit: number;
  requiredAccuracy: number;
  stars: number;
  unlocked: boolean;
  completed: boolean;
}

interface Question {
  a: number;
  b: number;
  answer: number;
}

export function AdventureMode() {
  const { t, setCurrentScreen, playSound, addStars, progress, updateProgress } = useGame();
  
  // Get localized level title and description
  const getLevelTitle = (levelId: number) => {
    const titleKey = `level${levelId}Title` as keyof typeof t;
    return t[titleKey] || t.levelDefaultTitle.replace('{id}', levelId.toString());
  };
  
  const getLevelDesc = (levelId: number) => {
    const descKey = `level${levelId}Desc` as keyof typeof t;
    return t[descKey] || t.levelDefaultDesc.replace('{id}', levelId.toString());
  };
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [gameState, setGameState] = useState<'levelSelect' | 'playing' | 'completed'>('levelSelect');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [starsEarned, setStarsEarned] = useState(0);

  const levels: Level[] = [
    {
      id: 1,
      title: 'Kleine Schritte',
      description: 'Lerne die 1er und 2er Reihe',
      tables: [1, 2],
      questionsCount: 5,
      timeLimit: 60,
      requiredAccuracy: 60,
      stars: 0,
      unlocked: true,
      completed: false,
    },
    {
      id: 2,
      title: 'Dreifacher Spaß',
      description: 'Meistere die 3er Reihe',
      tables: [1, 2, 3],
      questionsCount: 8,
      timeLimit: 90,
      requiredAccuracy: 70,
      stars: 0,
      unlocked: false,
      completed: false,
    },
    {
      id: 3,
      title: 'Viereckige Zahlen',
      description: 'Entdecke die 4er Reihe',
      tables: [2, 3, 4],
      questionsCount: 10,
      timeLimit: 100,
      requiredAccuracy: 70,
      stars: 0,
      unlocked: false,
      completed: false,
    },
    {
      id: 4,
      title: 'Fünf Sterne',
      description: 'Die 5er Reihe wartet auf dich!',
      tables: [3, 4, 5],
      questionsCount: 12,
      timeLimit: 110,
      requiredAccuracy: 75,
      stars: 0,
      unlocked: false,
      completed: false,
    },
    {
      id: 5,
      title: 'Sechser Zauber',
      description: 'Bezaubere mit der 6er Reihe',
      tables: [4, 5, 6],
      questionsCount: 15,
      timeLimit: 120,
      requiredAccuracy: 75,
      stars: 0,
      unlocked: false,
      completed: false,
    },
    {
      id: 6,
      title: 'Glückszahl Sieben',
      description: 'Die 7er Reihe bringt Glück!',
      tables: [5, 6, 7],
      questionsCount: 15,
      timeLimit: 130,
      requiredAccuracy: 80,
      stars: 0,
      unlocked: false,
      completed: false,
    },
    {
      id: 7,
      title: 'Acht Achterbahn',
      description: 'Fahre mit der 8er Reihe Achterbahn',
      tables: [6, 7, 8],
      questionsCount: 18,
      timeLimit: 140,
      requiredAccuracy: 80,
      stars: 0,
      unlocked: false,
      completed: false,
    },
    {
      id: 8,
      title: 'Neun Leben',
      description: 'Die 9er Reihe hat neun Leben',
      tables: [7, 8, 9],
      questionsCount: 18,
      timeLimit: 150,
      requiredAccuracy: 85,
      stars: 0,
      unlocked: false,
      completed: false,
    },
    {
      id: 9,
      title: 'Perfekte Zehn',
      description: 'Erreiche die Perfektion mit der 10er Reihe',
      tables: [8, 9, 10],
      questionsCount: 20,
      timeLimit: 160,
      requiredAccuracy: 85,
      stars: 0,
      unlocked: false,
      completed: false,
    },
    {
      id: 10,
      title: 'Großer Champion',
      description: 'Meistere alle Reihen zusammen!',
      tables: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      questionsCount: 25,
      timeLimit: 200,
      requiredAccuracy: 90,
      stars: 0,
      unlocked: false,
      completed: false,
    },
  ];

  // Update levels based on progress
  useEffect(() => {
    levels.forEach((level, index) => {
      const levelProgress = progress.adventureLevels[level.id];
      if (levelProgress) {
        level.completed = levelProgress.completed;
        level.stars = levelProgress.stars;
      }
      
      // Unlock logic
      if (index === 0) {
        level.unlocked = true;
      } else {
        const previousLevel = levels[index - 1];
        const prevLevelProgress = progress.adventureLevels[previousLevel.id];
        level.unlocked = prevLevelProgress?.completed || false;
      }
    });
  }, [progress.adventureLevels]);

  const generateQuestions = (level: Level) => {
    const newQuestions: Question[] = [];
    
    for (let i = 0; i < level.questionsCount; i++) {
      const table = level.tables[Math.floor(Math.random() * level.tables.length)];
      const multiplier = Math.floor(Math.random() * 10) + 1;
      
      newQuestions.push({
        a: table,
        b: multiplier,
        answer: table * multiplier,
      });
    }
    
    return newQuestions;
  };

  const startLevel = (level: Level) => {
    if (!level.unlocked) return;
    
    setSelectedLevel(level);
    const newQuestions = generateQuestions(level);
    setQuestions(newQuestions);
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setScore(0);
    setTimeLeft(level.timeLimit);
    setCorrectAnswers(0);
    setShowResult(false);
    setStarsEarned(0);
    playSound('click');
  };

  const checkAnswer = () => {
    if (!selectedLevel || !questions[currentQuestionIndex] || !userAnswer) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = parseInt(userAnswer) === currentQuestion.answer;
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setScore(prev => prev + 10);
      playSound('correct');
    } else {
      playSound('incorrect');
    }

    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setUserAnswer('');
        setShowResult(false);
      } else {
        completeLevel();
      }
    }, 1500);
  };

  const completeLevel = () => {
    if (!selectedLevel) return;
    
    const accuracy = (correctAnswers / questions.length) * 100;
    const timeBonus = Math.max(0, timeLeft * 2);
    const finalScore = score + timeBonus;
    
    let earnedStars = 0;
    if (accuracy >= selectedLevel.requiredAccuracy) {
      earnedStars = 1;
      if (accuracy >= 85) earnedStars = 2;
      if (accuracy >= 95 && timeLeft > 30) earnedStars = 3;
    }
    
    setStarsEarned(earnedStars);
    setGameState('completed');
    
    if (earnedStars > 0) {
      // Update progress
      const newAdventureLevels = {
        ...progress.adventureLevels,
        [selectedLevel.id]: {
          completed: true,
          stars: Math.max(selectedLevel.stars, earnedStars),
        }
      };
      
      updateProgress({ adventureLevels: newAdventureLevels });
      addStars(earnedStars * 5); // 5 stars per level star
      playSound('success');
    }
  };

  // Timer logic
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      completeLevel();
    }
  }, [gameState, timeLeft]);

  const renderLevelSelect = () => (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">{t.adventureTitle}</h2>
      <p className="text-xl text-gray-600 mb-12">{t.chooseAdventure}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {levels.map((level) => (
          <div
            key={level.id}
            className={`relative p-6 rounded-3xl shadow-xl transform transition-all duration-200 ${
              level.unlocked
                ? level.completed
                  ? 'bg-gradient-to-br from-green-400 to-green-600 text-white cursor-pointer hover:scale-105'
                  : 'bg-gradient-to-br from-blue-400 to-blue-600 text-white cursor-pointer hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={() => level.unlocked && startLevel(level)}
          >
            {/* Level Status */}
            <div className="absolute top-4 right-4">
              {!level.unlocked ? (
                <Lock className="w-6 h-6" />
              ) : level.completed ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </div>
            
            {/* Level Number */}
            <div className="text-3xl font-bold mb-2">{level.id}</div>
            
            {/* Level Title */}
            <h3 className="text-xl font-bold mb-3">{getLevelTitle(level.id)}</h3>
            
            {/* Description */}
            <p className="text-sm opacity-90 mb-4">{getLevelDesc(level.id)}</p>
            
            {/* Level Info */}
            <div className="text-sm space-y-1 mb-4">
              <div>{t.tables} {level.tables.join(', ')}</div>
              <div>{level.questionsCount} {t.questions}</div>
              <div>{level.timeLimit}{t.timeSecondsSuffix} {t.time}</div>
              <div>{level.requiredAccuracy}{t.accuracyPercentSuffix} {t.required}</div>
            </div>
            
            {/* Stars */}
            {level.completed && (
              <div className="flex justify-center">
                {[1, 2, 3].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 mx-1 ${
                      star <= level.stars ? 'text-yellow-300 fill-current' : 'text-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}
            
            {!level.unlocked && level.id > 1 && (
              <div className="text-xs opacity-75 mt-2">
                {t.completeLevelRequirement.replace('{id}', (level.id - 1).toString())}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderGame = () => {
    if (!selectedLevel || questions.length === 0) return null;
    
    const currentQuestion = questions[currentQuestionIndex];
    
    return (
      <div className="max-w-2xl mx-auto">
        {/* Game Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl mb-6">
          <div className="flex justify-between items-center">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-800">{getLevelTitle(selectedLevel.id)}</div>
              <div className="text-sm text-gray-600">{t.level} {selectedLevel.id}</div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-medium text-gray-600">
                {currentQuestionIndex + 1} / {questions.length}
              </div>
            </div>
            
            <div className="text-center">
              <div className={`text-xl font-bold ${timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-gray-700'}`}>
                {timeLeft}{t.timeSecondsSuffix}
              </div>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="text-5xl font-bold text-gray-800 mb-6">
              {currentQuestion.a} × {currentQuestion.b} = ?
            </div>
          </div>

          {/* Answer Input */}
          <div className="text-center mb-6">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
              className="text-4xl font-bold text-center bg-gray-50 border-2 border-gray-300 rounded-2xl p-4 w-48 focus:border-blue-500 focus:outline-none"
              placeholder="?"
              autoFocus
              disabled={showResult}
            />
          </div>

          {/* Feedback */}
          {showResult && (
            <div className="text-center mb-6">
              {parseInt(userAnswer) === currentQuestion.answer ? (
                <div className="text-2xl font-bold text-green-600 animate-bounce">
                  {t.correct}! +10 {t.points}
                </div>
              ) : (
                <div className="text-2xl font-bold text-red-600">
                  {t.incorrect}. {t.answer}: {currentQuestion.answer}
                </div>
              )}
            </div>
          )}

          {/* Action Button */}
          {!showResult && (
            <div className="text-center">
              <button
                onClick={checkAnswer}
                disabled={!userAnswer}
                className="bg-green-500 text-white px-8 py-3 rounded-2xl text-lg font-bold shadow-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-105 active:scale-95"
              >
                {t.check}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCompleted = () => {
    if (!selectedLevel) return null;
    
    const accuracy = (correctAnswers / questions.length) * 100;
    const passed = accuracy >= selectedLevel.requiredAccuracy;
    
    return (
      <div className="text-center max-w-2xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
          {passed ? (
            <Crown className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
          ) : (
            <Trophy className="w-24 h-24 text-gray-400 mx-auto mb-6" />
          )}
          
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {passed ? t.levelCompleted : t.levelNotCompleted}
          </h2>
          
          {/* Stars */}
          {passed && (
            <div className="flex justify-center mb-6">
              {[1, 2, 3].map((star) => (
                <Star
                  key={star}
                  className={`w-12 h-12 mx-1 ${
                    star <= starsEarned ? 'text-yellow-500 fill-current animate-bounce' : 'text-gray-300'
                  }`}
                  style={{ animationDelay: `${star * 200}ms` }}
                />
              ))}
            </div>
          )}
          
          {/* Results */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6 space-y-3">
            <div className="flex justify-between">
              <span>{t.correctAnswersLabel}</span>
              <span className="font-bold">{correctAnswers}/{questions.length}</span>
            </div>
            <div className="flex justify-between">
              <span>{t.accuracyLabel}</span>
              <span className={`font-bold ${accuracy >= selectedLevel.requiredAccuracy ? 'text-green-600' : 'text-red-600'}`}>
                {Math.round(accuracy)}{t.accuracyPercentSuffix}
              </span>
            </div>
            <div className="flex justify-between">
              <span>{t.required}</span>
              <span className="font-bold">{selectedLevel.requiredAccuracy}{t.accuracyPercentSuffix}</span>
            </div>
            {passed && (
              <div className="flex justify-between border-t pt-2">
                <span>{t.starsEarnedLabel}</span>
                <span className="font-bold text-yellow-600">+{starsEarned * 5}</span>
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => startLevel(selectedLevel)}
              className="bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-600 transition-colors"
            >
              {t.repeatLevel}
            </button>
            <button
              onClick={() => setGameState('levelSelect')}
              className="bg-green-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-green-600 transition-colors"
            >
              {t.selectLevel}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-200 to-green-300 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pt-4">
        <button
          onClick={() => {
            playSound('click');
            setCurrentScreen('menu');
          }}
          className="bg-white/90 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-2xl shadow-lg flex items-center space-x-2 hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">{t.backToMenu}</span>
        </button>

        {gameState !== 'levelSelect' && (
          <button
            onClick={() => setGameState('levelSelect')}
            className="bg-white/90 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-2xl shadow-lg hover:bg-white transition-colors font-medium"
          >
            {t.selectLevel}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        {gameState === 'levelSelect' && renderLevelSelect()}
        {gameState === 'playing' && renderGame()}
        {gameState === 'completed' && renderCompleted()}
      </div>
    </div>
  );
}
