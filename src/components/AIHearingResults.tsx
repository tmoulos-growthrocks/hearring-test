
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, AlertCircle, XCircle, Loader2 } from "lucide-react";
import { generateHearingResults } from "@/utils/openaiService";

interface AIHearingResultsProps {
  userInfo: { gender: string; ageCategory: string };
  answers: string[];
  leftEarScore: number;
  rightEarScore: number;
  onRetakeTest: () => void;
}

interface AIResults {
  overallAssessment: string;
  leftEarInterpretation: string;
  rightEarInterpretation: string;
  ageGenderConsiderations: string;
  recommendations: string[];
  seekProfessionalHelp: boolean;
  professionalHelpReason: string;
}

const getScoreIcon = (score: number) => {
  if (score >= 18) return { icon: CheckCircle, color: "green" };
  if (score >= 15) return { icon: AlertTriangle, color: "yellow" };
  if (score >= 10) return { icon: AlertCircle, color: "orange" };
  if (score >= 5) return { icon: AlertCircle, color: "red" };
  return { icon: XCircle, color: "red" };
};

export const AIHearingResults = ({ userInfo, answers, leftEarScore, rightEarScore, onRetakeTest }: AIHearingResultsProps) => {
  const [aiResults, setAiResults] = useState<AIResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const leftResult = getScoreIcon(leftEarScore);
  const rightResult = getScoreIcon(rightEarScore);
  const LeftIcon = leftResult.icon;
  const RightIcon = rightResult.icon;

  useEffect(() => {
    const generateResults = async () => {
      try {
        const apiKey = localStorage.getItem('openai_api_key');
        if (!apiKey) {
          setError('API key not found');
          setLoading(false);
          return;
        }

        const results = await generateHearingResults({
          gender: userInfo.gender,
          ageCategory: userInfo.ageCategory,
          answers,
          leftEarScore,
          rightEarScore
        }, apiKey);

        setAiResults(results);
      } catch (err) {
        console.error('Error generating AI results:', err);
        setError('Failed to generate AI results. Please check your API key.');
      } finally {
        setLoading(false);
      }
    };

    generateResults();
  }, [userInfo, answers, leftEarScore, rightEarScore]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
          <div className="w-16 h-1 bg-lime-400 rounded-full mx-auto mb-8"></div>
          <Loader2 className="w-16 h-16 mx-auto mb-4 animate-spin text-orange-600" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Generating Your Results</h2>
          <p className="text-gray-600">AI is analyzing your hearing test data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
          <div className="w-16 h-1 bg-lime-400 rounded-full mx-auto mb-8"></div>
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-600" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <Button 
            onClick={onRetakeTest}
            className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-4 text-xl rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
        <div className="w-16 h-1 bg-lime-400 rounded-full mx-auto mb-8"></div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Your AI-Generated Hearing Results
        </h1>
        
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
            <div className="text-sm text-gray-600">{aiResults?.leftEarInterpretation}</div>
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
            <div className="text-sm text-gray-600">{aiResults?.rightEarInterpretation}</div>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="text-left space-y-6 mb-8">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
            <h4 className="font-semibold text-blue-800 mb-2">Overall Assessment</h4>
            <p className="text-blue-700">{aiResults?.overallAssessment}</p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-400 p-6">
            <h4 className="font-semibold text-green-800 mb-2">Age & Gender Considerations</h4>
            <p className="text-green-700">{aiResults?.ageGenderConsiderations}</p>
          </div>

          {aiResults?.recommendations && aiResults.recommendations.length > 0 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
              <h4 className="font-semibold text-yellow-800 mb-2">Recommendations</h4>
              <ul className="text-yellow-700 list-disc list-inside space-y-1">
                {aiResults.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          )}

          {aiResults?.seekProfessionalHelp && (
            <div className="bg-red-50 border-l-4 border-red-400 p-6">
              <h4 className="font-semibold text-red-800 mb-2">Professional Consultation Recommended</h4>
              <p className="text-red-700">{aiResults.professionalHelpReason}</p>
            </div>
          )}
        </div>
        
        <div className="text-left bg-gray-50 border-l-4 border-gray-400 p-6 mb-8">
          <h4 className="font-semibold text-gray-800 mb-2">Important Notice</h4>
          <p className="text-gray-700">
            This AI-generated assessment is for informational purposes only and is not a substitute for professional medical advice. 
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
