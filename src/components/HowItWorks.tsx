
import { Button } from "@/components/ui/button";
import { ClipboardList, Volume2, BarChart3 } from "lucide-react";

interface HowItWorksProps {
  onContinue: () => void;
}

export const HowItWorks = ({ onContinue }: HowItWorksProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          Step 2
        </span>
      </div>
      
      <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
        <div className="w-16 h-1 bg-lime-400 rounded-full mx-auto mb-8"></div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-12">How it Works</h1>
        
        <div className="space-y-8 mb-12">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <ClipboardList className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Answer a few questions.</h3>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Volume2 className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Check your hearing with your <strong>headphones</strong>.*</h3>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">See your hearing results!</h3>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={onContinue}
          className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-3 text-lg rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          Continue
        </Button>
        
        <p className="text-sm text-gray-600 mt-8 italic">
          *SHOEBOX Online is not a diagnostic hearing test or medical assessment. It is designed to give you general information about your hearing.
        </p>
      </div>
    </div>
  );
};
