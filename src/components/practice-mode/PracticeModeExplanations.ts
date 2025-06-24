import type { Translation } from '../../translations';
import type { ExplanationContent } from './PracticeModeTypes';

// Helper functions for smart explanations
const generateVisualDots = (a: number, b: number, t: Translation): string => {
  let visual = '';
  for (let row = 0; row < Math.min(b, 6); row++) {
    visual += '● '.repeat(Math.min(a, 10)) + (a > 10 ? '...' : '') + '\n';
  }
  if (b > 6) visual += '...\n';
  return visual + (t.visualDotsResult?.replace('{b}', b.toString()).replace('{a}', a.toString()).replace('{result}', (a * b).toString()) || `${b} rows × ${a} dots = ${a * b} total`);
};

const generateSkipCountingSteps = (a: number, b: number, t: Translation): string[] => {
  const sequence = [];
  for (let i = 1; i <= b; i++) {
    sequence.push(a * i);
  }
  return [
    t.skipCountingStep1?.replace('{a}', a.toString()) || `Start counting by ${a}s:`,
    t.skipCountingStep2?.replace('{sequence}', sequence.join(' → ')) || `${sequence.join(' → ')}`,
    t.skipCountingStep3?.replace('{b}', b.toString()).replace('{a}', a.toString()).replace('{result}', (a * b).toString()) || `We counted ${b} times: ${a} × ${b} = ${a * b}`
  ];
};

const generateDecompositionSteps = (a: number, b: number, t: Translation): string[] => {
  if (a > 10) {
    const tens = Math.floor(a / 10) * 10;
    const ones = a % 10;
    return [
      t.decompositionStep1?.replace('{a}', a.toString()).replace('{tens}', tens.toString()).replace('{ones}', ones.toString()) || `Break down ${a} = ${tens} + ${ones}`,
      t.decompositionStep2?.replace('{a}', a.toString()).replaceAll('{b}', b.toString()).replace('{tens}', tens.toString()).replace('{ones}', ones.toString()) || `${a} × ${b} = (${tens} + ${ones}) × ${b}`,
      t.decompositionStep3?.replace('{tensResult}', (tens * b).toString()).replace('{onesResult}', (ones * b).toString()).replace('{result}', (a * b).toString()) || `= ${tens * b} + ${ones * b} = ${a * b}`
    ];
  }
  return [t.decompositionFallback?.replace('{a}', a.toString()).replace('{b}', b.toString()).replace('{result}', (a * b).toString()) || `${a} × ${b} = ${a * b}`];
};

// Smart explanation generation
export const generateSmartExplanation = (
  a: number,
  b: number,
  attempts: number,
  t: Translation,
  strugglingWith: number[]
): ExplanationContent => {
  // Pattern recognition for 9s
  if (a === 9 || b === 9) {
    const other = a === 9 ? b : a;
    return {
      strategy: 'pattern_recognition',
      concept: t.ninesPatternConcept || `Special 9s trick: Use the "subtract from 10" method`,
      steps: [
        t.ninesStep1?.replace('{other}', other.toString()) || `Notice this is 9 × ${other}`,
        t.ninesStep2?.replace('{other}', other.toString()).replace('{result}', (10 * other).toString()) || `Think: 10 × ${other} = ${10 * other}`,
        t.ninesStep3?.replaceAll('{other}', other.toString()).replace('{calc1}', (10 * other).toString()).replace('{calc2}', (9 * other).toString()) || `Then subtract ${other}: ${10 * other} - ${other} = ${9 * other}`,
        t.ninesStep4?.replace('{other}', other.toString()).replace('{result}', (9 * other).toString()) || `So 9 × ${other} = ${9 * other}`
      ],
      pattern: t.ninesPattern || `9 times anything: multiply by 10, then subtract the number!`,
      mnemonics: t.ninesMnemonic || `Remember: 9 is just 1 less than 10!`
    };
  }

  // Pattern recognition for 11s
  if (a === 11 && b < 10) {
    return {
      strategy: 'pattern_recognition',
      concept: t.elevensPatternConcept || `Magical 11s pattern for single digits`,
      steps: [
        t.elevensStep1?.replace('{digit}', b.toString()) || `Special 11 pattern: 11 × ${b}`,
        t.elevensStep2?.replaceAll('{digit}', b.toString()) || `Just write the digit twice: ${b}${b}`,
        t.elevensStep3?.replace('{digit}', b.toString()).replace('{result}', (11 * b).toString()) || `Check: 11 × ${b} = ${11 * b}`
      ],
      pattern: t.elevensPattern || `11 × single digit = repeat the digit!`,
      mnemonics: t.elevensMnemonic || `11 likes to see double!`
    };
  }

  // For struggling numbers or multiple attempts, use visual
  if (strugglingWith.includes(a) || strugglingWith.includes(b) || attempts > 1) {
    return {
      strategy: 'visual_array',
      concept: t.visualArrayConcept?.replaceAll('{a}', a.toString()).replaceAll('{b}', b.toString()) || `Think of ${a} × ${b} as making ${b} groups of ${a} objects`,
      visual: generateVisualDots(a, b, t),
      steps: [
        t.visualStep1?.replace('{b}', b.toString()).replace('{a}', a.toString()) || `Make ${b} groups of ${a} dots`,
        t.visualStep2?.replace('{result}', (a * b).toString()) || `Count all the dots: ${a * b}`,
        t.visualStep3?.replace('{a}', a.toString()).replace('{b}', b.toString()) || `Each row has ${a} dots, ${b} rows total`
      ],
      realWorld: t.visualRealWorld?.replace('{b}', b.toString()).replace('{a}', a.toString()).replace('{result}', (a * b).toString()) || `Like having ${b} boxes with ${a} toys each = ${a * b} toys total`
    };
  }

  // Skip counting for medium numbers
  if (a <= 10 && b <= 10) {
    return {
      strategy: 'skip_counting',
      concept: t.skipCountingConcept?.replace('{a}', a.toString()).replace('{b}', b.toString()) || `Count by ${a}s, ${b} times`,
      steps: generateSkipCountingSteps(a, b, t),
      pattern: t.skipCountingPattern?.replace('{a}', a.toString()).replace('{a2}', (a*2).toString()).replace('{a3}', (a*3).toString()).replace('{result}', (a*b).toString()) || `${a}, ${a*2}, ${a*3}... up to ${a*b}`,
      mnemonics: t.skipCountingMnemonic?.replace('{a}', a.toString()) || `Skip counting by ${a}s!`
    };
  }

  // Decomposition for larger numbers
  return {
    strategy: 'decomposition',
    concept: t.decompositionConcept || `Break down into easier parts`,
    steps: generateDecompositionSteps(a, b, t),
    pattern: t.decompositionPattern || `Break large numbers into tens and ones`
  };
};
