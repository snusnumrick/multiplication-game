import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../contexts/GameContext';
import { ArrowLeft, Clock, Star, Trophy, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  a: number;
  b: number;
  options: number[];
  correct: number;
}

export function QuizMode() {
  const { t, setCurrentScreen, playSound, addStars, settings } = useGame();
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'finished'>('setup');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const generateQuestions = (diff: 'easy' | 'medium' | 'hard') => {
    const questionCount = 10;
    const maxTable = diff === 'easy' ? 5 : diff === 'medium' ? 10 : 12;
    const generatedQuestions: QuizQuestion[] = [];

    for (let i = 0; i < questionCount; i++) {
      const a = Math.floor(Math.random() * maxTable) + 1;
      const b = Math.floor(Math.random() * maxTable) + 1;
      const correct = a * b;
      
      // Generate wrong options
      const options: number[] = [correct];
      while (options.length < 4) {
        const wrong = correct + Math.floor(Math.random() * 20) - 10;
        if (wrong > 0 && !options.includes(wrong)) {
          options.push(wrong);
        }
      }
      
      // Shuffle options
      for (let j = options.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [options[j], options[k]] = [options[k], options[j]];
      }

      generatedQuestions.push({ a, b, options, correct });
    }

    return generatedQuestions;
  };

  const startQuiz = (selectedDifficulty: 'easy' | 'medium' | 'hard') => {
    const quizQuestions = generateQuestions(selectedDifficulty);
    setQuestions(quizQuestions);
    setDifficulty(selectedDifficulty);
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(selectedDifficulty === 'easy' ? 90 : selectedDifficulty === 'medium' ? 60 : 45);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswered(false);
    playSound('click');
  };

  const selectAnswer = (answer: number) => {
    if (answered) return;
    
    setSelectedAnswer(answer);
    setAnswered(true);
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correct;
    
    if (isCorrect) {
      setScore(prev => prev + 10);
      playSound('correct');
      addStars(1);
    } else {
      playSound('incorrect');
    }

    setShowResult(true);
    
    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setAnswered(false);
      } else {
        finishQuiz();
      }
    }, 2000);
  };

  const finishQuiz = () => {
    setGameState('finished');
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Bonus stars for completion
    const bonusStars = Math.floor(score / 50);
    if (bonusStars > 0) {
      addStars(bonusStars);
    }
    
    playSound('success');
  };

  // Timer logic
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      finishQuiz();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [gameState, timeLeft]);

  const resetQuiz = () => {
    setGameState('setup');
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswered(false);
  };

  const renderSetup = () => (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">{t.quizTitle}</h2>
      <p className="text-xl text-gray-600 mb-12">{t.chooseDifficulty}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <button
          onClick={() => startQuiz('easy')}
          className="bg-gradient-to-br from-green-400 to-green-600 text-white p-8 rounded-3xl shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <div className="text-3xl font-bold mb-4">{t.easy}</div>
          <div className="text-lg opacity-90">{t.tables1to5}</div>
          <div className="text-lg opacity-90">{t.seconds90}</div>
          <div className="text-lg opacity-90">{t.questions10}</div>
        </button>
        
        <button
          onClick={() => startQuiz('medium')}
          className="bg-gradient-to-br from-yellow-400 to-orange-600 text-white p-8 rounded-3xl shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <div className="text-3xl font-bold mb-4">{t.medium}</div>
          <div className="text-lg opacity-90">{t.tables1to10}</div>
          <div className="text-lg opacity-90">{t.seconds60}</div>
          <div className="text-lg opacity-90">{t.questions10}</div>
        </button>
        
        <button
          onClick={() => startQuiz('hard')}
          className="bg-gradient-to-br from-red-400 to-red-600 text-white p-8 rounded-3xl shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <div className="text-3xl font-bold mb-4">{t.hard}</div>
          <div className="text-lg opacity-90">{t.tables1to12}</div>
          <div className="text-lg opacity-90">{t.seconds45}</div>
          <div className="text-lg opacity-90">{t.questions10}</div>
        </button>
      </div>
    </div>
  );

  const renderGame = () => {
    if (questions.length === 0) return null;
    
    const currentQuestion = questions[currentQuestionIndex];
    
    return (
      <div className="max-w-2xl mx-auto">
        {/* Game Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Star className="w-6 h-6 text-yellow-500 mr-2 fill-current" />
              <span className="text-xl font-bold text-gray-700">{score}</span>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-medium text-gray-600">
                {t.questionOf} {currentQuestionIndex + 1} / {questions.length}
              </div>
            </div>
            
            <div className="flex items-center">
              <Clock className="w-6 h-6 text-red-500 mr-2" />
              <span className={`text-xl font-bold ${timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-gray-700'}`}>
                {timeLeft}s
              </span>
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

          {/* Answer Options */}
          <div className="grid grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => {
              let buttonClass = "text-2xl font-bold py-6 px-4 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 ";
              
              if (showResult) {
                if (option === currentQuestion.correct) {
                  buttonClass += "bg-green-500 text-white border-4 border-green-600";
                } else if (option === selectedAnswer && option !== currentQuestion.correct) {
                  buttonClass += "bg-red-500 text-white border-4 border-red-600";
                } else {
                  buttonClass += "bg-gray-300 text-gray-500 cursor-not-allowed";
                }
              } else {
                buttonClass += "bg-gradient-to-br from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700";
              }

              return (
                <button
                  key={index}
                  onClick={() => selectAnswer(option)}
                  disabled={answered}
                  className={buttonClass}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {showResult && (
            <div className="mt-6 text-center">
              {selectedAnswer === currentQuestion.correct ? (
                <div className="text-2xl font-bold text-green-600 animate-bounce">
                  {t.correct}! +10 {t.points}!
                </div>
              ) : (
                <div className="text-2xl font-bold text-red-600">
                  {t.incorrect}. {t.correctAnswer}: {currentQuestion.correct}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const percentage = Math.round((score / (questions.length * 10)) * 100);
    let message = '';
    let starRating = 0;

    if (percentage >= 90) {
      message = t.fantastic;
      starRating = 3;
    } else if (percentage >= 70) {
      message = t.excellent;
      starRating = 2;
    } else if (percentage >= 50) {
      message = t.wellDone;
      starRating = 1;
    } else {
      message = t.tryAgain;
      starRating = 0;
    }

    return (
      <div className="text-center max-w-2xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
          <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
          
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{t.quizFinished}</h2>
          <div className="text-2xl text-gray-600 mb-6">{message}</div>
          
          {/* Stars */}
          <div className="flex justify-center mb-6">
            {[1, 2, 3].map((star) => (
              <Star
                key={star}
                className={`w-12 h-12 mx-1 ${
                  star <= starRating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          
          {/* Score */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-6 mb-6">
            <div className="text-lg font-medium mb-2">Dein Ergebnis:</div>
            <div className="text-4xl font-bold">{score} Punkte</div>
            <div className="text-lg">{percentage}% richtig</div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={resetQuiz}
              className="bg-green-500 text-white px-8 py-3 rounded-2xl text-lg font-bold shadow-lg hover:bg-green-600 transform transition-all duration-200 hover:scale-105 active:scale-95 flex items-center"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Nochmal spielen
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-red-200 to-pink-300 p-4">
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
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        {gameState === 'setup' && renderSetup()}
        {gameState === 'playing' && renderGame()}
        {gameState === 'finished' && renderResults()}
      </div>
    </div>
  );
}
