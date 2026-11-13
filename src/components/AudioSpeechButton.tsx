import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useVLE } from '../context/VLEContext';

interface AudioSpeechButtonProps {
  text: string;
  className?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AudioSpeechButton: React.FC<AudioSpeechButtonProps> = ({
  text,
  className = '',
  label,
  size = 'md'
}) => {
  const { speakText } = useVLE();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    speakText(text);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs gap-1',
    md: 'p-2 text-sm gap-1.5',
    lg: 'px-3 py-2 text-base gap-2'
  };

  return (
    <button
      onClick={handleSpeak}
      title="Listen to pronunciation"
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 cursor-pointer ${
        isPlaying
          ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 scale-105'
          : 'bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 hover:text-indigo-300 border border-indigo-500/20'
      } ${sizeClasses[size]} ${className}`}
    >
      {isPlaying ? (
        <Volume2 className="w-4 h-4 animate-bounce" />
      ) : (
        <Volume2 className="w-4 h-4" />
      )}
      {label && <span>{label}</span>}
    </button>
  );
};
