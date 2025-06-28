import type { Translation } from '@/translations.ts';
import type { ExplanationContent } from './PracticeModeTypes';
import { strategyLearningStyles } from './StrategyLearningStyles';

// Helper functions for smart explanations
const generateVisualDots = (a: number, b: number, t: Translation): string => {
  let visual = '';
  for (let row = 0; row < Math.min(b, 6); row++) {
    visual += '● '.repeat(Math.min(a, 10)) + (a > 10 ? '...' : '') + '\n';
  }
  if (b > 6) visual += '...\n';
  return visual + (t.visualDotsResult?.replaceAll('{b}', b.toString()).replaceAll('{a}', a.toString()).replace('{result}', (a * b).toString()) || `${b} rows × ${a} dots = ${a * b} total`);
};

const generateSkipCountingSteps = (a: number, b: number, t: Translation): string[] => {
  const sequence = [];
  for (let i = 1; i <= b; i++) {
    sequence.push(a * i);
  }
  return [
    t.skipCountingStep1?.replaceAll('{a}', a.toString()) || `Start counting by ${a}s:`,
    t.skipCountingStep2?.replace('{sequence}', sequence.join(' → ')) || `${sequence.join(' → ')}`,
    t.skipCountingStep3?.replaceAll('{b}', b.toString()).replaceAll('{a}', a.toString()).replace('{result}', (a * b).toString()) || `We counted ${b} times: ${a} × ${b} = ${a * b}`
  ];
};

const generateDecompositionSteps = (a: number, b: number, t: Translation): string[] => {
  if (a > 10) {
    const tens = Math.floor(a / 10) * 10;
    const ones = a % 10;
    return [
      t.decompositionStep1?.replaceAll('{a}', a.toString()).replace('{tens}', tens.toString()).replace('{ones}', ones.toString()) || `Break down ${a} = ${tens} + ${ones}`,
      t.decompositionStep2?.replaceAll('{a}', a.toString()).replaceAll('{b}', b.toString()).replace('{tens}', tens.toString()).replace('{ones}', ones.toString()) || `${a} × ${b} = (${tens} + ${ones}) × ${b}`,
      t.decompositionStep3?.replace('{tensResult}', (tens * b).toString()).replace('{onesResult}', (ones * b).toString()).replace('{result}', (a * b).toString()) || `= ${tens * b} + ${ones * b} = ${a * b}`
    ];
  }
  return [t.decompositionFallback?.replaceAll('{a}', a.toString()).replaceAll('{b}', b.toString()).replace('{result}', (a * b).toString()) || `${a} × ${b} = ${a * b}`];
};

// Smart explanation generation
export const generateSmartExplanation = (
  initialA: number,
  initialB: number,
  attempts: number,
  t: Translation,
  strugglingWith: number[],
  strategySuccess: Record<string, number>,
  learningStyleSuccess: Record<string, number>,
  options?: { discoveryMode?: boolean }
): ExplanationContent => {
  console.log('generateSmartExplanation entry:', { initialA, initialB, attempts, strugglingWithCount: strugglingWith.length, strategySuccess, options });

  let a = initialA;
  let b = initialB;
  // Symmetry: Internally swap a and b if b < a for consistent strategy application
  if (b < a) {
    [a, b] = [b, a]; // 'a' is now always the smaller or equal number
  }

  // Priority 1: Visual explanation if user is struggling with either of the original numbers or after multiple attempts
  // This override is skipped if in discoveryMode.
  // We check strugglingWith against initialA and initialB as those are the numbers from the problem context.
  if (!options?.discoveryMode && (strugglingWith.includes(initialA) || strugglingWith.includes(initialB)) || attempts > 10) {
    console.log('generateSmartExplanation: visual (priority due to struggle/attempts)', { initialA, initialB, a, b, attempts, strugglingWith });
    return {
      strategy: 'visual_array',
      concept: t.visualArrayConcept?.replaceAll('{a}', a.toString()).replaceAll('{b}', b.toString()) || `Think of ${a} × ${b} as making ${b} groups of ${a} objects`,
      visual: generateVisualDots(a, b, t), // Uses potentially swapped a, b
      steps: [
        t.visualStep1?.replaceAll('{b}', b.toString()).replaceAll('{a}', a.toString()) || `Make ${b} groups of ${a} dots`,
        t.visualStep2?.replace('{result}', (a * b).toString()) || `Count all the dots: ${a * b}`,
        t.visualStep3?.replaceAll('{a}', a.toString()).replaceAll('{b}', b.toString()) || `Each row has ${a} dots, ${b} rows total`
      ],
      realWorld: t.visualRealWorld?.replaceAll('{b}', b.toString()).replaceAll('{a}', a.toString()).replace('{result}', (a * b).toString()) || `Like having ${b} boxes with ${a} toys each = ${a * b} toys total`
    };
  }

  // Priority 2: Specific strategies if applicable and not overridden by the struggle/attempts check
  interface ApplicableStrategy {
    name: string;
    complexityOrder: number;
    generate: () => ExplanationContent;
  }
  const applicableStrategies: ApplicableStrategy[] = [];

  // Define strategy checks and add to applicableStrategies if they match
  // These checks use 'a' and 'b' which are the (potentially swapped) numbers.

  // Strategy: Ones (Identity Property) (Complexity: 1)
  // This is placed first due to its fundamental nature and low complexity.
  // 'a' will be 1 if either initialA or initialB was 1, due to the symmetry swap.
  if (a === 1) {
    // console.log('generateSmartExplanation: ones');
    const otherNum = b; // 'b' is the other number since 'a' is 1
    const result = b;   // 1 * b = b
    applicableStrategies.push({
      name: 'ones',
      complexityOrder: 1, // Simplest strategy
      generate: () => ({
        strategy: 'ones',
        concept: t.onesConcept || `Multiplying by 1 is super simple!`,
        steps: [
          t.onesStep1?.replaceAll('{otherNum}', otherNum.toString()) || `This is ${otherNum} × 1 (or 1 × ${otherNum}).`,
          t.onesStep2 || `Any number multiplied by 1 is just itself.`,
          t.onesStep3?.replaceAll('{otherNum}', otherNum.toString()).replace('{result}', result.toString()) || `So, ${otherNum} × 1 = ${result}.`
        ],
        pattern: t.onesPattern || `Any number × 1 = that number. It stays the same!`,
        mnemonics: t.onesMnemonic || `One is like a magic mirror, it shows the number right back!`
      })
    });
  }

  // Strategy: Tens (Complexity: 2)
  // Note: The original code had a 'pattern_recognition' for 10s. We use 'tens' for clarity.
  if (a === 10 || b === 10) { // b === 10 check is for when initialA was 10 and initialB < 10, so no swap happened.
    // console.log('generateSmartExplanation: 10');
    const other = (a === 10 && b !== 10) ? b : (b === 10 && a !== 10) ? a : (a === 10 && b === 10) ? 10 : initialA === 10 ? initialB : initialA; // Handle 10x10 and ensure correct 'other'
    applicableStrategies.push({
      name: 'tens',
      complexityOrder: 2,
      generate: () => ({
        strategy: 'tens', // Specific strategy name
        concept: t.tensConcept || `Multiplying by 10 is super easy!`,
        steps: [
          t.tensStep1?.replaceAll('{other}', other.toString()) || `This is ${other} × 10 (or 10 × ${other}).`,
          t.tensStep2?.replaceAll('{other}', other.toString()) || `To multiply any number by 10, just add a zero to the end of it.`,
          t.tensStep3?.replaceAll('{other}', other.toString()).replace('{result}', (other * 10).toString()) || `So, ${other} becomes ${other}0.`,
          t.tensStep4?.replaceAll('{other}', other.toString()).replace('{result}', (other * 10).toString()) || `The answer is ${other} × 10 = ${other * 10}.`
        ],
        pattern: t.tensPattern || `Any number × 10 = that number with a 0 added to the end.`,
        mnemonics: t.tensMnemonic || `Ten is the easiest - just add a zero!`
      })
    });
  }

  // Strategy: Twos (Doubles) (Complexity: 3)
  // Original code had 'doubles', we use 'twos' for consistency with translation keys like 'twosConcept'.
  if (a === 2) { // Check only 'a' due to symmetry swap (initialA or initialB could be 2)
    // console.log('generateSmartExplanation: 2');
    const otherNum = b; // 'a' is 2 after potential swap
    const result = 2 * otherNum;
    applicableStrategies.push({
      name: 'twos',
      complexityOrder: 3,
      generate: () => ({
        strategy: 'twos', // Specific strategy name
        concept: t.twosConcept || `Multiplying by 2 is just doubling!`,
        steps: [
          t.twosStep1?.replaceAll('{otherNum}', otherNum.toString()) || `This is 2 × ${otherNum} (or ${otherNum} × 2).`,
          t.twosStep2?.replaceAll('{otherNum}', otherNum.toString()) || `Doubling means adding the number to itself: ${otherNum} + ${otherNum}.`,
          t.twosStep3?.replaceAll('{otherNum}', otherNum.toString()).replace('{result}', result.toString()) || `So, 2 × ${otherNum} = ${result}.`
        ],
        pattern: t.twosPattern || `Any number × 2 = that number + itself.`,
        mnemonics: t.twosMnemonic || `Two makes a pair, just add it there!`
      })
    });
  }

  // Strategy: Fives (Complexity: 4)
  if (a === 5) { // Check only 'a' due to symmetry swap
    // console.log('generateSmartExplanation: 5');
    const otherNum = b; // 'a' is 5 after potential swap
    const result = 5 * otherNum;
    const tenTimesOther = 10 * otherNum;
    applicableStrategies.push({
      name: 'fives',
      complexityOrder: 4,
      generate: () => ({
        strategy: 'fives', // Specific strategy name
        concept: t.fivesConcept || `Multiplying by 5 uses the 'half of 10' trick!`,
        steps: [
          t.fivesStep1?.replaceAll('{otherNum}', otherNum.toString()) || `This is 5 × ${otherNum} (or ${otherNum} × 5).`,
          t.fivesStep2?.replaceAll('{otherNum}', otherNum.toString()).replace('{tenTimesOther}', tenTimesOther.toString()) || `Think: (10 × ${otherNum}) ÷ 2. That's ${tenTimesOther} ÷ 2.`,
          t.fivesStep3?.replace('{tenTimesOther}', tenTimesOther.toString()).replaceAll('{otherNum}', otherNum.toString()).replace('{result}', result.toString()) || `Half of ${tenTimesOther} is ${result}. So, 5 × ${otherNum} = ${result}.`
        ],
        pattern: t.fivesPattern || `Any number × 5 = (that number × 10) ÷ 2.`,
        mnemonics: t.fivesMnemonic || `Five is half of ten, easy to win!`
      })
    });
  }

  // Strategy: Pure Doubles (for even numbers) (Complexity: 5)
  if (a % 2 === 0 && a > 2) { // Check for even numbers other than 2
    const halfA = a / 2;
    const result = a * b;
    const halfResult = halfA * b;
    applicableStrategies.push({
      name: 'pure_doubles',
      complexityOrder: 5,
      generate: () => ({
        strategy: 'pure_doubles',
        concept: t.pureDoublesConcept || 'Double it up! Use smaller facts you know.',
        steps: [
          t.pureDoublesStep1?.replaceAll('{a}', a.toString()).replaceAll('{b}', b.toString()) || `Problem: ${a} × ${b}.`,
          t.pureDoublesStep2?.replaceAll('{a}', a.toString()).replaceAll('{halfA}', halfA.toString()) || `Since ${a} is an even number, you can split it in half: ${a} = ${halfA} + ${halfA}.`,
          t.pureDoublesStep3?.replaceAll('{a}', a.toString()).replaceAll('{b}', b.toString()).replaceAll('{halfA}', halfA.toString()) || `So, ${a} × ${b} is the same as (${halfA} × ${b}) + (${halfA} × ${b}).`,
          t.pureDoublesStep4?.replaceAll('{halfA}', halfA.toString()).replaceAll('{b}', b.toString()).replaceAll('{halfResult}', halfResult.toString()) || `First, calculate ${halfA} × ${b} = ${halfResult}.`,
          t.pureDoublesStep5?.replaceAll('{halfResult}', halfResult.toString()).replaceAll('{result}', result.toString()) || `Now, just double that result: ${halfResult} + ${halfResult} = ${result}.`
        ],
        pattern: t.pureDoublesPattern || `For even numbers: N × M = (N/2 × M) + (N/2 × M).`,
        mnemonics: t.pureDoublesMnemonic || `When a number's even, split it in two, solve one part, then double through!`
      })
    });
  }
  
  // Strategy: Elevens (Simple) (Complexity: 5)
  // Original code had 'pattern_recognition', we use 'elevens_simple'.
  if (a === 11 && b < 10) { // 'a' is 11 after potential swap, 'b' is the single digit
    // console.log('generateSmartExplanation: 11');
    applicableStrategies.push({
      name: 'elevens_simple',
      complexityOrder: 5,
      generate: () => ({
        strategy: 'elevens_simple', // Specific strategy name
        concept: t.elevensPatternConcept || `Magical 11s pattern for single digits`,
        steps: [
          t.elevensStep1?.replaceAll('{digit}', b.toString()) || `Special 11 pattern: 11 × ${b}`,
          t.elevensStep2?.replaceAll('{digit}', b.toString()) || `Just write the digit twice: ${b}${b}`,
          t.elevensStep3?.replaceAll('{digit}', b.toString()).replace('{result}', (11 * b).toString()) || `Check: 11 × ${b} = ${11 * b}`
        ],
        pattern: t.elevensPattern || `11 × single digit = repeat the digit!`,
        mnemonics: t.elevensMnemonic || `11 likes to see double!`
      })
    });
  }

  // Strategy: Squares (Complexity: 6)
  if (a === b) {
    // console.log('generateSmartExplanation: squares');
    const num = a; // or b, they are the same
    const result = num * num;
    applicableStrategies.push({
      name: 'squares',
      complexityOrder: 6,
      generate: () => ({
        strategy: 'squares', // Specific strategy name
        concept: t.squaresConcept?.replaceAll('{num}', num.toString()) || `Multiplying a number by itself is called 'squaring'.`,
        steps: [
          t.squaresStep1?.replaceAll('{num}', num.toString()) || `This is ${num} × ${num}.`,
          t.squaresStep2?.replaceAll('{num}', num.toString()).replace('{result}', result.toString()) || `The square of ${num} is ${result}. So, ${num} × ${num} = ${result}.`
        ],
        pattern: t.squaresPattern?.replaceAll('{num}', num.toString()) || `${num} × ${num} is a 'perfect square'. These are good to memorize!`,
        mnemonics: t.squaresMnemonic || `Squares are special, learn them well!`
      })
    });
  }

  // Strategy: Nines (Complexity: 7)
  // Original code had 'pattern_recognition', we use 'nines'.
  if (a === 9) { // Check only 'a' due to symmetry swap
    // console.log('generateSmartExplanation: 9');
    const other = b; // 'a' is 9 after potential swap
    applicableStrategies.push({
      name: 'nines',
      complexityOrder: 7,
      generate: () => ({
        strategy: 'nines', // Specific strategy name
        concept: t.ninesPatternConcept || `Special 9s trick: Use the "subtract from 10" method`,
        steps: [
          t.ninesStep1?.replaceAll('{other}', other.toString()) || `Notice this is 9 × ${other}`,
          t.ninesStep2?.replaceAll('{other}', other.toString()).replace('{result}', (10 * other).toString()) || `Think: 10 × ${other} = ${10 * other}`,
          t.ninesStep3?.replaceAll('{other}', other.toString()).replace('{calc1}', (10 * other).toString()).replace('{calc2}', (9 * other).toString()) || `Then subtract ${other}: ${10 * other} - ${other} = ${9 * other}`,
          t.ninesStep4?.replaceAll('{other}', other.toString()).replace('{result}', (9 * other).toString()) || `So 9 × ${other} = ${9 * other}`
        ],
        pattern: t.ninesPattern || `9 times anything: multiply by 10, then subtract the number!`,
        mnemonics: t.ninesMnemonic || `Remember: 9 is just 1 less than 10!`
      })
    });
  }

  // Strategy: Nines Digit Sum (Complexity: 7)
  if (a === 9 && b < 10) { // Check only 'a' due to symmetry swap, and for single digit 'b'
    const other = b;
    const result = a * other;
    const firstDigit = Math.floor(result / 10);
    const secondDigit = result % 10;
    applicableStrategies.push({
      name: 'nines_digit_sum',
      complexityOrder: 7,
      generate: () => ({
        strategy: 'nines_digit_sum',
        concept: t.ninesDigitSumConcept || 'The magic of 9s: the digits of the answer always add up to 9!',
        steps: [
          t.ninesDigitSumStep1?.replaceAll('{other}', other.toString()) || `For 9 × ${other}, the first digit of the answer is one less than ${other}.`,
          t.ninesDigitSumStep2?.replaceAll('{other}', other.toString()).replace('{firstDigit}', (other - 1).toString()) || `So, the first digit is ${other} - 1 = ${other - 1}.`,
          t.ninesDigitSumStep3?.replace('{firstDigit}', firstDigit.toString()).replace('{sum}', '9') || `The two digits of the answer must add up to 9. So, ${firstDigit} + ? = 9.`,
          t.ninesDigitSumStep4?.replace('{secondDigit}', secondDigit.toString()) || `The second digit must be ${secondDigit}.`,
          t.ninesDigitSumStep5?.replace('{result}', result.toString()) || `The answer is ${result}.`
        ],
        pattern: t.ninesDigitSumPattern || `For 9 × N, the first digit is N-1, and the second digit makes the sum of both digits 9.`,
        mnemonics: t.ninesDigitSumMnemonic || `With nines, the digits always make a perfect nine!`
      })
    });
  }

  // Strategy: Nines Finger Trick (Complexity: 7)
  if (a === 9 && b > 1 && b < 10) { // Check for 'a' as 9 and 'b' as a single digit > 1
    const other = b;
    const result = a * other;
    const firstDigit = other - 1;
    const secondDigit = 10 - other;
    applicableStrategies.push({
      name: 'nines_finger_trick',
      complexityOrder: 7,
      generate: () => ({
        strategy: 'nines_finger_trick',
        concept: t.ninesFingerTrickConcept || 'Use your fingers to solve 9s!',
        steps: [
          t.ninesFingerTrickStep1 || 'Hold up both hands in front of you.',
          t.ninesFingerTrickStep2?.replaceAll('{other}', other.toString()) || `To multiply 9 by ${other}, bend down your ${other}th finger (from the left).`,
          t.ninesFingerTrickStep3?.replace('{firstDigit}', firstDigit.toString()) || `The fingers to the left of the bent finger are the tens digit. You have ${firstDigit} finger(s) up.`,
          t.ninesFingerTrickStep4?.replace('{secondDigit}', secondDigit.toString()) || `The fingers to the right are the ones digit. You have ${secondDigit} finger(s) up.`,
          t.ninesFingerTrickStep5?.replace('{result}', result.toString()) || `So, the answer is ${result}.`
        ],
        pattern: t.ninesFingerTrickPattern || 'Bend the Nth finger for 9xN. Left fingers are tens, right fingers are ones.',
        mnemonics: t.ninesFingerTrickMnemonic || 'Your ten fingers are a magic 9s calculator!'
      })
    });
  }
  
  // Strategy: Near Doubles (Complexity: 8)
  if (b === a + 1) { // 'a' is smaller due to symmetry swap
    // console.log('generateSmartExplanation: near doubles');
    const result = a * b;
    const aSquared = a * a;
    applicableStrategies.push({
      name: 'near_doubles',
      complexityOrder: 8,
      generate: () => ({
        strategy: 'near_doubles', // Specific strategy name
        concept: t.nearDoublesConcept?.replaceAll('{a}', a.toString()).replaceAll('{b}', b.toString()) || `Multiplying consecutive numbers like ${a} × ${b}.`,
        steps: [
          t.nearDoublesStep1?.replaceAll('{a}', a.toString()).replaceAll('{b}', b.toString()) || `This is ${a} × ${b}. Notice ${b} is ${a} + 1.`,
          t.nearDoublesStep2?.replaceAll('{a}', a.toString()).replace('{aSquared}', aSquared.toString()) || `You can think of this as (${a} × ${a}) + ${a}, which is ${aSquared} + ${a}.`,
          t.nearDoublesStep3?.replace('{aSquared}', aSquared.toString()).replaceAll('{a}', a.toString()).replace('{result}', result.toString()) || `So, ${aSquared} + ${a} = ${result}. Thus, ${a} × ${b} = ${result}.`
        ],
        pattern: t.nearDoublesPattern || `n × (n+1) = n² + n. (Square the smaller number, then add it again).`,
        mnemonics: t.nearDoublesMnemonic || `Neighbors help: square the small one, add it on!`
      })
    });
  }

  // Strategy: Memory Tricks (Complexity: 8)
  const memoryTrickKey = `memory_trick_${a}x${b}` as keyof Translation;
  if (t[memoryTrickKey]) {
    applicableStrategies.push({
      name: 'memory_trick',
      complexityOrder: 8, // Same complexity as near doubles
      generate: () => ({
        strategy: 'memory_trick',
        concept: t.memoryTrickConcept || 'A fun rhyme or story to remember this fact!',
        steps: [t[memoryTrickKey] as string],
        mnemonics: t[memoryTrickKey] as string
      })
    });
  }

  // Strategy: Benchmark Numbers (Complexity: 8)
  if ((a === 6 || a === 7 || a === 8) && b > 5) { // Check for numbers close to benchmarks 5 or 10
    applicableStrategies.push({
      name: 'benchmark_numbers',
      complexityOrder: 8,
      generate: () => {
        let steps: string[];
        const benchmark = (a < 8) ? 5 : 10; // Choose benchmark 5 for 6,7 and 10 for 8
        const diff = a - benchmark;
        const benchmarkResult = benchmark * b;

        if (diff > 0) { // For 6 and 7, build up from 5
          steps = [
            t.benchmarkStep1?.replaceAll('{a}', a.toString()).replaceAll('{b}', b.toString()) || `Let's solve ${a} × ${b}.`,
            t.benchmarkStep2?.replace('{benchmark}', benchmark.toString()).replaceAll('{b}', b.toString()).replace('{result}', benchmarkResult.toString()) || `Start with an easy benchmark: ${benchmark} × ${b} = ${benchmarkResult}.`,
            t.benchmarkStep3?.replaceAll('{a}', a.toString()).replace('{benchmark}', benchmark.toString()).replace('{diff}', diff.toString()) || `Now, ${a} is ${diff} more than ${benchmark}.`,
            t.benchmarkStep4?.replace('{diff}', diff.toString()).replaceAll('{b}', b.toString()).replace('{diff_b}', (diff * b).toString()) || `So we need to add ${diff} more group(s) of ${b}, which is ${diff * b}.`,
            t.benchmarkStep5?.replace('{benchmarkResult}', benchmarkResult.toString()).replace('{diff_b}', (diff * b).toString()).replace('{result}', (a * b).toString()) || `Finally, add them together: ${benchmarkResult} + ${diff * b} = ${a * b}.`,
          ];
        } else { // For 8, build down from 10
          steps = [
            t.benchmarkStep1?.replaceAll('{a}', a.toString()).replaceAll('{b}', b.toString()) || `Let's solve ${a} × ${b}.`,
            t.benchmarkStep2?.replace('{benchmark}', benchmark.toString()).replaceAll('{b}', b.toString()).replace('{result}', benchmarkResult.toString()) || `Start with an easy benchmark: ${benchmark} × ${b} = ${benchmarkResult}.`,
            t.benchmarkStep3?.replaceAll('{a}', a.toString()).replace('{benchmark}', benchmark.toString()).replace('{diff}', Math.abs(diff).toString()) || `Now, ${a} is ${Math.abs(diff)} less than ${benchmark}.`,
            t.benchmarkStep4?.replace('{diff}', Math.abs(diff).toString()).replaceAll('{b}', b.toString()).replace('{diff_b}', (Math.abs(diff) * b).toString()) || `So we need to subtract ${Math.abs(diff)} group(s) of ${b}, which is ${Math.abs(diff) * b}.`,
            t.benchmarkStep5?.replace('{benchmarkResult}', benchmarkResult.toString()).replace('{diff_b}', (Math.abs(diff) * b).toString()).replace('{result}', (a * b).toString()) || `Finally, subtract them: ${benchmarkResult} - ${Math.abs(diff) * b} = ${a * b}.`,
          ];
        }

        return {
          strategy: 'benchmark_numbers',
          concept: t.benchmarkConcept || 'Use easy numbers as stepping stones!',
          steps: steps,
          pattern: t.benchmarkPattern || 'Solve a nearby easy problem, then adjust.',
          mnemonics: t.benchmarkMnemonic || 'Use a benchmark to get close, then step to the answer!'
        };
      }
    });
  }

  // Strategy: Building From Known Facts (BFKF) (Complexity: 9)
  if ([3, 4, 6, 7, 8].includes(a)) { // 'a' is the smaller number after swap
    // console.log('generateSmartExplanation: bfkf');
    applicableStrategies.push({
      name: 'building_known_facts',
      complexityOrder: 9,
      generate: () => {
        let generatedBfkfSteps: string[];
        let generatedBfkfPattern: string;
        const generatedBfkfConceptText = t.bfkfConcept || `Building from simpler known facts.`;

        if (a === 3) {
          generatedBfkfSteps = [
            t.bfkfStep1?.replaceAll('{a}', a.toString()).replaceAll('{b}', b.toString()) || `Problem: ${a} × ${b}.`,
            t.bfkf3sStep2?.replace('{b}', b.toString()) || `Break down 3:  3 = 2 + 1.`,
            t.bfkf3sStep3?.replaceAll('{b}', b.toString()) || `So, 3 × ${b} = (2 × ${b}) + (1 × ${b}).`,
            t.bfkf3sStep4?.replaceAll('{b}', b.toString()).replace('{val1}', (2 * b).toString()).replace('{val2}', (1 * b).toString()) || `We know 2 × ${b} is ${2 * b} (Doubles Strategy), and 1 × ${b} is ${1 * b}.`,
            t.bfkf3sStep5?.replace('{sum1}', (2 * b).toString()).replace('{sum2}', (1 * b).toString()).replace('{result}', (a * b).toString()) || `Add them: ${2 * b} + ${1 * b} = ${a * b}.`,
          ];
          generatedBfkfPattern = t.bfkf3sPattern || `3×N = (2×N) + (1×N)`;
        } else if (a === 4) {
          generatedBfkfSteps = [
            t.bfkfStep1?.replaceAll('{a}', a.toString()).replaceAll('{b}', b.toString()) || `Problem: ${a} × ${b}.`,
            t.bfkf4sStep2?.replace('{b}', b.toString()) || `Break down 4:  4 = 2 + 2.`,
            t.bfkf4sStep3?.replaceAll('{b}', b.toString()) || `So, 4 × ${b} = (2 × ${b}) + (2 × ${b}).`,
            t.bfkf4sStep4?.replaceAll('{b}', b.toString()).replace('{val1}', (2 * b).toString()) || `We know 2 × ${b} is ${2 * b} (Doubles Strategy).`,
            t.bfkf4sStep5?.replace('{sum1}', (2 * b).toString()).replace('{sum2}', (2 * b).toString()).replace('{result}', (a * b).toString()) || `Add them: ${2 * b} + ${2 * b} = ${a * b}.`,
          ];
          generatedBfkfPattern = t.bfkf4sPattern || `4×N = (2×N) + (2×N)`;
        } else if (a === 6) {
          generatedBfkfSteps = [
            t.bfkfStep1?.replaceAll('{a}', a.toString()).replaceAll('{b}', b.toString()) || `Problem: ${a} × ${b}.`,
            t.bfkf6sStep2?.replace('{b}', b.toString()) || `Break down 6:  6 = 5 + 1.`,
            t.bfkf6sStep3?.replaceAll('{b}', b.toString()) || `So, 6 × ${b} = (5 × ${b}) + (1 × ${b}).`,
            t.bfkf6sStep4?.replaceAll('{b}', b.toString()).replace('{val1}', (5 * b).toString()).replace('{val2}', (1 * b).toString()) || `We know 5 × ${b} is ${5 * b} (Fives Strategy), and 1 × ${b} is ${1 * b}.`,
            t.bfkf6sStep5?.replace('{sum1}', (5 * b).toString()).replace('{sum2}', (1 * b).toString()).replace('{result}', (a * b).toString()) || `Add them: ${5 * b} + ${1 * b} = ${a * b}.`,
          ];
          generatedBfkfPattern = t.bfkf6sPattern || `6×N = (5×N) + (1×N)`;
        } else if (a === 7) {
          generatedBfkfSteps = [
            t.bfkfStep1?.replaceAll('{a}', a.toString()).replaceAll('{b}', b.toString()) || `Problem: ${a} × ${b}.`,
            t.bfkf7sStep2?.replace('{b}', b.toString()) || `Break down 7:  7 = 5 + 2.`,
            t.bfkf7sStep3?.replaceAll('{b}', b.toString()) || `So, 7 × ${b} = (5 × ${b}) + (2 × ${b}).`,
            t.bfkf7sStep4?.replaceAll('{b}', b.toString()).replace('{val1}', (5 * b).toString()).replace('{val2}', (2 * b).toString()) || `We know 5 × ${b} is ${5 * b} (Fives Strategy), and 2 × ${b} is ${2 * b} (Doubles Strategy).`,
            t.bfkf7sStep5?.replace('{sum1}', (5 * b).toString()).replace('{sum2}', (2 * b).toString()).replace('{result}', (a * b).toString()) || `Add them: ${5 * b} + ${2 * b} = ${a * b}.`,
          ];
          generatedBfkfPattern = t.bfkf7sPattern || `7×N = (5×N) + (2×N)`;
        } else if (a === 8) {
          generatedBfkfSteps = [
            t.bfkfStep1?.replaceAll('{a}', a.toString()).replaceAll('{b}', b.toString()) || `Problem: ${a} × ${b}.`,
            t.bfkf8sStep2?.replace('{b}', b.toString()) || `Think of 8 as 10 - 2.`,
            t.bfkf8sStep3?.replaceAll('{b}', b.toString()) || `So, 8 × ${b} = (10 × ${b}) - (2 × ${b}).`,
            t.bfkf8sStep4?.replaceAll('{b}', b.toString()).replace('{val1}', (10 * b).toString()).replace('{val2}', (2 * b).toString()) || `We know 10 × ${b} is ${10 * b} (Tens Strategy), and 2 × ${b} is ${2 * b} (Doubles Strategy).`,
            t.bfkf8sStep5?.replace('{sum1}', (10 * b).toString()).replace('{sum2}', (2 * b).toString()).replace('{result}', (a * b).toString()) || `Subtract them: ${10 * b} - ${2 * b} = ${a * b}.`,
          ];
          generatedBfkfPattern = t.bfkf8sPattern || `8×N = (10×N) - (2×N)`;
        } else {
          // This case should ideally not be reached due to the outer if condition.
          return { strategy: 'error_bfkf_unexpected_a', concept: 'Error', steps: ['Unexpected number for BFKF'], pattern: '' };
        }
        return {
          strategy: 'building_known_facts', // Specific strategy name
          concept: generatedBfkfConceptText,
          steps: generatedBfkfSteps,
          pattern: generatedBfkfPattern,
          mnemonics: t.bfkfMnemonic || `Use what you know to find what you don't!`,
        };
      }
    });
  }

  // Strategy: Elevens (Advanced) (Complexity: 10)
  // Original code had 'pattern_recognition', we use 'elevens_advanced'.
  if (a === 11 && b >= 10 && b < 100) { // 'a' is 11 after potential swap, 'b' is the two-digit number
    // console.log('generateSmartExplanation: elevens_advanced');
    applicableStrategies.push({
      name: 'elevens_advanced',
      complexityOrder: 10,
      generate: () => {
        const firstDigit = Math.floor(b / 10);
        const secondDigit = b % 10;
        const middleSum = firstDigit + secondDigit;
        const result = 11 * b;
        let advSteps;
        if (middleSum < 10) {
          advSteps = [
            t.advElevensStep1?.replaceAll('{b}', b.toString()) || `For 11 × ${b}:`,
            t.advElevensStep2?.replace('{firstDigit}', firstDigit.toString()).replace('{secondDigit}', secondDigit.toString()) || `Separate the digits of ${b}: ${firstDigit} and ${secondDigit}.`,
            t.advElevensStep3?.replace('{firstDigit}', firstDigit.toString()).replace('{secondDigit}', secondDigit.toString()).replace('{middleSum}', middleSum.toString()) || `Add them: ${firstDigit} + ${secondDigit} = ${middleSum}.`,
            t.advElevensStep4?.replace('{firstDigit}', firstDigit.toString()).replace('{middleSum}', middleSum.toString()).replace('{secondDigit}', secondDigit.toString()).replace('{result}', result.toString()) || `Place the sum in the middle: ${firstDigit}${middleSum}${secondDigit}. So, 11 × ${b} = ${result}.`
          ];
        } else {
          const carry = Math.floor(middleSum / 10);
          const middleDigit = middleSum % 10;
          advSteps = [
            t.advElevensStep1?.replaceAll('{b}', b.toString()) || `For 11 × ${b}:`,
            t.advElevensStep2?.replace('{firstDigit}', firstDigit.toString()).replace('{secondDigit}', secondDigit.toString()) || `Separate the digits of ${b}: ${firstDigit} and ${secondDigit}.`,
            t.advElevensStep3?.replace('{firstDigit}', firstDigit.toString()).replace('{secondDigit}', secondDigit.toString()).replace('{middleSum}', middleSum.toString()) || `Add them: ${firstDigit} + ${secondDigit} = ${middleSum}.`,
            t.advElevensStep5?.replace('{middleSum}', middleSum.toString()).replace('{middleDigit}', middleDigit.toString()).replace('{carry}', carry.toString()) || `${middleSum} is two digits. Use ${middleDigit} for the middle, carry ${carry} to the first digit.`,
            t.advElevensStep6?.replace('{firstDigit}', firstDigit.toString()).replace('{carry}', carry.toString()).replace('{newFirstDigit}', (firstDigit + carry).toString()).replace('{middleDigit}', middleDigit.toString()).replace('{secondDigit}', secondDigit.toString()).replace('{result}', result.toString()) || `New first digit: ${firstDigit}+${carry}=${firstDigit + carry}. Result: ${(firstDigit + carry)}${middleDigit}${secondDigit}. So, 11 × ${b} = ${result}.`
          ];
        }
        return {
          strategy: 'elevens_advanced', // Specific strategy name
          concept: t.advElevensConcept || `Advanced 11s trick for two-digit numbers`,
          steps: advSteps,
          pattern: t.advElevensPattern || `11 × AB = A (A+B) B. If A+B > 9, carry over.`,
          mnemonics: t.advElevensMnemonic || `11s are tricky but cool!`
        };
      }
    });
  }

  // If specific strategies were found, sort by complexity and use 'attempts' to cycle
  if (applicableStrategies.length > 0) {
    const preferredLearningStyle = Object.keys(learningStyleSuccess).reduce((a, b) => learningStyleSuccess[a] > learningStyleSuccess[b] ? a : b, '');

    if (preferredLearningStyle) {
      const preferredStrategies = applicableStrategies.filter(s => strategyLearningStyles[s.name] === preferredLearningStyle);
      if (preferredStrategies.length > 0) {
        const strategyIndex = attempts % preferredStrategies.length;
        return preferredStrategies[strategyIndex].generate();
      }
    }

    // Sort strategies: prioritize by success count (descending), then by complexity (ascending)
    applicableStrategies.sort((s1, s2) => {
      const success1 = strategySuccess[s1.name] || 0;
      const success2 = strategySuccess[s2.name] || 0;

      if (success1 !== success2) {
        return success2 - success1; // Higher success count comes first
      }
      return s1.complexityOrder - s2.complexityOrder; // Then by complexity
    });
    // console.log('generateSmartExplanation: applicableStrategies (sorted by success & complexity, not struggling):', applicableStrategies.map(s => s.name));

    // Use 'attempts' to cycle through the sorted strategies.
    // This applies if not struggling and attempts <= 1 (usually 0 or 1 for hints).
    const strategyIndex = attempts % applicableStrategies.length;
    console.log(`generateSmartExplanation: specific strategy (index: ${strategyIndex}, not struggling)`);
    return applicableStrategies[strategyIndex].generate();
  }

  // Priority 3: Fallback to other general strategies if no specific ones and not caught by priority visual check.
  // Skip counting for medium numbers (a, b are already swapped, a <= b)
  if (a <= 10 && b <= 10) {
    console.log('generateSmartExplanation: skip_counting (fallback, not struggling, no specific strategy found)');
    return {
      strategy: 'skip_counting',
      concept: t.skipCountingConcept?.replaceAll('{a}', a.toString()).replaceAll('{b}', b.toString()) || `Count by ${a}s, ${b} times`,
      steps: generateSkipCountingSteps(a, b, t),
      pattern: t.skipCountingPattern?.replaceAll('{a}', a.toString()).replace('{a2}', (a*2).toString()).replace('{a3}', (a*3).toString()).replace('{result}', (a*b).toString()) || `${a}, ${a*2}, ${a*3}... up to ${a*b}`,
      mnemonics: t.skipCountingMnemonic?.replaceAll('{a}', a.toString()) || `Skip counting by ${a}s!`
    };
  }

  // Decomposition for larger numbers (a, b are already swapped, a <= b)
  console.log('generateSmartExplanation: decomposition (fallback, not struggling, no specific strategy found)');
  return {
    strategy: 'decomposition',
    concept: t.decompositionConcept || `Break down into easier parts`,
    steps: generateDecompositionSteps(a, b, t),
    pattern: t.decompositionPattern || `Break large numbers into tens and ones`
  };
};
