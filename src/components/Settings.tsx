import React from 'react';
import { useGame } from '../contexts/game-hooks';
import { ArrowLeft, Volume2, VolumeX, Globe, Zap, Eye, EyeOff, MessageSquare } from 'lucide-react';

export function Settings() {
  const { t, setCurrentScreen, settings, updateSettings, playSound } = useGame();

  const handleLanguageChange = (language: 'de' | 'ru' | 'en') => {
    updateSettings({ language });
    playSound('click');
  };

  const handleDifficultyChange = (difficulty: 'easy' | 'medium' | 'hard') => {
    updateSettings({ difficulty });
    playSound('click');
  };

  const toggleSound = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
    if (!settings.soundEnabled) {
      // Play sound if we're turning it on
      setTimeout(() => playSound('click'), 100);
    }
  };

  const toggleFoxyVisibility = () => {
    updateSettings({ foxyEnabled: !settings.foxyEnabled });
    playSound('click');
  };

  const toggleSmartStrategies = () => {
    updateSettings({ legendEnabled: !settings.legendEnabled });
    playSound('click');
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-300 p-4 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pt-2">
          <button
              onClick={() => {
                playSound('click');
                setCurrentScreen('menu');
              }}
              className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-2 sm:px-5 sm:py-3 rounded-xl shadow-md flex items-center space-x-2 hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base hidden sm:inline">{t.backToMenu}</span>
          </button>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">{t.settingsTitle}</h1>

          <div className="space-y-6">
            {/* Language and Difficulty - Stack on mobile, side-by-side on larger screens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Language Settings */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mr-3" />
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">{t.language}</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                      onClick={() => handleLanguageChange('de')}
                      className={`p-3 sm:p-4 rounded-xl text-sm sm:text-base font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                          settings.language === 'de'
                              ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    🇩🇪 {t.germanLanguage}
                  </button>

                  <button
                      onClick={() => handleLanguageChange('ru')}
                      className={`p-3 sm:p-4 rounded-xl text-sm sm:text-base font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                          settings.language === 'ru'
                              ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    🇷🇺 {t.russianLanguage}
                  </button>

                  <button
                      onClick={() => handleLanguageChange('en')}
                      className={`p-3 sm:p-4 rounded-xl text-sm sm:text-base font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                          settings.language === 'en'
                              ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    🇺🇸 {t.englishLanguage}
                  </button>
                </div>
              </div>

              {/* Difficulty Settings */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 mr-3" />
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">{t.difficulty}</h2>
                </div>

                {/* Stack difficulty buttons on mobile for better readability */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                      onClick={() => handleDifficultyChange('easy')}
                      className={`p-3 rounded-xl text-sm font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                          settings.difficulty === 'easy'
                              ? 'bg-gradient-to-br from-green-500 to-green-700 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {t.difficultyEasyPrefix} {t.easy}
                    <div className="text-xs opacity-80 mt-1">{t.tables1to5}</div>
                  </button>

                  <button
                      onClick={() => handleDifficultyChange('medium')}
                      className={`p-3 rounded-xl text-sm font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                          settings.difficulty === 'medium'
                              ? 'bg-gradient-to-br from-yellow-500 to-orange-600 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {t.difficultyMediumPrefix} {t.medium}
                    <div className="text-xs opacity-80 mt-1">{t.tables1to10}</div>
                  </button>

                  <button
                      onClick={() => handleDifficultyChange('hard')}
                      className={`p-3 rounded-xl text-sm font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                          settings.difficulty === 'hard'
                              ? 'bg-gradient-to-br from-red-500 to-red-700 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {t.difficultyHardPrefix} {t.hard}
                    <div className="text-xs opacity-80 mt-1">{t.tables1to12}</div>
                  </button>
                </div>
              </div>
            </div>

            {/* Toggle Settings - Stack all on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sound Settings */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  {settings.soundEnabled ? (
                      <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-3" />
                  ) : (
                      <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 mr-3" />
                  )}
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">{t.sound}</h2>
                </div>

                <div className="flex justify-center">
                  <button
                      onClick={toggleSound}
                      className={`px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-sm sm:text-base font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center space-x-2 sm:space-x-3 ${
                          settings.soundEnabled
                              ? 'bg-gradient-to-br from-green-500 to-green-700 text-white shadow-lg'
                              : 'bg-gradient-to-br from-red-500 to-red-700 text-white shadow-lg'
                      }`}
                  >
                    {settings.soundEnabled ? (
                        <>
                          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span>{t.on}</span>
                        </>
                    ) : (
                        <>
                          <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span>{t.off}</span>
                        </>
                    )}
                  </button>
                </div>

                <p className="text-center text-gray-600 mt-3 text-xs sm:text-sm">
                  {settings.soundEnabled
                      ? t.soundEnabled
                      : t.soundDisabled
                  }
                </p>
              </div>

              {/* Foxy Visibility Settings */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  {settings.foxyEnabled ? (
                      <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500 mr-3" />
                  ) : (
                      <EyeOff className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 mr-3" />
                  )}
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">{t.foxyVisibilityTitle}</h2>
                </div>

                <div className="flex justify-center">
                  <button
                      onClick={toggleFoxyVisibility}
                      className={`px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-sm sm:text-base font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center space-x-2 sm:space-x-3 ${
                          settings.foxyEnabled
                              ? 'bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg'
                              : 'bg-gradient-to-br from-gray-500 to-gray-700 text-white shadow-lg'
                      }`}
                  >
                    {settings.foxyEnabled ? (
                        <>
                          <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span>{t.foxyShow}</span>
                        </>
                    ) : (
                        <>
                          <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span>{t.foxyHide}</span>
                        </>
                    )}
                  </button>
                </div>

                <p className="text-center text-gray-600 mt-3 text-xs sm:text-sm">
                  {settings.foxyEnabled
                      ? t.foxyVisibilityDescriptionShow
                      : t.foxyVisibilityDescriptionHide
                  }
                </p>
              </div>

              {/* Smart Strategies Settings */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  {settings.legendEnabled ? (
                      <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-500 mr-3" />
                  ) : (
                      <EyeOff className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 mr-3" />
                  )}
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">{t.smartStrategiesTitle}</h2>
                </div>

                <div className="flex justify-center">
                  <button
                      onClick={toggleSmartStrategies}
                      className={`px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-sm sm:text-base font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center space-x-2 sm:space-x-3 ${
                          settings.legendEnabled
                              ? 'bg-gradient-to-br from-cyan-500 to-teal-600 text-white shadow-lg'
                              : 'bg-gradient-to-br from-gray-500 to-gray-700 text-white shadow-lg'
                      }`}
                  >
                    {settings.legendEnabled ? (
                        <>
                          <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span>{t.foxyShow}</span>
                        </>
                    ) : (
                        <>
                          <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span>{t.foxyHide}</span>
                        </>
                    )}
                  </button>
                </div>

                <p className="text-center text-gray-600 mt-3 text-xs sm:text-sm">
                  {settings.legendEnabled
                      ? t.smartStrategiesDescriptionShow
                      : t.smartStrategiesDescriptionHide
                  }
                </p>
              </div>
            </div>

            {/* Info Section - Full width */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {t.aboutGame}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {t.gameDescription}
              </p>
              <div className="mt-2 text-xs text-gray-500">
                {t.versionInfo}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
