
import { useState } from "react";
import { QuestionCard } from "./QuestionCard";
import { ResultsPage } from "./ResultsPage";

interface QuestionnairePageProps {
  userInfo: { gender: string; ageCategory: string };
  onComplete?: () => void;
}

const questions = [
  {
    id: 1,
    question: "How would you describe your hearing?",
    options: [
      "I have a lot of trouble",
      "I have some trouble", 
      "I have a little trouble",
      "Good",
      "Excellent"
    ]
  },
  {
    id: 2,
    question: "In conversations in a quiet environment, do people seem to mumble?",
    options: [
      "Always",
      "Often",
      "Occasionally", 
      "Rarely",
      "Never"
    ]
  },
  {
    id: 3,
    question: "Do you find it hard to have a conversation on the phone?",
    options: [
      "Always",
      "Often",
      "Occasionally",
      "Rarely", 
      "Never"
    ]
  },
  {
    id: 4,
    question: "Do you find it hard to follow conversations in a noisy environment? ...such as in noisy restaurants or in a crowd?",
    options: [
      "Always",
      "Often",
      "Occasionally",
      "Rarely",
      "Never"
    ]
  },
  {
    id: 5,
    question: "Has anyone ever suggested that you may have hearing loss?",
    options: [
      "Yes",
      "No"
    ]
  },
  {
    id: 6,
    question: "Do you feel like one ear hears significantly better than the other one? If so, which one?",
    options: [
      "Left",
      "Right",
      "Both about the same"
    ]
  },
  {
    id: 7,
    question: "Who do you have the most trouble hearing?",
    options: [
      "Men",
      "Women",
      "Everyone",
      "I don't have difficulty"
    ]
  }
];

export const QuestionnairePage = ({ userInfo, onComplete }: QuestionnairePageProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
      if (onComplete) {
        onComplete();
      }
    }
  };

  if (isComplete && !onComplete) {
    return <ResultsPage userInfo={userInfo} answers={answers} />;
  }

  if (isComplete && onComplete) {
    return null; // Let parent handle the next step
  }

  return (
    <QuestionCard
      question={questions[currentQuestion]}
      questionNumber={currentQuestion + 1}
      totalQuestions={questions.length}
      onAnswer={handleAnswer}
    />
  );
};
