import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { ArrowLeft, Sparkles, Crown, Heart, Zap, Shield, Star } from 'lucide-react';

interface FantasyScenario {
  id: number;
  title: string;
  description: string;
  problem: string;
  calculation: string;
  answer: number;
  icon: React.ComponentType<any>;
  creature: 'dragon' | 'unicorn' | 'mermaid' | 'fairy' | 'phoenix' | 'wizard';
  wrongOptions: string[];
  image: string;
}

export function FantasyMath() {
  const { t, setCurrentScreen, playSound, settings, addStars } = useGame();
  const [selectedScenario, setSelectedScenario] = useState<FantasyScenario | null>(null);
  const [gameStep, setGameStep] = useState<'problem' | 'expression' | 'answer' | 'result'>('problem');
  const [selectedExpression, setSelectedExpression] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const getScenarios = (): FantasyScenario[] => {
    if (settings.language === 'ru') {
      return [
        {
          id: 1,
          title: "Драконьи сокровища",
          description: "Ева помогает дружелюбному дракону",
          problem: "Дракон Фира охраняет 3 пещеры с сокровищами. В каждой пещере 7 золотых монет. Сколько всего золотых монет у дракона?",
          calculation: "3 × 7",
          answer: 21,
          icon: Zap,
          creature: 'dragon',
          wrongOptions: ["3 + 7", "7 - 3", "3 ÷ 7"],
          image: "/images/dragon-scenario.jpg"
        },
        {
          id: 2,
          title: "Единорог в лесу",
          description: "Ева встречает волшебного единорога",
          problem: "Единорог Старлайт создал 4 радуги. На каждой радуге 6 разноцветных полос. Сколько всего цветных полос создал единорог?",
          calculation: "4 × 6",
          answer: 24,
          icon: Sparkles,
          creature: 'unicorn',
          wrongOptions: ["4 + 6", "6 - 4", "4 ÷ 6"],
          image: "/images/unicorn-scenario.png"
        },
        {
          id: 3,
          title: "Русалочий замок",
          description: "Ева ныряет к русалке в подводное царство",
          problem: "Русалка Марина украшает свой замок. Она разложила жемчужины в 5 рядов по 8 жемчужин в каждом. Сколько всего жемчужин?",
          calculation: "5 × 8",
          answer: 40,
          icon: Heart,
          creature: 'mermaid',
          wrongOptions: ["5 + 8", "8 - 5", "5 ÷ 8"],
          image: "/images/mermaid-scenario.jpg"
        },
        {
          id: 4,
          title: "Фея цветов",
          description: "Ева помогает цветочной фее",
          problem: "Фея Блум садит волшебные цветы. Она посадила 6 клумб, на каждой клумбе 9 цветков. Сколько всего волшебных цветков посадила фея?",
          calculation: "6 × 9",
          answer: 54,
          icon: Star,
          creature: 'fairy',
          wrongOptions: ["6 + 9", "9 - 6", "6 ÷ 9"],
          image: "/images/fairy-scenario.jpg"
        },
        {
          id: 5,
          title: "Феникс и пламя",
          description: "Ева наблюдает за огненной птицей",
          problem: "Феникс Флэйм создаёт огненные перья. Он создал 7 групп перьев по 5 перьев в каждой группе. Сколько всего огненных перьев?",
          calculation: "7 × 5",
          answer: 35,
          icon: Crown,
          creature: 'phoenix',
          wrongOptions: ["7 + 5", "7 - 5", "7 ÷ 5"],
          image: "/images/phoenix-scenario.jpg"
        },
        {
          id: 6,
          title: "Волшебник Фокси",
          description: "Фокси изучает магию вместе с Евой",
          problem: "Волшебник Фокси варит зелья. У него есть 8 котлов, в каждом котле по 4 волшебных ингредиента. Сколько всего ингредиентов?",
          calculation: "8 × 4",
          answer: 32,
          icon: Shield,
          creature: 'wizard',
          wrongOptions: ["8 + 4", "8 - 4", "8 ÷ 4"],
          image: "/images/wizard-scenario.png"
        }
      ];
    } else {
      return [
        {
          id: 1,
          title: "Drachenschätze",
          description: "Eva hilft einem freundlichen Drachen",
          problem: "Drache Fira bewacht 3 Schatzhöhlen. In jeder Höhle sind 7 Goldmünzen. Wie viele Goldmünzen hat der Drache insgesamt?",
          calculation: "3 × 7",
          answer: 21,
          icon: Zap,
          creature: 'dragon',
          wrongOptions: ["3 + 7", "7 - 3", "3 ÷ 7"],
          image: "/images/dragon-scenario.jpg"
        },
        {
          id: 2,
          title: "Einhorn im Wald",
          description: "Eva trifft ein magisches Einhorn",
          problem: "Einhorn Starlight hat 4 Regenbogen erschaffen. Jeder Regenbogen hat 6 bunte Streifen. Wie viele Farbstreifen hat das Einhorn insgesamt gemacht?",
          calculation: "4 × 6",
          answer: 24,
          icon: Sparkles,
          creature: 'unicorn',
          wrongOptions: ["4 + 6", "6 - 4", "4 ÷ 6"],
          image: "/images/unicorn-scenario.png"
        },
        {
          id: 3,
          title: "Meerjungfrau Schloss",
          description: "Eva taucht zu einer Meerjungfrau ins Unterwasserreich",
          problem: "Meerjungfrau Marina schmückt ihr Schloss. Sie hat Perlen in 5 Reihen mit je 8 Perlen gelegt. Wie viele Perlen sind das insgesamt?",
          calculation: "5 × 8",
          answer: 40,
          icon: Heart,
          creature: 'mermaid',
          wrongOptions: ["5 + 8", "8 - 5", "5 ÷ 8"],
          image: "/images/mermaid-scenario.jpg"
        },
        {
          id: 4,
          title: "Blütenfee",
          description: "Eva hilft der Blumenfee",
          problem: "Fee Bloom pflanzt Zauberblumen. Sie hat 6 Beete angelegt, auf jedem Beet sind 9 Blumen. Wie viele Zauberblumen hat die Fee insgesamt gepflanzt?",
          calculation: "6 × 9",
          answer: 54,
          icon: Star,
          creature: 'fairy',
          wrongOptions: ["6 + 9", "9 - 6", "6 ÷ 9"],
          image: "/images/fairy-scenario.jpg"
        },
        {
          id: 5,
          title: "Phönix und Flammen",
          description: "Eva beobachtet den Feuervogel",
          problem: "Phönix Flame erschafft Feuerfedern. Er hat 7 Gruppen mit je 5 Federn pro Gruppe gemacht. Wie viele Feuerfedern sind das insgesamt?",
          calculation: "7 × 5",
          answer: 35,
          icon: Crown,
          creature: 'phoenix',
          wrongOptions: ["7 + 5", "7 - 5", "7 ÷ 5"],
          image: "/images/phoenix-scenario.jpg"
        },
        {
          id: 6,
          title: "Zauberer Foxy",
          description: "Foxy lernt Magie zusammen mit Eva",
          problem: "Zauberer Foxy braut Zaubertränke. Er hat 8 Kessel, in jedem Kessel sind 4 magische Zutaten. Wie viele Zutaten sind das insgesamt?",
          calculation: "8 × 4",
          answer: 32,
          icon: Shield,
          creature: 'wizard',
          wrongOptions: ["8 + 4", "8 - 4", "8 ÷ 4"],
          image: "/images/wizard-scenario.png"
        }
      ];
    }
  };

  const scenarios = getScenarios();

  const selectScenario = (scenario: FantasyScenario) => {
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

  const getCreatureColor = (creature: string) => {
    const colors = {
      dragon: 'from-red-400 to-orange-600',
      unicorn: 'from-pink-400 to-purple-600',
      mermaid: 'from-blue-400 to-teal-600',
      fairy: 'from-green-400 to-emerald-600',
      phoenix: 'from-orange-400 to-red-600',
      wizard: 'from-purple-400 to-indigo-600'
    };
    return colors[creature as keyof typeof colors] || 'from-gray-400 to-gray-600';
  };

  if (selectedScenario) {
    const Icon = selectedScenario.icon;
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-indigo-300 p-4">
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

        {/* Interactive Fantasy Scenario */}
        <div className="max-w-4xl mx-auto">
          {/* Scenario Header */}
          <div className={`bg-gradient-to-br ${getCreatureColor(selectedScenario.creature)} text-white rounded-3xl p-8 shadow-xl mb-8`}>
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
                  ✨ {settings.language === 'ru' ? 'Волшебная задача:' : 'Magische Aufgabe:'} ✨
                </h2>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  {selectedScenario.problem}
                </p>
                <button
                  onClick={() => setGameStep('expression')}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:from-purple-600 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
                >
                  🪄 {settings.language === 'ru' ? 'Начать магию' : 'Magie beginnen'} ✨
                </button>
              </div>
            )}

            {gameStep === 'expression' && (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  🔮 {settings.language === 'ru' ? 'Какое заклинание решает эту задачу?' : 'Welcher Zauber löst diese Aufgabe?'} 🔮
                </h2>
                <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
                  {[selectedScenario.calculation, ...selectedScenario.wrongOptions].sort(() => Math.random() - 0.5).map((option, index) => (
                    <button
                      key={index}
                      onClick={() => selectExpression(option)}
                      className="bg-gradient-to-r from-indigo-400 to-purple-600 text-white py-6 px-4 rounded-2xl text-2xl font-bold hover:from-indigo-500 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      ✨ {option} ✨
                    </button>
                  ))}
                </div>
              </div>
            )}

            {gameStep === 'answer' && (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  ⭐ {settings.language === 'ru' ? 'Какой магический результат?' : 'Welches magische Ergebnis?'} ⭐
                </h2>
                <div className="mb-6">
                  <div className="text-4xl font-bold text-gray-800 mb-4">
                    ✨ {selectedExpression} = ? ✨
                  </div>
                </div>
                <div className="max-w-sm mx-auto mb-8">
                  <input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && userAnswer && submitAnswer()}
                    className="w-full text-4xl font-bold text-center bg-gradient-to-r from-purple-50 to-pink-50 border-4 border-purple-300 rounded-2xl p-6 focus:border-purple-500 focus:outline-none"
                    placeholder="?"
                    autoFocus
                  />
                </div>
                <button
                  onClick={submitAnswer}
                  disabled={!userAnswer}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  🪄 {settings.language === 'ru' ? 'Проверить магию' : 'Magie prüfen'} ✨
                </button>
              </div>
            )}

            {gameStep === 'result' && (
              <div className="text-center">
                <div className={`text-4xl font-bold mb-6 ${isCorrect ? 'text-green-600' : 'text-purple-600'}`}>
                  {isCorrect ? 
                    (settings.language === 'ru' ? '🎉✨ Потрясающе, Ева! Магия удалась!' : '🎉✨ Fantastisch, Eva! Die Magie hat geklappt!') :
                    (settings.language === 'ru' ? '🪄😊 Попробуй свою магию ещё раз!' : '🪄😊 Versuche deine Magie nochmal!')
                  }
                </div>
                
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 mb-6 border-2 border-gold">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    ✨ {settings.language === 'ru' ? 'Правильное заклинание:' : 'Richtiger Zauber:'} ✨
                  </h3>
                  <div className="text-4xl font-bold text-gray-800">
                    🪄 {selectedScenario.calculation} = {selectedScenario.answer} ⭐
                  </div>
                </div>

                {isCorrect && (
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 mb-6 border-2 border-purple-300">
                    <div className="text-lg font-bold text-gray-800">
                      +3 ⭐ {settings.language === 'ru' ? 'Фокси восхищается твоей магией!' : 'Foxy bewundert deine Magie!'}
                    </div>
                  </div>
                )}

                <div className="flex space-x-4 justify-center">
                  <button
                    onClick={resetScenario}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
                  >
                    🪄 {settings.language === 'ru' ? 'Ещё магии' : 'Mehr Magie'}
                  </button>
                  <button
                    onClick={() => setSelectedScenario(null)}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
                  >
                    ✨ {settings.language === 'ru' ? 'Другие приключения' : 'Andere Abenteuer'}
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
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-indigo-300 p-4">
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            ✨ {settings.language === 'ru' ? 'Волшебная математика' : 'Zauberhafte Mathematik'} 🪄
          </h1>
          <p className="text-xl text-gray-600">
            {settings.language === 'ru' ? 
              'Отправься с Фокси в мир магии и изучай умножение с волшебными существами!' :
              'Begib dich mit Foxy in die Welt der Magie und lerne Multiplikation mit Zauberwesen!'
            }
          </p>
        </div>

        {/* Fantasy Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario) => {
            const Icon = scenario.icon;
            return (
              <button
                key={scenario.id}
                onClick={() => selectScenario(scenario)}
                className={`bg-gradient-to-br ${getCreatureColor(scenario.creature)} text-white p-6 rounded-3xl shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95 text-left relative overflow-hidden`}
              >
                {/* Magical sparkles background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-2 right-2 text-2xl">✨</div>
                  <div className="absolute bottom-2 left-2 text-xl">⭐</div>
                  <div className="absolute top-1/2 left-1/4 text-lg">🪄</div>
                </div>
                
                <Icon className="w-12 h-12 mb-4 relative z-10" />
                <h3 className="text-xl font-bold mb-2 relative z-10">{scenario.title}</h3>
                <p className="text-sm opacity-90 mb-4 relative z-10">{scenario.description}</p>
                <div className="bg-white/20 rounded-xl p-3 relative z-10">
                  <div className="text-sm font-medium opacity-90">
                    {settings.language === 'ru' ? 'Магическое умножение:' : 'Magische Rechnung:'}
                  </div>
                  <div className="text-lg font-bold">✨ {scenario.calculation} ✨</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
