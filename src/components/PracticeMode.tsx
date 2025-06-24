import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Lightbulb, Check, RotateCcw, Star, Brain, Eye, Zap, Target } from 'lucide-react';
import { AnimatedFoxy } from './AnimatedFoxy';
import { useGame } from '../contexts/game-hooks';

// Enhanced practice mode with smart explanations AND Foxy integration
interface ExplanationContent {
  visual?: string;
  steps: string[];
  concept: string;
  realWorld?: string;
  pattern?: string;
  mnemonics?: string;
  strategy: string;
}

interface UserProgress {
  level: number;
  strugglingWith: number[];
  preferredStrategy: string;
  mistakePatterns: string[];
  consecutiveCorrect: number;
}

export function PracticeMode() {
  // Use actual useGame hook - import { useGame } from '../contexts/game-hooks';
  const { t, setCurrentScreen, playSound, addStars, showFoxyMessage, setIsFoxyVisible, foxyMessage, isFoxyVisible, setFoxyAnimationState } = useGame();

  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [currentProblem, setCurrentProblem] = useState<{ a: number; b: number } | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [explanation, setExplanation] = useState<ExplanationContent | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 3,
    strugglingWith: [1, 10], // Match the screenshot example 1×10
    preferredStrategy: 'visual_array',
    mistakePatterns: [],
    consecutiveCorrect: 0
  });

  // Helper functions for smart explanations
  const generateVisualDots = (a: number, b: number): string => {
    let visual = '';
    for (let row = 0; row < Math.min(b, 6); row++) {
      visual += '● '.repeat(Math.min(a, 10)) + (a > 10 ? '...' : '') + '\n';
    }
    if (b > 6) visual += '...\n';
    return visual + (t.visualDotsResult?.replace('{b}', b.toString()).replace('{a}', a.toString()).replace('{result}', (a * b).toString()) || `${b} rows × ${a} dots = ${a * b} total`);
  };

  const generateSkipCountingSteps = (a: number, b: number): string[] => {
    const sequence = [];
    for (let i = 1; i <= b; i++) {
      sequence.push(a * i);
    }
    return [
      t.skipCountingStep1?.replace('{a}', a.toString()) || `Start counting by ${a}s:`,
      t.skipCountingStep2?.replace('{sequence}', sequence.join(' → ')) || `${sequence.join(' → ')}`,
      t.skipCountingStep3?.replace('{b}', b.toString()).replace('{a}', a.toString()).replace('{result}', (a * b).toString()) || `We counted ${b} times: ${a} × ${b} = ${a * b}`
    ];
  };

  const generateDecompositionSteps = (a: number, b: number): string[] => {
    if (a > 10) {
      const tens = Math.floor(a / 10) * 10;
      const ones = a % 10;
      return [
        t.decompositionStep1?.replace('{a}', a.toString()).replace('{tens}', tens.toString()).replace('{ones}', ones.toString()) || `Break down ${a} = ${tens} + ${ones}`,
        t.decompositionStep2?.replace('{a}', a.toString()).replaceAll('{b}', b.toString()).replace('{tens}', tens.toString()).replace('{ones}', ones.toString()) || `${a} × ${b} = (${tens} + ${ones}) × ${b}`,
        t.decompositionStep3?.replace('{tensResult}', (tens * b).toString()).replace('{onesResult}', (ones * b).toString()).replace('{result}', (a * b).toString()) || `= ${tens * b} + ${ones * b} = ${a * b}`
      ];
    }
    return [t.decompositionFallback?.replace('{a}', a.toString()).replace('{b}', b.toString()).replace('{result}', (a * b).toString()) || `${a} × ${b} = ${a * b}`];
  };

  // Smart explanation generation
  const generateSmartExplanation = useCallback((a: number, b: number, attempts: number): ExplanationContent => {
    // Pattern recognition for 9s
    if (a === 9 || b === 9) {
      const other = a === 9 ? b : a;
      return {
        strategy: 'pattern_recognition',
        concept: t.ninesPatternConcept || `Special 9s trick: Use the "subtract from 10" method`,
        steps: [
          t.ninesStep1?.replace('{other}', other.toString()) || `Notice this is 9 × ${other}`,
          t.ninesStep2?.replace('{other}', other.toString()).replace('{result}', (10 * other).toString()) || `Think: 10 × ${other} = ${10 * other}`,
          t.ninesStep3?.replaceAll('{other}', other.toString()).replace('{calc1}', (10 * other).toString()).replace('{calc2}', (9 * other).toString()) || `Then subtract ${other}: ${10 * other} - ${other} = ${9 * other}`,
          t.ninesStep4?.replace('{other}', other.toString()).replace('{result}', (9 * other).toString()) || `So 9 × ${other} = ${9 * other}`
        ],
        pattern: t.ninesPattern || `9 times anything: multiply by 10, then subtract the number!`,
        mnemonics: t.ninesMnemonic || `Remember: 9 is just 1 less than 10!`
      };
    }

    // Pattern recognition for 11s
    if (a === 11 && b < 10) {
      return {
        strategy: 'pattern_recognition',
        concept: t.elevensPatternConcept || `Magical 11s pattern for single digits`,
        steps: [
          t.elevensStep1?.replace('{digit}', b.toString()) || `Special 11 pattern: 11 × ${b}`,
          t.elevensStep2?.replaceAll('{digit}', b.toString()) || `Just write the digit twice: ${b}${b}`,
          t.elevensStep3?.replace('{digit}', b.toString()).replace('{result}', (11 * b).toString()) || `Check: 11 × ${b} = ${11 * b}`
        ],
        pattern: t.elevensPattern || `11 × single digit = repeat the digit!`,
        mnemonics: t.elevensMnemonic || `11 likes to see double!`
      };
    }

    // For struggling numbers or multiple attempts, use visual
    if (userProgress.strugglingWith.includes(a) || userProgress.strugglingWith.includes(b) || attempts > 1) {
      return {
        strategy: 'visual_array',
        concept: t.visualArrayConcept?.replaceAll('{a}', a.toString()).replaceAll('{b}', b.toString()) || `Think of ${a} × ${b} as making ${b} groups of ${a} objects`,
        visual: generateVisualDots(a, b),
        steps: [
          t.visualStep1?.replace('{b}', b.toString()).replace('{a}', a.toString()) || `Make ${b} groups of ${a} dots`,
          t.visualStep2?.replace('{result}', (a * b).toString()) || `Count all the dots: ${a * b}`,
          t.visualStep3?.replace('{a}', a.toString()).replace('{b}', b.toString()) || `Each row has ${a} dots, ${b} rows total`
        ],
        realWorld: t.visualRealWorld?.replace('{b}', b.toString()).replace('{a}', a.toString()).replace('{result}', (a * b).toString()) || `Like having ${b} boxes with ${a} toys each = ${a * b} toys total`
      };
    }

    // Skip counting for medium numbers
    if (a <= 10 && b <= 10) {
      return {
        strategy: 'skip_counting',
        concept: t.skipCountingConcept?.replace('{a}', a.toString()).replace('{b}', b.toString()) || `Count by ${a}s, ${b} times`,
        steps: generateSkipCountingSteps(a, b),
        pattern: t.skipCountingPattern?.replace('{a}', a.toString()).replace('{a2}', (a*2).toString()).replace('{a3}', (a*3).toString()).replace('{result}', (a*b).toString()) || `${a}, ${a*2}, ${a*3}... up to ${a*b}`,
        mnemonics: t.skipCountingMnemonic?.replace('{a}', a.toString()) || `Skip counting by ${a}s!`
      };
    }

    // Decomposition for larger numbers
    return {
      strategy: 'decomposition',
      concept: t.decompositionConcept || `Break down into easier parts`,
      steps: generateDecompositionSteps(a, b),
      pattern: t.decompositionPattern || `Break large numbers into tens and ones`
    };
  }, [userProgress.strugglingWith, t]);

  // Foxy initialization (preserved from original)
  const initializeFoxy = useCallback(() => {
    if (typeof window !== 'undefined' && showFoxyMessage && setIsFoxyVisible) {
      console.log('PracticeMode: Initializing Foxy');
      try {
        showFoxyMessage('foxyIntroPracticeMode');
      } catch (error) {
        console.error('Error initializing Foxy:', error);
      }
    }
  }, [showFoxyMessage, setIsFoxyVisible]);

  const cleanupFoxy = useCallback(() => {
    if (typeof window !== 'undefined' && setIsFoxyVisible) {
      console.log('PracticeMode: Cleaning up Foxy');
      try {
        setIsFoxyVisible(false);
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
    setExplanation(null);
    setAttempts(0);
  }, []);

  const checkAnswer = useCallback(() => {
    if (!currentProblem || !userAnswer) return;

    const correctAnswer = currentProblem.a * currentProblem.b;
    const isRight = parseInt(userAnswer) === correctAnswer;

    setIsCorrect(isRight);
    setTotalAnswers(prev => prev + 1);
    setAttempts(prev => prev + 1);

    if (isRight) {
      setCorrectAnswers(prev => prev + 1);
      setUserProgress(prev => ({
        ...prev,
        consecutiveCorrect: prev.consecutiveCorrect + 1
      }));

      playSound?.('correct');
      addStars?.(1);
      setFoxyAnimationState?.('happy');

      // Show Foxy encouragement for streaks
      if ((correctAnswers + 1) % 3 === 0) {
        showFoxyMessage?.('foxyEncouragementStreak3');
      } else if ((correctAnswers + 1) % 5 === 0) {
        showFoxyMessage?.('foxyEncouragementStreak5');
      }

      setTimeout(() => {
        generateProblem(currentProblem.a);
      }, 2000);
    } else {
      playSound?.('incorrect');
      showFoxyMessage?.('foxyEncouragementTryAgain');

      // Track struggling numbers
      setUserProgress(prev => ({
        ...prev,
        strugglingWith: [...new Set([...prev.strugglingWith, currentProblem.a, currentProblem.b])],
        consecutiveCorrect: 0
      }));
    }
  }, [currentProblem, userAnswer, correctAnswers, playSound, addStars, setFoxyAnimationState, showFoxyMessage, generateProblem]);

  const showSmartHint = useCallback(() => {
    if (!currentProblem) return;

    const smartExp = generateSmartExplanation(currentProblem.a, currentProblem.b, attempts);
    setExplanation(smartExp);
    setShowHint(true);
    playSound?.('click');

    // Show Foxy hint message
    showFoxyMessage?.('foxyHintMessage');
  }, [currentProblem, attempts, generateSmartExplanation, playSound, showFoxyMessage]);

  const restartProblem = useCallback(() => {
    if (selectedTable) {
      generateProblem(selectedTable);
    }
  }, [selectedTable, generateProblem]);

  // Client-side mount detection (preserved from original)
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Initialize Foxy when component mounts (preserved from original)
  useEffect(() => {
    if (!isMounted) return;

    console.log('PracticeMode: Component mounted on client');
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

  // Keyboard event handler (preserved from original)
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

  // Loading screen (preserved from original)
  if (!isMounted) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-200 via-blue-200 to-purple-300 flex items-center justify-center">
          <div className="text-2xl font-bold text-gray-700">Loading...</div>
        </div>
    );
  }

  const renderTableSelection = () => (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">{t.selectTable}</h2>
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
                {table}{t.tableButtonSuffix}
              </button>
          ))}
        </div>
      </div>
  );

  const getStrategyIcon = (strategy: string) => {
    switch (strategy) {
      case 'visual_array': return <Eye className="w-5 h-5" />;
      case 'pattern_recognition': return <Zap className="w-5 h-5" />;
      case 'skip_counting': return <Target className="w-5 h-5" />;
      case 'decomposition': return <Brain className="w-5 h-5" />;
      default: return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getStrategyColor = (strategy: string) => {
    switch (strategy) {
      case 'visual_array': return 'bg-green-500 hover:bg-green-600';
      case 'pattern_recognition': return 'bg-purple-500 hover:bg-purple-600';
      case 'skip_counting': return 'bg-blue-500 hover:bg-blue-600';
      case 'decomposition': return 'bg-orange-500 hover:bg-orange-600';
      default: return 'bg-yellow-500 hover:bg-yellow-600';
    }
  };

  const renderProblem = () => {
    if (!currentProblem) return null;

    const correctAnswer = currentProblem.a * currentProblem.b;

    return (
        <div className="text-center max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">
              {t.tableSeriesLabel.replace('{tableNumber}', selectedTable!.toString())} - {t.practiceTitle}
            </h2>

            {/* Progress */}
            <div className="flex justify-between items-center mb-6 text-gray-600">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2 fill-current" />
                <span>{correctAnswers} {t.correctAnswersSuffix}</span>
              </div>
              <div>
                {totalAnswers > 0 && (
                    <span>{Math.round((correctAnswers / totalAnswers) * 100)}{t.percentageCorrectSuffix}</span>
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

            {/* Traditional Hint (preserved for compatibility) */}
            {showHint && !explanation && (
                <div className="bg-yellow-100 rounded-2xl p-4 mb-6 text-lg">
                  <Lightbulb className="w-6 h-6 text-yellow-600 inline mr-2" />
                  <span className="text-yellow-800">
                {t.thinkHintPrefix} {Array.from({ length: currentProblem.b }, (_, i) => currentProblem.a).join(' + ')} = {correctAnswer}
              </span>
                </div>
            )}

            {/* Smart Explanation */}
            {showHint && explanation && (
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6 text-left max-w-2xl mx-auto border border-indigo-200">
                  <div className="flex items-center mb-3">
                    {getStrategyIcon(explanation.strategy)}
                    <span className="ml-2 font-semibold text-indigo-800 capitalize">
                  {t.strategyLabel?.replace('{strategy}', explanation.strategy.replace('_', ' ')) || explanation.strategy.replace('_', ' ')} {t.strategyLabelSuffix || 'Strategy'}
                </span>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/80 rounded-lg p-3">
                      <h4 className="font-medium text-indigo-700 mb-2">{t.keyConceptLabel || '💡 Key Concept:'}</h4>
                      <p className="text-gray-700">{explanation.concept}</p>
                    </div>

                    {explanation.visual && (
                        <div className="bg-green-50 rounded-lg p-3">
                          <h4 className="font-medium text-green-700 mb-2">{t.visualLabel || '👁️ Visual:'}</h4>
                          <pre className="text-green-800 font-mono text-sm whitespace-pre-wrap">
                      {explanation.visual}
                    </pre>
                        </div>
                    )}

                    <div className="bg-blue-50 rounded-lg p-3">
                      <h4 className="font-medium text-blue-700 mb-2">{t.stepsLabel || '📝 Steps:'}</h4>
                      <ol className="space-y-1">
                        {explanation.steps.map((step, index) => (
                            <li key={index} className="text-blue-800">
                              <span className="font-medium">{index + 1}.</span> {step}
                            </li>
                        ))}
                      </ol>
                    </div>

                    {explanation.pattern && (
                        <div className="bg-purple-50 rounded-lg p-3">
                          <h4 className="font-medium text-purple-700 mb-2">{t.patternLabel || '🔍 Pattern:'}</h4>
                          <p className="text-purple-800">{explanation.pattern}</p>
                        </div>
                    )}

                    {explanation.mnemonics && (
                        <div className="bg-yellow-50 rounded-lg p-3">
                          <h4 className="font-medium text-yellow-700 mb-2">{t.memoryTrickLabel || '🧠 Memory Trick:'}</h4>
                          <p className="text-yellow-800 font-medium">{explanation.mnemonics}</p>
                        </div>
                    )}

                    {explanation.realWorld && (
                        <div className="bg-orange-50 rounded-lg p-3">
                          <h4 className="font-medium text-orange-700 mb-2">{t.realWorldLabel || '🌍 Real World:'}</h4>
                          <p className="text-orange-800">{explanation.realWorld}</p>
                        </div>
                    )}
                  </div>
                </div>
            )}

            {/* Feedback */}
            {isCorrect === true && (
                <div className="bg-green-100 rounded-2xl p-4 mb-6 text-xl font-bold text-green-800 animate-pulse">
                  <Check className="w-8 h-8 inline mr-2" />
                  {t.excellent}! {currentProblem.a} × {currentProblem.b} = {correctAnswer}
                  <div className="text-sm mt-2">{t.oneStarEarned}</div>
                  {userProgress.consecutiveCorrect >= 3 && (
                      <div className="text-sm mt-1 text-green-600">
                        {t.consecutiveCorrectMessage.replace('{count}', userProgress.consecutiveCorrect.toString())}
                      </div>
                  )}
                </div>
            )}

            {isCorrect === false && (
                <div className="bg-red-100 rounded-2xl p-4 mb-6">
                  <div className="text-xl font-bold text-red-800 mb-2">
                    {t.tryAgain} {t.correctAnswerIs} {correctAnswer}
                  </div>
                  {attempts > 1 && (
                      <div className="text-sm text-red-600">
                        {t.keepTryingMessage}
                      </div>
                  )}
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 flex-wrap gap-2">
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
                        onClick={showSmartHint}
                        className={`${explanation ? getStrategyColor(explanation.strategy) : 'bg-indigo-500 hover:bg-indigo-600'} text-white px-8 py-3 rounded-2xl text-lg font-bold shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 flex items-center`}
                    >
                      {explanation ? getStrategyIcon(explanation.strategy) : <Brain className="w-5 h-5" />}
                      <span className="ml-2">
                    {explanation ? t.newStrategyLabel : t.hint}
                  </span>
                    </button>
                  </>
              )}

              <button
                  onClick={restartProblem}
                  className="bg-blue-500 text-white px-8 py-3 rounded-2xl text-lg font-bold shadow-lg hover:bg-blue-600 transform transition-all duration-200 hover:scale-105 active:scale-95 flex items-center"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                {t.newProblemButton}
              </button>
            </div>

            {/* Struggling Numbers Alert */}
            {userProgress.strugglingWith.length > 0 && attempts === 0 && (
                <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-center text-amber-800">
                    <Target className="w-5 h-5 mr-2" />
                    <span className="font-medium">{t.practiceAreasTitle}</span>
                  </div>
                  <p className="text-amber-700 text-sm mt-1">
                    {t.practiceAreasMessage.replace('{tables}', userProgress.strugglingWith.slice(0, 3).join(', '))}
                  </p>
                </div>
            )}
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
            <span className="font-medium">{t.backToMenu}</span>
          </button>

          {selectedTable && (
              <button
                  onClick={() => {
                    setSelectedTable(null);
                    setCorrectAnswers(0);
                    setTotalAnswers(0);
                    setUserProgress(prev => ({ ...prev, strugglingWith: [] }));
                  }}
                  className="bg-white/90 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-2xl shadow-lg hover:bg-white transition-colors font-medium"
              >
                {t.selectOtherTableButton}
              </button>
          )}
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {!selectedTable ? renderTableSelection() : renderProblem()}
        </div>

        {/* Strategy Legend */}
        {selectedTable && (
            <div className="fixed bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl max-w-xs">
              <h4 className="font-bold text-gray-700 mb-2 text-sm">{t.smartStrategiesTitle}</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 text-green-500 mr-2" />
                  <span>{t.visualStrategyLabel}</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-4 h-4 text-purple-500 mr-2" />
                  <span>{t.patternStrategyLabel}</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-4 h-4 text-blue-500 mr-2" />
                  <span>{t.countingStrategyLabel}</span>
                </div>
                <div className="flex items-center">
                  <Brain className="w-4 h-4 text-orange-500 mr-2" />
                  <span>{t.breakdownStrategyLabel}</span>
                </div>
              </div>
            </div>
        )}

        {/* Decorative Elements (preserved from original) */}
        <div className="fixed top-16 right-16 animate-spin-slow">
          <img src="/images/math-symbols.jpg" alt={t.mathSymbolsAlt} className="w-16 h-16 rounded-full opacity-20" />
        </div>

        {/* ESSENTIAL: Animated Foxy Component (preserved from original) */}
        <AnimatedFoxy message={foxyMessage ?? undefined} isVisible={isFoxyVisible} />
      </div>
  );
}
