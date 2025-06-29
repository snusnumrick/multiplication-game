import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Brain, Eye, Zap, Target, Hand, Ear } from 'lucide-react';
import { AnimatedFoxy } from './AnimatedFoxy';
import { useGame } from '../contexts/game-hooks';
import type { Translation } from '../translations';
import { ExplanationContent, UserProgress } from './practice-mode/PracticeModeTypes';
import { generateSmartExplanation as generateSmartExplanationLogic } from './practice-mode/PracticeModeExplanations';
import { strategyLearningStyles } from './practice-mode/StrategyLearningStyles';

const MemoizedProblemDisplay = React.memo(ProblemDisplayUI);
import { TableSelectionUI } from './practice-mode/TableSelectionUI';
import { ProblemDisplayUI } from './practice-mode/ProblemDisplayUI';
import { getStrategyCategory } from './practice-mode/PracticeModeUtils';

export function PracticeMode() {
  const {
    t,
    setCurrentScreen,
    settings,
    showFoxyMessage,
    playSound,
    progress: gameProgress,
    updateProgress,
    recordStrategySuccess,
    recordLearningStyleSuccess,
    addStars,
    setFoxyAnimationState,
    foxyMessage,
    isFoxyVisible,
    setIsFoxyVisible,
  } = useGame();

  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [currentProblem, setCurrentProblem] = useState<{ a: number; b: number } | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [explanation, setExplanation] = useState<ExplanationContent | null>(null);
  const [canShowAlternative, setCanShowAlternative] = useState(false); // New state
  const [attempts, setAttempts] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 3,
    strugglingWith: [1, 10], // Match the screenshot example 1×10
    preferredStrategy: 'visual_array',
    mistakePatterns: [],
    consecutiveCorrect: 0
  });

  // Smart explanation generation (now uses imported logic)
  const generateSmartExplanation = useCallback((a: number, b: number, attempts: number, discoveryMode: boolean = false): ExplanationContent => {
    return generateSmartExplanationLogic(a, b, attempts, t as Translation, userProgress.strugglingWith, gameProgress.strategySuccess, gameProgress.learningStyleSuccess, { discoveryMode });
  }, [userProgress.strugglingWith, t, gameProgress.strategySuccess, gameProgress.learningStyleSuccess]);

  // Helper function to get a list of unique explanations based on strategy name
  const getUniqueExplanationsList = useCallback((): ExplanationContent[] => {
    if (!currentProblem) return [];

    const testAttemptValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const allGenerated: ExplanationContent[] = [];
    for (const ta of testAttemptValues) {
      // Ensure generateSmartExplanation is called with valid problem numbers
      if (currentProblem.a != null && currentProblem.b != null) {
        // Pass true for discoveryMode to find all potential strategies
        allGenerated.push(generateSmartExplanation(currentProblem.a, currentProblem.b, ta, true));
      }
    }

    const uniqueMap = new Map<string, ExplanationContent>();
    for (const exp of allGenerated) {
      if (exp && exp.strategy && !uniqueMap.has(exp.strategy)) {
        uniqueMap.set(exp.strategy, exp);
      }
    }
    const uniqueList = Array.from(uniqueMap.values());
    // console.log('uniqueList', uniqueList);
    return uniqueList;
  }, [currentProblem, generateSmartExplanation]);

  // Foxy initialization
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
      const newConsecutiveCorrect = userProgress.consecutiveCorrect + 1;
      setCorrectAnswers(prev => prev + 1);
      setUserProgress(prev => ({
        ...prev,
        consecutiveCorrect: newConsecutiveCorrect
      }));

      playSound?.('correct');
      addStars?.(1);
      setFoxyAnimationState?.('happy');

      // Record strategy success if a hint was shown for this problem
      if (explanation && explanation.strategy) {
      recordStrategySuccess(explanation.strategy);
      const learningStyle = strategyLearningStyles[explanation.strategy];
      if (learningStyle) {
        recordLearningStyleSuccess(learningStyle);
      }
    }

      // Show Foxy encouragement using newConsecutiveCorrect
      if (newConsecutiveCorrect % 5 === 0) {
        showFoxyMessage?.('foxyEncouragementStreak5');
      } else if (newConsecutiveCorrect % 3 === 0) {
        showFoxyMessage?.('foxyEncouragementStreak3');
      } else if (newConsecutiveCorrect === 1) { // Only if it's the first in a sequence
        showFoxyMessage?.('foxyGeneralCorrectMessage');
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
  }, [currentProblem, userAnswer, playSound, addStars, setFoxyAnimationState, showFoxyMessage, generateProblem, explanation, recordStrategySuccess, userProgress.consecutiveCorrect, recordLearningStyleSuccess]);

  const showSmartHint = useCallback(() => {
    if (!currentProblem) return;

    const smartExp = generateSmartExplanation(currentProblem.a, currentProblem.b, attempts); // This now calls the useCallback wrapper
    setExplanation(smartExp);
    setShowHint(true);
    playSound?.('click');

    // Show Foxy hint message
    showFoxyMessage?.('foxyHintMessage');
    
    // Determine if alternative explanations exist
    const uniqueExplanations = getUniqueExplanationsList();
    const hasAlternatives = uniqueExplanations.some(ue => ue.strategy !== smartExp.strategy);
    setCanShowAlternative(hasAlternatives);

  }, [currentProblem, attempts, generateSmartExplanation, playSound, showFoxyMessage, getUniqueExplanationsList]);

  const restartProblem = useCallback(() => {
    if (selectedTable) {
      generateProblem(selectedTable);
    }
  }, [selectedTable, generateProblem]);

  const handleCloseHint = useCallback(() => {
    setShowHint(false);
    setExplanation(null);
    playSound?.('click');
  }, [playSound]);

  // New callback for explaining differently
  const handleExplainDifferently = useCallback(() => {
    if (!currentProblem || !explanation) return;

    // This list is sorted from simplest/most successful to most complex
    const uniqueExplanations = getUniqueExplanationsList();
    const currentIndex = uniqueExplanations.findIndex(exp => exp.strategy === explanation.strategy);

    // The next explanation is simply the next one in the sorted list.
    const nextIndex = currentIndex + 1;

    if (nextIndex < uniqueExplanations.length) {
      // A next explanation exists, so show it.
      const nextExplanation = uniqueExplanations[nextIndex];
      setExplanation(nextExplanation);
      playSound?.('click');
      
      // Check if there are any *more* explanations after this new one.
      const hasFurtherAlternatives = nextIndex + 1 < uniqueExplanations.length;
      setCanShowAlternative(hasFurtherAlternatives);

      if (hasFurtherAlternatives) {
        showFoxyMessage?.('foxyAlternativeHintMessage');
      } else {
        // This is the last available hint. Show it and tell the user.
        showFoxyMessage?.('foxyNoMoreHintsMessage');
      }
    } else {
      // This case should ideally not be reached if the button is correctly hidden.
      // But as a safeguard:
      playSound?.('click');
      showFoxyMessage?.('foxyNoMoreHintsMessage');
      setCanShowAlternative(false);
    }
  }, [currentProblem, explanation, getUniqueExplanationsList, playSound, showFoxyMessage, setExplanation, setCanShowAlternative]);

  useEffect(() => {
    if (selectedTable && updateProgress) {
      const currentScore = gameProgress.practiceProgress[selectedTable] || 0;
      if (correctAnswers > currentScore) {
        updateProgress({
          practiceProgress: {
            ...gameProgress.practiceProgress,
            [selectedTable]: correctAnswers,
          },
        });
      }
    }
  }, [correctAnswers, selectedTable, updateProgress, gameProgress.practiceProgress]);


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
          <div className="text-2xl font-bold text-gray-700">{t.loading || 'Loading...'}</div>
        </div>
    );
  }

  // Handler for table selection from the UI component
  const handleTableSelect = (table: number) => {
    setSelectedTable(table);
    setCorrectAnswers(0);
    setTotalAnswers(0);
    setUserProgress(prev => ({
      ...prev,
      strugglingWith: [], // Clear struggling numbers; line will appear on first mistake with specific numbers
      consecutiveCorrect: 0,   // Reset streak for the new table
    }));
    // playSound is called within TableSelectionUI

    // Foxy announces the new table selection
    if (showFoxyMessage) {
      // This assumes a new translation key 'foxyLetsPracticeNewTable' will be added, e.g.,
      // "Great choice! Let's start practicing this table."
      showFoxyMessage('foxyLetsPracticeNewTable');
    }
  };

  // console.log('canShowAlternative', canShowAlternative, 'explanation', explanation);

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
              playSound?.('click'); // Added playSound here
            }}
            className="bg-white/90 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-2xl shadow-lg hover:bg-white transition-colors font-medium"
          >
            {t.selectOtherTableButton}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        {!selectedTable ? (
          <TableSelectionUI
            t={t as Translation}
            onTableSelect={handleTableSelect}
            playSound={playSound}
          />
        ) : (
          <ProblemDisplayUI
            t={t as Translation}
            selectedTable={selectedTable}
            currentProblem={currentProblem}
            correctAnswers={correctAnswers}
            totalAnswers={totalAnswers}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            showHint={showHint}
            explanation={explanation}
            isCorrect={isCorrect}
            userProgress={userProgress}
            attempts={attempts}
            onCheckAnswer={checkAnswer}
            onShowSmartHint={showSmartHint}
            onRestartProblem={restartProblem}
            onCloseHint={handleCloseHint} // Pass the new handler
            hasAlternativeStrategy={canShowAlternative && !!explanation} // Use new state
            onExplainDifferently={handleExplainDifferently}
          />
        )}
      </div>

      {/* Strategy Legend */}
      {selectedTable && (
          <div className="fixed bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-xl max-w-xs transition-all duration-300">
            <h4 className="font-bold text-gray-700 mb-1 text-sm">{t.smartStrategiesTitle}</h4>
            <div className="space-y-1 text-xs">
              <div className={`flex items-center py-1 px-2 rounded-lg transition-all duration-300 ${explanation && getStrategyCategory(explanation.strategy) === 'visual' ? 'bg-green-100 scale-105' : 'bg-transparent'}`}>
                <Eye className="w-4 h-4 text-green-500 mr-2" />
                <span className={`${explanation && getStrategyCategory(explanation.strategy) === 'visual' ? 'font-bold text-green-800' : 'text-gray-600'}`}>{t.visualStrategyLabel}</span>
              </div>
              <div className={`flex items-center py-1 px-2 rounded-lg transition-all duration-300 ${explanation && getStrategyCategory(explanation.strategy) === 'pattern' ? 'bg-purple-100 scale-105' : 'bg-transparent'}`}>
                <Zap className="w-4 h-4 text-purple-500 mr-2" />
                <span className={`${explanation && getStrategyCategory(explanation.strategy) === 'pattern' ? 'font-bold text-purple-800' : 'text-gray-600'}`}>{t.patternStrategyLabel}</span>
              </div>
              <div className={`flex items-center py-1 px-2 rounded-lg transition-all duration-300 ${explanation && getStrategyCategory(explanation.strategy) === 'counting' ? 'bg-blue-100 scale-105' : 'bg-transparent'}`}>
                <Target className="w-4 h-4 text-blue-500 mr-2" />
                <span className={`${explanation && getStrategyCategory(explanation.strategy) === 'counting' ? 'font-bold text-blue-800' : 'text-gray-600'}`}>{t.countingStrategyLabel}</span>
              </div>
              <div className={`flex items-center py-1 px-2 rounded-lg transition-all duration-300 ${explanation && getStrategyCategory(explanation.strategy) === 'breakdown' ? 'bg-orange-100 scale-105' : 'bg-transparent'}`}>
                <Brain className="w-4 h-4 text-orange-500 mr-2" />
                <span className={`${explanation && getStrategyCategory(explanation.strategy) === 'breakdown' ? 'font-bold text-orange-800' : 'text-gray-600'}`}>{t.breakdownStrategyLabel}</span>
              </div>
              <div className={`flex items-center py-1 px-2 rounded-lg transition-all duration-300 ${explanation && getStrategyCategory(explanation.strategy) === 'kinesthetic' ? 'bg-red-100 scale-105' : 'bg-transparent'}`}>
                <Hand className="w-4 h-4 text-red-500 mr-2" />
                <span className={`${explanation && getStrategyCategory(explanation.strategy) === 'kinesthetic' ? 'font-bold text-red-800' : 'text-gray-600'}`}>{t.kinestheticStrategyLabel}</span>
              </div>
              <div className={`flex items-center py-1 px-2 rounded-lg transition-all duration-300 ${explanation && getStrategyCategory(explanation.strategy) === 'auditory' ? 'bg-yellow-100 scale-105' : 'bg-transparent'}`}>
                <Ear className="w-4 h-4 text-yellow-500 mr-2" />
                <span className={`${explanation && getStrategyCategory(explanation.strategy) === 'auditory' ? 'font-bold text-yellow-800' : 'text-gray-600'}`}>{t.auditoryStrategyLabel}</span>
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
