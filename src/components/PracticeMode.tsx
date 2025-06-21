import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import { ArrowLeft, Lightbulb, Check, RotateCcw, Star } from 'lucide-react';

export function PracticeMode() {
  const { t, setCurrentScreen, playSound, addStars, completeTable } = useGame();
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [currentProblem, setCurrentProblem] = useState<{ a: number; b: number } | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);

  const generateProblem = (table: number) => {
    const multiplier = Math.floor(Math.random() * 10) + 1;
    setCurrentProblem({ a: table, b: multiplier });
    setUserAnswer('');
    setShowHint(false);
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    if (!currentProblem || !userAnswer) return;
    
    const correctAnswer = currentProblem.a * currentProblem.b;
    const isRight = parseInt(userAnswer) === correctAnswer;
    
    setIsCorrect(isRight);
    setTotalAnswers(prev => prev + 1);
    
    if (isRight) {
      setCorrectAnswers(prev => prev + 1);
      playSound('correct');
      addStars(1);
      
      // Generate new problem after short delay
      setTimeout(() => {
        generateProblem(currentProblem.a);
      }, 1500);
    } else {
      playSound('incorrect');
    }
  };

  const showHintHandler = () => {
    setShowHint(true);
    playSound('click');
  };

  const restartProblem = () => {
    if (selectedTable) {
      generateProblem(selectedTable);
    }
  };

  useEffect(() => {
    if (selectedTable) {
      generateProblem(selectedTable);
    }
  }, [selectedTable]);

  const renderTableSelection = () => (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">{t.selectTable}</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((table) => (
          <button
            key={table}
            onClick={() => {
              setSelectedTable(table);
              playSound('click');
            }}
            className="bg-gradient-to-br from-blue-400 to-blue-600 text-white text-2xl font-bold py-8 px-4 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {table}x
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
            {selectedTable}er Reihe - {t.practiceTitle}
          </h2>
          
          {/* Progress */}
          <div className="flex justify-between items-center mb-6 text-gray-600">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2 fill-current" />
              <span>{correctAnswers} richtig</span>
            </div>
            <div>
              {totalAnswers > 0 && (
                <span>{Math.round((correctAnswers / totalAnswers) * 100)}% richtig</span>
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
              onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
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
                Denke an: {Array.from({ length: currentProblem.b }, (_, i) => currentProblem.a).join(' + ')} = {correctAnswer}
              </span>
            </div>
          )}

          {/* Feedback */}
          {isCorrect === true && (
            <div className="bg-green-100 rounded-2xl p-4 mb-6 text-xl font-bold text-green-800 animate-pulse">
              <Check className="w-8 h-8 inline mr-2" />
              {t.excellent}! {currentProblem.a} × {currentProblem.b} = {correctAnswer}
              <div className="text-sm mt-2">+1 Stern erhalten!</div>
            </div>
          )}

          {isCorrect === false && (
            <div className="bg-red-100 rounded-2xl p-4 mb-6 text-xl font-bold text-red-800">
              {t.tryAgain} Die richtige Antwort ist {correctAnswer}
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
                  {t.check}
                </button>
                
                <button
                  onClick={showHintHandler}
                  className="bg-yellow-500 text-white px-8 py-3 rounded-2xl text-lg font-bold shadow-lg hover:bg-yellow-600 transform transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <Lightbulb className="w-5 h-5 inline mr-2" />
                  {t.hint}
                </button>
              </>
            )}
            
            <button
              onClick={restartProblem}
              className="bg-blue-500 text-white px-8 py-3 rounded-2xl text-lg font-bold shadow-lg hover:bg-blue-600 transform transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <RotateCcw className="w-5 h-5 inline mr-2" />
              Neue Aufgabe
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
            playSound('click');
            setCurrentScreen('menu');
          }}
          className="bg-white/90 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-2xl shadow-lg flex items-center space-x-2 hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">{t.backToMenu}</span>
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
            Andere Reihe wählen
          </button>
        )}
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        {!selectedTable ? renderTableSelection() : renderProblem()}
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-16 right-16 animate-spin-slow">
        <img src="/images/math-symbols.jpg" alt="Math" className="w-16 h-16 rounded-full opacity-20" />
      </div>
    </div>
  );
}
