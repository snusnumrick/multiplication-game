import React, { useState } from 'react';
import { useGame } from '../contexts/game-hooks';
import { ArrowLeft, RotateCcw, Star, Trophy } from 'lucide-react';

interface Card {
  id: number;
  content: string;
  type: 'problem' | 'answer';
  value: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export function MemoryGame() {
  const { t, setCurrentScreen, playSound, addStars } = useGame();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);

  const generateCards = (difficulty: 'easy' | 'medium' | 'hard') => {
    const numPairs = difficulty === 'easy' ? 6 : difficulty === 'medium' ? 8 : 10;
    const maxTable = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 8 : 10;
    
    const problems: { problem: string; answer: number }[] = [];
    
    // Generate unique multiplication problems
    while (problems.length < numPairs) {
      const a = Math.floor(Math.random() * maxTable) + 1;
      const b = Math.floor(Math.random() * maxTable) + 1;
      const answer = a * b;
      const problem = `${a} × ${b}`;
      
      // Avoid duplicates
      if (!problems.some(p => p.problem === problem)) {
        problems.push({ problem, answer });
      }
    }

    const newCards: Card[] = [];
    
    problems.forEach((prob, index) => {
      // Problem card
      newCards.push({
        id: index * 2,
        content: prob.problem,
        type: 'problem',
        value: prob.answer,
        isFlipped: false,
        isMatched: false,
      });
      
      // Answer card
      newCards.push({
        id: index * 2 + 1,
        content: prob.answer.toString(),
        type: 'answer',
        value: prob.answer,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle cards
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }

    return newCards;
  };

  const startGame = (difficulty: 'easy' | 'medium' | 'hard') => {
    setSelectedDifficulty(difficulty);
    const newCards = generateCards(difficulty);
    setCards(newCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameComplete(false);
    playSound('click');
  };

  const resetGame = () => {
    if (selectedDifficulty) {
      startGame(selectedDifficulty);
    }
  };

  const flipCard = (cardId: number) => {
    if (flippedCards.length >= 2) return;
    if (flippedCards.includes(cardId)) return;
    if (cards.find(c => c.id === cardId)?.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    ));

    playSound('click');

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const card1 = cards.find(c => c.id === newFlippedCards[0]);
      const card2 = cards.find(c => c.id === newFlippedCards[1]);
      
      if (card1 && card2 && card1.value === card2.value && card1.type !== card2.type) {
        // Match found!
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            (card.id === newFlippedCards[0] || card.id === newFlippedCards[1])
              ? { ...card, isMatched: true }
              : card
          ));
          
          setMatches(prev => prev + 1);
          addStars(2);
          playSound('correct');
          setFlippedCards([]);
          
          // Check if game is complete
          const totalPairs = cards.length / 2;
          if (matches + 1 === totalPairs) {
            setGameComplete(true);
            addStars(10); // Bonus for completion
            playSound('success');
          }
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            (card.id === newFlippedCards[0] || card.id === newFlippedCards[1])
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
          playSound('incorrect');
        }, 1500);
      }
    }
  };

  const renderDifficultySelection = () => (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">{t.memoryTitle}</h2>
      <p className="text-xl text-gray-600 mb-12">{t.findPairs}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <button
          onClick={() => startGame('easy')}
          className="bg-gradient-to-br from-green-400 to-green-600 text-white p-8 rounded-3xl shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <div className="text-3xl font-bold mb-4">{t.easy}</div>
          <div className="text-lg opacity-90">{t.easyDetails}</div>
        </button>
        
        <button
          onClick={() => startGame('medium')}
          className="bg-gradient-to-br from-yellow-400 to-orange-600 text-white p-8 rounded-3xl shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <div className="text-3xl font-bold mb-4">{t.medium}</div>
          <div className="text-lg opacity-90">{t.mediumDetails}</div>
        </button>
        
        <button
          onClick={() => startGame('hard')}
          className="bg-gradient-to-br from-red-400 to-red-600 text-white p-8 rounded-3xl shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <div className="text-3xl font-bold mb-4">{t.hard}</div>
          <div className="text-lg opacity-90">{t.hardDetails}</div>
        </button>
      </div>
    </div>
  );

  const renderGame = () => {
    if (!selectedDifficulty) return null;

    const gridCols = selectedDifficulty === 'easy' ? 'grid-cols-3' : selectedDifficulty === 'medium' ? 'grid-cols-4' : 'grid-cols-5';

    return (
      <div className="max-w-4xl mx-auto">
        {/* Game Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Star className="w-6 h-6 text-yellow-500 mr-2 fill-current" />
              <span className="text-xl font-bold text-gray-700">{matches} {t.pairs}</span>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-medium text-gray-600">
                {t.moves}: {moves}
              </div>
            </div>
            
            <button
              onClick={resetGame}
              className="bg-blue-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {t.resetButtonLabel}
            </button>
          </div>
        </div>

        {/* Game Grid */}
        <div className={`grid ${gridCols} gap-3 md:gap-4`}>
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => flipCard(card.id)}
              disabled={card.isFlipped || card.isMatched || flippedCards.length >= 2}
              className={`aspect-square rounded-2xl shadow-lg transform transition-all duration-300 text-lg md:text-xl font-bold ${
                card.isMatched
                  ? 'bg-green-500 text-white scale-95 cursor-default'
                  : card.isFlipped
                    ? card.type === 'problem'
                      ? 'bg-blue-500 text-white scale-105'
                      : 'bg-purple-500 text-white scale-105'
                    : 'bg-gradient-to-br from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-gray-600 hover:scale-105 active:scale-95'
              }`}
            >
              {card.isFlipped || card.isMatched ? (
                <div className="h-full flex items-center justify-center p-2">
                  {card.content}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-4xl">{t.puzzleEmoji}</div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Game Complete */}
        {gameComplete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md mx-auto">
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                {t.fantastic}!
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                {t.memoryComplete.replace('{moves}', moves.toString())}
              </p>
              
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl p-4 mb-6">
                <div className="text-sm font-medium mb-1">{t.reward}</div>
                <div className="text-2xl font-bold">+{matches * 2 + 10} {t.stars}</div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={resetGame}
                  className="flex-1 bg-green-500 text-white py-3 rounded-2xl font-bold hover:bg-green-600 transition-colors"
                >
                  {t.playAgain}
                </button>
                <button
                  onClick={() => setSelectedDifficulty(null)}
                  className="flex-1 bg-blue-500 text-white py-3 rounded-2xl font-bold hover:bg-blue-600 transition-colors"
                >
                  {t.newDifficultyButton}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-blue-200 to-purple-300 p-4">
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

        {selectedDifficulty && (
          <button
            onClick={() => setSelectedDifficulty(null)}
            className="bg-white/90 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-2xl shadow-lg hover:bg-white transition-colors font-medium"
          >
            {t.changeDifficultyButton}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        {!selectedDifficulty ? renderDifficultySelection() : renderGame()}
      </div>
    </div>
  );
}
