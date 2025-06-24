import React, { useState, useEffect, useCallback } from 'react';
import { useGame } from '../contexts/game-hooks';
import { ArrowLeft, Sparkles, Crown, Heart, Zap, Shield, Star } from 'lucide-react';
import { AnimatedFoxy } from './AnimatedFoxy';

interface FantasyScenario {
  id: number;
  title: string;
  description: string;
  problem: string;
  calculation: string;
  answer: number;
  icon: React.ComponentType<any>;
  creature: 'dragon' | 'unicorn' | 'mermaid' | 'fairy' | 'phoenix' | 'wizard';
  wrongOptions: string[];
  image: string;
}

export function FantasyMath() {
  const { t, setCurrentScreen, playSound, settings, addStars, showFoxyMessage, setIsFoxyVisible, foxyMessage, isFoxyVisible, setFoxyAnimationState } = useGame();
  const [selectedScenario, setSelectedScenario] = useState<FantasyScenario | null>(null);
  const [gameStep, setGameStep] = useState<'problem' | 'expression' | 'answer' | 'result'>('problem');
  const [selectedExpression, setSelectedExpression] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  const baseScenarios: Omit<FantasyScenario, 'title' | 'description' | 'problem'>[] = [
    {
      id: 1,
      calculation: "3 × 7",
      answer: 21,
      icon: Zap,
      creature: 'dragon',
      wrongOptions: ["3 + 7", "7 - 3", "3 ÷ 7"],
      image: "/images/dragon-scenario.jpg"
    },
    {
      id: 2,
      calculation: "4 × 6",
      answer: 24,
      icon: Sparkles,
      creature: 'unicorn',
      wrongOptions: ["4 + 6", "6 - 4", "4 ÷ 6"],
      image: "/images/unicorn-scenario.png"
    },
    {
      id: 3,
      calculation: "5 × 8",
      answer: 40,
      icon: Heart,
      creature: 'mermaid',
      wrongOptions: ["5 + 8", "8 - 5", "5 ÷ 8"],
      image: "/images/mermaid-scenario.jpg"
    },
    {
      id: 4,
      calculation: "6 × 9",
      answer: 54,
      icon: Star,
      creature: 'fairy',
      wrongOptions: ["6 + 9", "9 - 6", "6 ÷ 9"],
      image: "/images/fairy-scenario.jpg"
    },
    {
      id: 5,
      calculation: "7 × 5",
      answer: 35,
      icon: Crown,
      creature: 'phoenix',
      wrongOptions: ["7 + 5", "7 - 5", "7 ÷ 5"],
      image: "/images/phoenix-scenario.jpg"
    },
    {
      id: 6,
      calculation: "8 × 4",
      answer: 32,
      icon: Shield,
      creature: 'wizard',
      wrongOptions: ["8 + 4", "8 - 4", "8 ÷ 4"],
      image: "/images/wizard-scenario.png"
    }
  ];

  const scenarios: FantasyScenario[] = baseScenarios.map((baseScenario, index) => {
    const scenarioTexts = t?.fantasyScenarioData?.[index] || {
      title: `Fantasy Scenario ${index + 1}`,
      description: `Magical scenario ${index + 1}`,
      problem: `Solve this magical problem using ${baseScenario.calculation}`
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
      console.log('FantasyMath: Initializing Foxy for scenario/step:', selectedScenario?.id, gameStep);

      try {
        if (!selectedScenario) { // Scenario selection screen
          showFoxyMessage?.('foxyIntroFantasyMath');
        } else {
          switch (gameStep) {
            case 'problem':
              showFoxyMessage?.('foxyFantasyProblem', 5);
              break;
            case 'expression':
              showFoxyMessage?.('foxyFantasyExpression', 5);
              break;
            case 'answer':
              showFoxyMessage?.('foxyFantasyAnswer', 5);
              break;
            case 'result':
              if (isCorrect) {
                showFoxyMessage?.('foxyFantasyCorrect');
              } else {
                showFoxyMessage?.('foxyFantasyIncorrect');
              }
              break;
          }
        }
      } catch (error) {
        console.error('Error initializing Foxy in FantasyMath:', error);
      }
    } else {
      console.warn('FantasyMath: Cannot initialize Foxy - missing dependencies or not on client');
    }
  }, [selectedScenario, gameStep, isCorrect, showFoxyMessage, setIsFoxyVisible]);

  // Memoize the cleanup function
  const cleanupFoxy = useCallback(() => {
    if (typeof window !== 'undefined' && setIsFoxyVisible) {
      console.log('FantasyMath: Cleaning up Foxy');
      try {
        if (gameStep !== 'result') { // Keep message if on result screen
          setIsFoxyVisible?.(false);
        }
      } catch (error) {
        console.error('Error cleaning up Foxy:', error);
      }
    }
  }, [gameStep, setIsFoxyVisible]);

  const selectScenario = useCallback((scenario: FantasyScenario) => {
    setSelectedScenario(scenario);
    setGameStep('problem');
    setSelectedExpression('');
    setUserAnswer('');
    setIsCorrect(false);
    playSound?.('click');
  }, [playSound]);

  const selectExpression = useCallback((expression: string) => {
    setSelectedExpression(expression);
    setGameStep('answer');
    playSound?.('click');
  }, [playSound]);

  const submitAnswer = useCallback(() => {
    const isExpressionCorrect = selectedExpression === selectedScenario?.calculation;
    const isAnswerCorrect = parseInt(userAnswer) === selectedScenario?.answer;
    const bothCorrect = isExpressionCorrect && isAnswerCorrect;

    setIsCorrect(bothCorrect);
    setGameStep('result');

    if (bothCorrect) {
      playSound?.('correct');
      addStars?.(3); // Award 3 stars for getting both parts right
      setFoxyAnimationState?.('happy');
    } else {
      playSound?.('incorrect');
    }
  }, [selectedExpression, selectedScenario, userAnswer, playSound, addStars, setFoxyAnimationState]);

  const resetScenario = useCallback(() => {
    setGameStep('problem');
    setSelectedExpression('');
    setUserAnswer('');
    setIsCorrect(false);
  }, []);

  const getCreatureColor = useCallback((creature: string) => {
    const colors = {
      dragon: 'from-red-400 to-orange-600',
      unicorn: 'from-pink-400 to-purple-600',
      mermaid: 'from-blue-400 to-teal-600',
      fairy: 'from-green-400 to-emerald-600',
      phoenix: 'from-orange-400 to-red-600',
      wizard: 'from-purple-400 to-indigo-600'
    };
    return colors[creature as keyof typeof colors] || 'from-gray-400 to-gray-600';
  }, []);

  // Client-side mount detection
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Initialize Foxy when component mounts or relevant state changes (client-side only)
  useEffect(() => {
    if (!isMounted) return;

    console.log('FantasyMath: Component state changed on client');

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
        <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-indigo-300 flex items-center justify-center">
          <div className="text-2xl font-bold text-gray-700">Loading...</div>
        </div>
    );
  }

  if (selectedScenario) {
    const Icon = selectedScenario.icon;
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-indigo-300 p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pt-4">
            <button
                onClick={() => {
                  playSound?.('click');
                  setSelectedScenario(null);
                }}
                className="bg-white/90 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-2xl shadow-lg flex items-center space-x-2 hover:bg-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">{t?.backToMenu || 'Back to Menu'}</span>
            </button>
          </div>

          {/* Interactive Fantasy Scenario */}
          <div className="max-w-4xl mx-auto">
            {/* Scenario Header */}
            <div className={`bg-gradient-to-br ${getCreatureColor(selectedScenario.creature)} text-white rounded-3xl p-8 shadow-xl mb-8`}>
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
                      ✨ {t?.magicProblemTitle || 'Magic Problem'} ✨
                    </h2>
                    <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                      {selectedScenario.problem}
                    </p>
                    <button
                        onClick={() => setGameStep('expression')}
                        className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:from-purple-600 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
                    >
                      🪄 {t?.startMagicButton || 'Start Magic'} ✨
                    </button>
                  </div>
              )}

              {gameStep === 'expression' && (
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      🔮 {t?.magicExpressionQuestion || 'Which magic spell is correct?'} 🔮
                    </h2>
                    <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
                      {[selectedScenario.calculation, ...selectedScenario.wrongOptions].sort(() => Math.random() - 0.5).map((option, index) => (
                          <button
                              key={index}
                              onClick={() => selectExpression(option)}
                              className="bg-gradient-to-r from-indigo-400 to-purple-600 text-white py-6 px-4 rounded-2xl text-2xl font-bold hover:from-indigo-500 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                          >
                            ✨ {option} ✨
                          </button>
                      ))}
                    </div>
                  </div>
              )}

              {gameStep === 'answer' && (
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      ⭐ {t?.magicAnswerQuestion || 'What is the magic answer?'} ⭐
                    </h2>
                    <div className="mb-6">
                      <div className="text-4xl font-bold text-gray-800 mb-4">
                        ✨ {selectedExpression} = ? ✨
                      </div>
                    </div>
                    <div className="max-w-sm mx-auto mb-8">
                      <input
                          type="number"
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && userAnswer && submitAnswer()}
                          className="w-full text-4xl font-bold text-center bg-gradient-to-r from-purple-50 to-pink-50 border-4 border-purple-300 rounded-2xl p-6 focus:border-purple-500 focus:outline-none"
                          placeholder="?"
                          autoFocus
                      />
                    </div>
                    <button
                        onClick={submitAnswer}
                        disabled={!userAnswer}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      🪄 {t?.checkMagicButton || 'Check Magic'} ✨
                    </button>
                  </div>
              )}

              {gameStep === 'result' && (
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-6 ${isCorrect ? 'text-green-600' : 'text-purple-600'}`}>
                      {isCorrect ? (t?.magicCorrectResult || '🎉 Amazing magic!') : (t?.magicIncorrectResult || '✨ Try your magic again!')}
                    </div>

                    <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 mb-6 border-2 border-gold">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        ✨ {t?.correctSpellLabel || 'Correct Spell'} ✨
                      </h3>
                      <div className="text-4xl font-bold text-gray-800">
                        🪄 {selectedScenario.calculation} = {selectedScenario.answer} ⭐
                      </div>
                    </div>

                    {isCorrect && (
                        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 mb-6 border-2 border-purple-300">
                          <div className="text-lg font-bold text-gray-800">
                            +3 ⭐ {t?.magicStarMessage || 'You earned magical stars!'}
                          </div>
                        </div>
                    )}

                    <div className="flex space-x-4 justify-center">
                      <button
                          onClick={resetScenario}
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
                      >
                        🪄 {t?.moreMagicButton || 'More Magic'}
                      </button>
                      <button
                          onClick={() => setSelectedScenario(null)}
                          className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
                      >
                        ✨ {t?.otherAdventuresButtonFantasy || 'Other Adventures'}
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
      <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-indigo-300 p-4">
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
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              ✨ {t?.fantasyMath || 'Fantasy Math'} 🪄
            </h1>
            <p className="text-xl text-gray-600">
              {t?.fantasyDesc || 'Magical math adventures await!'}
            </p>
          </div>

          {/* Fantasy Scenarios Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.map((scenario) => {
              const Icon = scenario.icon;
              return (
                  <button
                      key={scenario.id}
                      onClick={() => selectScenario(scenario)}
                      className={`bg-gradient-to-br ${getCreatureColor(scenario.creature)} text-white p-6 rounded-3xl shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95 text-left relative overflow-hidden`}
                  >
                    {/* Magical sparkles background */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-2 right-2 text-2xl">✨</div>
                      <div className="absolute bottom-2 left-2 text-xl">⭐</div>
                      <div className="absolute top-1/2 left-1/4 text-lg">🪄</div>
                    </div>

                    <Icon className="w-12 h-12 mb-4 relative z-10" />
                    <h3 className="text-xl font-bold mb-2 relative z-10">{scenario.title}</h3>
                    <p className="text-sm opacity-90 mb-4 relative z-10">{scenario.description}</p>
                    <div className="bg-white/20 rounded-xl p-3 relative z-10">
                      <div className="text-sm font-medium opacity-90">
                        {t?.magicCalculationLabel || 'Magic Calculation:'}
                      </div>
                      <div className="text-lg font-bold">✨ {scenario.calculation} ✨</div>
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
