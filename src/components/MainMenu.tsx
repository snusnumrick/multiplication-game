import React, { useEffect, useState, useCallback } from 'react';
import { useGame } from '../contexts/game-hooks';
import { Star, Settings, Trophy, BookOpen, Puzzle, Gamepad2, Calculator, Sparkles } from 'lucide-react';
import { AnimatedFoxy } from './AnimatedFoxy';

export function MainMenu() {
  const { t, setCurrentScreen, playSound, progress, foxyMessage, showFoxyMessage, isFoxyVisible, setIsFoxyVisible } = useGame();
  const [isMounted, setIsMounted] = useState(false);

  // Memoize the foxy initialization to ensure stable reference
  const initializeFoxy = useCallback(() => {
    if (typeof window !== 'undefined' && showFoxyMessage && setIsFoxyVisible) {
      console.log('MainMenu: Initializing Foxy welcome message');
      console.log('showFoxyMessage available:', !!showFoxyMessage);
      console.log('setIsFoxyVisible available:', !!setIsFoxyVisible);

      try {
        // Show Foxy's welcome message, flagging it as the initial greeting.
        // It will stay visible until explicitly hidden or changed, or a duration can be set.
        showFoxyMessage('foxyWelcomeMainMenu', undefined, { isInitialGreeting: true });
      } catch (error) {
        console.error('Error initializing Foxy welcome message:', error);
      }
    } else {
      console.warn('MainMenu: Cannot initialize Foxy - missing dependencies or not on client');
    }
  }, [showFoxyMessage, setIsFoxyVisible]);

  // Memoize the cleanup function
  const cleanupFoxy = useCallback(() => {
    if (typeof window !== 'undefined' && setIsFoxyVisible) {
      console.log('MainMenu: Cleaning up Foxy');
      try {
        setIsFoxyVisible(false);
      } catch (error) {
        console.error('Error cleaning up Foxy:', error);
      }
    }
  }, [setIsFoxyVisible]);

  const handleMenuClick = useCallback((screen: string) => {
    if (playSound) {
      playSound('click');
    }
    if (setCurrentScreen) {
      setCurrentScreen(screen);
    }
  }, [playSound, setCurrentScreen]);

  // Client-side mount detection
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Initialize Foxy when component mounts (client-side only)
  useEffect(() => {
    if (!isMounted) return;

    console.log('MainMenu: Component mounted on client');

    // Add a small delay to ensure the context is fully initialized
    const timeoutId = setTimeout(() => {
      initializeFoxy();
    }, 100);

    // Hide Foxy when navigating away from the main menu
    return () => {
      clearTimeout(timeoutId);
      cleanupFoxy();
    };
  }, [isMounted, initializeFoxy, cleanupFoxy]);

  // Don't render anything until client-side mount is complete
  if (!isMounted) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-300 flex items-center justify-center">
          <div className="text-2xl font-bold text-gray-700">Loading...</div>
        </div>
    );
  }

  const menuItems = [
    {
      id: 'practice',
      title: t?.practiceMode || 'Practice Mode',
      description: t?.practiceModeDesc || 'Practice multiplication tables',
      icon: BookOpen,
      color: 'bg-gradient-to-br from-blue-400 to-blue-600',
      textColor: 'text-blue-50',
    },
    {
      id: 'quiz',
      title: t?.quizMode || 'Quiz Mode',
      description: t?.quizModeDesc || 'Test your knowledge',
      icon: Puzzle,
      color: 'bg-gradient-to-br from-green-400 to-green-600',
      textColor: 'text-green-50',
    },
    {
      id: 'adventure',
      title: t?.adventureMode || 'Adventure Mode',
      description: t?.adventureModeDesc || 'Math adventure game',
      icon: Gamepad2,
      color: 'bg-gradient-to-br from-purple-400 to-purple-600',
      textColor: 'text-purple-50',
    },
    {
      id: 'memory',
      title: t?.memoryGame || 'Memory Game',
      description: t?.memoryGameDesc || 'Memory matching game',
      icon: Star,
      color: 'bg-gradient-to-br from-pink-400 to-pink-600',
      textColor: 'text-pink-50',
    },
    {
      id: 'realworld',
      title: t?.realWorldMath || 'Real World Math',
      description: t?.realWorldDesc || 'Practical math problems',
      icon: Calculator,
      color: 'bg-gradient-to-br from-indigo-400 to-indigo-600',
      textColor: 'text-indigo-50',
    },
    {
      id: 'fantasy',
      title: t?.fantasyMath || 'Fantasy Math',
      description: t?.fantasyDesc || 'Magical math adventures',
      icon: Sparkles,
      color: 'bg-gradient-to-br from-purple-400 to-purple-600',
      textColor: 'text-purple-50',
    },
  ];

  return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-300 p-4 sm:p-6 md:p-8 overflow-y-auto">
        {/* Welcome Message */}
        <div className="max-w-2xl mx-auto mb-3 pt-2">
          <div className="bg-gradient-to-r from-orange-100 to-yellow-100 border border-orange-200 rounded-xl p-3 text-center">
            <p className="text-sm sm:text-base font-medium text-orange-800">{t?.welcomeMessage || 'Welcome to the Math Learning Game!'}</p>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-4 md:mb-6">
          <div className="flex flex-col sm:flex-row justify-center items-center mb-3">
            <img
                src="/images/eva-cartoon-square.png"
                alt="Foxy the Fox"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white shadow-lg mb-2 sm:mb-0 sm:mr-4"
            />
            <div className="mb-2 sm:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
                {t?.title || 'Math Learning Game'}
              </h1>
              <p className="text-base sm:text-lg text-gray-600 font-medium">
                {t?.subtitle || 'Learn multiplication tables with Foxy!'}
              </p>
            </div>

            {/* Progress Overview - Inline */}
            <div className="flex items-center space-x-4 sm:space-x-6 text-gray-700 mt-2 sm:mt-0 sm:ml-8">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-1 sm:mr-2 fill-current" />
                <span className="font-bold text-sm sm:text-base">{progress?.totalStars || 0}</span>
              </div>
              <div className="flex items-center">
                <Trophy className="w-5 h-5 text-orange-500 mr-1 sm:mr-2" />
                <span className="font-bold text-sm sm:text-base">{progress?.tablesLearned?.length || 0}/10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
                <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`${item.color} ${item.textColor} p-4 sm:p-5 md:p-6 rounded-2xl shadow-lg 
              transform transition-all duration-200 hover:scale-105 active:scale-95 min-h-[120px] sm:min-h-[140px] md:h-40
              flex flex-col items-center justify-center text-center m-1 sm:m-2`}
                >
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 mb-1 sm:mb-2" />
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-0.5 sm:mb-1 leading-tight">{item.title}</h3>
                  <p className="text-xs sm:text-sm opacity-90 leading-tight">{item.description}</p>
                </button>
            );
          })}
        </div>

        {/* Bottom Navigation */}
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <button
              onClick={() => handleMenuClick('progress')}
              className="bg-white/90 backdrop-blur-sm text-gray-700 px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-md flex items-center justify-center space-x-2 hover:bg-white transition-colors"
          >
            <Trophy className="w-5 h-5" />
            <span className="font-medium text-sm sm:text-base">{t?.progress || 'Progress'}</span>
          </button>

          <button
              onClick={() => handleMenuClick('settings')}
              className="bg-white/90 backdrop-blur-sm text-gray-700 px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-md flex items-center justify-center space-x-2 hover:bg-white transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium text-sm sm:text-base">{t?.settings || 'Settings'}</span>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="fixed top-6 left-6 animate-bounce">
          <Star className="w-6 h-6 text-yellow-400 fill-current" />
        </div>
        <div className="fixed top-8 right-8 animate-pulse">
          <Star className="w-4 h-4 text-pink-400 fill-current" />
        </div>
        <div className="fixed bottom-6 left-8 animate-bounce delay-1000">
          <Star className="w-6 h-6 text-blue-400 fill-current" />
        </div>
        <div className="fixed bottom-32 right-12 animate-pulse delay-500">
          <Star className="w-7 h-7 text-purple-400 fill-current" />
        </div>

        <AnimatedFoxy message={foxyMessage ?? undefined} isVisible={isFoxyVisible} />
      </div>
  );
}