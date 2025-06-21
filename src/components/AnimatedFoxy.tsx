import React from 'react';
import { useGame } from '../contexts/game-hooks';
import { cn } from '@/lib/utils';

interface AnimatedFoxyProps {
  message?: string;
  isVisible: boolean;
  imageUrl?: string;
}

export function AnimatedFoxy({ 
  message, 
  isVisible, 
  imageUrl = "/images/foxy-mascot.jpg" 
}: AnimatedFoxyProps) {
  const { t, settings } = useGame();

  if (!settings.foxyEnabled) { // Visibility is handled by classes now, only check global enable
    return null;
  }

  return (
    <div 
      className={cn(
        "fixed bottom-5 right-5 p-4 bg-white/95 rounded-2xl shadow-lg flex items-center max-w-xs z-[1000]",
        "transition-all duration-300 ease-in-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"
      )}
    >
      <img 
        src={imageUrl} 
        alt={t.foxyMascotAltText} 
        className="w-[70px] h-[70px] mr-4 rounded-full border-[3px] border-[#f0a04b]"
      />
      {message && (
        <p className="m-0 text-sm text-gray-700 leading-snug">
          {message}
        </p>
      )}
    </div>
  );
}
