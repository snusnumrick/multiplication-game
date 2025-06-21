import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { ArrowLeft, ShoppingCart, Building, Car, Utensils, Gamepad2, TreePine } from 'lucide-react';

interface Scenario {
  id: number;
  title: string;
  description: string;
  problem: string;
  calculation: string;
  answer: number;
  icon: React.ComponentType<any>;
  category: 'shopping' | 'home' | 'travel' | 'food' | 'games' | 'nature';
  wrongOptions: string[];
  image: string;
}

export function RealWorldMath() {
  const { t, setCurrentScreen, playSound, settings, addStars } = useGame();
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [gameStep, setGameStep] = useState<'problem' | 'expression' | 'answer' | 'result'>('problem');
  const [selectedExpression, setSelectedExpression] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const getScenarios = (): Scenario[] => {
    if (settings.language === 'ru') {
      return [
        {
          id: 1,
          title: "Покупки в магазине",
          description: "Ева покупает подарки для друзей",
          problem: "Ева хочет купить 4 упаковки наклеек. В каждой упаковке 6 наклеек. Сколько всего наклеек у неё будет?",
          calculation: "4 × 6",
          answer: 24,
          icon: ShoppingCart,
          category: 'shopping',
          wrongOptions: ["4 + 6", "6 - 4", "4 ÷ 6"],
          image: "/images/shopping-scenario.jpg"
        },
        {
          id: 2,
          title: "Строительство с блоками",
          description: "Ева строит замок из кубиков",
          problem: "Ева строит замок. На каждом этаже 7 кубиков, а этажей 3. Сколько кубиков нужно для всего замка?",
          calculation: "3 × 7",
          answer: 21,
          icon: Building,
          category: 'home',
          wrongOptions: ["3 + 7", "7 - 3", "3 ÷ 7"],
          image: "/images/building-scenario.jpg"
        },
        {
          id: 3,
          title: "Путешествие на автобусе",
          description: "Поездка в зоопарк",
          problem: "В автобусе 8 рядов сидений. В каждом ряду помещается 4 человека. Сколько людей поместится в автобусе?",
          calculation: "8 × 4",
          answer: 32,
          icon: Car,
          category: 'travel',
          wrongOptions: ["8 + 4", "8 - 4", "8 ÷ 4"],
          image: "/images/travel-scenario.jpg"
        },
        {
          id: 4,
          title: "Пицца для вечеринки",
          description: "Ева заказывает пиццу на день рождения",
          problem: "Ева заказала 3 пиццы. Каждую пиццу разрезали на 8 кусочков. Сколько всего кусочков пиццы?",
          calculation: "3 × 8",
          answer: 24,
          icon: Utensils,
          category: 'food',
          wrongOptions: ["3 + 8", "8 - 3", "3 ÷ 8"],
          image: "/images/food-scenario.jpg"
        },
        {
          id: 5,
          title: "Настольная игра",
          description: "Игра с Фокси и друзьями",
          problem: "Ева играет в настольную игру. У каждого из 5 игроков по 6 карт. Сколько всего карт в игре?",
          calculation: "5 × 6",
          answer: 30,
          icon: Gamepad2,
          category: 'games',
          wrongOptions: ["5 + 6", "6 - 5", "5 ÷ 6"],
          image: "/images/games-scenario.jpg"
        },
        {
          id: 6,
          title: "Сад с цветами",
          description: "Ева сажает цветы в саду",
          problem: "Ева посадила цветы в 4 ряда. В каждом ряду 9 цветков. Сколько всего цветков посадила Ева?",
          calculation: "4 × 9",
          answer: 36,
          icon: TreePine,
          category: 'nature',
          wrongOptions: ["4 + 9", "9 - 4", "4 ÷ 9"],
          image: "/images/nature-scenario.jpg"
        }
      ];
    } else {
      return [
        {
          id: 1,
          title: "Einkaufen im Laden",
          description: "Eva kauft Geschenke für Freunde",
          problem: "Eva möchte 4 Packungen Aufkleber kaufen. Jede Packung hat 6 Aufkleber. Wie viele Aufkleber wird sie insgesamt haben?",
          calculation: "4 × 6",
          answer: 24,
          icon: ShoppingCart,
          category: 'shopping',
          wrongOptions: ["4 + 6", "6 - 4", "4 ÷ 6"],
          image: "/images/shopping-scenario.jpg"
        },
        {
          id: 2,
          title: "Bauen mit Blöcken",
          description: "Eva baut ein Schloss aus Bauklötzen",
          problem: "Eva baut ein Schloss. Jede Etage hat 7 Blöcke und es gibt 3 Etagen. Wie viele Blöcke braucht sie für das ganze Schloss?",
          calculation: "3 × 7",
          answer: 21,
          icon: Building,
          category: 'home',
          wrongOptions: ["3 + 7", "7 - 3", "3 ÷ 7"],
          image: "/images/building-scenario.jpg"
        },
        {
          id: 3,
          title: "Busfahrt zum Zoo",
          description: "Ausflug in den Zoo",
          problem: "Der Bus hat 8 Sitzreihen. In jeder Reihe können 4 Personen sitzen. Wie viele Menschen passen in den Bus?",
          calculation: "8 × 4",
          answer: 32,
          icon: Car,
          category: 'travel',
          wrongOptions: ["8 + 4", "8 - 4", "8 ÷ 4"],
          image: "/images/travel-scenario.jpg"
        },
        {
          id: 4,
          title: "Pizza für die Party",
          description: "Eva bestellt Pizza für ihren Geburtstag",
          problem: "Eva hat 3 Pizzen bestellt. Jede Pizza wurde in 8 Stücke geschnitten. Wie viele Pizzastücke gibt es insgesamt?",
          calculation: "3 × 8",
          answer: 24,
          icon: Utensils,
          category: 'food',
          wrongOptions: ["3 + 8", "8 - 3", "3 ÷ 8"],
          image: "/images/food-scenario.jpg"
        },
        {
          id: 5,
          title: "Brettspiel",
          description: "Spiel mit Foxy und Freunden",
          problem: "Eva spielt ein Brettspiel. Jeder der 5 Spieler hat 6 Karten. Wie viele Karten sind insgesamt im Spiel?",
          calculation: "5 × 6",
          answer: 30,
          icon: Gamepad2,
          category: 'games',
          wrongOptions: ["5 + 6", "6 - 5", "5 ÷ 6"],
          image: "/images/games-scenario.jpg"
        },
        {
          id: 6,
          title: "Blumengarten",
          description: "Eva pflanzt Blumen im Garten",
          problem: "Eva hat Blumen in 4 Reihen gepflanzt. In jeder Reihe sind 9 Blumen. Wie viele Blumen hat Eva insgesamt gepflanzt?",
          calculation: "4 × 9",
          answer: 36,
          icon: TreePine,
          category: 'nature',
          wrongOptions: ["4 + 9", "9 - 4", "4 ÷ 9"],
          image: "/images/nature-scenario.jpg"
        }
      ];
    }
  };

  const scenarios = getScenarios();

  const selectScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setGameStep('problem');
    setSelectedExpression('');
    setUserAnswer('');
    setIsCorrect(false);
    playSound('click');
  };

  const selectExpression = (expression: string) => {
    setSelectedExpression(expression);
    setGameStep('answer');
    playSound('click');
  };

  const submitAnswer = () => {
    const isExpressionCorrect = selectedExpression === selectedScenario?.calculation;
    const isAnswerCorrect = parseInt(userAnswer) === selectedScenario?.answer;
    const bothCorrect = isExpressionCorrect && isAnswerCorrect;
    
    setIsCorrect(bothCorrect);
    setGameStep('result');
    
    if (bothCorrect) {
      playSound('correct');
      addStars(3); // Award 3 stars for getting both parts right
    } else {
      playSound('incorrect');
    }
  };

  const resetScenario = () => {
    setGameStep('problem');
    setSelectedExpression('');
    setUserAnswer('');
    setIsCorrect(false);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      shopping: 'from-pink-400 to-pink-600',
      home: 'from-blue-400 to-blue-600',
      travel: 'from-green-400 to-green-600',
      food: 'from-orange-400 to-orange-600',
      games: 'from-purple-400 to-purple-600',
      nature: 'from-emerald-400 to-emerald-600'
    };
    return colors[category as keyof typeof colors] || 'from-gray-400 to-gray-600';
  };

  if (selectedScenario) {
    const Icon = selectedScenario.icon;
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-300 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-4">
          <button
            onClick={() => {
              playSound('click');
              setSelectedScenario(null);
            }}
            className="bg-white/90 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-2xl shadow-lg flex items-center space-x-2 hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">{t.backToMenu}</span>
          </button>
        </div>

        {/* Interactive Scenario */}
        <div className="max-w-4xl mx-auto">
          {/* Scenario Header */}
          <div className={`bg-gradient-to-br ${getCategoryColor(selectedScenario.category)} text-white rounded-3xl p-8 shadow-xl mb-8`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Icon className="w-16 h-16 mr-6" />
                <div>
                  <h1 className="text-3xl font-bold mb-2">{selectedScenario.title}</h1>
                  <p className="text-xl opacity-90">{selectedScenario.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-white/20 rounded-2xl p-4">
                  <img 
                    src={selectedScenario.image} 
                    alt={selectedScenario.title}
                    className="w-32 h-32 object-cover rounded-xl"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Content */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
            {gameStep === 'problem' && (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {settings.language === 'ru' ? 'Задача:' : 'Aufgabe:'}
                </h2>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  {selectedScenario.problem}
                </p>
                <button
                  onClick={() => setGameStep('expression')}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
                >
                  {settings.language === 'ru' ? 'Начать решение' : 'Lösung beginnen'}
                </button>
              </div>
            )}

            {gameStep === 'expression' && (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {settings.language === 'ru' ? 'Какое выражение решает эту задачу?' : 'Welcher Ausdruck löst diese Aufgabe?'}
                </h2>
                <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
                  {[selectedScenario.calculation, ...selectedScenario.wrongOptions].sort(() => Math.random() - 0.5).map((option, index) => (
                    <button
                      key={index}
                      onClick={() => selectExpression(option)}
                      className="bg-gradient-to-r from-purple-400 to-purple-600 text-white py-6 px-4 rounded-2xl text-2xl font-bold hover:from-purple-500 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {gameStep === 'answer' && (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {settings.language === 'ru' ? 'Какой ответ?' : 'Wie lautet die Antwort?'}
                </h2>
                <div className="mb-6">
                  <div className="text-4xl font-bold text-gray-800 mb-4">
                    {selectedExpression} = ?
                  </div>
                </div>
                <div className="max-w-sm mx-auto mb-8">
                  <input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && userAnswer && submitAnswer()}
                    className="w-full text-4xl font-bold text-center bg-gray-50 border-4 border-gray-300 rounded-2xl p-6 focus:border-blue-500 focus:outline-none"
                    placeholder="?"
                    autoFocus
                  />
                </div>
                <button
                  onClick={submitAnswer}
                  disabled={!userAnswer}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {settings.language === 'ru' ? 'Проверить' : 'Prüfen'}
                </button>
              </div>
            )}

            {gameStep === 'result' && (
              <div className="text-center">
                <div className={`text-4xl font-bold mb-6 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {isCorrect ? 
                    (settings.language === 'ru' ? '🎉 Отлично, Ева!' : '🎉 Fantastisch, Eva!') :
                    (settings.language === 'ru' ? '😊 Попробуй ещё раз!' : '😊 Versuche es nochmal!')
                  }
                </div>
                
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {settings.language === 'ru' ? 'Правильное решение:' : 'Richtige Lösung:'}
                  </h3>
                  <div className="text-4xl font-bold text-gray-800">
                    {selectedScenario.calculation} = {selectedScenario.answer}
                  </div>
                </div>

                {isCorrect && (
                  <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-4 mb-6">
                    <div className="text-lg font-bold text-gray-800">
                      +3 ⭐ {settings.language === 'ru' ? 'Фокси гордится тобой!' : 'Foxy ist stolz auf dich!'}
                    </div>
                  </div>
                )}

                <div className="flex space-x-4 justify-center">
                  <button
                    onClick={resetScenario}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                  >
                    {settings.language === 'ru' ? 'Ещё раз' : 'Nochmal'}
                  </button>
                  <button
                    onClick={() => setSelectedScenario(null)}
                    className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
                  >
                    {settings.language === 'ru' ? 'Другие задачи' : 'Andere Aufgaben'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-300 p-4">
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{t.realWorldMath}</h1>
          <p className="text-xl text-gray-600">{t.realWorldDesc}</p>
        </div>

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario) => {
            const Icon = scenario.icon;
            return (
              <button
                key={scenario.id}
                onClick={() => selectScenario(scenario)}
                className={`bg-gradient-to-br ${getCategoryColor(scenario.category)} text-white p-6 rounded-3xl shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95 text-left`}
              >
                <Icon className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">{scenario.title}</h3>
                <p className="text-sm opacity-90 mb-4">{scenario.description}</p>
                <div className="bg-white/20 rounded-xl p-3">
                  <div className="text-sm font-medium opacity-90">
                    {settings.language === 'ru' ? 'Умножение:' : 'Rechnung:'}
                  </div>
                  <div className="text-lg font-bold">{scenario.calculation}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
