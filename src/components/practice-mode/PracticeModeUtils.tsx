import { Eye, Zap, Target, Brain, Lightbulb, Hand, Ear } from 'lucide-react';

export type StrategyCategory = 'visual' | 'pattern' | 'counting' | 'breakdown' | 'kinesthetic' | 'auditory' | 'default';

export const getStrategyCategory = (strategy: string): StrategyCategory => {
  // console.log('getStrategyCategory', strategy);
  switch (strategy) {
    case 'visual_array':
      return 'visual';

    case 'ones':
    case 'tens':
    case 'nines':
    case 'nines_digit_sum':
    case 'elevens_simple':
    case 'elevens_advanced':
    case 'squares':
    case 'near_doubles':
    case 'pattern_recognition': // Keep old key for safety
      return 'pattern';

    case 'twos':
    case 'doubles': // Keep old key
    case 'fives':
    case 'skip_counting':
      return 'counting';

    case 'decomposition':
      return 'breakdown';

    case 'pure_doubles':
    case 'nines_finger_trick':
    case 'benchmark_numbers':
    case 'building_known_facts':
      return 'kinesthetic';

    case 'memory_trick':
      return 'auditory';

    default:
      return 'default';
  }
};

export const getStrategyIcon = (strategy: string): JSX.Element => {
  switch (strategy) {
    case 'visual_array': return <Eye className="w-5 h-5" />;
    case 'pattern_recognition': return <Zap className="w-5 h-5" />;
    case 'skip_counting': return <Target className="w-5 h-5" />;
    case 'decomposition': return <Brain className="w-5 h-5" />;
    case 'nines_finger_trick': return <Hand className="w-5 h-5" />;
    case 'memory_trick': return <Ear className="w-5 h-5" />;
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
