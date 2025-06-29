import React from 'react';
import { useGame } from '../contexts/game-hooks';
import { ArrowLeft, Star, Trophy, Award, Target, CheckCircle } from 'lucide-react';

export function Progress() {
  const { t, setCurrentScreen, progress, playSound } = useGame();

  const achievements = [
    {
      id: 'first_star',
      title: t.firstStarTitle,
      description: t.firstStarDesc,
      icon: Star,
      unlocked: progress.totalStars >= 1,
      requirement: 1,
    },
    {
      id: 'star_collector',
      title: t.starCollectorTitle,
      description: t.starCollectorDesc,
      icon: Star,
      unlocked: progress.totalStars >= 50,
      requirement: 50,
    },
    {
      id: 'first_table',
      title: t.firstTableTitle,
      description: t.firstTableDesc,
      icon: CheckCircle,
      unlocked: progress.tablesLearned.length >= 1,
      requirement: 1,
    },
    {
      id: 'table_master',
      title: t.tableMasterTitle,
      description: t.tableMasterDesc,
      icon: Trophy,
      unlocked: progress.tablesLearned.length >= 10,
      requirement: 10,
    },
    {
      id: 'dedication',
      title: t.hardWorkerTitle,
      description: t.hardWorkerDesc,
      icon: Award,
      unlocked: progress.totalStars >= 100,
      requirement: 100,
    },
    {
      id: 'champion',
      title: t.mathChampionTitle,
      description: t.mathChampionDesc,
      icon: Target,
      unlocked: progress.totalStars >= 200,
      requirement: 200,
    },
  ];

  const getTableProgress = (table) => {
    const isLearned = progress.tablesLearned.includes(table);
    const practiceScore = progress.practiceProgress[table] || 0;

    if (isLearned) return 100;
    if (practiceScore > 0) return Math.min(practiceScore * 2, 90);
    return 0;
  };

  const getProgressColor = (progress) => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 70) return 'bg-yellow-500';
    if (progress >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
      <div className="h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-orange-300 p-4 overflow-hidden">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-4">
          <button
              onClick={() => {
                playSound('click');
                setCurrentScreen('menu');
              }}
              className="bg-white/90 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-xl shadow-lg flex items-center space-x-2 hover:bg-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">{t.backToMenu}</span>
          </button>

          <h1 className="text-2xl font-bold text-gray-800">{t.progressTitle}</h1>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-120px)]">

          {/* Left Column - Stats and Tables */}
          <div className="col-span-8 flex flex-col space-y-4">

            {/* Overview Stats - Horizontal */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg text-center">
                <Star className="w-6 h-6 text-yellow-500 mx-auto mb-1 fill-current" />
                <div className="text-xl font-bold text-gray-800">{progress.totalStars}</div>
                <div className="text-xs text-gray-600">{t.totalStars}</div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg text-center">
                <Trophy className="w-6 h-6 text-orange-500 mx-auto mb-1" />
                <div className="text-xl font-bold text-gray-800">{progress.tablesLearned.length}/10</div>
                <div className="text-xs text-gray-600">{t.tablesLearned}</div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg text-center">
                <Award className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                <div className="text-xl font-bold text-gray-800">
                  {achievements.filter(a => a.unlocked).length}/{achievements.length}
                </div>
                <div className="text-xs text-gray-600">{t.achievements}</div>
              </div>
            </div>

            {/* Multiplication Tables Progress */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg flex-1 min-h-0">
              <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <Target className="w-5 h-5 text-blue-500 mr-2" />
                {t.tablesProgress}
              </h2>

              <div className="grid grid-cols-5 gap-2 h-[calc(100%-3rem)]">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((table) => {
                  const tableProgress = getTableProgress(table);
                  const isLearned = progress.tablesLearned.includes(table);

                  return (
                      <div
                          key={table}
                          className={`relative p-2 rounded-lg border transition-all duration-200 ${
                              isLearned
                                  ? 'bg-green-100 border-green-300'
                                  : tableProgress > 0
                                      ? 'bg-yellow-100 border-yellow-300'
                                      : 'bg-gray-100 border-gray-300'
                          }`}
                      >
                        <div className="text-center h-full flex flex-col justify-center">
                          <div className="text-base font-bold text-gray-800">{table}{t.tableProgressSuffix}</div>

                          {/* Progress Bar */}
                          <div className="bg-gray-200 rounded-full h-1.5 my-1">
                            <div
                                className={`h-1.5 rounded-full transition-all duration-500 ${getProgressColor(tableProgress)}`}
                                style={{ width: `${tableProgress}%` }}
                            />
                          </div>

                          <div className="text-xs text-gray-600">{Math.round(tableProgress)}%</div>

                          {isLearned && (
                              <CheckCircle className="w-3 h-3 text-green-500 mx-auto mt-1" />
                          )}
                        </div>
                      </div>
                  );
                })}
              </div>
            </div>

            {/* Quiz High Scores - Compact */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
              <h2 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
                <Trophy className="w-5 h-5 text-yellow-600 mr-2" />
                {t.quizHighScores}
              </h2>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-green-100 p-2 rounded-lg">
                  <h3 className="text-sm font-bold text-green-800">{t.easy}</h3>
                  <p className="text-lg font-bold text-green-900">{progress.quizHighScores?.easy || 0}</p>
                </div>
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <h3 className="text-sm font-bold text-yellow-800">{t.medium}</h3>
                  <p className="text-lg font-bold text-yellow-900">{progress.quizHighScores?.medium || 0}</p>
                </div>
                <div className="bg-red-100 p-2 rounded-lg">
                  <h3 className="text-sm font-bold text-red-800">{t.hard}</h3>
                  <p className="text-lg font-bold text-red-900">{progress.quizHighScores?.hard || 0}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Achievements and Motivation */}
          <div className="col-span-4 flex flex-col space-y-4">

            {/* Achievements */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg flex-1 min-h-0 flex flex-col">
              <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center flex-shrink-0">
                <Award className="w-5 h-5 text-purple-500 mr-2" />
                {t.achievements}
              </h2>

              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;

                  return (
                      <div
                          key={achievement.id}
                          className={`p-2.5 rounded-lg border transition-all duration-200 ${
                              achievement.unlocked
                                  ? 'bg-yellow-50 border-yellow-200'
                                  : 'bg-gray-50 border-gray-200 opacity-70'
                          }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <Icon
                              className={`w-5 h-5 flex-shrink-0 ${
                                  achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'
                              }`}
                          />
                          <div className="min-w-0">
                            <h3 className={`text-sm font-bold truncate ${
                                achievement.unlocked ? 'text-gray-800' : 'text-gray-500'
                            }`}>
                              {achievement.title}
                            </h3>
                            <p className={`text-xs leading-tight ${
                                achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                            }`}>
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                      </div>
                  );
                })}
              </div>
            </div>

            {/* Motivational Message */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl p-4 shadow-lg text-center">
              <h3 className="text-sm font-bold">
                {progress.totalStars >= 100
                    ? t.mathChampion
                    : progress.totalStars >= 50
                        ? t.fantasticsProgress
                        : t.greatKeepGoing
                }
              </h3>
              <p className="text-xs opacity-90 mt-1">
                {progress.tablesLearned.length === 10
                    ? t.allTablesMastered
                    : t.tablesToMaster.replace('{count}', (10 - progress.tablesLearned.length).toString())
                }
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}