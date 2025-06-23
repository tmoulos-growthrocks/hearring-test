
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, AlertCircle, XCircle } from "lucide-react";

interface HearingTestResultsProps {
  leftEarScore: number;
  rightEarScore: number;
  onRetakeTest: () => void;
}

const getInterpretation = (score: number) => {
  if (score >= 18) return { level: "Normal", color: "green", icon: CheckCircle };
  if (score >= 15) return { level: "Mild hearing loss", color: "yellow", icon: AlertTriangle };
  if (score >= 10) return { level: "Moderate hearing loss", color: "orange", icon: AlertCircle };
  if (score >= 5) return { level: "Severe hearing loss", color: "red", icon: AlertCircle };
  return { level: "Profound loss / no hearing", color: "red", icon: XCircle };
};

export const HearingTestResults = ({ leftEarScore, rightEarScore, onRetakeTest }: HearingTestResultsProps) => {
  const leftResult = getInterpretation(leftEarScore);
  const rightResult = getInterpretation(rightEarScore);
  
  const LeftIcon = leftResult.icon;
  const RightIcon = rightResult.icon;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
        <div className="w-16 h-1 bg-lime-400 rounded-full mx-auto mb-8"></div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Your Hearing Test Results
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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
            <div className={`inline-block px-4 py-2 rounded-full text-lg font-semibold ${
              leftResult.color === 'green' ? 'bg-green-100 text-green-800' :
              leftResult.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
              leftResult.color === 'orange' ? 'bg-orange-100 text-orange-800' :
              'bg-red-100 text-red-800'
            }`}>
              {leftResult.level}
            </div>
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
            <div className={`inline-block px-4 py-2 rounded-full text-lg font-semibold ${
              rightResult.color === 'green' ? 'bg-green-100 text-green-800' :
              rightResult.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
              rightResult.color === 'orange' ? 'bg-orange-100 text-orange-800' :
              'bg-red-100 text-red-800'
            }`}>
              {rightResult.level}
            </div>
          </div>
        </div>
        
        <div className="text-left bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
          <h4 className="font-semibold text-blue-800 mb-2">Important Notice</h4>
          <p className="text-blue-700">
            This online hearing test is a screening tool and not a substitute for a comprehensive hearing evaluation by a qualified hearing healthcare professional. 
            If you have concerns about your hearing, please consult with an audiologist or hearing specialist.
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
