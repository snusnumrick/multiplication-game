import React, { useState, useEffect, useCallback } from 'react';
import { useGame } from '../contexts/game-hooks';
import { ArrowLeft, ShoppingCart, Building, Car, Utensils, Gamepad2, TreePine } from 'lucide-react';
import { AnimatedFoxy } from './AnimatedFoxy';

interface Scenario {
  id: number;
  title: string;
  description: string;
  problem: string;
  calculation: string;
  answer: number;
  icon: React.ComponentType<any>;
  category: 'shopping' | 'home' | 'travel' | 'food' | 'games' | 'nature';
  wrongOptions: string[];
  image: string;
}

export function RealWorldMath() {
  const { t, setCurrentScreen, playSound, settings, addStars, showFoxyMessage, setIsFoxyVisible, foxyMessage, isFoxyVisible, setFoxyAnimationState } = useGame();
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [gameStep, setGameStep] = useState<'problem' | 'expression' | 'answer' | 'result'>('problem');
  const [selectedExpression, setSelectedExpression] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  const baseScenarios: Omit<Scenario, 'title' | 'description' | 'problem'>[] = [
    {
      id: 1,
      calculation: "4 × 6",
      answer: 24,
      icon: ShoppingCart,
      category: 'shopping',
      wrongOptions: ["4 + 6", "6 - 4", "4 ÷ 6"],
      image: "/images/shopping-scenario.jpg"
    },
    {
      id: 2,
      calculation: "3 × 7",
      answer: 21,
      icon: Building,
      category: 'home',
      wrongOptions: ["3 + 7", "7 - 3", "3 ÷ 7"],
      image: "/images/building-scenario.jpg"
    },
    {
      id: 3,
      calculation: "8 × 4",
      answer: 32,
      icon: Car,
      category: 'travel',
      wrongOptions: ["8 + 4", "8 - 4", "8 ÷ 4"],
      image: "/images/travel-scenario.jpg"
    },
    {
      id: 4,
      calculation: "3 × 8",
      answer: 24,
      icon: Utensils,
      category: 'food',
      wrongOptions: ["3 + 8", "8 - 3", "3 ÷ 8"],
      image: "/images/food-scenario.jpg"
    },
    {
      id: 5,
      calculation: "5 × 6",
      answer: 30,
      icon: Gamepad2,
      category: 'games',
      wrongOptions: ["5 + 6", "6 - 5", "5 ÷ 6"],
      image: "/images/games-scenario.jpg"
    },
    {
      id: 6,
      calculation: "4 × 9",
      answer: 36,
      icon: TreePine,
      category: 'nature',
      wrongOptions: ["4 + 9", "9 - 4", "4 ÷ 9"],
      image: "/images/nature-scenario.jpg"
    }
  ];

  const scenarios: Scenario[] = baseScenarios.map((baseScenario, index) => {
    const scenarioTexts = t?.realWorldScenarioData?.[index] || {
      title: `Scenario ${index + 1}`,
      description: `Real world scenario ${index + 1}`,
      problem: `Solve this problem using ${baseScenario.calculation}`
    };
    return {
      ...baseScenario,
      title: scenarioTexts.title,
      description: scenarioTexts.description,
      problem: scenarioTexts.problem,
    };
  });

  // Memoize the foxy initialization to ensure stable reference
  const initializeFoxy = useCallback(() => {
    if (typeof window !== 'undefined' && showFoxyMessage && setIsFoxyVisible) {
      console.log('RealWorldMath: Initializing Foxy for scenario/step:', selectedScenario?.id, gameStep);

      try {
        if (!selectedScenario) { // Scenario selection screen
          showFoxyMessage('foxyIntroRealWorldMath');
        } else {
          switch (gameStep) {
            case 'problem':
              showFoxyMessage('foxyRealWorldProblem', 5);
              break;
            case 'expression':
              showFoxyMessage('foxyRealWorldExpression', 5);
              break;
            case 'answer':
              showFoxyMessage('foxyRealWorldAnswer', 5);
              break;
            case 'result':
              if (isCorrect) {
                showFoxyMessage('foxyRealWorldCorrect');
              } else {
                showFoxyMessage('foxyRealWorldIncorrect');
              }
              break;
          }
        }
      } catch (error) {
        console.error('Error initializing Foxy in RealWorldMath:', error);
      }
    } else {
      console.warn('RealWorldMath: Cannot initialize Foxy - missing dependencies or not on client');
    }
  }, [selectedScenario, gameStep, isCorrect, showFoxyMessage, setIsFoxyVisible]);

  // Memoize the cleanup function
  const cleanupFoxy = useCallback(() => {
    if (typeof window !== 'undefined' && setIsFoxyVisible) {
      console.log('RealWorldMath: Cleaning up Foxy');
      try {
        if (gameStep !== 'result') { // Keep message if on result screen
          setIsFoxyVisible(false);
        }
      } catch (error) {
        console.error('Error cleaning up Foxy:', error);
      }
    }
  }, [gameStep, setIsFoxyVisible]);

  const selectScenario = useCallback((scenario: Scenario) => {
    setSelectedScenario(scenario);
    setGameStep('problem');
    setSelectedExpression('');
    setUserAnswer('');
    setIsCorrect(false);
    playSound && playSound('click');
  }, [playSound]);

  const selectExpression = useCallback((expression: string) => {
    setSelectedExpression(expression);
    setGameStep('answer');
    playSound && playSound('click');
  }, [playSound]);

  const submitAnswer = useCallback(() => {
    const isExpressionCorrect = selectedExpression === selectedScenario?.calculation;
    const isAnswerCorrect = parseInt(userAnswer) === selectedScenario?.answer;
    const bothCorrect = isExpressionCorrect && isAnswerCorrect;

    setIsCorrect(bothCorrect);
    setGameStep('result');

    if (bothCorrect) {
      playSound && playSound('correct');
      addStars && addStars(3); // Award 3 stars for getting both parts right
      setFoxyAnimationState && setFoxyAnimationState('happy');
    } else {
      playSound && playSound('incorrect');
    }
  }, [selectedExpression, selectedScenario, userAnswer, playSound, addStars, setFoxyAnimationState]);

  const resetScenario = useCallback(() => {
    setGameStep('problem');
    setSelectedExpression('');
    setUserAnswer('');
    setIsCorrect(false);
  }, []);

  const getCategoryColor = useCallback((category: string) => {
    const colors = {
      shopping: 'from-pink-400 to-pink-600',
      home: 'from-blue-400 to-blue-600',
      travel: 'from-green-400 to-green-600',
      food: 'from-orange-400 to-orange-600',
      games: 'from-purple-400 to-purple-600',
      nature: 'from-emerald-400 to-emerald-600'
    };
    return colors[category as keyof typeof colors] || 'from-gray-400 to-gray-600';
  }, []);

  // Client-side mount detection
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Initialize Foxy when component mounts or relevant state changes (client-side only)
  useEffect(() => {
    if (!isMounted) return;

    console.log('RealWorldMath: Component state changed on client');

    // Add a small delay to ensure the context is fully initialized
    const timeoutId = setTimeout(() => {
      initializeFoxy();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      cleanupFoxy();
    };
  }, [isMounted, selectedScenario, gameStep, isCorrect, initializeFoxy, cleanupFoxy]);

  // Don't render anything until client-side mount is complete
  if (!isMounted) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-300 flex items-center justify-center">
          <div className="text-2xl font-bold text-gray-700">Loading...</div>
        </div>
    );
  }

  if (selectedScenario) {
    const Icon = selectedScenario.icon;
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-300 p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pt-4">
            <button
                onClick={() => {
                  playSound && playSound('click');
                  setSelectedScenario(null);
                }}
                className="bg-white/90 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-2xl shadow-lg flex items-center space-x-2 hover:bg-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">{t?.backToMenu || 'Back to Menu'}</span>
            </button>
          </div>

          {/* Interactive Scenario */}
          <div className="max-w-4xl mx-auto">
            {/* Scenario Header */}
            <div className={`bg-gradient-to-br ${getCategoryColor(selectedScenario.category)} text-white rounded-3xl p-8 shadow-xl mb-8`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Icon className="w-16 h-16 mr-6" />
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{selectedScenario.title}</h1>
                    <p className="text-xl opacity-90">{selectedScenario.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-white/20 rounded-2xl p-4">
                    <img
                        src={selectedScenario.image}
                        alt={selectedScenario.title}
                        className="w-32 h-32 object-cover rounded-xl"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Content */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              {gameStep === 'problem' && (
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      {t?.problemLabel || 'Problem'}
                    </h2>
                    <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                      {selectedScenario.problem}
                    </p>
                    <button
                        onClick={() => setGameStep('expression')}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
                    >
                      {t?.startSolutionButton || 'Start Solution'}
                    </button>
                  </div>
              )}

              {gameStep === 'expression' && (
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      {t?.expressionQuestion || 'Which expression is correct?'}
                    </h2>
                    <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
                      {[selectedScenario.calculation, ...selectedScenario.wrongOptions].sort(() => Math.random() - 0.5).map((option, index) => (
                          <button
                              key={index}
                              onClick={() => selectExpression(option)}
                              className="bg-gradient-to-r from-purple-400 to-purple-600 text-white py-6 px-4 rounded-2xl text-2xl font-bold hover:from-purple-500 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                          >
                            {option}
                          </button>
                      ))}
                    </div>
                  </div>
              )}

              {gameStep === 'answer' && (
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      {t?.answerQuestion || 'What is the answer?'}
                    </h2>
                    <div className="mb-6">
                      <div className="text-4xl font-bold text-gray-800 mb-4">
                        {selectedExpression} = ?
                      </div>
                    </div>
                    <div className="max-w-sm mx-auto mb-8">
                      <input
                          type="number"
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && userAnswer && submitAnswer()}
                          className="w-full text-4xl font-bold text-center bg-gray-50 border-4 border-gray-300 rounded-2xl p-6 focus:border-blue-500 focus:outline-none"
                          placeholder="?"
                          autoFocus
                      />
                    </div>
                    <button
                        onClick={submitAnswer}
                        disabled={!userAnswer}
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {t?.check || 'Check'}
                    </button>
                  </div>
              )}

              {gameStep === 'result' && (
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-6 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {isCorrect ? `🎉 ${t?.evaFantasticResult || 'Fantastic!'}` : `😊 ${t?.tryAgainEva || 'Try again!'}`}
                    </div>

                    <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 mb-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        {t?.correctSolutionLabel || 'Correct Solution:'}
                      </h3>
                      <div className="text-4xl font-bold text-gray-800">
                        {selectedScenario.calculation} = {selectedScenario.answer}
                      </div>
                    </div>

                    {isCorrect && (
                        <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-4 mb-6">
                          <div className="text-lg font-bold text-gray-800">
                            +3 ⭐ {t?.foxyProudMessage || 'Foxy is proud of you!'}
                          </div>
                        </div>
                    )}

                    <div className="flex space-x-4 justify-center">
                      <button
                          onClick={resetScenario}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                      >
                        {t?.playAgain || 'Play Again'}
                      </button>
                      <button
                          onClick={() => setSelectedScenario(null)}
                          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
                      >
                        {t?.otherProblemsButton || 'Other Problems'}
                      </button>
                    </div>
                  </div>
              )}
            </div>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-300 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-4">
          <button
              onClick={() => {
                playSound && playSound('click');
                setCurrentScreen && setCurrentScreen('menu');
              }}
              className="bg-white/90 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-2xl shadow-lg flex items-center space-x-2 hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">{t?.backToMenu || 'Back to Menu'}</span>
          </button>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{t?.realWorldMath || 'Real World Math'}</h1>
            <p className="text-xl text-gray-600">{t?.realWorldDesc || 'Apply math to real-world scenarios'}</p>
          </div>

          {/* Scenarios Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.map((scenario) => {
              const Icon = scenario.icon;
              return (
                  <button
                      key={scenario.id}
                      onClick={() => selectScenario(scenario)}
                      className={`bg-gradient-to-br ${getCategoryColor(scenario.category)} text-white p-6 rounded-3xl shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95 text-left`}
                  >
                    <Icon className="w-12 h-12 mb-4" />
                    <h3 className="text-xl font-bold mb-2">{scenario.title}</h3>
                    <p className="text-sm opacity-90 mb-4">{scenario.description}</p>
                    <div className="bg-white/20 rounded-xl p-3">
                      <div className="text-sm font-medium opacity-90">
                        {t?.calculationLabel || 'Calculation:'}
                      </div>
                      <div className="text-lg font-bold">{scenario.calculation}</div>
                    </div>
                  </button>
              );
            })}
          </div>
        </div>
        <AnimatedFoxy message={foxyMessage ?? undefined} isVisible={isFoxyVisible} />
      </div>
  );
}