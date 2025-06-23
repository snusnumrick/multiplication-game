import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../contexts/game-hooks';
import { cn } from '@/lib/utils';

// Assuming these assets will be created in src/assets/animations/foxy/
// The build system (e.g., Next.js) will handle these imports.
// If these files don't exist yet, this will cause a compile-time error.
// This is expected as per the plan (Create/Source Basic Animations is PENDING).
import foxyIdleSheet from '../assets/animations/foxy/idle.png';
import foxyTalkingSheet from '../assets/animations/foxy/idle.png';
import foxyHappySheet from '../assets/animations/foxy/idle.png';
import foxyStaticImage from '../../public/images/foxy-mascot.png'; // Fallback static image

const FOXY_FRAME_WIDTH = 70;
const FOXY_FRAME_HEIGHT = 70;

type AnimationConfigType = {
  imageUrl: string; // Should be StaticImageData after import
  frames: number;
  frameWidth: number;
  frameHeight: number;
  duration: number; // ms per frame
  isSpriteSheet: boolean;
};

const animationsConfig: Record<string, AnimationConfigType> = {
  idle: {
    imageUrl: foxyIdleSheet, // .src for Next.js Image component-like imports
    frames: 4, // Example: 4 frames in the idle sheet
    frameWidth: FOXY_FRAME_WIDTH,
    frameHeight: FOXY_FRAME_HEIGHT,
    duration: 200, // Slower animation for idle
    isSpriteSheet: true,
  },
  talking: {
    imageUrl: foxyTalkingSheet,
    frames: 1, // Example: 4 frames for talking
    frameWidth: FOXY_FRAME_WIDTH,
    frameHeight: FOXY_FRAME_HEIGHT,
    duration: 150, // Faster animation for talking
    isSpriteSheet: true,
  },
  happy: {
    imageUrl: foxyHappySheet,
    frames: 5, // Example: 5 frames for happy
    frameWidth: FOXY_FRAME_WIDTH,
    frameHeight: FOXY_FRAME_HEIGHT,
    duration: 120, // Energetic animation
    isSpriteSheet: true,
  },
  static_default: {
    imageUrl: foxyStaticImage,
    frames: 1,
    frameWidth: FOXY_FRAME_WIDTH,
    frameHeight: FOXY_FRAME_HEIGHT,
    duration: 1000, // Not relevant for single frame
    isSpriteSheet: false, // Display as a static image
  },
};

interface AnimatedFoxyProps {
  message?: string;
  isVisible: boolean;
  // imageUrl prop removed, animation is driven by foxyAnimationState
}

export function AnimatedFoxy({
                               message,
                               isVisible,
                             }: AnimatedFoxyProps) {
  const { t, settings, foxyAnimationState } = useGame();
  const [currentFrame, setCurrentFrame] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentAnimKey = (foxyAnimationState && animationsConfig[foxyAnimationState])
      ? foxyAnimationState
      : 'static_default';
  console.log('currentAnimKey', currentAnimKey);
  const anim = animationsConfig[currentAnimKey];

  useEffect(() => {
    setCurrentFrame(0); // Reset frame when animation or visibility changes

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Only animate if visible and it's a multi-frame spritesheet
    if (isVisible && anim.isSpriteSheet && anim.frames > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentFrame(prevFrame => (prevFrame + 1) % anim.frames);
      }, anim.duration);
    } else if (!anim.isSpriteSheet) { // If it's a static image, ensure frame is 0
      setCurrentFrame(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [anim, isVisible]); // Re-run effect if animation config or visibility changes

  if (!settings.foxyEnabled) {
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
        <div
            role="img"
            aria-label={t.foxyMascotAltText}
            className="mr-4 rounded-full border-[3px] border-[#f0a04b] overflow-hidden" // Removed w-[70px] h-[70px]
            style={{
              width: `${anim.frameWidth}px`,
              height: `${anim.frameHeight}px`,
              backgroundImage: `url('${anim.imageUrl}')`,
              backgroundRepeat: 'no-repeat',
              backgroundPositionX: anim.isSpriteSheet ? `-${currentFrame * anim.frameWidth}px` : '0px',
              backgroundPositionY: '0px', // Assuming all sprite sheets are horizontal strips
              backgroundSize: anim.isSpriteSheet ? 'auto' : 'cover', // 'cover' for static, 'auto' for sprite
            }}
        />
        {message && (
            <p className="m-0 text-sm text-gray-700 leading-snug">
              {message}
            </p>
        )}
      </div>
  );
}