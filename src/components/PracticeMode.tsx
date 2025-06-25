import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Star, Brain, Eye, Zap, Target, Lightbulb, Check, RotateCcw } from 'lucide-react';
import { AnimatedFoxy } from './AnimatedFoxy';
import { useGame } from '../contexts/game-hooks';
import type { Translation } from '../translations';
import { ExplanationContent, UserProgress } from './practice-mode/PracticeModeTypes';
import { generateSmartExplanation as generateSmartExplanationLogic } from './practice-mode/PracticeModeExplanations';
import { TableSelectionUI } from './practice-mode/TableSelectionUI';
import { ProblemDisplayUI } from './practice-mode/ProblemDisplayUI';

export function PracticeMode() {
  const { t, setCurrentScreen, playSound, addStars, showFoxyMessage, setIsFoxyVisible, foxyMessage, isFoxyVisible, setFoxyAnimationState, recordStrategySuccess, progress: gameProgress } = useGame();

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
  const generateSmartExplanation = useCallback((a: number, b: number, attempts: number): ExplanationContent => {
    return generateSmartExplanationLogic(a, b, attempts, t as Translation, userProgress.strugglingWith, gameProgress.strategySuccess);
  }, [userProgress.strugglingWith, t, gameProgress.strategySuccess]);

  // Helper function to check if a different alternative explanation exists
  const checkIfAlternativeExists = useCallback((currentExplanationContent: ExplanationContent | null): boolean => {
    if (!currentProblem || !currentExplanationContent) return false;
    
    const testAttemptValues = [0, 5, 10]; // Probe with fixed attempt values
    for (const ta of testAttemptValues) {
      const potentialAlt = generateSmartExplanation(currentProblem.a, currentProblem.b, ta);
      if (potentialAlt && potentialAlt.strategy !== currentExplanationContent.strategy) {
        return true; // Found a different strategy
      }
    }
    return false; // No different strategy found with the test values
  }, [currentProblem, generateSmartExplanation]); // Removed 'attempts' from dependencies

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
        recordStrategySuccess?.(explanation.strategy);
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
  }, [currentProblem, userAnswer, playSound, addStars, setFoxyAnimationState, showFoxyMessage, generateProblem, explanation, recordStrategySuccess, userProgress.consecutiveCorrect]);

  const showSmartHint = useCallback(() => {
    if (!currentProblem) return;

    const smartExp = generateSmartExplanation(currentProblem.a, currentProblem.b, attempts); // This now calls the useCallback wrapper
    setExplanation(smartExp);
    setShowHint(true);
    playSound?.('click');

    // Show Foxy hint message
    showFoxyMessage?.('foxyHintMessage');
    // Check if an alternative explanation exists for the newly shown hint
    setCanShowAlternative(checkIfAlternativeExists(smartExp));
  }, [currentProblem, attempts, generateSmartExplanation, playSound, showFoxyMessage, checkIfAlternativeExists]);

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

    const testAttemptValues = [0, 5, 10]; // Probe with fixed attempt values
    for (const ta of testAttemptValues) {
      const potentialNewExplanation = generateSmartExplanation(currentProblem.a, currentProblem.b, ta);
      if (potentialNewExplanation && potentialNewExplanation.strategy !== explanation.strategy) {
        setExplanation(potentialNewExplanation);
        playSound?.('click');
        showFoxyMessage?.('foxyAlternativeHintMessage');
        // After showing a new one, check if there's yet another alternative
        setCanShowAlternative(checkIfAlternativeExists(potentialNewExplanation));
        return; // Found and set a new explanation
      }
    }

    // If loop completes, no different explanation was found with the test values
    playSound?.('click');
    showFoxyMessage?.('foxyNoMoreHintsMessage');
    setCanShowAlternative(false);
  }, [currentProblem, explanation, generateSmartExplanation, playSound, showFoxyMessage, setExplanation, setCanShowAlternative, checkIfAlternativeExists]); // Removed 'attempts' from dependencies


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

  // Handler for table selection from the UI component
  const handleTableSelect = (table: number) => {
    setSelectedTable(table);
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
