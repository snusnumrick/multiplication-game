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

  const getTableProgress = (table: number) => {
    const isLearned = progress.tablesLearned.includes(table);
    const practiceScore = progress.practiceProgress[table] || 0;
    
    if (isLearned) return 100;
    if (practiceScore > 0) return Math.min(practiceScore * 2, 90); // Max 90% if not fully learned
    return 0;
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 70) return 'bg-yellow-500';
    if (progress >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-orange-300 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pt-4">
        <button
          onClick={() => {
            playSound('click');
            setCurrentScreen('menu');
          }}
          className="bg-white/90 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-2xl shadow-lg flex items-center space-x-2 hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">{t.backToMenu}</span>
        </button>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 text-center mb-6">{t.progressTitle}</h1>

        {/* Overview Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg text-center">
            <Star className="w-10 h-10 text-yellow-500 mx-auto mb-2 fill-current" />
            <div className="text-2xl font-bold text-gray-800">{progress.totalStars}</div>
            <div className="text-base text-gray-600">{t.totalStars}</div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg text-center">
            <Trophy className="w-10 h-10 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{progress.tablesLearned.length}/10</div>
            <div className="text-base text-gray-600">{t.tablesLearned}</div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg text-center">
            <Award className="w-10 h-10 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">
              {achievements.filter(a => a.unlocked).length}/{achievements.length}
            </div>
            <div className="text-base text-gray-600">{t.achievements}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-3 space-y-6">
            {/* Multiplication Tables Progress */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Target className="w-6 h-6 text-blue-500 mr-2" />
                {t.tablesProgress}
              </h2>
              
              <div className="grid grid-cols-5 gap-3">
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
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-800">{table}{t.tableProgressSuffix}</div>
                        
                        {/* Progress Bar */}
                        <div className="bg-gray-200 rounded-full h-2 my-1">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(tableProgress)}`}
                            style={{ width: `${tableProgress}%` }}
                          />
                        </div>
                        
                        <div className="text-xs text-gray-600">{Math.round(tableProgress)}%</div>
                        
                        {isLearned && (
                          <CheckCircle className="w-4 h-4 text-green-500 mx-auto mt-1" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quiz High Scores */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Trophy className="w-6 h-6 text-yellow-600 mr-2" />
                {t.quizHighScores || 'Quiz High Scores'}
              </h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-green-100 p-3 rounded-lg">
                  <h3 className="text-base font-bold text-green-800">{t.easy || 'Easy'}</h3>
                  <p className="text-2xl font-bold text-green-900 mt-1">{progress.quizHighScores?.easy || 0}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <h3 className="text-base font-bold text-yellow-800">{t.medium || 'Medium'}</h3>
                  <p className="text-2xl font-bold text-yellow-900 mt-1">{progress.quizHighScores?.medium || 0}</p>
                </div>
                <div className="bg-red-100 p-3 rounded-lg">
                  <h3 className="text-base font-bold text-red-800">{t.hard || 'Hard'}</h3>
                  <p className="text-2xl font-bold text-red-900 mt-1">{progress.quizHighScores?.hard || 0}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Achievements */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg h-full">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Award className="w-6 h-6 text-purple-500 mr-2" />
                {t.achievements}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  
                  return (
                    <div
                      key={achievement.id}
                      className={`p-3 rounded-lg border transition-all duration-200 ${
                        achievement.unlocked
                          ? 'bg-yellow-50 border-yellow-200'
                          : 'bg-gray-50 border-gray-200 opacity-70'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon
                          className={`w-8 h-8 flex-shrink-0 ${
                            achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'
                          }`}
                        />
                        <div>
                          <h3 className={`text-sm font-bold ${
                            achievement.unlocked ? 'text-gray-800' : 'text-gray-500'
                          }`}>
                            {achievement.title}
                          </h3>
                          <p className={`text-xs ${
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
            <div className="text-center">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl p-4 shadow-lg">
                <h3 className="text-base font-bold">
                  {progress.totalStars >= 100 
                    ? t.mathChampion 
                    : progress.totalStars >= 50
                      ? t.fantasticsProgress
                      : t.greatKeepGoing
                  }
                </h3>
                <p className="text-sm opacity-90">
                  {progress.tablesLearned.length === 10 
                    ? t.allTablesMastered
                    : t.tablesToMaster.replace('{count}', (10 - progress.tablesLearned.length).toString())
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
