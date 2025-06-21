import React from 'react';
import { useGame } from '../contexts/game-hooks';

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
  const { t } = useGame();

  if (!isVisible) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      padding: '15px',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '15px',
      boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
      display: 'flex',
      alignItems: 'center',
      maxWidth: '320px',
      zIndex: 1000, // Ensure it's on top
      transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    }}>
      <img 
        src={imageUrl} 
        alt={t.foxyMascotAltText} 
        style={{ 
          width: '70px', 
          height: '70px', 
          marginRight: '15px', 
          borderRadius: '50%',
          border: '3px solid #f0a04b' // A warm orange border
        }} 
      />
      {message && (
        <p style={{ 
          margin: 0, 
          fontSize: '14px', 
          color: '#4A4A4A', // Darker grey for better readability
          lineHeight: '1.4' 
        }}>
          {message}
        </p>
      )}
    </div>
  );
}
