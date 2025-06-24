import React, { useState, useEffect, useCallback } from 'react';
import { useGame } from '../contexts/game-hooks';
import { ArrowLeft, Lightbulb, Check, RotateCcw, Star } from 'lucide-react';
import { AnimatedFoxy } from './AnimatedFoxy';

export function PracticeMode() {
  const { t, setCurrentScreen, playSound, addStars, showFoxyMessage, setIsFoxyVisible, foxyMessage, isFoxyVisible, setFoxyAnimationState } = useGame();
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [currentProblem, setCurrentProblem] = useState<{ a: number; b: number } | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Memoize the foxy initialization to ensure stable reference
  const initializeFoxy = useCallback(() => {
    if (typeof window !== 'undefined' && showFoxyMessage && setIsFoxyVisible) {
      console.log('PracticeMode: Initializing Foxy');
      console.log('showFoxyMessage available:', !!showFoxyMessage);
      console.log('setIsFoxyVisible available:', !!setIsFoxyVisible);

      try {
        showFoxyMessage?.('foxyIntroPracticeMode');
        // Optionally ensure Foxy is visible
        // setIsFoxyVisible(true);
      } catch (error) {
        console.error('Error initializing Foxy:', error);
      }
    } else {
      console.warn('PracticeMode: Cannot initialize Foxy - missing dependencies or not on client');
    }
  }, [showFoxyMessage, setIsFoxyVisible]);

  // Memoize the cleanup function
  const cleanupFoxy = useCallback(() => {
    if (typeof window !== 'undefined' && setIsFoxyVisible) {
      console.log('PracticeMode: Cleaning up Foxy');
      try {
        setIsFoxyVisible?.(false);
      } catch (error) {
        console.error('Error cleaning up Foxy:', error);
      }
    }
  }, [setIsFoxyVisible]);

  const generateProblem = useCallback((table: number) => {
    const multiplier = Math.floor(Math.random() * 10) + 1;
    setCurrentProblem({ a: table, b: multiplier });
    setUserAnswer('');
    setShowHint(false);
    setIsCorrect(null);
  }, []);

  const checkAnswer = useCallback(() => {
    if (!currentProblem || !userAnswer) return;

    const correctAnswer = currentProblem.a * currentProblem.b;
    const isRight = parseInt(userAnswer) === correctAnswer;

    setIsCorrect(isRight);
    setTotalAnswers(prev => prev + 1);

    if (isRight) {
      setCorrectAnswers(prev => prev + 1);
      playSound?.('correct');
      addStars?.(1);
      setFoxyAnimationState?.('happy');

      // Generate new problem after short delay
      setTimeout(() => {
        generateProblem(currentProblem.a);
      }, 1500);
    } else {
      playSound?.('incorrect');
    }
  }, [currentProblem, userAnswer, playSound, addStars, setFoxyAnimationState, generateProblem]);

  const showHintHandler = useCallback(() => {
    setShowHint(true);
    playSound?.('click');
  }, [playSound]);

  const restartProblem = useCallback(() => {
    if (selectedTable) {
      generateProblem(selectedTable);
    }
  }, [selectedTable, generateProblem]);

  // Client-side mount detection
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Initialize Foxy when component mounts (client-side only)
  useEffect(() => {
    if (!isMounted) return;

    console.log('PracticeMode: Component mounted on client');

    // Add a small delay to ensure the context is fully initialized
    const timeoutId = setTimeout(() => {
      initializeFoxy();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      cleanupFoxy();
    };
  }, [isMounted, initializeFoxy, cleanupFoxy]);

  // Generate problem when table is selected
  useEffect(() => {
    if (selectedTable && isMounted) {
      generateProblem(selectedTable);
    }
  }, [selectedTable, isMounted, generateProblem]);

  // Keyboard event handler
  useEffect(() => {
    if (!isMounted) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && userAnswer && !isCorrect) {
        checkAnswer();
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [isMounted, userAnswer, isCorrect, checkAnswer]);

  // Don't render anything until client-side mount is complete
  if (!isMounted) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-200 via-blue-200 to-purple-300 flex items-center justify-center">
          <div className="text-2xl font-bold text-gray-700">Loading...</div>
        </div>
    );
  }

  const renderTableSelection = () => (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">{t?.selectTable || 'Select a Table'}</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((table) => (
              <button
                  key={table}
                  onClick={() => {
                    setSelectedTable(table);
                    playSound?.('click');
                  }}
                  className="bg-gradient-to-br from-blue-400 to-blue-600 text-white text-2xl font-bold py-8 px-4 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
              >
                {table}{t?.tableButtonSuffix || '×'}
              </button>
          ))}
        </div>
      </div>
  );

  const renderProblem = () => {
    if (!currentProblem) return null;

    const correctAnswer = currentProblem.a * currentProblem.b;

    return (
        <div className="text-center max-w-2xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">
              {t?.tableSeriesLabel?.replace('{tableNumber}', selectedTable!.toString()) || `Table ${selectedTable}`} - {t?.practiceTitle || 'Practice'}
            </h2>

            {/* Progress */}
            <div className="flex justify-between items-center mb-6 text-gray-600">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2 fill-current" />
                <span>{correctAnswers} {t?.correctAnswersSuffix || 'correct'}</span>
              </div>
              <div>
                {totalAnswers > 0 && (
                    <span>{Math.round((correctAnswers / totalAnswers) * 100)}{t?.percentageCorrectSuffix || '% correct'}</span>
                )}
              </div>
            </div>

            {/* Math Problem */}
            <div className="text-6xl font-bold text-gray-800 mb-8">
              {currentProblem.a} × {currentProblem.b} = ?
            </div>

            {/* Answer Input */}
            <div className="mb-6">
              <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="text-4xl font-bold text-center bg-gray-50 border-2 border-gray-300 rounded-2xl p-4 w-48 mx-auto block focus:border-blue-500 focus:outline-none"
                  placeholder="?"
                  autoFocus
              />
            </div>

            {/* Hint */}
            {showHint && (
                <div className="bg-yellow-100 rounded-2xl p-4 mb-6 text-lg">
                  <Lightbulb className="w-6 h-6 text-yellow-600 inline mr-2" />
                  <span className="text-yellow-800">
                {t?.thinkHintPrefix || 'Think:'} {Array.from({ length: currentProblem.b }, (_, i) => currentProblem.a).join(' + ')} = {correctAnswer}
              </span>
                </div>
            )}

            {/* Feedback */}
            {isCorrect === true && (
                <div className="bg-green-100 rounded-2xl p-4 mb-6 text-xl font-bold text-green-800 animate-pulse">
                  <Check className="w-8 h-8 inline mr-2" />
                  {t?.excellent || 'Excellent'}! {currentProblem.a} × {currentProblem.b} = {correctAnswer}
                  <div className="text-sm mt-2">{t?.oneStarEarned || '+1 star earned!'}</div>
                </div>
            )}

            {isCorrect === false && (
                <div className="bg-red-100 rounded-2xl p-4 mb-6 text-xl font-bold text-red-800">
                  {t?.tryAgain || 'Try again!'} {t?.correctAnswerIs || 'The correct answer is'} {correctAnswer}
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              {!isCorrect && (
                  <>
                    <button
                        onClick={checkAnswer}
                        disabled={!userAnswer}
                        className="bg-green-500 text-white px-8 py-3 rounded-2xl text-lg font-bold shadow-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      {t?.check || 'Check'}
                    </button>

                    <button
                        onClick={showHintHandler}
                        className="bg-yellow-500 text-white px-8 py-3 rounded-2xl text-lg font-bold shadow-lg hover:bg-yellow-600 transform transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      <Lightbulb className="w-5 h-5 inline mr-2" />
                      {t?.hint || 'Hint'}
                    </button>
                  </>
              )}

              <button
                  onClick={restartProblem}
                  className="bg-blue-500 text-white px-8 py-3 rounded-2xl text-lg font-bold shadow-lg hover:bg-blue-600 transform transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <RotateCcw className="w-5 h-5 inline mr-2" />
                {t?.newProblemButton || 'New Problem'}
              </button>
            </div>
          </div>
        </div>
    );
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-green-200 via-blue-200 to-purple-300 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-4">
          <button
              onClick={() => {
                playSound?.('click');
                setCurrentScreen?.('menu');
              }}
              className="bg-white/90 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-2xl shadow-lg flex items-center space-x-2 hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">{t?.backToMenu || 'Back to Menu'}</span>
          </button>

          {selectedTable && (
              <button
                  onClick={() => {
                    setSelectedTable(null);
                    setCorrectAnswers(0);
                    setTotalAnswers(0);
                  }}
                  className="bg-white/90 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-2xl shadow-lg hover:bg-white transition-colors font-medium"
              >
                {t?.selectOtherTableButton || 'Select Other Table'}
              </button>
          )}
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {!selectedTable ? renderTableSelection() : renderProblem()}
        </div>

        {/* Decorative Elements */}
        <div className="fixed top-16 right-16 animate-spin-slow">
          <img src="/images/math-symbols.jpg" alt={t?.mathSymbolsAlt || 'Math symbols'} className="w-16 h-16 rounded-full opacity-20" />
        </div>
        <AnimatedFoxy message={foxyMessage ?? undefined} isVisible={isFoxyVisible} />
      </div>
  );
}
