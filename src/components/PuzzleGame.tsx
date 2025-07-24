import React, { useState, useEffect } from 'react';
import { Check, X, ArrowRight, Clock, Brain } from 'lucide-react';
import { Level, Puzzle, QuestionResult } from '../types/game';
import { generatePuzzle } from '../utils/puzzleGenerator';
import { calculateQuestionIQ, getIQClassification } from '../utils/iqCalculator';
import { updateQuestionStats } from '../utils/localStorage';
import PatternDisplay from './PatternDisplay';

interface PuzzleGameProps {
  level: Level;
  puzzleIndex: number;
  onAnswer: (result: QuestionResult) => void;
}

const PuzzleGame: React.FC<PuzzleGameProps> = ({ level, puzzleIndex, onAnswer }) => {
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [questionIQ, setQuestionIQ] = useState<number>(0);

  useEffect(() => {
    const newPuzzle = generatePuzzle(level, puzzleIndex);
    setPuzzle(newPuzzle);
    setSelectedAnswer(null);
    setShowResult(false);
    setStartTime(Date.now());
    setEndTime(0);
    setQuestionIQ(0);
  }, [level, puzzleIndex]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    const endTimeStamp = Date.now();
    setEndTime(endTimeStamp);
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === puzzle!.correctAnswer;
    setIsCorrect(correct);
    
    // Calculate IQ for this question
    const iq = calculateQuestionIQ(level, correct);
    setQuestionIQ(iq);
    
    // Update localStorage stats
    updateQuestionStats(correct);
    
    setShowResult(true);
    
    const timeSpent = Math.round((endTimeStamp - startTime) / 1000);
    
    setTimeout(() => {
      const result: QuestionResult = {
        level,
        questionIndex: puzzleIndex,
        correct,
        timeSpent,
        iq
      };
      onAnswer(result);
    }, 2000);
  };

  if (!puzzle) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          What comes next in the pattern?
        </h2>
        
        {/* Matrix Display */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
          {puzzle.matrix.flat().map((pattern, index) => (
            <div
              key={index}
              className={`aspect-square border-2 rounded-lg flex items-center justify-center ${
                index === 8 
                  ? 'border-dashed border-blue-300 bg-blue-50' 
                  : 'border-gray-300 bg-gray-50'
              }`}
            >
              {pattern && index !== 8 && (
                <PatternDisplay pattern={pattern} size={80} />
              )}
              {index === 8 && (
                <div className="text-3xl text-blue-400 font-bold">?</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Answer Options */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">
          Choose the correct answer:
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-md mx-auto">
          {puzzle.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`aspect-square border-2 rounded-lg flex items-center justify-center transition-all duration-200 ${
                selectedAnswer === index
                  ? isCorrect
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : showResult && index === puzzle.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 bg-gray-50 hover:border-blue-300 hover:bg-blue-50'
              } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <div className="relative">
                <PatternDisplay pattern={option} size={80} />
                
                {showResult && selectedAnswer === index && (
                  <div className="absolute -top-2 -right-2">
                    {isCorrect ? (
                      <Check className="w-6 h-6 text-green-600 bg-white rounded-full p-1" />
                    ) : (
                      <X className="w-6 h-6 text-red-600 bg-white rounded-full p-1" />
                    )}
                  </div>
                )}
                
                {showResult && index === puzzle.correctAnswer && selectedAnswer !== index && (
                  <div className="absolute -top-2 -right-2">
                    <Check className="w-6 h-6 text-green-600 bg-white rounded-full p-1" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
        
        {showResult && (
          <div className="mt-6 text-center space-y-3">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
              isCorrect 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {isCorrect ? (
                <>
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Correct!</span>
                </>
              ) : (
                <>
                  <X className="w-5 h-5" />
                  <span className="font-medium">Incorrect</span>
                </>
              )}
            </div>
            
            {/* Question IQ Display */}
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                <Brain className="w-4 h-4" />
                <span className="font-medium">IQ: {questionIQ}</span>
                <span className="text-xs">({getIQClassification(questionIQ)})</span>
              </div>
              
              {/* Time Display */}
              <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                <Clock className="w-4 h-4" />
                <span className="font-medium">
                  {Math.round((endTime - startTime) / 1000)}s
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PuzzleGame;