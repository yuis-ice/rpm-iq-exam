import { StoredGameData, Level } from '../types/game';

const STORAGE_KEY = 'rpm-iq-exam-data';

const DEFAULT_DATA: StoredGameData = {
  highScore: 0,
  bestIQ: 0,
  levelProgress: {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false
  },
  totalQuestionsAnswered: 0,
  correctAnswers: 0,
  lastPlayedAt: new Date().toISOString()
};

/**
 * Load game data from localStorage
 */
export function loadGameData(): StoredGameData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return DEFAULT_DATA;
    }
    
    const data = JSON.parse(stored);
    
    // Ensure all required fields exist (for backwards compatibility)
    return {
      ...DEFAULT_DATA,
      ...data,
      levelProgress: {
        ...DEFAULT_DATA.levelProgress,
        ...data.levelProgress
      }
    };
  } catch (error) {
    console.error('Error loading game data from localStorage:', error);
    return DEFAULT_DATA;
  }
}

/**
 * Save game data to localStorage
 */
export function saveGameData(data: Partial<StoredGameData>): void {
  try {
    const currentData = loadGameData();
    const updatedData = {
      ...currentData,
      ...data,
      lastPlayedAt: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  } catch (error) {
    console.error('Error saving game data to localStorage:', error);
  }
}

/**
 * Update high score if current score is better
 */
export function updateHighScore(score: number): boolean {
  const currentData = loadGameData();
  if (score > currentData.highScore) {
    saveGameData({ highScore: score });
    return true; // New high score
  }
  return false;
}

/**
 * Update best IQ if current IQ is better
 */
export function updateBestIQ(iq: number): boolean {
  const currentData = loadGameData();
  if (iq > currentData.bestIQ) {
    saveGameData({ bestIQ: iq });
    return true; // New best IQ
  }
  return false;
}

/**
 * Mark a level as completed
 */
export function markLevelCompleted(level: Level): void {
  const currentData = loadGameData();
  saveGameData({
    levelProgress: {
      ...currentData.levelProgress,
      [level]: true
    }
  });
}

/**
 * Update question statistics
 */
export function updateQuestionStats(correct: boolean): void {
  const currentData = loadGameData();
  saveGameData({
    totalQuestionsAnswered: currentData.totalQuestionsAnswered + 1,
    correctAnswers: currentData.correctAnswers + (correct ? 1 : 0)
  });
}

/**
 * Get overall accuracy percentage
 */
export function getOverallAccuracy(): number {
  const data = loadGameData();
  if (data.totalQuestionsAnswered === 0) return 0;
  
  return Math.round((data.correctAnswers / data.totalQuestionsAnswered) * 100);
}

/**
 * Check if this is the first time playing
 */
export function isFirstTime(): boolean {
  const data = loadGameData();
  return data.totalQuestionsAnswered === 0;
}

/**
 * Get completion status for all levels
 */
export function getLevelCompletionStatus(): Record<Level, boolean> {
  const data = loadGameData();
  return data.levelProgress;
}

/**
 * Reset all game data (for testing or user request)
 */
export function resetGameData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error resetting game data:', error);
  }
}

/**
 * Export game data for backup
 */
export function exportGameData(): string {
  const data = loadGameData();
  return JSON.stringify(data, null, 2);
}

/**
 * Import game data from backup
 */
export function importGameData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);
    
    // Validate data structure
    if (typeof data.highScore === 'number' && 
        typeof data.bestIQ === 'number' && 
        typeof data.levelProgress === 'object') {
      
      saveGameData(data);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error importing game data:', error);
    return false;
  }
}