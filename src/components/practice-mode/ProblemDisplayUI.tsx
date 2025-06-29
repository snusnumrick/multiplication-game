import React from 'react';
import {Brain, Check, Lightbulb, RotateCcw, Star, Target, Zap} from 'lucide-react';
import type {Translation} from '../../translations';
import type {ExplanationContent, UserProgress} from './PracticeModeTypes';
import {getStrategyIcon} from './PracticeModeUtils.js';

interface ProblemDisplayUIProps {
    t: Translation;
    selectedTable: number | null;
    currentProblem: { a: number; b: number } | null;
    correctAnswers: number;
    totalAnswers: number;
    userAnswer: string;
    setUserAnswer: (answer: string) => void;
    showHint: boolean;
    explanation: ExplanationContent | null;
    isCorrect: boolean | null;
    userProgress: UserProgress;
    attempts: number;
    onCheckAnswer: () => void;
    onKeyPress: (any) => void;
    onShowSmartHint: () => void;
    onRestartProblem: () => void;
    onCloseHint: () => void;
    hasAlternativeStrategy?: boolean;
    onExplainDifferently?: () => void;
    showAnswer: boolean;
    onShowAnswer: () => void;
}

export const ProblemDisplayUI: React.FC<ProblemDisplayUIProps> = ({
                                                                      t,
                                                                      selectedTable,
                                                                      currentProblem,
                                                                      correctAnswers,
                                                                      totalAnswers,
                                                                      userAnswer,
                                                                      setUserAnswer,
                                                                      showHint,
                                                                      explanation,
                                                                      isCorrect,
                                                                      userProgress,
                                                                      attempts,
                                                                      onCheckAnswer,
                                                                      onKeyPress,
                                                                      onShowSmartHint,
                                                                      onRestartProblem,
                                                                      onCloseHint,
                                                                      hasAlternativeStrategy,
                                                                      onExplainDifferently,
                                                                      showAnswer,
                                                                      onShowAnswer,
                                                                  }) => {
    if (!currentProblem) return null;

    const correctAnswer = currentProblem.a * currentProblem.b;

    const getTranslatedStrategyName = (strategyKey: string): string => {
        switch (strategyKey) {
            case 'visual_array':
                return t.strategyVisualArray || 'Visual Array';
            case 'pattern_recognition':
                return t.strategyPatternRecognition || 'Pattern Recognition';
            case 'skip_counting':
                return t.strategySkipCounting || 'Skip Counting';
            case 'decomposition':
                return t.strategyDecomposition || 'Decomposition';
            case 'twos':
                return t.strategyDoubles || 'Doubles';
            case 'pure_doubles':
                return t.strategyPureDoubles || 'Pure Doubles';
            case 'fives_half_of_ten':
                return t.strategyFivesHalfOfTen || 'Fives (Half of Ten)';
            case 'fives_nickel_counting':
                return t.strategyFivesNickelCounting || 'Fives (Nickel Counting)';
            case 'squares':
                return t.strategySquares || 'Squares';
            case 'near_doubles':
                return t.strategyNearDoubles || 'Near Doubles';
            case 'building_known_facts':
                return t.strategyBuildingKnownFacts || 'Building From Known Facts';
            case 'ones':
                return t.strategyOnes || 'Ones';
            case 'tens':
                return t.strategyTens || 'Tens';
            case 'nines':
                return t.strategyNines || 'Nines';
            case 'nines_digit_sum':
                return t.strategyNinesDigitSum || 'Nines Digit Sum';
            case 'nines_finger_trick':
                return t.strategyNinesFingerTrick || 'Nines Finger Trick';
            case 'elevens_simple':
                return t.strategyElevens || 'Elevens';
            case 'elevens_advanced':
                return t.strategyAdvancedElevens || 'Advanced Elevens';
            case 'memory_trick':
                return t.strategyMemoryTrick || 'Memory Trick';
            case 'benchmark_numbers':
                return t.strategyBenchmark || 'Benchmark Numbers';
            case 'rounding_and_adjusting':
                return t.strategyRoundingAndAdjusting || 'Rounding and Adjusting';
            case 'left_to_right':
                return t.strategyLeftToRight || 'Left-to-Right Calculation';
            default:
                // Fallback for any unknown strategies, convert from snake_case to Title Case
                console.warn(`Missing translation for strategy: ${strategyKey}`);
                return strategyKey
                    .split('_')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
        }
    };

    // console.log('hasAlternativeStrategy', hasAlternativeStrategy);
    return (
        <div className="text-center max-w-4xl mx-auto">
            <div
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl min-h-[500px] flex flex-col justify-center">
                {showHint && explanation ? (
                    // Explanation Modal Content
                    <>
                        <div
                            className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 text-left max-w-2xl mx-auto border border-indigo-200 w-full overflow-y-auto max-h-[calc(100vh-200px)] cursor-pointer"
                            onClick={onCloseHint} // Add onClick here to close when tapping the hint area
                        >
                            <div className="flex items-center mb-3">
                                {getStrategyIcon(explanation.strategy)}
                                <span className="ml-2 font-semibold text-indigo-800">
                  {/*{t.strategyLabelSuffix || 'Strategy'} */}
                                    {getTranslatedStrategyName(explanation.strategy)}
                </span>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white/80 rounded-lg p-3">
                                    {/*<h4 className="font-medium text-indigo-700 mb-2">{t.keyConceptLabel || '💡 Key Concept:'}</h4>*/}
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
                        <div className="mt-6 flex justify-center space-x-4 flex-wrap gap-y-2">
                            {hasAlternativeStrategy && onExplainDifferently && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onExplainDifferently?.();
                                    }}
                                    className="bg-teal-500 text-white px-8 py-3 rounded-2xl text-lg font-bold shadow-lg hover:bg-teal-600 transform transition-all duration-200 hover:scale-105 active:scale-95 flex items-center"
                                >
                                    <Zap className="w-5 h-5 mr-2"/>
                                    {t.explainDifferentlyButton || "Explain Differently"}
                                </button>
                            )}
                            <button
                                onClick={onCloseHint}
                                className="bg-gray-200 text-gray-700 px-8 py-3 rounded-2xl text-lg font-bold shadow-lg hover:bg-gray-300 transform transition-all duration-200 hover:scale-105 active:scale-95 flex items-center"
                            >
                                <RotateCcw
                                    className="w-5 h-5 mr-2 transform scale-x-[-1]"/> {/* Using RotateCcw and flipping for a 'close' feel */}
                                {t.closeHintButton || "Close Hint"}
                            </button>
                        </div>
                    </>
                ) : (
                    // Problem View Content
                    <>
                        <h2 className="text-2xl font-bold text-gray-700 mb-6">
                            {t.tableSeriesLabel.replace('{tableNumber}', selectedTable!.toString())} - {t.practiceTitle}
                        </h2>

                        {/* Progress */}
                        <div className="flex justify-between items-center mb-6 text-gray-600">
                            <div className="flex items-center">
                                <Star className="w-5 h-5 text-yellow-500 mr-2 fill-current"/>
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
                                onKeyDown={onKeyPress}
                                className={`text-4xl font-bold text-center bg-gray-50 border-2 rounded-2xl p-4 w-48 mx-auto block focus:outline-none ${
                                    isCorrect === true 
                                        ? 'border-green-500 focus:border-green-600' 
                                        : isCorrect === false 
                                            ? 'border-red-500 focus:border-red-600' 
                                            : 'border-gray-300 focus:border-blue-500'
                                }`}
                                placeholder="?"
                                autoFocus
                            />
                        </div>

                        {/* Traditional Hint (one-liner, shown if showHint is true but no smart explanation) */}
                        {showHint && !explanation && (
                            <div className="bg-yellow-100 rounded-2xl p-4 mb-6 text-lg">
                                <Lightbulb className="w-6 h-6 text-yellow-600 inline mr-2"/>
                                <span className="text-yellow-800">
                  {t.thinkHintPrefix} {Array.from({length: currentProblem.b}, (_, i) => currentProblem.a).join(' + ')} = {correctAnswer}
                </span>
                            </div>
                        )}

                        {/* Feedback */}
                        {isCorrect === true && (
                            <div
                                className="bg-green-100 rounded-2xl p-4 mb-6 text-xl font-bold text-green-800 animate-pulse">
                                <Check className="w-8 h-8 inline mr-2"/>
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
                                    {t.tryAgain}
                                    {showAnswer && ` - ${t.correctAnswerIs} ${correctAnswer}`}
                                </div>
                                {attempts >= 1 && !showAnswer && (
                                    <div className="text-sm text-red-600">
                                        {t.keepTryingMessage}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div
                            className="flex flex-col sm:flex-row sm:justify-center sm:space-x-4 sm:flex-wrap sm:gap-2 gap-3 w-full sm:w-auto sm:max-w-none max-w-lg mx-auto">
                            {!isCorrect && !showAnswer && (
                                <>
                                    <button
                                        onClick={onCheckAnswer}
                                        disabled={!userAnswer}
                                        className="w-full sm:w-auto bg-green-500 text-white px-8 py-3 rounded-2xl text-lg font-bold shadow-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-105 active:scale-95"
                                    >
                                        {t.check}
                                    </button>

                                    <button
                                        onClick={onShowSmartHint}
                                        className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-2xl text-lg font-bold shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center"
                                    >
                                        <Brain className="w-5 h-5"/>
                                        <span className="ml-2">{t.hint}</span>
                                    </button>
                                    {/*                  {isCorrect === false && (
                    <button
                      onClick={onShowAnswer}
                      className="bg-rose-500 text-white px-8 py-3 rounded-2xl text-lg font-bold shadow-lg hover:bg-rose-600 transform transition-all duration-200 hover:scale-105 active:scale-95 flex items-center"
                    >
                      <Eye className="w-5 h-5 mr-2" />
                      {t.showAnswerButton || 'Show Answer'}
                    </button>
                  )}*/}
                                </>
                            )}

                            <button
                                onClick={onRestartProblem}
                                className="w-full sm:w-auto bg-blue-500 text-white px-8 py-3 rounded-2xl text-lg font-bold shadow-lg hover:bg-blue-600 transform transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center"
                            >
                                <RotateCcw className="w-5 h-5 mr-2"/>
                                {t.newProblemButton}
                            </button>
                        </div>

                        {/* Struggling Numbers Alert */}
                        {userProgress.strugglingWith.length > 0 && attempts === 0 && (
                            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
                                <div className="flex items-center text-amber-800">
                                    <Target className="w-5 h-5 mr-2"/>
                                    <span className="font-medium">{t.practiceAreasTitle}</span>
                                </div>
                                <p className="text-amber-700 text-sm mt-1">
                                    {t.practiceAreasMessage.replace('{tables}', userProgress.strugglingWith.slice(0, 3).join(', '))}
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};