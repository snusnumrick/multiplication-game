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
import { Checkbox } from './ui/checkbox';
import { translations } from '../translations';

interface WelcomeModalProps {
  isOpen: boolean;
  onLanguageSelect: (language: 'de' | 'ru' | 'en') => void;
  onDontShowAgain: (dontShow: boolean) => void;
}

// Custom DialogOverlay with gradient background
const WelcomeDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-gradient-to-br from-yellow-200/95 via-pink-200/95 to-purple-300/95 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
WelcomeDialogOverlay.displayName = "WelcomeDialogOverlay";

// Custom DialogContent without close button for welcome modal
const WelcomeDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <WelcomeDialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-white/95 backdrop-blur-sm p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-2xl border border-white/50",
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
                <button
                  onClick={() => handleLanguageSelect('de')}
                  className="min-w-32 p-4 rounded-xl text-base font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg hover:shadow-xl"
                >
                  🇩🇪 {germanTranslations.welcomeModalGerman}
                </button>
                <button
                  onClick={() => handleLanguageSelect('ru')}
                  className="min-w-32 p-4 rounded-xl text-base font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg hover:shadow-xl"
                >
                  🇷🇺 {russianTranslations.welcomeModalRussian}
                </button>
                <button
                  onClick={() => handleLanguageSelect('en')}
                  className="min-w-32 p-4 rounded-xl text-base font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-lg hover:shadow-xl"
                >
                  🇺🇸 {englishTranslations.welcomeModalEnglish}
                </button>
              </div>
            </div>
          ) : (
            // Explanation in selected language step
            <div className="space-y-4">
              <DialogDescription className="text-center">
                <div className="p-4 bg-gradient-to-r from-orange-100/80 to-yellow-100/80 backdrop-blur-sm rounded-xl border border-orange-200/50 shadow-md">
                  <p className="text-gray-800 mb-3 text-base sm:text-lg font-medium">
                    {currentTranslations?.welcomeModalDescription}
                  </p>
                  <p className="text-sm sm:text-base text-orange-700 font-medium">
                    {currentTranslations?.welcomeModalTabletNote}
                  </p>
                </div>
              </DialogDescription>

              {/* Don't show again checkbox */}
              <div className="flex items-center space-x-3 justify-center p-3 bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200">
                <Checkbox
                  id="dont-show-again"
                  checked={dontShowAgain}
                  onCheckedChange={handleDontShowAgainChange}
                  className="h-5 w-5 transition-colors duration-200"
                  style={{
                    border: '2px solid #6b7280',
                    backgroundColor: dontShowAgain ? '#2563eb' : 'white',
                    borderColor: dontShowAgain ? '#2563eb' : '#6b7280'
                  }}
                />
                <label 
                  htmlFor="dont-show-again" 
                  className="text-sm sm:text-base text-gray-700 font-medium cursor-pointer select-none hover:text-gray-900 transition-colors duration-200"
                >
                  {currentTranslations?.welcomeModalDontShowAgain}
                </label>
              </div>

              <DialogFooter className="flex justify-center space-x-3">
                <button
                  onClick={() => setSelectedLanguage(null)}
                  className="bg-white/90 backdrop-blur-sm text-gray-700 px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-md flex items-center justify-center space-x-2 hover:bg-white transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium"
                >
                  {currentTranslations?.previous || 'Zurück / Назад'}
                </button>
                <button
                  onClick={handleStart}
                  className="min-w-24 px-6 py-3 rounded-xl text-base font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 bg-gradient-to-br from-green-500 to-green-700 text-white shadow-lg hover:shadow-xl"
                >
                  {currentTranslations?.start} 🚀
                </button>
              </DialogFooter>
            </div>
          )}
        </div>
      </WelcomeDialogContent>
    </Dialog>
  );
}
