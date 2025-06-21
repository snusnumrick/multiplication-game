import React from 'react';
import { useGame } from '../contexts/GameContext';
import { Star, Settings, Trophy, BookOpen, Puzzle, Gamepad2, Calculator, Sparkles } from 'lucide-react';

export function MainMenu() {
  const { t, setCurrentScreen, playSound, progress } = useGame();

  const handleMenuClick = (screen: string) => {
    playSound('click');
    setCurrentScreen(screen);
  };

  const menuItems = [
    {
      id: 'practice',
      title: t.practiceMode,
      description: t.practiceModeDesc,
      icon: BookOpen,
      color: 'bg-gradient-to-br from-blue-400 to-blue-600',
      textColor: 'text-blue-50',
    },
    {
      id: 'quiz',
      title: t.quizMode,
      description: t.quizModeDesc,
      icon: Puzzle,
      color: 'bg-gradient-to-br from-green-400 to-green-600',
      textColor: 'text-green-50',
    },
    {
      id: 'adventure',
      title: t.adventureMode,
      description: t.adventureModeDesc,
      icon: Gamepad2,
      color: 'bg-gradient-to-br from-purple-400 to-purple-600',
      textColor: 'text-purple-50',
    },
    {
      id: 'memory',
      title: t.memoryGame,
      description: t.memoryGameDesc,
      icon: Star,
      color: 'bg-gradient-to-br from-pink-400 to-pink-600',
      textColor: 'text-pink-50',
    },
    {
      id: 'realworld',
      title: t.realWorldMath,
      description: t.realWorldDesc,
      icon: Calculator,
      color: 'bg-gradient-to-br from-indigo-400 to-indigo-600',
      textColor: 'text-indigo-50',
    },
    {
      id: 'fantasy',
      title: t.fantasyMath,
      description: t.fantasyDesc,
      icon: Sparkles,
      color: 'bg-gradient-to-br from-purple-400 to-purple-600',
      textColor: 'text-purple-50',
    },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-300 p-4 overflow-hidden">
      {/* Welcome Message */}
      <div className="max-w-2xl mx-auto mb-3 pt-2">
        <div className="bg-gradient-to-r from-orange-100 to-yellow-100 border border-orange-200 rounded-xl p-3 text-center">
          <p className="text-base font-medium text-orange-800">{t.welcomeMessage}</p>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-4">
        <div className="flex justify-center items-center mb-3">
          <img 
            src="/images/foxy-mascot.jpg" 
            alt="Foxy the Fox" 
            className="w-16 h-16 rounded-full border-2 border-white shadow-lg mr-4"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              {t.title}
            </h1>
            <p className="text-lg text-gray-600 font-medium">
              {t.subtitle}
            </p>
          </div>
          
          {/* Progress Overview - Inline */}
          <div className="flex items-center space-x-6 text-gray-700 ml-8">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2 fill-current" />
              <span className="font-bold text-base">{progress.totalStars}</span>
            </div>
            <div className="flex items-center">
              <Trophy className="w-5 h-5 text-orange-500 mr-2" />
              <span className="font-bold text-base">{progress.tablesLearned.length}/10</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4 mb-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`${item.color} ${item.textColor} p-6 m-8 rounded-2xl shadow-lg 
              transform transition-all duration-200 hover:scale-105 active:scale-95 h-40 
              flex flex-col items-center justify-center text-center`}
            >
              <Icon className="w-10 h-10 mb-2" />
              <h3 className="text-xl font-bold mb-1 leading-tight">{item.title}</h3>
              <p className="opacity-90 leading-tight">{item.description}</p>
            </button>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => handleMenuClick('progress')}
          className="bg-white/90 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-xl shadow-md flex items-center space-x-2 hover:bg-white transition-colors"
        >
          <Trophy className="w-5 h-5" />
          <span className="font-medium text-base">{t.progress}</span>
        </button>
        
        <button
          onClick={() => handleMenuClick('settings')}
          className="bg-white/90 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-xl shadow-md flex items-center space-x-2 hover:bg-white transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium text-base">{t.settings}</span>
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
    </div>
  );
}
