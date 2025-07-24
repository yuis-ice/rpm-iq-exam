import React from 'react';
import { Brain, Star, Crown, Flame, Sparkles, Bot, Trophy, CheckCircle } from 'lucide-react';
import { Level } from '../types/game';
import { loadGameData, getLevelCompletionStatus } from '../utils/localStorage';

interface LevelSelectionProps {
  onSelectLevel: (level: Level) => void;
}

const LevelSelection: React.FC<LevelSelectionProps> = ({ onSelectLevel }) => {
  const storedData = loadGameData();
  const levelCompletionStatus = getLevelCompletionStatus();
  const levels = [
    {
      level: 1 as Level,
      title: "Beginner",
      description: "Simple patterns with basic transformations",
      icon: Brain,
      color: "from-green-400 to-green-600",
      difficulty: "Easy"
    },
    {
      level: 2 as Level,
      title: "Intermediate", 
      description: "Multiple pattern rules and transformations",
      icon: Star,
      color: "from-yellow-400 to-orange-500",
      difficulty: "Medium"
    },
    {
      level: 3 as Level,
      title: "Advanced",
      description: "Complex patterns with multiple variables",
      icon: Crown,
      color: "from-red-400 to-purple-600",
      difficulty: "Hard"
    },
    {
      level: 4 as Level,
      title: "Hell",
      description: "Multi-dimensional transformations with recursive patterns",
      icon: Flame,
      color: "from-red-600 to-black",
      difficulty: "Hell"
    },
    {
      level: 5 as Level,
      title: "Celestial",
      description: "Abstract mathematical relationships across dimensions",
      icon: Sparkles,
      color: "from-purple-600 to-indigo-900",
      difficulty: "Celestial"
    },
    {
      level: 6 as Level,
      title: "AI",
      description: "Hyper-complex multi-variable recursive transformations",
      icon: Bot,
      color: "from-gray-800 to-black",
      difficulty: "AI"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Statistics Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Your Statistics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{storedData.highScore}</div>
            <div className="text-sm text-gray-600">High Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{storedData.bestIQ}</div>
            <div className="text-sm text-gray-600">Best IQ</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {storedData.totalQuestionsAnswered > 0 
                ? Math.round((storedData.correctAnswers / storedData.totalQuestionsAnswered) * 100)
                : 0}%
            </div>
            <div className="text-sm text-gray-600">Overall Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Object.values(levelCompletionStatus).filter(Boolean).length}/6
            </div>
            <div className="text-sm text-gray-600">Levels Completed</div>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {levels.map((level) => {
          const IconComponent = level.icon;
          const isCompleted = levelCompletionStatus[level.level];
          return (
            <div
              key={level.level}
              onClick={() => onSelectLevel(level.level)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden relative"
            >
              {isCompleted && (
                <div className="absolute top-4 right-4 z-10">
                  <CheckCircle className="w-6 h-6 text-green-400 bg-white rounded-full" />
                </div>
              )}
              <div className={`bg-gradient-to-r ${level.color} p-6 text-white relative`}>
                <div className="flex items-center justify-between mb-4">
                  <IconComponent className="w-8 h-8" />
                  <span className="text-sm font-medium opacity-90">{level.difficulty}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{level.title}</h3>
                <p className="text-sm opacity-90">{level.description}</p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {Array.from({ length: 9 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded border-2 ${
                        i === 8 
                          ? 'border-dashed border-gray-300 bg-gray-50' 
                          : 'border-gray-200 bg-gray-100'
                      }`}
                    >
                      {i !== 8 && (
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 rounded-sm"></div>
                      )}
                    </div>
                  ))}
                </div>
                
                <button className="w-full bg-gray-100 group-hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg transition-colors font-medium">
                  Start Level {level.level}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-12 bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">How to Play</h3>
        <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-600 font-bold text-xs">1</span>
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-1">Study the Pattern</p>
              <p>Look at the 3×3 grid and identify the pattern or rule in the rows and columns.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-600 font-bold text-xs">2</span>
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-1">Find the Missing Piece</p>
              <p>Determine what should go in the bottom-right empty square to complete the pattern.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-600 font-bold text-xs">3</span>
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-1">Choose Your Answer</p>
              <p>Select the correct option from the multiple choices provided below the matrix.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelSelection;