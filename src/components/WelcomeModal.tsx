import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { translations } from '../translations';

interface WelcomeModalProps {
  isOpen: boolean;
  onLanguageSelect: (language: 'de' | 'ru') => void;
  onDontShowAgain: (dontShow: boolean) => void;
}

export function WelcomeModal({ isOpen, onLanguageSelect, onDontShowAgain }: WelcomeModalProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<'de' | 'ru' | null>(null);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleLanguageSelect = (language: 'de' | 'ru') => {
    setSelectedLanguage(language);
  };

  const handleStart = () => {
    if (selectedLanguage) {
      onDontShowAgain(dontShowAgain);
      onLanguageSelect(selectedLanguage);
    }
  };

  const handleDontShowAgainChange = (checked: boolean) => {
    setDontShowAgain(checked);
  };

  const germanTranslations = translations.de;
  const russianTranslations = translations.ru;
  const currentTranslations = selectedLanguage ? translations[selectedLanguage] : null;

  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-lg sm:text-xl mb-2">
            🎯 Einmaleins / Умножение
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!selectedLanguage ? (
            // Language selection step
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                <span className="block">{germanTranslations.welcomeModalChooseLanguage}</span>
                <span className="block">{russianTranslations.welcomeModalChooseLanguage}</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => handleLanguageSelect('de')}
                  variant="outline"
                  size="lg"
                  className="min-w-32"
                >
                  🇩🇪 {germanTranslations.welcomeModalGerman}
                </Button>
                <Button
                  onClick={() => handleLanguageSelect('ru')}
                  variant="outline"
                  size="lg"
                  className="min-w-32"
                >
                  🇷🇺 {russianTranslations.welcomeModalRussian}
                </Button>
              </div>
            </div>
          ) : (
            // Explanation in selected language step
            <div className="space-y-4">
              <DialogDescription className="text-center">
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <p className="text-gray-700 mb-2 text-sm">
                    {currentTranslations?.welcomeModalDescription}
                  </p>
                  <p className="text-xs text-blue-600">
                    {currentTranslations?.welcomeModalTabletNote}
                  </p>
                </div>
              </DialogDescription>

              {/* Don't show again checkbox */}
              <div className="flex items-center space-x-2 justify-center">
                <Checkbox
                  id="dont-show-again"
                  checked={dontShowAgain}
                  onCheckedChange={handleDontShowAgainChange}
                />
                <label htmlFor="dont-show-again" className="text-xs text-gray-600">
                  {currentTranslations?.welcomeModalDontShowAgain}
                </label>
              </div>

              <DialogFooter className="flex justify-center space-x-3">
                <Button
                  onClick={() => setSelectedLanguage(null)}
                  variant="outline"
                  size="sm"
                >
                  {currentTranslations?.previous || 'Zurück / Назад'}
                </Button>
                <Button
                  onClick={handleStart}
                  variant="default"
                  size="lg"
                  className="min-w-24"
                >
                  {currentTranslations?.start} 🚀
                </Button>
              </DialogFooter>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
