import React, { useState } from 'react';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogPortal,
  DialogOverlay,
} from './ui/dialog';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { translations } from '../translations';

interface WelcomeModalProps {
  isOpen: boolean;
  onLanguageSelect: (language: 'de' | 'ru' | 'en') => void;
  onDontShowAgain: (dontShow: boolean) => void;
}

// Custom DialogContent without close button for welcome modal
const WelcomeDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-zinc-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg dark:border-zinc-800 dark:bg-zinc-950",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
WelcomeDialogContent.displayName = "WelcomeDialogContent";

export function WelcomeModal({ isOpen, onLanguageSelect, onDontShowAgain }: WelcomeModalProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<'de' | 'ru' | 'en' | null>(null);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleLanguageSelect = (language: 'de' | 'ru' | 'en') => {
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
  const englishTranslations = translations.en;
  const currentTranslations = selectedLanguage ? translations[selectedLanguage] : null;

  return (
    <Dialog open={isOpen}>
      <WelcomeDialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-xl sm:text-2xl md:text-3xl mb-2">
            🎯 Einmaleins / Умножение / Multiplications
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!selectedLanguage ? (
            // Language selection step
            <div className="text-center space-y-4">
              <p className="text-base sm:text-lg text-gray-600">
                <span className="block">{germanTranslations.welcomeModalChooseLanguage}</span>
                <span className="block">{russianTranslations.welcomeModalChooseLanguage}</span>
                <span className="block">{englishTranslations.welcomeModalChooseLanguage}</span>
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
                <Button
                  onClick={() => handleLanguageSelect('en')}
                  variant="outline"
                  size="lg"
                  className="min-w-32"
                >
                  🇺🇸 {englishTranslations.welcomeModalEnglish}
                </Button>
              </div>
            </div>
          ) : (
            // Explanation in selected language step
            <div className="space-y-4">
              <DialogDescription className="text-center">
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <p className="text-gray-700 mb-2 text-base sm:text-lg">
                    {currentTranslations?.welcomeModalDescription}
                  </p>
                  <p className="text-sm sm:text-base text-blue-600">
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
                <label htmlFor="dont-show-again" className="text-sm sm:text-base text-gray-600">
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
      </WelcomeDialogContent>
    </Dialog>
  );
}
