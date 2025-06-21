import React from 'react';
import { GameProvider } from './contexts/GameContext';
import { useGame } from './contexts/game-hooks';
import { MainMenu } from './components/MainMenu';
import { PracticeMode } from './components/PracticeMode';
import { QuizMode } from './components/QuizMode';
import { AdventureMode } from './components/AdventureMode';
import { MemoryGame } from './components/MemoryGame';
import { RealWorldMath } from './components/RealWorldMath';
import { FantasyMath } from './components/FantasyMath';
import { Settings } from './components/Settings';
import { Progress } from './components/Progress';
import { ErrorBoundary } from './components/ErrorBoundary';

function GameRouter() {
  const { currentScreen } = useGame();

  switch (currentScreen) {
    case 'practice':
      return <PracticeMode />;
    case 'quiz':
      return <QuizMode />;
    case 'adventure':
      return <AdventureMode />;
    case 'memory':
      return <MemoryGame />;
    case 'realworld':
      return <RealWorldMath />;
    case 'fantasy':
      return <FantasyMath />;
    case 'settings':
      return <Settings />;
    case 'progress':
      return <Progress />;
    default:
      return <MainMenu />;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <GameProvider>
        <div className="app">
          <GameRouter />
        </div>
      </GameProvider>
    </ErrorBoundary>
  );
}

export default App;
