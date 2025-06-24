import React from 'react';
import { Eye, Zap, Target, Brain, Lightbulb } from 'lucide-react';

export const getStrategyIcon = (strategy: string): JSX.Element => {
  switch (strategy) {
    case 'visual_array': return <Eye className="w-5 h-5" />;
    case 'pattern_recognition': return <Zap className="w-5 h-5" />;
    case 'skip_counting': return <Target className="w-5 h-5" />;
    case 'decomposition': return <Brain className="w-5 h-5" />;
    default: return <Lightbulb className="w-5 h-5" />;
  }
};

export const getStrategyColor = (strategy: string): string => {
  switch (strategy) {
    case 'visual_array': return 'bg-green-500 hover:bg-green-600';
    case 'pattern_recognition': return 'bg-purple-500 hover:bg-purple-600';
    case 'skip_counting': return 'bg-blue-500 hover:bg-blue-600';
    case 'decomposition': return 'bg-orange-500 hover:bg-orange-600';
    default: return 'bg-yellow-500 hover:bg-yellow-600';
  }
};
