
import { Button } from "@/components/ui/button";

interface Question {
  id: number;
  question: string;
  options: string[];
}

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: string) => void;
}

export const QuestionCard = ({ question, questionNumber, totalQuestions, onAnswer }: QuestionCardProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-3xl mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div 
            className="bg-lime-400 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          ></div>
        </div>
        
        <div className="mb-8">
          <span className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
            {questionNumber} OF {totalQuestions}
          </span>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 leading-relaxed">
          {question.question}
        </h2>
        
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => onAnswer(option)}
              variant="outline"
              className="w-full py-4 px-6 text-lg border-2 border-orange-300 text-orange-700 bg-orange-50 hover:bg-orange-600 hover:text-white hover:border-orange-600 rounded-full transition-all duration-200 transform hover:scale-105"
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
