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
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">{t.progressTitle}</h1>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl text-center">
            <Star className="w-16 h-16 text-yellow-500 mx-auto mb-4 fill-current" />
            <div className="text-3xl font-bold text-gray-800">{progress.totalStars}</div>
            <div className="text-lg text-gray-600">{t.totalStars}</div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl text-center">
            <Trophy className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-800">{progress.tablesLearned.length}/10</div>
            <div className="text-lg text-gray-600">{t.tablesLearned}</div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl text-center">
            <Award className="w-16 h-16 text-purple-500 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-800">
              {achievements.filter(a => a.unlocked).length}/{achievements.length}
            </div>
            <div className="text-lg text-gray-600">{t.achievements}</div>
          </div>
        </div>

        {/* Multiplication Tables Progress */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Target className="w-8 h-8 text-blue-500 mr-3" />
            {t.tablesProgress}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((table) => {
              const tableProgress = getTableProgress(table);
              const isLearned = progress.tablesLearned.includes(table);
              
              return (
                <div
                  key={table}
                  className={`relative p-4 rounded-2xl border-2 transition-all duration-200 ${
                    isLearned 
                      ? 'bg-green-100 border-green-300' 
                      : tableProgress > 0 
                        ? 'bg-yellow-100 border-yellow-300'
                        : 'bg-gray-100 border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800 mb-2">{table}{t.tableProgressSuffix}</div>
                    
                    {/* Progress Bar */}
                    <div className="bg-gray-200 rounded-full h-3 mb-2">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(tableProgress)}`}
                        style={{ width: `${tableProgress}%` }}
                      />
                    </div>
                    
                    <div className="text-sm text-gray-600">{Math.round(tableProgress)}%</div>
                    
                    {isLearned && (
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto mt-2" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quiz High Scores */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Trophy className="w-8 h-8 text-yellow-600 mr-3" />
            {t.quizHighScores || 'Quiz High Scores'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-green-100 p-4 rounded-2xl">
              <h3 className="text-xl font-bold text-green-800">{t.easy || 'Easy'}</h3>
              <p className="text-3xl font-bold text-green-900 mt-2">{progress.quizHighScores?.easy || 0}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-2xl">
              <h3 className="text-xl font-bold text-yellow-800">{t.medium || 'Medium'}</h3>
              <p className="text-3xl font-bold text-yellow-900 mt-2">{progress.quizHighScores?.medium || 0}</p>
            </div>
            <div className="bg-red-100 p-4 rounded-2xl">
              <h3 className="text-xl font-bold text-red-800">{t.hard || 'Hard'}</h3>
              <p className="text-3xl font-bold text-red-900 mt-2">{progress.quizHighScores?.hard || 0}</p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Award className="w-8 h-8 text-purple-500 mr-3" />
            {t.achievements}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              
              return (
                <div
                  key={achievement.id}
                  className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-300 shadow-lg'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="text-center">
                    <Icon
                      className={`w-12 h-12 mx-auto mb-3 ${
                        achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'
                      }`}
                    />
                    
                    <h3 className={`text-lg font-bold mb-2 ${
                      achievement.unlocked ? 'text-gray-800' : 'text-gray-500'
                    }`}>
                      {achievement.title}
                    </h3>
                    
                    <p className={`text-sm mb-3 ${
                      achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {achievement.description}
                    </p>
                    
                    {achievement.unlocked ? (
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        ✓ {t.achievedStatus}
                      </div>
                    ) : (
                      <div className="bg-gray-300 text-gray-600 px-3 py-1 rounded-full text-sm">
                        {t.requiredLabel} {achievement.requirement}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Motivational Message */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-4">
              {progress.totalStars >= 100 
                ? t.mathChampion 
                : progress.totalStars >= 50
                  ? t.fantasticsProgress
                  : t.greatKeepGoing
              }
            </h3>
            <p className="text-lg opacity-90">
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
