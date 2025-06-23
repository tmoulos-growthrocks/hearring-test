import { useState } from "react";
import { Button } from "@/components/ui/button";

interface QuestionnairePageProps {
  userInfo: { gender: string; ageCategory: string };
  onComplete: (answers: string[]) => void;
  stepNumber: number;
}

export const QuestionnairePage = ({ userInfo, onComplete, stepNumber }: QuestionnairePageProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const questions = [
    "I have difficulty hearing over the telephone",
    "I have trouble hearing when there is background noise",
    "I have difficulty hearing when someone is not facing me",
    "I have trouble understanding speech, even when I can hear it",
    "I have difficulty hearing high-pitched sounds",
    "I find myself asking others to repeat themselves",
    "I experience ringing in my ears",
    "I feel like people are mumbling when they talk",
    "I have trouble following conversations in restaurants or meetings",
    "I struggle to hear the TV or radio at a volume that others find comfortable",
  ];

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const handleComplete = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(Object.values(answers));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          Step {stepNumber}
        </span>
      </div>
      
      <div className="max-w-3xl mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
        <div className="w-16 h-1 bg-lime-400 rounded-full mx-auto mb-8"></div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Question {currentQuestion + 1}/{questions.length}
        </h1>
        
        <p className="text-lg text-gray-600 mb-12 leading-relaxed">
          {questions[currentQuestion]}
        </p>
        
        <div className="space-y-6 mb-12">
          <Button 
            onClick={() => handleAnswer("Yes")}
            className={`w-full py-3 text-lg rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 ${answers[currentQuestion] === "Yes" ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-orange-200"}`}
          >
            Yes
          </Button>
          <Button 
            onClick={() => handleAnswer("No")}
            className={`w-full py-3 text-lg rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 ${answers[currentQuestion] === "No" ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-orange-200"}`}
          >
            No
          </Button>
          <Button 
            onClick={() => handleAnswer("Sometimes")}
            className={`w-full py-3 text-lg rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 ${answers[currentQuestion] === "Sometimes" ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-orange-200"}`}
          >
            Sometimes
          </Button>
        </div>
        
        <Button 
          onClick={handleComplete}
          className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-3 text-lg rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          {currentQuestion === questions.length - 1 ? "See Results" : "Next Question"}
        </Button>
      </div>
    </div>
  );
};
