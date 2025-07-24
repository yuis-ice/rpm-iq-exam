import React, { useState, useEffect } from 'react';
import { Brain, RotateCcw, Trophy, ArrowRight, Github } from 'lucide-react';
import LevelSelection from './components/LevelSelection';
import PuzzleGame from './components/PuzzleGame';
import { GameState, Level, QuestionResult } from './types/game';
import { calculateOverallIQ, getIQClassification, getIQPercentile } from './utils/iqCalculator';
import { loadGameData, saveGameData, updateHighScore, updateBestIQ, markLevelCompleted } from './utils/localStorage';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: null,
    currentPuzzle: 0,
    score: 0,
    totalPuzzles: 5,
    showResults: false,
    iq: 0,
    timeSpent: []
  });
  
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);
  const [storedData, setStoredData] = useState(loadGameData());
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [isNewBestIQ, setIsNewBestIQ] = useState(false);

  const startLevel = (level: Level) => {
    setGameState({
      currentLevel: level,
      currentPuzzle: 0,
      score: 0,
      totalPuzzles: 5,
      showResults: false,
      iq: 0,
      timeSpent: []
    });
    setQuestionResults([]);
    setIsNewHighScore(false);
    setIsNewBestIQ(false);
  };

  const nextPuzzle = (result: QuestionResult) => {
    const newScore = result.correct ? gameState.score + 1 : gameState.score;
    const nextPuzzleIndex = gameState.currentPuzzle + 1;
    const newQuestionResults = [...questionResults, result];
    const newTimeSpent = [...gameState.timeSpent, result.timeSpent];
    
    setQuestionResults(newQuestionResults);

    if (nextPuzzleIndex >= gameState.totalPuzzles) {
      // Calculate overall IQ
      const levelDistribution = { [gameState.currentLevel!]: gameState.totalPuzzles };
      const overallIQ = calculateOverallIQ(newScore, gameState.totalPuzzles, levelDistribution);
      
      // Check for new records
      const newHigh = updateHighScore(newScore);
      const newBestIQ = updateBestIQ(overallIQ);
      
      // Mark level as completed if score is good enough
      if (newScore >= Math.ceil(gameState.totalPuzzles * 0.6)) {
        markLevelCompleted(gameState.currentLevel!);
      }
      
      setIsNewHighScore(newHigh);
      setIsNewBestIQ(newBestIQ);
      setStoredData(loadGameData());
      
      setGameState(prev => ({
        ...prev,
        score: newScore,
        iq: overallIQ,
        timeSpent: newTimeSpent,
        showResults: true
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        score: newScore,
        timeSpent: newTimeSpent,
        currentPuzzle: nextPuzzleIndex
      }));
    }
  };

  const resetGame = () => {
    setGameState({
      currentLevel: null,
      currentPuzzle: 0,
      score: 0,
      totalPuzzles: 5,
      showResults: false,
      iq: 0,
      timeSpent: []
    });
    setQuestionResults([]);
    setIsNewHighScore(false);
    setIsNewBestIQ(false);
  };

  const getScoreMessage = () => {
    const percentage = (gameState.score / gameState.totalPuzzles) * 100;
    
    if (gameState.currentLevel! >= 4) {
      // Messages for extreme difficulty levels
      if (percentage >= 80) return "Extraordinary! You possess exceptional analytical intelligence.";
      if (percentage >= 60) return "Impressive! Your pattern recognition abilities are remarkable.";
      if (percentage >= 40) return "Challenging! These puzzles push the limits of human cognition.";
      return "These puzzles are designed for the most gifted minds. Keep pushing your limits!";
    } else {
      // Messages for standard levels
      if (percentage >= 80) return "Excellent! Outstanding pattern recognition.";
      if (percentage >= 60) return "Good work! You're developing strong analytical skills.";
      if (percentage >= 40) return "Not bad! Keep practicing to improve your pattern recognition.";
      return "Keep trying! Pattern recognition improves with practice.";
    }
  };

  if (gameState.showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Level Complete!</h2>
            <p className="text-gray-600">Level {gameState.currentLevel}</p>
          </div>
          
          <div className="mb-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {gameState.score}/{gameState.totalPuzzles}
            </div>
            <p className="text-gray-700 mb-4">{getScoreMessage()}</p>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(gameState.score / gameState.totalPuzzles) * 100}%` }}
              ></div>
            </div>
            
            {/* IQ Display */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Brain className="w-6 h-6 text-blue-600" />
                <span className="text-2xl font-bold text-blue-800">IQ: {gameState.iq}</span>
                {isNewBestIQ && (
                  <span className="bg-yellow-400 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                    NEW BEST!
                  </span>
                )}
              </div>
              <div className="text-sm text-blue-700 text-center">
                {getIQClassification(gameState.iq)} • {getIQPercentile(gameState.iq)}th percentile
              </div>
            </div>
            
            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="font-semibold text-gray-800">High Score</div>
                <div className="text-2xl font-bold text-gray-700">
                  {storedData.highScore}
                  {isNewHighScore && <span className="text-xs text-yellow-600 ml-1">NEW!</span>}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="font-semibold text-gray-800">Best IQ</div>
                <div className="text-2xl font-bold text-gray-700">{storedData.bestIQ}</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={resetGame}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Choose Another Level
            </button>
            <button
              onClick={() => startLevel(gameState.currentLevel!)}
              className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Retry Level
            </button>
            <a
              href="https://github.com/yuis-ice/rpm-iq-exam"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!gameState.currentLevel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Brain className="w-12 h-12 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-800">Raven's Progressive Matrices</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
              Test your pattern recognition and logical reasoning skills with these classic intelligence puzzles.
            </p>
            <a
              href="https://github.com/yuis-ice/rpm-iq-exam"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors text-sm"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
          
          <LevelSelection onSelectLevel={startLevel} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={resetGame}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              Level {gameState.currentLevel}
            </h1>
          </div>
          
          <div className="flex items-center gap-4 text-gray-600">
            <span>Progress: {gameState.currentPuzzle + 1}/{gameState.totalPuzzles}</span>
            <span>Score: {gameState.score}</span>
            <span>Accuracy: {gameState.score > 0 ? Math.round((gameState.score / (gameState.currentPuzzle || 1)) * 100) : 0}%</span>
            <a
              href="https://github.com/yuis-ice/rpm-iq-exam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 transition-colors"
              title="View on GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        <PuzzleGame
          level={gameState.currentLevel}
          puzzleIndex={gameState.currentPuzzle}
          onAnswer={nextPuzzle}
        />
      </div>
    </div>
  );
}

export default App;