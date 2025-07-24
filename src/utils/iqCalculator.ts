import { Level } from '../types/game';

// IQ calculation based on RPM standard scoring
// Base IQ is 100, with adjustments based on level difficulty and performance

const LEVEL_BASE_IQ: Record<Level, number> = {
  1: 85,   // Basic patterns
  2: 95,   // Simple progressions
  3: 105,  // Moderate complexity
  4: 115,  // Advanced patterns
  5: 125,  // Complex reasoning
  6: 135   // Expert level
};

const LEVEL_IQ_RANGE: Record<Level, { min: number; max: number }> = {
  1: { min: 70, max: 100 },
  2: { min: 80, max: 110 },
  3: { min: 90, max: 120 },
  4: { min: 100, max: 130 },
  5: { min: 110, max: 140 },
  6: { min: 120, max: 150 }
};

/**
 * Calculate IQ for a single question based on level and correctness
 */
export function calculateQuestionIQ(level: Level, correct: boolean): number {
  const baseIQ = LEVEL_BASE_IQ[level];
  const range = LEVEL_IQ_RANGE[level];
  
  if (correct) {
    // Correct answer: base IQ for that level
    return baseIQ;
  } else {
    // Incorrect answer: lower end of the range
    return Math.max(range.min, baseIQ - 20);
  }
}

/**
 * Calculate overall IQ based on performance across multiple questions
 */
export function calculateOverallIQ(
  correctAnswers: number,
  totalQuestions: number,
  levelDistribution: Record<Level, number>
): number {
  if (totalQuestions === 0) return 100;
  
  const accuracy = correctAnswers / totalQuestions;
  
  // Calculate weighted average based on level distribution
  let weightedSum = 0;
  let totalWeight = 0;
  
  Object.entries(levelDistribution).forEach(([levelStr, count]) => {
    const level = parseInt(levelStr) as Level;
    const baseIQ = LEVEL_BASE_IQ[level];
    weightedSum += baseIQ * count;
    totalWeight += count;
  });
  
  const averageBaseIQ = totalWeight > 0 ? weightedSum / totalWeight : 100;
  
  // Adjust based on accuracy
  let adjustedIQ = averageBaseIQ;
  
  if (accuracy >= 0.9) {
    adjustedIQ += 15; // Exceptional performance
  } else if (accuracy >= 0.8) {
    adjustedIQ += 10; // Very good performance
  } else if (accuracy >= 0.7) {
    adjustedIQ += 5;  // Good performance
  } else if (accuracy >= 0.6) {
    adjustedIQ += 0;  // Average performance
  } else if (accuracy >= 0.5) {
    adjustedIQ -= 5;  // Below average
  } else if (accuracy >= 0.4) {
    adjustedIQ -= 10; // Poor performance
  } else {
    adjustedIQ -= 15; // Very poor performance
  }
  
  // Ensure IQ stays within reasonable bounds
  return Math.max(60, Math.min(160, Math.round(adjustedIQ)));
}

/**
 * Get IQ classification string
 */
export function getIQClassification(iq: number): string {
  if (iq >= 145) return 'Genius';
  if (iq >= 130) return 'Very Superior';
  if (iq >= 120) return 'Superior';
  if (iq >= 110) return 'High Average';
  if (iq >= 90) return 'Average';
  if (iq >= 80) return 'Low Average';
  if (iq >= 70) return 'Borderline';
  return 'Below Average';
}

/**
 * Calculate IQ percentile
 */
export function getIQPercentile(iq: number): number {
  // Using normal distribution approximation for IQ scores
  // Mean = 100, Standard Deviation = 15
  const z = (iq - 100) / 15;
  
  // Approximation of cumulative normal distribution
  const percentile = 0.5 * (1 + erf(z / Math.sqrt(2)));
  
  return Math.round(percentile * 100);
}

// Error function approximation
function erf(x: number): number {
  // Abramowitz and Stegun approximation
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;

  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
}