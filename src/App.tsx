import React, { useState, useEffect } from 'react';
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
import { WelcomeModal } from './components/WelcomeModal';

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

function AppWithWelcome() {
  const { updateSettings } = useGame();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    // Check if welcome modal should be shown
    const dontShowWelcome = localStorage.getItem('multiplicationGame_dontShowWelcome');
    if (!dontShowWelcome) {
      setShowWelcomeModal(true);
    }
  }, []);

  const handleLanguageSelect = (language: 'de' | 'ru') => {
    // Update the language in GameContext
    updateSettings({ language });
    setShowWelcomeModal(false);
  };

  const handleDontShowAgain = (dontShow: boolean) => {
    if (dontShow) {
      localStorage.setItem('multiplicationGame_dontShowWelcome', 'true');
    }
  };

  return (
    <>
      <GameRouter />
      <WelcomeModal
        isOpen={showWelcomeModal}
        onLanguageSelect={handleLanguageSelect}
        onDontShowAgain={handleDontShowAgain}
      />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <GameProvider>
        <div className="app">
          <AppWithWelcome />
        </div>
      </GameProvider>
    </ErrorBoundary>
  );
}

export default App;
