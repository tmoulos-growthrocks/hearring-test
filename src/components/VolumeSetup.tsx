
import { Button } from "@/components/ui/button";
import { Volume2, Settings } from "lucide-react";

interface VolumeSetupProps {
  onNext: () => void;
  stepNumber: number;
}

export const VolumeSetup = ({ onNext, stepNumber }: VolumeSetupProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          Step {stepNumber}
        </span>
      </div>
      
      <div className="max-w-3xl mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div 
            className="bg-lime-400 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: '50%' }}
          ></div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Connect your headphones and set your device volume to 100%
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 underline cursor-pointer">
          How do I set my device volume?
        </p>
        
        <div className="w-32 h-32 mx-auto mb-12 bg-orange-50 rounded-full flex items-center justify-center">
          <div className="relative">
            <Volume2 className="w-16 h-16 text-orange-600" />
            <Settings className="w-8 h-8 text-orange-600 absolute -top-2 -right-2" />
          </div>
        </div>
        
        <Button 
          onClick={onNext}
          className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-4 text-xl rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          I have adjusted my volume!
        </Button>
      </div>
    </div>
  );
};
