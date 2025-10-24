
import React, { useState } from 'react';
import type { QuizQuestion } from '../types';

interface QuizViewProps {
  quiz: QuizQuestion[];
  subjectColor: string;
  onRetry: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ quiz, subjectColor, onRetry }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (option: string) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: option
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    return quiz.reduce((score, question, index) => {
      return selectedAnswers[index] === question.correctAnswer ? score + 1 : score;
    }, 0);
  };
  
  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
  };


  if (showResults) {
    const score = calculateScore();
    return (
      <div className="bg-slate-800/80 p-8 rounded-xl max-w-2xl mx-auto text-center animate-fade-in">
        <h3 className="text-3xl font-bold mb-4">Kết quả bài kiểm tra</h3>
        <p className={`text-5xl font-bold mb-2 ${subjectColor}`}>{score} / {quiz.length}</p>
        <p className="text-slate-400 mb-6">Bạn đã trả lời đúng {score} trên {quiz.length} câu hỏi.</p>
        
        <div className="space-y-4 text-left my-6">
          {quiz.map((q, index) => (
            <div key={index} className={`p-4 rounded-lg ${selectedAnswers[index] === q.correctAnswer ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
              <p className="font-semibold text-slate-200">{index + 1}. {q.question}</p>
              <p className="text-sm text-slate-400">Đáp án của bạn: {selectedAnswers[index] || "Chưa trả lời"}</p>
              <p className="text-sm text-green-400">Đáp án đúng: {q.correctAnswer}</p>
               <p className="text-sm mt-2 pt-2 border-t border-slate-700 text-slate-400"><em>{q.explanation}</em></p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-8">
            <button onClick={handleReset} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                Làm lại
            </button>
             <button onClick={onRetry} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                Tạo bài mới
            </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz[currentQuestionIndex];
  const selectedOption = selectedAnswers[currentQuestionIndex];

  return (
    <div className="bg-slate-800/80 p-8 rounded-xl max-w-2xl mx-auto animate-fade-in">
        <p className="text-sm text-slate-400 mb-2">Câu {currentQuestionIndex + 1} trên {quiz.length}</p>
      <h3 className="text-2xl font-semibold mb-6">{currentQuestion.question}</h3>
      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedOption === option
                ? `border-cyan-500 bg-cyan-500/20 shadow-lg shadow-cyan-500/10`
                : 'border-slate-700 bg-slate-900/50 hover:border-slate-500'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Câu trước
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedOption}
          className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          {currentQuestionIndex < quiz.length - 1 ? 'Câu tiếp' : 'Hoàn thành'}
        </button>
      </div>
    </div>
  );
};
