
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, AlertCircle, XCircle, Users, Calendar, Mail } from "lucide-react";

interface ComprehensiveResultsProps {
  userInfo: { gender: string; ageCategory: string };
  answers: string[];
  leftEarScore: number;
  rightEarScore: number;
  userEmail: string;
  onRetakeTest: () => void;
}

const getScoreInterpretation = (score: number) => {
  if (score >= 18) return { level: "Normal hearing", color: "green", icon: CheckCircle };
  if (score >= 15) return { level: "Mild hearing loss", color: "yellow", icon: AlertTriangle };
  if (score >= 10) return { level: "Moderate hearing loss", color: "orange", icon: AlertCircle };
  if (score >= 5) return { level: "Severe hearing loss", color: "red", icon: AlertCircle };
  return { level: "Profound hearing loss", color: "red", icon: XCircle };
};

const generateRecommendations = (leftScore: number, rightScore: number, ageCategory: string) => {
  const recommendations = [];
  const averageScore = (leftScore + rightScore) / 2;
  
  if (averageScore >= 18) {
    recommendations.push("Continue regular hearing protection practices");
    recommendations.push("Have annual hearing check-ups");
    recommendations.push("Avoid prolonged exposure to loud noises");
  } else if (averageScore >= 15) {
    recommendations.push("Schedule a professional hearing evaluation");
    recommendations.push("Consider hearing protection in noisy environments");
    recommendations.push("Monitor your hearing changes over time");
  } else {
    recommendations.push("Seek immediate professional hearing evaluation");
    recommendations.push("Discuss hearing aid options with an audiologist");
    recommendations.push("Learn about assistive listening devices");
  }
  
  if (ageCategory === "65+") {
    recommendations.push("Consider age-related hearing changes during evaluation");
  }
  
  return recommendations;
};

export const ComprehensiveResults = ({ 
  userInfo, 
  answers, 
  leftEarScore, 
  rightEarScore, 
  userEmail,
  onRetakeTest 
}: ComprehensiveResultsProps) => {
  const leftResult = getScoreInterpretation(leftEarScore);
  const rightResult = getScoreInterpretation(rightEarScore);
  const recommendations = generateRecommendations(leftEarScore, rightEarScore, userInfo.ageCategory);
  const averageScore = (leftEarScore + rightEarScore) / 2;
  const shouldSeekHelp = averageScore < 15;

  const LeftIcon = leftResult.icon;
  const RightIcon = rightResult.icon;

  const getOverallAssessment = () => {
    if (averageScore >= 18) {
      return "Your hearing test results indicate normal hearing function. This is excellent news! Your ability to detect sounds across different frequencies appears to be within the normal range for your age group.";
    } else if (averageScore >= 15) {
      return "Your hearing test results suggest mild hearing changes. While not severe, these changes may affect your daily communication in certain situations, particularly in noisy environments.";
    } else if (averageScore >= 10) {
      return "Your hearing test results indicate moderate hearing loss. This level of hearing change typically affects daily communication and may benefit from professional intervention and possible hearing assistance.";
    } else {
      return "Your hearing test results suggest significant hearing loss. This level of hearing change substantially affects daily communication and requires immediate professional attention for proper evaluation and treatment options.";
    }
  };

  const getAgeGenderConsiderations = () => {
    let considerations = `Based on your demographic profile (${userInfo.gender}, ${userInfo.ageCategory}), `;
    
    if (userInfo.ageCategory === "65+") {
      considerations += "age-related hearing changes are common and expected. Regular monitoring and professional care can help maintain quality of life.";
    } else if (userInfo.ageCategory === "45-64") {
      considerations += "early detection of hearing changes is important for maintaining communication abilities as you age.";
    } else {
      considerations += "hearing preservation is crucial for long-term auditory health. Early intervention can prevent further deterioration.";
    }
    
    return considerations;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
        <div className="w-16 h-1 bg-lime-400 rounded-full mx-auto mb-8"></div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Your Comprehensive Hearing Results
        </h1>
        
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-8">
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-green-600 mr-2" />
            <p className="text-green-700 font-medium">
              Results sent to: {userEmail}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left Ear Results */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Left Ear</h3>
            <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
              leftResult.color === 'green' ? 'bg-green-100' :
              leftResult.color === 'yellow' ? 'bg-yellow-100' :
              leftResult.color === 'orange' ? 'bg-orange-100' :
              'bg-red-100'
            }`}>
              <LeftIcon className={`w-10 h-10 ${
                leftResult.color === 'green' ? 'text-green-600' :
                leftResult.color === 'yellow' ? 'text-yellow-600' :
                leftResult.color === 'orange' ? 'text-orange-600' :
                'text-red-600'
              }`} />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">{leftEarScore}/20</div>
            <div className="text-sm text-gray-600">{leftResult.level}</div>
          </div>
          
          {/* Right Ear Results */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Right Ear</h3>
            <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
              rightResult.color === 'green' ? 'bg-green-100' :
              rightResult.color === 'yellow' ? 'bg-yellow-100' :
              rightResult.color === 'orange' ? 'bg-orange-100' :
              'bg-red-100'
            }`}>
              <RightIcon className={`w-10 h-10 ${
                rightResult.color === 'green' ? 'text-green-600' :
                rightResult.color === 'yellow' ? 'text-yellow-600' :
                rightResult.color === 'orange' ? 'text-orange-600' :
                'text-red-600'
              }`} />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">{rightEarScore}/20</div>
            <div className="text-sm text-gray-600">{rightResult.level}</div>
          </div>
        </div>

        {/* Analysis */}
        <div className="text-left space-y-6 mb-8">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
            <h4 className="font-semibold text-blue-800 mb-2">Overall Assessment</h4>
            <p className="text-blue-700">{getOverallAssessment()}</p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-400 p-6">
            <h4 className="font-semibold text-green-800 mb-2">Age & Gender Considerations</h4>
            <p className="text-green-700">{getAgeGenderConsiderations()}</p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h4 className="font-semibold text-yellow-800 mb-2">Recommendations</h4>
            <ul className="text-yellow-700 list-disc list-inside space-y-1">
              {recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>

          {shouldSeekHelp && (
            <div className="bg-red-50 border-l-4 border-red-400 p-6">
              <h4 className="font-semibold text-red-800 mb-2">Professional Consultation Recommended</h4>
              <p className="text-red-700">
                Based on your test results, we strongly recommend scheduling an appointment with a hearing healthcare professional 
                for a comprehensive evaluation and to discuss potential treatment options.
              </p>
            </div>
          )}
        </div>
        
        <div className="text-left bg-gray-50 border-l-4 border-gray-400 p-6 mb-8">
          <h4 className="font-semibold text-gray-800 mb-2">Important Notice</h4>
          <p className="text-gray-700">
            This assessment is for informational purposes only and is not a substitute for professional medical advice. 
            Always consult with a qualified hearing healthcare professional for proper diagnosis and treatment.
          </p>
        </div>
        
        <Button 
          onClick={onRetakeTest}
          className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-4 text-xl rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          Take Test Again
        </Button>
      </div>
    </div>
  );
};
