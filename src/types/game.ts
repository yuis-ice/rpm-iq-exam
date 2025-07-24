export type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface GameState {
  currentLevel: Level | null;
  currentPuzzle: number;
  score: number;
  totalPuzzles: number;
  showResults: boolean;
  iq: number;
  timeSpent: number[];
}

export interface QuestionResult {
  level: Level;
  questionIndex: number;
  correct: boolean;
  timeSpent: number;
  iq: number;
}

export interface StoredGameData {
  highScore: number;
  bestIQ: number;
  levelProgress: Record<Level, boolean>;
  totalQuestionsAnswered: number;
  correctAnswers: number;
  lastPlayedAt: string;
}

export interface Pattern {
  shapes: Shape[];
}

export interface Shape {
  type: 'circle' | 'square' | 'triangle' | 'diamond' | 'cross' | 'star';
  size: 'small' | 'medium' | 'large';
  color: 'black' | 'gray' | 'white';
  rotation?: number;
  position?: { x: number; y: number };
}

export interface Puzzle {
  matrix: (Pattern | null)[][];
  options: Pattern[];
  correctAnswer: number;
}