
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, Users, Calendar } from "lucide-react";

interface ResultsPageProps {
  userInfo: { gender: string; ageCategory: string };
  answers: string[];
}

export const ResultsPage = ({ userInfo, answers }: ResultsPageProps) => {
  // Simple scoring logic based on answers
  const calculateScore = () => {
    let score = 0;
    answers.forEach(answer => {
      if (answer.includes("trouble") || answer === "Always" || answer === "Often" || answer === "Yes") {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();
  const isLowRisk = score <= 2;

  const handleRetakeTest = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-3xl mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
        <div className="w-16 h-1 bg-lime-400 rounded-full mx-auto mb-8"></div>
        
        <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${isLowRisk ? 'bg-green-100' : 'bg-orange-100'}`}>
          {isLowRisk ? (
            <CheckCircle className="w-10 h-10 text-green-600" />
          ) : (
            <AlertTriangle className="w-10 h-10 text-orange-600" />
          )}
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Your Hearing Test Results
        </h1>
        
        <div className={`inline-block px-6 py-3 rounded-full text-lg font-semibold mb-8 ${isLowRisk ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
          {isLowRisk ? "Low Risk for Hearing Loss" : "Possible Hearing Difficulty Detected"}
        </div>
        
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Test Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Gender: {userInfo.gender}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Age: {userInfo.ageCategory}</span>
            </div>
          </div>
        </div>
        
        <div className="text-left bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
          <h4 className="font-semibold text-blue-800 mb-2">
            {isLowRisk ? "Great News!" : "Recommendation"}
          </h4>
          <p className="text-blue-700">
            {isLowRisk 
              ? "Your responses suggest that you have a low risk for hearing loss. Continue to protect your hearing by avoiding loud noises and using ear protection when necessary."
              : "Your responses suggest you may be experiencing some hearing difficulties. We recommend consulting with a hearing healthcare professional for a comprehensive hearing evaluation."
            }
          </p>
        </div>
        
        <p className="text-sm text-gray-600 mb-8 italic">
          *This online screening is not a substitute for a comprehensive hearing evaluation by a qualified hearing healthcare professional.
        </p>
        
        <Button 
          onClick={handleRetakeTest}
          className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          Take Test Again
        </Button>
      </div>
    </div>
  );
};
